export type SortDirection = "asc" | "desc";

export const sortList = <T>(
  array: T[],
  sortBy?: string,
  sortDirection: SortDirection = "asc"
): T[] => {
  if (!sortBy) return array;

  return array.sort((a: any, b: any) => {
    let valueA: string | number | Date, valueB: string | number | Date;

    // Handle special case for <sortBy>
    if (
      sortBy === "title" ||
      sortBy === "htmlText" ||
      sortBy === "name" ||
      sortBy === "description"
    ) {
      valueA = a.title || a.htmlText || a.name || a.description;
      valueB = b.title || b.htmlText || a.name || a.description;
    } else {
      valueA = a[sortBy as keyof T];
      valueB = b[sortBy as keyof T];
    }
    // Handle null values
    if (valueA === null && valueB === null) return 0;
    if (valueA === null) return sortDirection === "asc" ? -1 : 1;
    if (valueB === null) return sortDirection === "asc" ? 1 : -1;

    // Compare dates
    if (sortBy === "created_at") {
      valueA = new Date(valueA).getTime();
      valueB = new Date(valueB).getTime();
    }

    // Compare strings case-insensitive
    if (typeof valueA === "string" && typeof valueB === "string") {
      valueA = valueA.toLowerCase();
      valueB = valueB.toLowerCase();
    }

    if (valueA < valueB) return sortDirection === "asc" ? -1 : 1;
    if (valueA > valueB) return sortDirection === "asc" ? 1 : -1;
    return 0;
  });
};
