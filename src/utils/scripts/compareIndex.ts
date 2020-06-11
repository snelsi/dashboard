interface Sortable {
  index: number;
}

/**
 * Sort two objects asc by their index
 */
export const compareIndex = (obj1: Sortable, obj2: Sortable) =>
  obj1?.index - obj2?.index;
