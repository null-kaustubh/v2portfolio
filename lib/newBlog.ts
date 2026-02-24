export function isNewBlog(createdAt: string, days = 10) {
  const created = new Date(createdAt).getTime();
  const now = Date.now();

  const diffInDays = (now - created) / (1000 * 60 * 60 * 24);
  return diffInDays <= days;
}
