
export const brandsColumns = [
    { id: "no", header: "No", enableSorting: false, size: 56, cell: ({ row }) => row.index + 1 },
    
    {
        id: "image",
        header: "Şəkil",
        accessorKey: "image",
        enableSorting: false,
        size: 72,
        cell: ({ row }) => {
            const src = row.original.image || null;
            const alt = row.original.name || "Brand image";

            if (!src) return <div className="table-img-div" />;

            return (
                <div className="table-img-div">
                    <img
                        className="table-img"
                        src={src}
                        alt={alt}
                        loading="lazy"
                        decoding="async"
                        onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = "/assets/placeholder.png";
                        }}
                    />
                </div>
            );
        },
    },

    { id: "name", header: "Ad", accessorKey: "name" },
    { id: "order", header: "Sıra", accessorKey: "order" },
]