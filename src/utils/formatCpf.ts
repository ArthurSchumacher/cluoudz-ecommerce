export function formatCpf(cpf: string): string {
  const cleanedCpf = cpf.replace(/\D/g, "");
  const formattedCpf = `${cleanedCpf.slice(0, 3)}.${cleanedCpf.slice(
    3,
    6
  )}.${cleanedCpf.slice(6, 9)}-${cleanedCpf.slice(9)}`;
  return formattedCpf;
}
