/* eslint-disable no-unused-vars */
import React, { CSSProperties, useEffect, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import {
  ColumnDef,
  ColumnSort,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  TableOptions,
  useReactTable,
} from '@tanstack/react-table';
import { AxiosResponse } from 'axios';

import Icon from '@Components/common/Icon';
import { FlexColumn, FlexRow } from '@Components/common/Layouts';
import Skeleton from '@Components/radix/Skeleton';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@Components/radix/Table';
import prepareQueryParam from '@Utils/prepareQueryParam';
import { useTypedDispatch } from '@Store/hooks';
import useDebounceListener from '@Hooks/useDebounceListener';

export interface ColumnData {
  header: string;
  accessorKey: string;
  cell?: any;
  enableColumnSort?: boolean;
}

interface DataTableProps {
  columns: ColumnDef<ColumnData>[];
  queryKey?: string;
  queryFn?: (params: any) => Promise<AxiosResponse<any, any>>;
  queryFnParams?: Record<string, any>;
  searchInput?: string;
  wrapperStyle?: CSSProperties;
  sortingKeyMap?: Record<string, any>;
  tableOptions?: Partial<TableOptions<ColumnData>>;
  useQueryOptions?: Record<string, any>;
  data?: Record<string, any>[];
  loading?: boolean;
  isSorting?: boolean;
  onRowClick?: (data: any) => void;
  className?: string;
}

const ignoreSortingColumns = ['icon', 'icons', 'serial'];

export default function DataTable({
  columns,
  queryKey,
  queryFn,
  searchInput,
  queryFnParams,
  wrapperStyle,
  sortingKeyMap,
  tableOptions = { manualSorting: true },
  useQueryOptions,
  data,
  loading,
  isSorting = true,
  onRowClick,
  className,
}: DataTableProps) {
  const dispatch = useTypedDispatch();

  const [sorting, setSorting] = useState<ColumnSort[]>([]);
  const debouncedValue = useDebounceListener(searchInput?.trim() || '', 800);

  const {
    data: queryData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: [queryKey, debouncedValue, queryFnParams, sorting],
    queryFn: () =>
      queryFn?.({
        search: debouncedValue,
        ...(queryFnParams ? prepareQueryParam(queryFnParams) : {}),
        ordering: sorting
          .map(item => {
            const transformedId = item.id.includes('attr_data')
              ? item.id.replace('attr_data', 'attr_data_')
              : item.id;
            const sortingKey = sortingKeyMap?.[transformedId] || transformedId;
            return item.desc ? `-${sortingKey}` : sortingKey;
          })
          .join(', '),
      }) || null,
    select: (res: any) => res?.data,
    enabled: !data, // do not fetch data when there are props data
    ...useQueryOptions,
  });

  // handle data from outside or queryData
  const dataList = useMemo(() => data || queryData || [], [queryData, data]);

  const table = useReactTable({
    data: Array.isArray(dataList) ? dataList : (dataList?.results ?? []),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter: searchInput,
      ...(tableOptions?.manualSorting ? { sorting } : {}),
    },
    manualSorting: true,
    manualFiltering: true,
    debugTable: true,
    ...(tableOptions?.manualSorting ? { onSortingChange: setSorting } : {}),
    ...tableOptions,
  });

  function getErrorMsg(err: any): string {
    if (err && err.response && err.response.data && err.response.data.message) {
      return err.response.data.message;
    }
    return 'An unexpected error occurred.';
  }

  if (isError) {
    return (
      <div>
        <span>Error: {getErrorMsg(error)}</span>
      </div>
    );
  }

  return (
    <FlexColumn gap={3} style={wrapperStyle} className={className}>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map(header => {
                const isSortingDisabled =
                  // @ts-ignore
                  header.column.columnDef.enableColumnSort === false ||
                  ignoreSortingColumns.includes(header.column.id) ||
                  !isSorting;

                return (
                  <TableHead
                    key={`${header.id}-${header.index}`}
                    onClick={
                      isSortingDisabled
                        ? undefined
                        : header.column.getToggleSortingHandler()
                    }
                  >
                    {!header.isPlaceholder && (
                      <FlexRow gap={3} className="cursor-pointer items-center">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {!isSortingDisabled && (
                          <Icon name="unfold_more" className="!text-icon-sm" />
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
          {loading || (!data && isLoading) ? (
            Array.from({ length: !data && isLoading ? 12 : 5 }).map(
              (_, idx) => (
                <TableRow key={idx}>
                  {columns.map((cell, index) => {
                    return (
                      <TableCell
                        key={index}
                        className={cell.header === '' ? 'w-[130px]' : ''}
                      >
                        <Skeleton className="my-1.5 h-4 w-8/12 bg-grey-400" />
                      </TableCell>
                    );
                  })}
                </TableRow>
              ),
            )
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map(row => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && 'selected'}
              >
                {row.getVisibleCells().map(cell => (
                  <TableCell
                    key={cell.id}
                    onClick={() => {
                      onRowClick?.(row.original);
                    }}
                    style={
                      onRowClick ? { cursor: 'pointer' } : { cursor: 'default' }
                    }
                  >
                    {cell.getValue() !== '' && cell.getValue() !== null
                      ? flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext(),
                        )
                      : '-'}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="text-center">
                No Data found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </FlexColumn>
  );
}
