// statics/columns/ProductsColumns.js
export const productColumns = [
  { id: "no", header: "No", enableSorting: false, size: 56, cell: ({ row }) => row.index + 1 },

  {
    id: "image",
    header: "Şəkil",
    accessorKey: "image",
    enableSorting: false,
    size: 72,
    cell: ({ row }) => {
      const src = row.original.image;
      const alt = row.original.title || "Product image";
      return (
        <div className="table-img-div">
          <img className="table-img"
            src={src}
            alt={alt}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "/assets/placeholder.png"; }}
          />
        </div>
      );
    },
  },

  { id: "title",    header: "Ad",        accessorKey: "title" },
  { id: "brand",    header: "Brend",     accessorKey: "brand" },
  { id: "category", header: "Kateqoriya",accessorKey: "category" },
  { id: "rating",   header: "Reytinq",   accessorKey: "rating" },
  { id: "date",     header: "Tarix",     accessorKey: "date" },
  
];
