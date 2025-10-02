import { Eye } from 'lucide-react'
import React from 'react'

const ProductCard = ({ data }) => {

    console.log(data)
    return (

        data.map((product) => (
            <div key={product.id} className='product-card'>

                <div className="product-img">

                    <img src={product.images[0].image_path} alt="" />

                    <div className="rating-box">
                        <img src="images/star-icon-white.svg" alt="" />
                        <span>{product.rating}228</span>
                    </div>

                    <div className="views-box">
                        <Eye />
                        <span>{product.views}</span>
                    </div>

                </div>

                <div className="product-infos">
                    <span className="product-price">{product.price}$</span>

                    <span className="product-name">{product.title}</span>



                    <p className="product-description">{product.description}</p>

                </div>

                <div className="card-footer">
                    <div className="product-sizes">
                        {
                            product.sizes.map((s) => (
                                <div>
                                    <span>{s.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    <div className="product-colors">
                        {product.colors.map((c) => (
                            <div
                                key={c.id || c.hex}
                                style={{ backgroundColor: c.hex }}
                                className="color-swatch"
                                title={c.name}
                            />
                        ))}

                    </div>
                </div>

            </div>
        ))

    )
}

export default ProductCard