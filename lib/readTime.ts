export function calculateReadingTime(mdx: string) {
  if (!mdx) return 0;

  // Remove code blocks ``` ```
  const withoutCodeBlocks = mdx.replace(/```[\s\S]*?```/g, "");

  // Remove inline code `code`
  const withoutInlineCode = withoutCodeBlocks.replace(/`[^`]*`/g, "");

  // Remove JSX/HTML tags
  const withoutTags = withoutInlineCode.replace(/<[^>]*>/g, "");

  // Remove markdown syntax like headings, links, images
  const plainText = withoutTags
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "") // images
    .replace(/\[[^\]]*\]\([^)]*\)/g, "") // links
    .replace(/[#>*_~\-]/g, " ");

  const words = plainText.trim().split(/\s+/).filter(Boolean).length;

  const wordsPerMinute = 200;
  const minutes = Math.ceil(words / wordsPerMinute);

  return minutes;
}
