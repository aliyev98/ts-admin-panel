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
      const src = row.original.image || null;
      const alt = row.original.title || "Product image";
      return (
        <div className="table-img-div">
          <img
            className="table-img"
            src={src}
            alt={alt}
            loading="lazy"
            onError={(e) => { e.currentTarget.src = "/assets/placeholder.png"; }}
          />
        </div>
      );
    },
  },

  { id: "title", header: "Ad", accessorKey: "title" },
  { id: "brand", header: "Brend", accessorKey: "brand" },
  { id: "category", header: "Kateqoriya", accessorKey: "category" },
  

  {
    id: 'rating',
    header: 'Reytinq',
    accessorKey: 'rating', // rows’ta rating alanını p.rate’ten ürettiğini varsayıyorum
    cell: ({ getValue }) => {
      const val = Number(getValue() ?? 0);
      return (
        <span className="rating-cell">
          <img src="images/star-icon.svg" alt="" />
          <span>{val.toFixed(1)}</span>
        </span>
      );
    },
  },

  { id: "date", header: "Tarix", accessorKey: "date", cell: ({ getValue }) => (getValue()?.split(" ")[0] ?? ""), },
];
