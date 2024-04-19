import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "ui";

// import { CellAction } from "./CellAction";

export const columns: ColumnDef<any>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected()}
        onCheckedChange={(value) => {
          table.toggleAllPageRowsSelected(
            value === true || value === "indeterminate" ? true : false,
          );
        }}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => {
          row.toggleSelected(value === true || value === "indeterminate" ? true : false);
        }}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "tag.tagName",
    header: "Contributor Name",
  },
  {
    accessorKey: "assignedAt",
    header: "Date assigned",
  },

  // {
  //   id: "actions",
  //   cell: ({ row }) => <CellAction data={row.original} />,
  // },
];
