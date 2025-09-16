import React, { useState } from 'react'
import { Grip, ScrollText } from 'lucide-react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown';
import AddButton from '../../ui/buttons/AddButton';

const Products = () => {

  const [open, setOpen] = useState(false);
  const [layout, setLayout] = useState("card")

  return (
    <div className='section-container'>

      <div className="section-header">

        <div className='section-name'>
          <ScrollText />
          <span>Products</span>
        </div>

        <SectionSearchBar />

        <button className="change-layout" onClick={() => setOpen((prev) => !prev)}>
          <Grip />


          {
            open && (<LayoutDropdown layout={layout} setLayout={setLayout} />)
          }
        </button>

        <AddButton content="Add Product" route='addProduct' />

      </div>

      <div className="section-content">
        {
          layout === 'card' && (
            <div>
              card
            </div>
          )
          ||
          layout === 'table' && (
            <div>
              table
            </div>
          )
        }
      </div>

    </div>
  )
}

export default Products