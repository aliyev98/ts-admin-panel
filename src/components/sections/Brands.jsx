import React, { useEffect, useMemo, useState } from 'react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import { Grip } from 'lucide-react'
import LayoutDropdown from '../dropdowns/LayoutDropdown'
import AddButton from '../../ui/buttons/AddButton'
import { brandsColumns } from '../../statics/columns/BrandsColumns'
import Table from '../tables/Table'
import axios from 'axios'

const Brands = () => {

    const [open, setOpen] = useState(false);
    const [layout, setLayout] = useState("card")
    const [brands, setBrands] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const BASE = "https://8000.jobing.az";
    const STORAGE_PREFIX = "/storage/";

    function buildImageUrl(path) {
        if (!path) return null;
        if (/^https?:\/\//i.test(path)) return path;
        const BASE = "https://8000.jobing.az";
        const STORAGE_PREFIX = "/storage/";
        return new URL(STORAGE_PREFIX + path, BASE).toString();
    }

    useEffect(() => {
        const controller = new AbortController();
        axios.get("https://8000.jobing.az/api/brand", { signal: controller.signal })
            .then(res => setBrands(res.data?.data ?? []))
            .catch(err => { if (err.name !== 'CanceledError') setError(err); })
            .finally(() => setLoading(false));
        return () => controller.abort();
    }, []);

    const rows = useMemo(() => (
        brands.map((b, i) => ({
            id: b.id ?? i,
            image: b.image? buildImageUrl(b.image) : 'brand',   // null olabiliyor
            name: b.name ?? '',
            order: b.sort_order ?? 0,
        }))
    ), [brands]);


    return (
        <div className='section-container brands-section'>

            <div className="section-header">

                <div className='section-name'>
                    <span>Brendlər</span>
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
                    <span></span>
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
                    <Table columns={brandsColumns} data={rows} />
                </div>


            </div>

        </div>
    )
}

export default Brands