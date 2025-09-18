import { ChevronRight, Plus, ScrollText, ShoppingBasket, TextAlignJustify, UserRound } from 'lucide-react'
import React, { useState } from 'react'
import Logo from '../ui/logos/Logo'
import { useDispatch, useSelector } from 'react-redux'
import { setSidebarSelection } from '../redux/sidebarSlice'

const Sidebar = () => {

  const dispatch = useDispatch()

  const selectedSection = useSelector((state) => state.sidebar.sidebarSelection)

  console.log(selectedSection)

  const [isActive, setIsActive] = useState('');
  const [isCollapsed, setIsCollapsed] = useState(false)

  const sections = [
    { id: 1, content: 'Products', map: 'products', img: <ShoppingBasket /> },
    { id: 2, content: 'Add product', map: 'add_product', img: <Plus /> },
    { id: 3, content: 'Customers', map: 'customers', img: <UserRound /> },
    { id: 4, content: 'Orders', map: 'orders', img: <ScrollText /> },
    { id: 5, content: 'Analyses', map: 'analyses', img: <ScrollText /> },
  ]

  return (
    <div className={`sidebar-container ${isCollapsed === true ? 'collapsed' : ''}`}>

      <div className="sidebar-header">

        <Logo />

        <TextAlignJustify className='sidebar-collapse-icon' onClick={() => setIsCollapsed((prev) => !prev)} />

      </div>

      <div className="sidebar-body">

        {
          sections.map((section) => (
            <button key={section.id} className={section.id === isActive ? 'active' : ''}
              onClick={() => {
                setIsActive(section.id)
                dispatch(setSidebarSelection(section.map))
              }}
            >

              {
                !isCollapsed ? (
                  <span>{section.content}</span>
                )
                  :

                  // (section.img)
                  (
                    <div className='section-icons'>
                      {section.img}
                    </div>
                  )
              }

              <div className='arrow-icon'>
                <ChevronRight />
              </div>


            </button>
          ))
        }

      </div>

    </div>
  )
}

export default Sidebar