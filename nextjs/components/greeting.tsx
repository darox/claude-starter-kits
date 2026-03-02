"use client";

import { useState } from "react";

export function Greeting() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const params = name ? `?name=${encodeURIComponent(name)}` : "";
      const res = await fetch(`/api/hello${params}`);
      const data = await res.json();
      setMessage(data.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mt-8 flex flex-col items-center gap-4">
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          aria-label="Your name"
          className="rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? "Loading..." : "Greet"}
        </button>
      </form>
      {message && (
        <p className="text-lg font-medium" role="status">
          {message}
        </p>
      )}
    </div>
  );
}
