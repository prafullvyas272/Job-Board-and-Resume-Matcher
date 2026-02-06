"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Navbar() {
  const router = useRouter();
  const [token, setToken] = useState(null);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    router.push("/login");
  };

  return (
    <nav
      style={{
        padding: 16,
        borderBottom: "1px solid #333",
        display: "flex",
        gap: 20,
        alignItems: "center",
      }}
    >
      <Link href="/">Home</Link>
      <Link href="/jobs">Jobs</Link>

      {token && <Link href="/candidate">Candidate</Link>}
      {token && <Link href="/employer">Employer</Link>}

      {!token && <Link href="/login">Login</Link>}
      {!token && <Link href="/register">Register</Link>}

      {token && (
        <button
          onClick={logout}
          style={{
            marginLeft: "auto",
            padding: "6px 12px",
            cursor: "pointer"
          }}
        >
          Logout
        </button>
      )}
    </nav>
  );
}
