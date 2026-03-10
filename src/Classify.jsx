import * as tf from "@tensorflow/tfjs";
import { useEffect, useState } from "react";

function App() {
  const [result, setResult] = useState("");

  const classLabels = ["Earlyblight", "Healthy", "LateBlight"];

  const predictImage = async () => {
    const model = await tf.loadLayersModel("/model/model.json");

    const img = document.getElementById("image");

    let tensor = tf.browser
      .fromPixels(img)
      .resizeNearestNeighbor([150, 150])
      .toFloat()
      .div(255.0)
      .expandDims();

    const predictions = await model.predict(tensor).data();

    const predictedClass = predictions.indexOf(Math.max(...predictions));
    const predictedLabel = classLabels[predictedClass];
    const predictedProbability = predictions[predictedClass];

    setResult(
      `Predicted class: ${predictedLabel} | Accuracy: ${(predictedProbability * 100).toFixed(2)}%`
    );
  };

  useEffect(() => {
    predictImage();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h2>Potato Leaf Disease Detection</h2>

      <img
        id="image"
        src="/test.jpg"
        alt="leaf"
        width="200"
        onLoad={predictImage}
      />

      <h3>{result}</h3>
    </div>
  );
}

export default App;