import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [result, setResult] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) return alert("Please select an image");

    const formData = new FormData();
    formData.append("file", image);
    console.log(image)
    const response = await fetch("http://localhost:8000/classify", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();
    setResult(data);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-200 p-6">
      <h1 className="text-3xl font-bold text-pink-600 mb-6">Potato Leaf Classifier</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 bg-white/70 p-6 rounded-xl shadow-lg">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          className="border border-pink-200 p-2 rounded"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded"
        >
          Upload & Classify
        </button>
      </form>

      {result && (
        <div className="mt-6 p-4 bg-white/70 rounded-xl shadow-lg text-center">
          <p className="font-bold text-pink-600">Predicted Class: {result.label}</p>
          <p className="font-bold text-rose-600">Accuracy: {result.accuracy}%</p>
        </div>
      )}
    </div>
  );
}