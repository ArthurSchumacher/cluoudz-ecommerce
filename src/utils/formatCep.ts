export function formatCep(cep: string): string {
  const cleanedCEP = cep.replace(/\D/g, "");
  const formattedCEP = `${cleanedCEP.slice(0, 5)}-${cleanedCEP.slice(5)}`;
  return formattedCEP;
}
