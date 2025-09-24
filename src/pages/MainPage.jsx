import React from 'react'
import Header from '../layouts/Header'
import Sidebar from '../sidebars/Sidebar'
import { useSelector } from 'react-redux'
import Products from '../components/sections/Products'
import AddProduct from '../components/sections/AddProduct'
import Test from '../Test'
import Brands from '../components/sections/Brands'

const MainPage = () => {

  const selectedSection = useSelector((state) => state.sidebar.sidebarSelection)

  return (
    <div className='mainpage-container'>

      <div className="centered-div">

        <Sidebar />

        <div className="content-wrapper">
          <Header />

          <div className="content">

            {selectedSection === "products" && <Products />}

            {selectedSection === "add_product" && <AddProduct />}

            {selectedSection === "brands" && <Brands />}

            {selectedSection === "customers" && <Test />}

          </div>


        </div>

      </div>


      {/* <div className="content-wrapper">
        <Header />




      </div> */}



    </div>
  )
}

export default MainPage