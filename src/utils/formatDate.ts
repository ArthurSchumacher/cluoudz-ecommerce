export function formatDate(dateString: string) {
  const date = new Date(dateString);
  const day = date.getDate().toString().padStart(2, "0");
  const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Os meses são baseados em zero, então é necessário adicionar 1
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
