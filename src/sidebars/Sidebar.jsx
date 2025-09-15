import { ChevronRight, TextAlignJustify } from 'lucide-react'
import React from 'react'
import Logo from '../ui/logos/Logo'

const Sidebar = () => {
  return (
    <div className='sidebar-container'>

      <div className="sidebar-header">

        <Logo />

        <TextAlignJustify className='sidebar-collapse-icon' />

      </div>

      <div className="sidebar-body">

        <button className='active'>


          <span>Charts</span>

          <ChevronRight />


        </button>

      </div>

    </div>
  )
}

export default Sidebar