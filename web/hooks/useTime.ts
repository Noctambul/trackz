/**
 * @param timeInSeconds The time to format in seconds
 */
export function formatTime(timeInSeconds: number): string {
  const minutes = Math.floor(timeInSeconds / 60);
  const returnMin = minutes < 10 ? `0${minutes}` : minutes;
  const seconds = Math.floor(timeInSeconds % 60);
  const returnSec = seconds < 10 ? `0${seconds}` : seconds;

  return `${returnMin}:${returnSec}`;
}

export function useTime() {
  return { formatTime };
}
