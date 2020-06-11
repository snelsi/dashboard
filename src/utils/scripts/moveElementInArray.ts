/**
 * Move element in array to given index
 */
export function moveElementInArray(arr: any[], from: number, to: number) {
  const element = arr[from];
  const result = [...arr];
  result.splice(from, 1);
  result.splice(to, 0, element);
  return result;
}
