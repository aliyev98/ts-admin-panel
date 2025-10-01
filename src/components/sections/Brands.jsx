import React, { useEffect, useMemo, useState } from 'react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import { Grip } from 'lucide-react'
import LayoutDropdown from '../dropdowns/LayoutDropdown'
import AddButton from '../../ui/buttons/AddButton'
import { brandsColumns } from '../../statics/columns/BrandsColumns'
import Table from '../tables/Table'
import { useDispatch, useSelector } from 'react-redux'
import { getBrands } from '../../redux/features/brandsSlice'

const Brands = () => {

    const { brands, loading, error } = useSelector(state => state.brands);
    const [open, setOpen] = useState(false);
    const [layout, setLayout] = useState("card")
    const dispatch = useDispatch()

    function buildImageUrl(path) {
        if (!path) return null;
        if (/^https?:\/\//i.test(path)) return path;
        const BASE = "https://8000.jobing.az";
        const STORAGE_PREFIX = "/storage/";
        return new URL(STORAGE_PREFIX + path, BASE).toString();
    }

    useEffect(() => {
        dispatch(getBrands());
    }, [dispatch]); // eslint için

    const rows = useMemo(() => (
        brands.map((b, i) => ({
            id: b.id ?? i,
            image: b.image ? buildImageUrl(b.image) : 'brand',
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

                <AddButton content="Brend əlavə et" route='add_brand' />

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