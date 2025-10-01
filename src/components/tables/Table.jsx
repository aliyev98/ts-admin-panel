import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table'
import NoData from '../../ui/NoData'
import { useSelector } from 'react-redux'
import Loading from '../../ui/Loading'

const Table = ({ data = [], columns }) => {
  const table = useReactTable({ data, columns, getCoreRowModel: getCoreRowModel() })
  const { loading, error } = useSelector(state => state.product)

  // Grup kolonları varsa güvenli colSpan:
  const colSpan = table.getAllLeafColumns().length

  return (
    <table className="table">
      <thead>
        {table.getHeaderGroups().map(hg => (
          <tr key={hg.id}>
            {hg.headers.map(header => (
              <th key={header.id}>
                <span>{flexRender(header.column.columnDef.header, header.getContext())}</span>
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {loading ? (
          <tr>
            <td colSpan={colSpan}>
              <Loading />
            </td>
          </tr>
        ) : error ? (
          <tr>
            <td colSpan={colSpan}>
              <div className="error"> {String(error)} </div>
            </td>
          </tr>
        ) : data.length === 0 ? (
          <tr>
            <td colSpan={colSpan}>
              <NoData />
            </td>
          </tr>
        ) : (
          table.getRowModel().rows.map(row => (
            <tr key={row.id}>
              {row.getVisibleCells().map(cell => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))
        )}
      </tbody>
    </table>
  )
}

export default Table
