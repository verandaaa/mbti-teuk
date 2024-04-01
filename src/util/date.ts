export function parseDate(createdAt: string) {
  const date = createdAt.substring(0, 10);
  const time = createdAt.substring(11, 16);

  return `${date} ${time}`;
}
