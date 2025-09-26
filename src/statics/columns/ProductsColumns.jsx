// statics/columns/ProductsColumns.js

import { Eye } from "lucide-react";

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
  { id: "gender", header: "Cins", accessorKey: "gender" },

  {
    id: "colors",
    header: "Rəng",
    accessorKey: "colors",
    cell: ({ getValue }) => {
      const colors = getValue() || [];
      if (!colors.length) return <span className="muted">—</span>;

      const max = 5;
      const visible = colors.slice(0, max);
      const rest = colors.length - visible.length;

      return (
        <div className="colors-cell" aria-label={`Rənglər: ${colors.join(", ")}`}>
          {visible.map((hex, i) => (
            <span
              key={i}
              className="color-dot"
              title={hex}
              style={{ backgroundColor: hex }}
            />
          ))}
          {rest > 0 && <span className="color-more">+{rest}</span>}
        </div>
      );
    },
  },

  {
    id: "sizes", header: "Ölçülər", accessorKey: "sizes",
    cell: ({ getValue }) => {
      const val = String(getValue() ?? "-");
      return (
        <span>{val}</span>
      );
    },
  },


  {
    id: "price", header: "Əsas qiymət", accessorKey: "price",
    cell: ({ getValue }) => {
      const val = Number(getValue() ?? 0);
      return (
        <span className="price-cell">
          <span>₼</span>
          <span>{val.toFixed(1)}</span>
        </span>
      );
    },
  },

  {
    id: "discount", header: "Endirimli qiyməti", accessorKey: "discount",
    cell: ({ getValue }) => {
      const val = Number(getValue() ?? 0);
      return (
        <span className="discount-cell">
          <span>₼</span>
          <span>{val.toFixed(1)}</span>
        </span>
      );
    },
  },

  { id: "sale_count", header: "Satış sayı", accessorKey: "sale_count" },

  { id: "stock", header: "Stokda", accessorKey: "stock" },

  {
    id: 'rating',
    header: 'Reytinq',
    accessorKey: 'rating',
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

  {
    id: "views", header: "Baxış sayı", accessorKey: "views",
    cell: ({ getValue }) => {
      const val = Number(getValue() ?? 0);
      return (
        <span className="views-cell">
          <Eye className="views-icon" />
          <span>{val}</span>
        </span>
      );
    },
  },

  { id: "date", header: "Tarix", accessorKey: "date", cell: ({ getValue }) => (getValue()?.split(" ")[0] ?? ""), },

];