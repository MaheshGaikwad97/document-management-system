"use client";

import { useEffect, useState } from "react";
import ProtectedRoute from "./components/ProtectedRoute";

export default function Dashboard() {
  const [documents, setDocuments] = useState<any[]>([]);
  const [totalDocs, setTotalDocs] = useState(0);
  const [totalCategories, setTotalCategories] = useState(0);

  const fetchDocuments = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/documents");
      const data = await res.json();

      setDocuments(data);
      setTotalDocs(data.length);

      // Count unique categories
      const categories = new Set(data.map((doc: any) => doc.category));
      setTotalCategories(categories.size);

    } catch (error) {
      console.log("Error", error);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <ProtectedRoute>
      <div>
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        {/* STATS CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

          {/* TOTAL DOCUMENTS */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Total Documents</h2>
            <p className="text-3xl font-bold">{totalDocs}</p>
          </div>

          {/* TOTAL CATEGORIES */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-gray-500">Categories</h2>
            <p className="text-3xl font-bold">{totalCategories}</p>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}