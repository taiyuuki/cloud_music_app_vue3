export default function parseCount(count: number | undefined): string {
  let result = "";
  if ((count as number) >= 100000000) {
    result = `${((count as number) / 100000000).toFixed(2).toString()}亿`;
  } else if ((count as number) >= 10000) {
    result = `${((count as number) / 10000).toFixed(2).toString()}万`;
  } else if (count) {
    result = (count as number).toString()
  }
  return result;
}