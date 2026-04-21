"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "../components/ProtectedRoute";

export default function Documents() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  const fetchDocuments = async () => {
    const res = await fetch("http://localhost:5000/api/documents");
    const data = await res.json();
    setDocuments(data);
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const deleteDoc = async (id: string) => {
    const token = localStorage.getItem("token");

    if (!confirm("Delete this document?")) return;

    const res = await fetch(
      `http://localhost:5000/api/documents/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      alert("Deleted ✅");
      fetchDocuments();
    } else {
      const data = await res.json();
      alert(data.message);
    }
  };

  // 🔍 FILTER LOGIC
  const filteredDocs = documents.filter((doc) =>
    doc.title.toLowerCase().includes(search.toLowerCase()) ||
    doc.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-4">Documents</h1>

        {/* SEARCH BAR */}
        <input
          type="text"
          placeholder="Search by title or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border p-2 mb-4 w-full bg-white rounded"
        />

        {filteredDocs.length === 0 ? (
          <p className="text-gray-500">
  No documents available. Upload your first document.
</p>
        ) : (
          <div className="space-y-3">
            {filteredDocs.map((doc) => (
              <div
                key={doc._id}
                className="flex justify-between items-center border p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition"
              >
                <div>
                  <p className="font-semibold">{doc.title}</p>
                  <p className="text-sm text-gray-500">{doc.category}</p>

                  <div className="space-x-2 mt-1">
                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      target="_blank"
                      className="text-blue-600 text-sm"
                    >
                      View
                    </a>

                    <a
                      href={`http://localhost:5000/${doc.filePath}`}
                      download
                      className="text-green-600 text-sm"
                    >
                      Download
                    </a>
                  </div>
                </div>

                <button
                  onClick={() => deleteDoc(doc._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}