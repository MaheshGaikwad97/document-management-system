"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();

  // 🔐 Logout with confirmation
  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      localStorage.removeItem("token");
      router.push("/login");
    }
  };

  // 🎯 Active link style
  const linkClass = (path: string) =>
    `block p-2 rounded ${
      pathname === path
        ? "bg-gray-700 text-white"
        : "hover:bg-gray-700 text-gray-300"
    }`;

  return (
    <html lang="en">
      <body className="flex">

        {/* SIDEBAR */}
        <div className="w-60 min-h-screen bg-gray-900 text-white p-4">
          <h2 className="text-xl font-bold mb-6">Admin Panel</h2>

          <nav className="space-y-2">
           <Link href="/" className="block p-2 rounded hover:bg-gray-700">
  Dashboard
</Link>

<Link href="/documents" className="block p-2 rounded hover:bg-gray-700">
  Documents
</Link>

<Link href="/upload" className="block p-2 rounded hover:bg-gray-700">
  Upload
</Link>

            {/* LOGOUT */}
            <button
              onClick={handleLogout}
              className="mt-6 w-full text-left p-2 rounded text-red-400 hover:bg-gray-700 hover:text-red-500"
            >
              Logout
            </button>
          </nav>
        </div>

        {/* MAIN CONTENT */}
        <div className="flex-1 p-6 bg-gray-100 min-h-screen">
          {children}
        </div>

      </body>
    </html>
  );
}