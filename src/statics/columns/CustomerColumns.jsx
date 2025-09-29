export const customerColumns = [
    { id: "no", header: "No", enableSorting: false, size: 56, cell: ({ row }) => row.index + 1 },
    { id: "name", header: "Ad", accessorKey: "name" },
]