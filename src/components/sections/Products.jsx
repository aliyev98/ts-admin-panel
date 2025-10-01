import React, { useEffect, useMemo, useState } from 'react'
import { Grip, ShoppingBasket } from 'lucide-react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown';
import AddButton from '../../ui/buttons/AddButton';
import Table from '../tables/Table';
import { productColumns } from '../../statics/columns/ProductsColumns'
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../redux/features/productSlice';

const BASE = import.meta.env.VITE_BASE_URL || 'https://teymurstore.az';
const STORAGE_PREFIX = import.meta.env.VITE_STORAGE_PREFIX || '/storage/';

const Products = () => {


  const dispatch = useDispatch();

  const { products, loading, error } = useSelector(state => state.product);
  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("card");

  function buildImageUrl(path) {
    if (!path) return "";
    if (/^https?:\/\//i.test(path)) return path;
    return new URL(STORAGE_PREFIX + path, BASE).toString();
  }

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]); // eslint için

  const rows = useMemo(() => (
    (products ?? []).map((p, i) => ({
      id: p.id ?? i,
      image: p.images?.[0]?.image_path
        ? buildImageUrl(p.images[0].image_path)
        : (p.images?.[0]?.url || ""),
      title: p.title ?? '',
      brand: p.brand?.name ?? '',
      category: Array.isArray(p.categories)
        ? p.categories.map(c => c.name).join(', ')
        : (p.category?.name ?? ''),
      gender: p.gender === "Male" ? "Kişi" : p.gender === "Female" ? "Qadın" : "Ümumi",
      colors: Array.isArray(p.colors) ? p.colors.map(c => c.hex) : [],
      sizes: Array.isArray(p.sizes) ? p.sizes.map(s => s.name) : [],
      discount: p.discount ?? 0,
      rating: p.rating ?? 0,
      date: p.updatedAt ?? p.created_at ?? '',
      price: p.price ?? 0,
      stock: p.stock ?? 0,
      views: p.views ?? 0,
      sale_count: p.sale_count ?? 0,
      status: p.status ?? 'Draft',
    }))
  ), [products]);

  return (
    <div className='section-container products-section'>
      <div className="section-header">

        <div className='section-name'>
          <ShoppingBasket />
          <span>Məhsullar</span>
        </div>

        <SectionSearchBar />

        <div className="change-layout" onClick={() => setOpen(prev => !prev)}>
          <Grip />
          {open && (<LayoutDropdown layout={layout} setLayout={setLayout} />)}
        </div>

        <AddButton content="Məhsul əlavə et" route='add_product' />
      </div>

      <div className="counts">
        <div>
          <span>Bütün məhsullar</span>
          <span>({products?.length ?? 0})</span>
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
        <div className="table-container">
          <Table columns={productColumns} data={rows} loading={loading} />
        </div>
      </div>
    </div>
  )
}

export default Products
