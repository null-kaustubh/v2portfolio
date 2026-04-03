export type TocItem = {
  id: string;
  text: string;
  level: number;
};

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getTableOfContents(content: string): TocItem[] {
  const lines = content.split("\n");

  const toc: TocItem[] = [];

  for (const line of lines) {
    if (line.startsWith("## ")) {
      const text = line.replace("## ", "").trim();
      toc.push({
        id: slugify(text),
        text,
        level: 2,
      });
    }

    if (line.startsWith("### ")) {
      const text = line.replace("### ", "").trim();
      toc.push({
        id: slugify(text),
        text,
        level: 3,
      });
    }
  }

  return toc;
}
