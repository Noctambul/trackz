export function modulo(num: number, mod: number): number {
  return ((num % mod) + mod) % mod;
}

export default function useMath() {
  return { modulo };
}
