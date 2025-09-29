import { ShoppingBasket, Table, UserRound } from 'lucide-react'
import React from 'react'
import SectionSearchBar from '../../ui/inputs/SectionSearchBar'
import AddButton from '../../ui/buttons/AddButton'

const Customers = () => {
    return (
        <div className='section-container users-section'>

            <div className="section-header">

                <div className='section-name'>
                    <UserRound />
                    <span>Müştərilər</span>
                </div>

                <SectionSearchBar />

                {/* <div className="change-layout" onClick={() => setOpen((prev) => !prev)}>
                    <Grip />

                    {
                        open && (<LayoutDropdown layout={layout} setLayout={setLayout} />)
                    }
                </div> */}

                <AddButton content="Məhsul əlavə et" route='add_product' />

            </div>

            <div className="counts">

                <div>
                    <span>Bütün məhsullar</span>
                    <span>(6262)</span>
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
                    <Table columns={[]} data={[]} />
                </div>


            </div>

        </div>
    )
}

export default Customers