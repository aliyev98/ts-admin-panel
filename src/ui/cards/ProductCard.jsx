import { ArrowUpRight, Eye } from 'lucide-react'
import React from 'react'

const ProductCard = ({ data }) => {

    console.log(data)
    return (

        data.map((product) => (
            <div key={product.id} className='product-card'>

                <div className="product-img">

                    <img src={product.images[0]?.image_path} alt="" />

                    <div className="rating-box">
                        <img src="images/star-icon-white.svg" alt="" />
                        <span>{product.rating}228</span>
                    </div>

                    <div className="views-box">
                        <Eye />
                        <span>{product.views}</span>
                    </div>

                    {/* <div className="category-box">
                        {product.category?.name}
                    </div> */}

                </div>

                <div className="product-infos">

                    <div className="product-price">

                        <span className={`price ${product.discount > 0 ? 'line-through' : ''}`}>{product.price} ₼</span>

                        {
                            product.discount > 0 && (
                                <span className="discount">{product.discount} ₼</span>
                            )
                        }

                        <button className="see-more">
                            <span>Daha çox</span>
                            <ArrowUpRight className='arrow-icon' />

                        </button>

                    </div>

                    <span className="product-name">{product.title}</span>

                    <p className="product-description">{product.description}</p>

                </div>

                <div className="card-footer">
                    <div className="product-sizes">
                        {
                            product.sizes.map((s) => (
                                <div key={s.id}>
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