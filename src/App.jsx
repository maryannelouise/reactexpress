import { useState } from "react";

export default function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("file", image);

    try {
      const response = await fetch("http://localhost:8000/classify", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error:", error);
      alert("Error connecting to the server");
    }

    setLoading(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
      setResult(null);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-200 p-6">
      
      <h1 className="text-3xl font-bold text-pink-600 mb-6">
        Potato Leaf Classifier
      </h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 bg-white/70 p-6 rounded-xl shadow-lg"
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="border border-pink-200 p-2 rounded"
        />

        <button
          type="submit"
          className="bg-gradient-to-r from-pink-500 to-rose-500 text-white py-2 rounded hover:opacity-90"
        >
          Upload & Classify
        </button>
      </form>

      {/* Image Preview */}
      {preview && (
        <div className="mt-6">
          <img
            src={preview}
            alt="Uploaded"
            className="w-64 h-64 object-cover rounded-xl shadow-lg"
          />
        </div>
      )}

      {/* Loading */}
      {loading && (
        <p className="mt-4 text-pink-700 font-semibold">
          Classifying image...
        </p>
      )}

      {/* Result */}
      {result && (
        <div className="mt-6 p-4 bg-white/70 rounded-xl shadow-lg text-center w-64">
          <p className="font-bold text-pink-600 text-lg">
            Predicted Class: {result.label}
          </p>

          <p className="font-bold text-rose-600 text-lg">
            Accuracy: {result.accuracy}%
          </p>
        </div>
      )}
    </div>
  );
}