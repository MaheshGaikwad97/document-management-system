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
  formData.append("file", file as Blob);
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

    // 🔥 READ RESPONSE SAFELY
    const text = await res.text();
    console.log("RAW RESPONSE:", text);

    let data;
    try {
      data = JSON.parse(text);
    } catch {
      throw new Error("Server returned HTML instead of JSON (check backend)");
    }

    if (!res.ok) {
      throw new Error(data.message || "Upload failed");
    }

    // ✅ SUCCESS
    setMessage("File uploaded successfully ✅");

    // Reset form
    setFile(null);
    setTitle("");
    setCategory("");

    // Refresh list
    fetchDocuments();

  } catch (err: any) {
    setMessage(err.message);
  }
};