export function formatPhoneNumber(phone: string): string {
  const cleanedPhone = phone.replace(/\D/g, "");
  const formattedPhone = `(${cleanedPhone.slice(0, 2)}) ${
    cleanedPhone[2]
  } ${cleanedPhone.slice(3, 7)}-${cleanedPhone.slice(7)}`;
  return formattedPhone;
}

export function normalizePhoneNumber(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{2})(\d)/, "($1) $2")
    .replace(/(\d)(\d{4})(\d{4})$/, "$1 $2-$3");
}
