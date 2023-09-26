import React from "react";
import { FiChevronDown } from "react-icons/fi";

export interface Column {
  label: string;
  accessor: string;
}

interface TableHeadProps {
  columns: Column[];
  onClickSort: (accessor: string) => void;
}

const TableHead: React.FC<TableHeadProps> = ({ columns, onClickSort }) => {
  return (
    <thead>
      <tr>
        {columns.map(({ label, accessor }) => {
          return (
            <th key={accessor} onClick={() => onClickSort(accessor)}>
              {label}<FiChevronDown className="custom-icon" />
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
