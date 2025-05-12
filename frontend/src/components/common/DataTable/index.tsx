/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { useInfiniteQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  SortingState,
  useReactTable,
} from '@tanstack/react-table';
import { ChevronDown, ChevronUp } from 'lucide-react';

import Skeleton from '@Components/radix/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@Components/radix/Table';
import { getDisplayedRowCount } from '@Utils/index';
import prepareQueryParam from '@Utils/prepareQueryParam';
import useIntersectionObserver from '@Hooks/useIntersectionObserver';
import useSortingConfig from '@Hooks/useSortingConfig';

import { FlexColumn, FlexRow } from '../Layouts';

import TableSkeleton from './TableSkeleton';

interface ColumnData {
  [x: string]: any;
  component?: any;
  header: string;
  accessorKey: string;
  cell?: any;
}

interface DataTableProps {
  columns: ColumnDef<ColumnData>[];
  queryKey: string;
  queryFn: (params: any) => Promise<any> | void;
  queryFnParams?: Record<string, any> | any;
  searchInput: string;
  className?: string;
  demoData?: any;
  onRowClick?: any;
  initialState?: any;
  isPaginated?: boolean;
  needSorting?: boolean;
  cellClassName?: string;
  tableStyle?: any;
  showDataCount?: boolean;
  dataCountCategory?: string;
  exportMode?: boolean;
  sortByKey?: boolean;
  enabled?: boolean;
}

export default function DataTable({
  columns,
  queryKey,
  queryFn,
  searchInput,
  queryFnParams, // data,
  className,
  demoData,
  onRowClick,
  initialState,
  isPaginated = true,
  needSorting = true,
  // cellClassName,
  tableStyle,
  showDataCount = false,
  dataCountCategory,
  exportMode = false,
  sortByKey = false,
  enabled = true,
}: DataTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const defaultData = React.useMemo(() => [], []);
  const [isIntersecting, _, viewRef] = useIntersectionObserver({
    threshold: 1,
  });

  const { sortOrderKey, sortDir, sortBy } = useSortingConfig(
    sorting[0]?.id,
    sorting[0]?.desc,
    sortByKey,
  );

  const { data, isLoading, fetchNextPage, isError, error, hasNextPage } =
    useInfiniteQuery({
      queryKey: [queryKey, searchInput, queryFnParams, sortOrderKey, sortDir],
      queryFn: async ({ pageParam = 1 }) => {
        const res = await queryFn({
          page: pageParam,
          search: searchInput,
          sort_by: sortBy,
          [sortOrderKey]: sortDir,
          page_size: initialState?.paginationState?.pageSize,
          ...(queryFnParams ? prepareQueryParam(queryFnParams) : {}),
        });
        return res?.data;
      },
      enabled,
      initialPageParam: 1,
      getNextPageParam: lastPage => {
        return lastPage?.next_page ?? undefined;
      },
    });

  const table = useReactTable({
    data: data
      ? isPaginated
        ? data?.pages?.reduce(
            (acc: Record<string, any>[], page: Record<string, any>) => {
              return [...acc, ...(page.results || page)];
            },
            [],
          )
        : (data?.pages[0] ?? demoData ?? defaultData)
      : [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      // globalFilter: searchInput,
    },
    onSortingChange: setSorting,
    manualSorting: false,
    manualPagination: true,
    debugTable: true,
  });

  useEffect(() => {
    if (isIntersecting && hasNextPage) {
      fetchNextPage();
    }
  }, [isIntersecting, fetchNextPage, hasNextPage]);

  if (isError) {
    // @ts-ignore
    const caughtError = error?.response?.data?.detail;
    toast.error(caughtError || (error as Error).message);
  }
  if (isLoading) {
    return <TableSkeleton />;
  }

  return (
    <FlexColumn className="h-full gap-2">
      {data?.pages && showDataCount && (
        <div className="data-count mb-1 flex items-center gap-1 px-4 font-semibold text-[#0B2E62]">
          <p className="">{getDisplayedRowCount(data?.pages)}</p>
          <span>of</span>
          <p>{data?.pages?.[0]?.count || 0}</p>
          <p className="capitalize">{dataCountCategory}</p>
        </div>
      )}

      <Table className={`w-full ${className}`} style={tableStyle}>
        <TableHeader className="thead !h-[3rem]">
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="table-head-row-tr">
              {headerGroup.headers.map(header => {
                return (
                  <TableHead
                    key={header.id}
                    onClick={
                      header.column.columnDef.sortingFn
                        ? header.column.getToggleSortingHandler()
                        : undefined
                    }
                    className="table-head-th"
                    style={{
                      width: `${header?.getSize()}px`,
                    }}
                  >
                    {!header.isPlaceholder && (
                      <FlexRow
                        className={`hover:text-secondary-500 group cursor-pointer items-center justify-start gap-1 px-3 py-0 text-xs md:text-sm xl:px-6 ${
                          header.column.getIsSorted() !== false
                            ? 'text-[#E0D4FD]'
                            : 'text-white'
                        } ${exportMode ? '!text-xs' : ''}`}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}

                        {header.column.columnDef.sortingFn && needSorting && (
                          <div
                            className={`flex flex-col items-center justify-center ${header.id === 'pdfIcon' ? 'hidden' : 'block'} ${needSorting ? 'block' : 'hidden'}`}
                          >
                            {(header.column.getIsSorted() === 'asc' ||
                              header.column.getIsSorted() === false) && (
                              <ChevronUp
                                name="expand_less"
                                className={`mb-[-2px] !h-3 !w-3 hover:text-primary-600 md:!h-4 md:!w-4 ${
                                  header.column.getIsSorted() !== false
                                    ? 'text-primary-600'
                                    : 'text-white'
                                }`}
                              />
                            )}
                            {(header.column.getIsSorted() === 'desc' ||
                              header.column.getIsSorted() === false) && (
                              <ChevronDown
                                name="expand_more"
                                className={`h-3 w-3 hover:text-primary-600 md:h-4 md:w-4 ${
                                  header.column.getIsSorted() !== false
                                    ? 'text-primary-600'
                                    : 'text-white'
                                }`}
                              />
                            )}
                          </div>
                        )}
                      </FlexRow>
                    )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel()?.rows?.length ? (
            table.getRowModel()?.rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
                onClick={() => onRowClick(row) || null}
                className="table-body-row w-full cursor-pointer"
              >
                {row.getVisibleCells().map(cell => {
                  return (
                    <TableCell
                      key={cell.id}
                      style={{
                        width: `${cell.column.getSize()}px`,
                      }}
                    >
                      <div
                        className={`flex justify-start bg-center text-xs !font-medium leading-normal text-matt-200 md:text-sm`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )}
                      </div>
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No Data found.
              </TableCell>
            </TableRow>
          )}
          {isPaginated &&
            hasNextPage &&
            Array.from({ length: 3 }).map((__, rowindex: number) => (
              <TableRow
                className="w-full !bg-red-200"
                ref={viewRef}
                key={`${rowindex.toString()}_loader_rows`}
              >
                {Array.from({ length: columns?.length || 7 }).map(
                  (___, index: number) => (
                    <TableCell key={`${index.toString()}_loader_column`}>
                      <Skeleton className="h-9" />
                    </TableCell>
                  ),
                )}
              </TableRow>
            ))}
        </TableBody>
      </Table>
      {/* {showPagination && <DataTablePagination table={table} />} */}
    </FlexColumn>
  );
}
