"use client";

import { useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Upload() {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const uploadFile = async () => {
    if (!title || !category || !file) {
      alert("All fields required");
      return;
    }

    const token = localStorage.getItem("token");

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", title);
      formData.append("category", category);
      formData.append("file", file);

      const res = await fetch("http://localhost:5000/api/documents", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        alert("Upload successful ✅");
        setTitle("");
        setCategory("");
        setFile(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      alert("Server error");
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
  <div className="max-w-md bg-white p-6 rounded-xl shadow">
    <h1 className="text-2xl font-bold mb-4">Upload Document</h1>

    <div className="space-y-3">
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 w-full rounded"
      />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files?.[0] || null)}
        className="border p-2 w-full rounded"
      />

      <button
        onClick={uploadFile}
        disabled={loading}
        className={`w-full py-2 rounded text-white ${
          loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
        }`}
      >
        {loading ? "Uploading..." : "Upload Document"}
      </button>
    </div>
  </div>
</ProtectedRoute>
  );
}