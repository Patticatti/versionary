"use client";

import React, { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";

export default function MarkdownEditor({ slug }: { slug: string }) {
  const [markdown, setMarkdown] = useState<string>("");

  // Example: Fetch Markdown from an API (replace with actual API call)
  useEffect(() => {
    async function fetchMarkdown() {
      const response = await fetch(`/api/markdown/${slug}`);
      const text = await response.text();
      setMarkdown(text);
    }

    fetchMarkdown();
  }, [slug]);

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Markdown Preview</h2>
      <div className="prose">
        <ReactMarkdown>{markdown}</ReactMarkdown>
      </div>
    </div>
  );
}
