export function addColumn(columns: string[]): string[] {
  return [...columns, ""];
}

export function updateColumn(
  columns: string[],
  value: string,
  index: number,
): string[] {
  const updatedColumns = [...columns];
  updatedColumns[index] = value;
  return updatedColumns;
}

export function deleteColumn(
  columns: string[],
  indexToDelete: number,
): string[] {
  return columns.filter((_, index) => index !== indexToDelete);
}
