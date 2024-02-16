import "./index.css"

const ProductItem=props=>{
    const {productDetails} = props
    const {id,category,image,description,price,rating,title}=productDetails
    const sellingPrice = Math.ceil(price/2)
    
    return (
        <li className="product-item">
            <img src={image} alt={title} className="product-image"/>
            <div className="product-details-container">
                <p className="title">{title}</p>
                <div className="cost-add-cart-container">
                    <div className="cost-details">
                    <p className="selling-price">{`₹${sellingPrice}`}</p>
                    <p className="actual-price">{price}</p>
                    <p className="discount">(50% discount)</p>
                    </div>
                    <img src="https://ik.imagekit.io/Satish108/shopping-bag.png?updatedAt=1708083414840" alt="add-to cart" className="cart-icon"/>
                </div>
            </div>
        </li>
    )
}

export default ProductItem