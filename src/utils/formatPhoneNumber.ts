export function formatPhoneNumber(phone: string): string {
  const cleanedPhone = phone.replace(/\D/g, "");
  const formattedPhone = `(${cleanedPhone.slice(0, 2)}) ${
    cleanedPhone[2]
  } ${cleanedPhone.slice(3, 7)}-${cleanedPhone.slice(7)}`;
  return formattedPhone;
}
