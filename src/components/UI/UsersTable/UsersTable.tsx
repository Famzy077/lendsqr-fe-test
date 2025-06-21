/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState, useRef, useMemo } from 'react';
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, createColumnHelper} from '@tanstack/react-table';
import type { RowData } from '@tanstack/react-table';
import { format } from 'date-fns';
import { MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import ActionPopover from '../ActionPopover/ActionPopover';
import FilterPopover from '../FilterPopover/FilterPopover';
import Filter from '/public/Images/Icons/filterIcon.png';
import { useOnClickOutside } from '../../../hooks/useOnClickOutside';
import './UserTables.scss';

// Define the User type
export interface User {
  id: string;
  organization: string;
  username:string;
  email: string;
  phoneNumber: string;
  dateJoined: string;
  status: 'Active' | 'Inactive' | 'Pending' | 'Blacklisted';
}

declare module '@tanstack/react-table' {
  interface TableMeta<TData extends RowData> {
    activeActionMenu: string | null;
    setActiveActionMenu: (id: string | null) => void;
  }
}

const columnHelper = createColumnHelper<User>();

const UsersTable: React.FC<{ users: User[] }> = ({ users }) => {
  const [activeActionMenu, setActiveActionMenu] = useState<string | null>(null);
  const [isFilterVisible, setIsFilterVisible] = useState(false);

  const actionPopoverRef = useRef<HTMLDivElement>(null);
  const filterPopoverRef = useRef<HTMLDivElement>(null);

  useOnClickOutside(actionPopoverRef, () => setActiveActionMenu(null));
  useOnClickOutside(filterPopoverRef, () => setIsFilterVisible(false));

  const columns = useMemo(() => [
    columnHelper.accessor('organization', {
      header: () => <TableHeader title="ORGANIZATION" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
    }),
    columnHelper.accessor('username', {
      header: () => <TableHeader title="USERNAME" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
    }),
    columnHelper.accessor('email', {
      header: () => <TableHeader title="EMAIL" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
    }),
    columnHelper.accessor('phoneNumber', {
      header: () => <TableHeader title="PHONE NUMBER" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
    }),
    columnHelper.accessor('dateJoined', {
      header: () => <TableHeader title="DATE JOINED" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
      cell: info => format(new Date(info.getValue()), 'MMM d, yyyy h:mm a'),
    }),
    columnHelper.accessor('status', {
      header: () => <TableHeader title="STATUS" onFilterClick={() => setIsFilterVisible(prev => !prev)} />,
      cell: info => (<span className={`status-badge ${info.getValue().toLowerCase()}`}>{info.getValue()}</span>),
    }),
    columnHelper.display({
      id: 'actions',
      header: () => null,
      cell: ({ row, table }) => {
        const isMenuOpen = table.options.meta?.activeActionMenu === row.original.id;
        const toggleMenu = (e: React.MouseEvent) => {
          e.stopPropagation();
          table.options.meta?.setActiveActionMenu(isMenuOpen ? null : row.original.id);
        };
        return (
          <div ref={isMenuOpen ? actionPopoverRef : null} style={{ position: 'relative' }}>
            <MoreVertical size={20} className="actions-icon" onClick={toggleMenu} />
            {isMenuOpen && <ActionPopover userId={row.original.id} />}
          </div>
        );
      },
    }),
  ], [activeActionMenu]);

  const table = useReactTable({
    data: users,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    initialState: { pagination: { pageSize: 10 } },
    meta: { activeActionMenu, setActiveActionMenu },
  });

  return (
    <div className="table-container">
      <div ref={filterPopoverRef}>
        {isFilterVisible && <FilterPopover />}
      </div>

      <div className="table-wrapper">
        <table>
          <thead>
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}>
                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* --- PAGINATION CONTROLS --- */}
      <div className="pagination-controls">
        <div className="pagination-info">
          <span>Showing</span>
          <select value={table.getState().pagination.pageSize} onChange={e => table.setPageSize(Number(e.target.value))}>
            {[10, 20, 30, 50, 100].map(pageSize => (
              <option key={pageSize} value={pageSize}>{pageSize}</option>
            ))}
          </select>
          <span>out of {table.getRowCount()}</span>
        </div>
        <div className="pagination-nav">
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="nav-arrow">
            <ChevronLeft size={20} />
          </button>
          <span>{table.getState().pagination.pageIndex + 1}</span>
           of 
          <span>{table.getPageCount()}</span>
          <button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()} className="nav-arrow">
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper component for table headers
const TableHeader = ({ title, onFilterClick }: { title: string; onFilterClick: () => void; }) => (
    <div className="table-header-content">
        <span>{title}</span>
        <img src={Filter} alt="Filter" onClick={onFilterClick}  className='filterIcon'/>
    </div>
);

export default UsersTable;