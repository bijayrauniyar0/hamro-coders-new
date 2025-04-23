// @TODO: in the future return only actual object { sort_by, sort_order || order }
// so, there's no need to manually configure at api call params

export default function useSortingConfig(
  sortBy: string,
  desc?: boolean,
  isSortByKey?: boolean,
) {
  const sortOrderKey = isSortByKey ? 'order' : 'sort_order';
  let sortOrder: string | null = null;

  if (sortBy?.trim() && isSortByKey) {
    sortOrder = `${desc ? '-' : ''}${sortBy}`.trim();
  } else if (sortBy?.trim() && !isSortByKey) {
    sortOrder = desc ? 'desc' : 'asc';
  }
  return { sortOrderKey, sortDir: sortOrder, sortBy: sortBy?.trim() } as const;
}
