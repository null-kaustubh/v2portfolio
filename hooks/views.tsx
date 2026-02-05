"use client";
import { useEffect, useState } from "react";

export default function Views() {
  const [views, setViews] = useState<number | null>(null);

  useEffect(() => {
    fetch("/api/views")
      .then((res) => res.json())
      .then((data) => setViews(data.views));
  }, []);

  if (views === null)
    return (
      <div className="font-mono text-xs">
        visitors <span className="text-selection">#0</span>
      </div>
    );
  return (
    <div className="font-mono text-xs">
      visitors <span className="text-selection">#{views.toLocaleString()}</span>
    </div>
  );
}
