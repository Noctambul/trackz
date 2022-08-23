export default function useMath() {
  const modulo = (num: number, mod: number): number =>
    ((num % mod) + mod) % mod;

  return { modulo };
}
