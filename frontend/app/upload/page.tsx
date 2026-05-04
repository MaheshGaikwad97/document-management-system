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

  const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

  // 🔥 Fetch documents
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

    if (!token) {
      router.push("/login");
      return;
    }

    const formData = new FormData();
    formData.append("file", file as Blob);
    formData.append("title", title);
    formData.append("category", category);

    try {
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

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      setMessage("Uploaded ✅");
      fetchDocuments(); // refresh list
    } catch (err: any) {
      setMessage(err.message);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4">Upload Document</h2>

        {message && <p className="text-green-600">{message}</p>}

        <form onSubmit={handleUpload} className="mb-6">
          <input
            type="text"
            placeholder="Title"
            className="w-full mb-2 p-2 border"
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            type="text"
            placeholder="Category"
            className="w-full mb-2 p-2 border"
            onChange={(e) => setCategory(e.target.value)}
          />

          <input
            type="file"
            className="w-full mb-2"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
          />

          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Upload
          </button>
        </form>

        <h3 className="text-lg font-semibold mb-2">Documents</h3>

        <ul>
          {documents.map((doc) => (
            <li key={doc._id} className="border p-2 mb-2">
              <p><strong>{doc.title}</strong> ({doc.category})</p>

              <a
                href={`https://document-management-system-h6os.onrender.com/${doc.filePath}`}
                target="_blank"
                className="text-blue-600"
              >
                View File
              </a>
            </li>
          ))}
        </ul>

      </div>
    </div>
  );
}