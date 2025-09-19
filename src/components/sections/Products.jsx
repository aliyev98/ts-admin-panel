import React, { useEffect, useMemo, useState } from 'react'
import { Grip, ScrollText } from 'lucide-react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown';
import AddButton from '../../ui/buttons/AddButton';
import axios from 'axios';
import Table from '../tables/Table';
import { productColumns } from '../../statics/columns/ProductsColumns'
import { setSidebarSelection } from '../../redux/sidebarSlice';
import { useDispatch } from 'react-redux';

const Products = () => {

  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("card")
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const BASE = "https://8000.jobing.az";
  const STORAGE_PREFIX = "/storage/";

  function buildImageUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(STORAGE_PREFIX + path, BASE).toString();
  }

  useEffect(() => {
    const controller = new AbortController();
    axios.get("https://8000.jobing.az/api/product", { signal: controller.signal })
      .then(res => setProducts(res.data?.data ?? []))
      .catch(err => { if (err.name !== 'CanceledError') setError(err); })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  console.log(products)

  const rows = useMemo(() => (
    products.map((p, i) => ({
      id: p.id ?? i,
      image: p.images?.[0]?.image_path ? buildImageUrl(p.images[0].image_path) : "",
      title: p.title ?? '',
      brand: p.brand?.name ?? '',
      category: Array.isArray(p.categories) ? p.categories.map(c => c.name).join(', ') : (p.category?.name ?? ''),
      rating: p.rating ?? 0,
      date: p.updatedAt ?? p.createdAt ?? '',
      imageUrl: p.images?.[0]?.url ?? '',
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      status: p.status ?? 'Draft',
    }))
  ), [products]);

  return (
    <div className='section-container products-section'>

      <div className="section-header">

        <div className='section-name'>
          <ScrollText />
          <span>Məhsullar</span>
        </div>

        <SectionSearchBar />

        <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
          <Grip />

          {
            open && (<LayoutDropdown layout={layout} setLayout={setLayout} />)
          }
        </div>

        <AddButton content="Məhsul əlavə et" route='add_product' />

      </div>

      <div className="product-counts">

        <div>
          <span>Bütün məhsullar</span>
          <span>({products?.length})</span>
        </div>

        <div>
          <span>Yayımlananlar</span>
          <span>(2387)</span>
        </div>

        <div>
          <span>Endirimdə</span>
          <span>(339487)</span>
        </div>

      </div>

      <div className="section-content">
        {/* {
          layout === 'card' && (
            <div>
              card
            </div>
          )
          ||
          layout === 'table' && (
            <div>
              <Table data={[]} />
            </div>
          )
        } */}

        <div className="table-container">
          <Table columns={productColumns} data={rows} />
        </div>


      </div>

    </div>
  )
}

export default Products