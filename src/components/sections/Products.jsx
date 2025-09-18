import React, { useEffect, useState } from 'react'
import { Grip, ScrollText } from 'lucide-react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown';
import AddButton from '../../ui/buttons/AddButton';
import axios from 'axios';
import Table from '../tables/Table';
import { productColumns } from '../../statics/columns/ProductsColumns'

const Products = () => {

  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("card")
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://8000.jobing.az/api/product")
      .then(res => { setProducts(res.data.data || []); })
      .catch(console.error);
  }, []);

  const productDatas = [
    {
      no: 1,

      title: products[0].title,

      brand: "Nike",

      category: products?.forEach(e => {
        e.category?.name
      }),

      rating: "5",

      date: "22/06/2025"
    },

  ]

  // console.log(products[0].title);

  console.log(products.title);
  
  





  return (
    <div className='section-container products-section'>

      <div className="section-header">

        <div className='section-name'>
          <ScrollText />
          <span>Products</span>
        </div>

        <SectionSearchBar />

        <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
          <Grip />


          {
            open && (<LayoutDropdown layout={layout} setLayout={setLayout} />)
          }
        </div>

        <AddButton content="Add Product" route='addProduct' />

      </div>

      <div className="product-counts">

        <div>
          <span>All</span>
          <span>({products?.length})</span>
        </div>

        <div>
          <span>Published</span>
          <span>(2387)</span>
        </div>

        <div>
          <span>Drafts</span>
          <span>(85)</span>
        </div>

        <div>
          <span>On Discount</span>
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

        <Table columns={productColumns} data={productDatas} />
      </div>

    </div>
  )
}

export default Products