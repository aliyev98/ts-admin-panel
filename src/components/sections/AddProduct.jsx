import { Grip, ScrollText } from 'lucide-react'
import React from 'react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import LayoutDropdown from '../dropdowns/LayoutDropdown'
import AddButton from '../../ui/buttons/AddButton'
import PrimaryButton from '../../ui/buttons/PrimaryButton'

const AddProduct = () => {
  return (
    <div className='section-container add-product-section'>

      <div className="section-header">

        <div className='section-name'>

          <ScrollText />
          <span>Məhsul əlavə et</span>

        </div>

        {/* <SectionSearchBar /> */}

        {/* <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
          <Grip />
        </div> */}

        <PrimaryButton content="Bütün məhsullar" route="products" />


      </div>

      <div className="product-counts">

        <div>
          <span>Bütün məhsullar</span>
          <span>(24356)</span>
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


        <form className="add-product-form">

          

        </form>


      </div>

    </div>
  )
}

export default AddProduct