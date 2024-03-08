export function formatCpf(cpf: string): string {
  const cleanedCpf = cpf.replace(/\D/g, "");
  const formattedCpf = `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(
    3,
    6
  )}.${cleanedCpf.slice(6, 9)}-${cleanedCpf.slice(9)}`;
  return formattedCpf;
}

export function normalizeCpf(value: string): string {
  return value
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}
