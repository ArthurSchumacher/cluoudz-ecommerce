export function formatCep(cep: string): string {
  const cleanedCEP = cep.replace(/\D/g, "");
  const formattedCEP = `${cleanedCEP.slice(0, 5)}-${cleanedCEP.slice(5)}`;
  return formattedCEP;
}

export function normalizeCep(value: string): string {
  return value.replace(/\D/g, "").replace(/(\d{5})(\d{3})/, "$1-$2");
}
