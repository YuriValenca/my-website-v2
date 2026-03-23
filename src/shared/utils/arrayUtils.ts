export const removeItemFromList = <T>(list: T[], item: T): T[] =>
  list.filter(element => element !== item);
