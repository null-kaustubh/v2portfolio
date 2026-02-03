"use client";
import { useEffect, useState } from "react";

export default function Views() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  if (!views) return null;
  return <span>{views.toLocaleString()} visitors</span>;
}
