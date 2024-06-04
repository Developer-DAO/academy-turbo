import type { ColumnDef } from "@tanstack/react-table";
// import { User } from "@/constants/data";
import { Checkbox } from "ui";

import { CellAction } from "./CellAction";

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
    accessorKey: "trackTitle",
    header: "Track Title",
  },
  {
    accessorKey: "trackDescription",
    header: "Track Description",
  },
  {
    accessorKey: "imgPath",
    header: "Track image",
  },
  {
    accessorKey: "trackPath",
    header: "Track Path",
  },
  {
    accessorKey: "order",
    header: "Order",
  },
  {
    accessorKey: "productionVisible",
    header: "Prod. visible",
  },
  {
    accessorKey: "stagingVisible",
    header: "Staging visible",
  },
  {
    accessorKey: "visible",
    header: "Local visible",
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />,
  },
];
