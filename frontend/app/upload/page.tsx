"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UploadPage() {
  const router = useRouter();

  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);

  // Fetch documents
  const fetchDocuments = async () => {
    try {
      const res = await fetch(
        "https://document-management-system-h6os.onrender.com/api/documents"
      );
      const data = await res.json();
      setDocuments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleUpload = async (e: any) => {
    e.preventDefault();

    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/login");
      return;
    }

    if (!file || !title || !category) {
      setMessage("All fields are required");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("title", title);
    formData.append("category", category);

    try {
      setMessage("Uploading...");

      const res = await fetch(
        "https://document-management-system-h6os.onrender.com/api/documents",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const text = await res.text();

      let data;
      try {
        data = JSON.parse(text);
      } catch {
        throw new Error("Server returned invalid response (not JSON)");
      }

      if (!res.ok) {
        throw new Error(data.message || "Upload failed");
      }

      setMessage("File uploaded successfully ✅");

      setFile(null);
      setTitle("");
      setCategory("");

      fetchDocuments();
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Upload Document</h2>

      <form onSubmit={handleUpload}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input
          type="text"
          placeholder="Category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          type="file"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
        />

        <button type="submit">Upload</button>
      </form>

      <p>{message}</p>

      <h3>Documents</h3>
      <ul>
        {documents.map((doc, i) => (
          <li key={i}>
            {doc.title} - {doc.category}
          </li>
        ))}
      </ul>
    </div>
  );
}