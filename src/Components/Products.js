import { useWish } from "../Context";

export const Products = () => {
  const { products } = useWish();
  return (
    <div>
      <ul className="products-list">
        {products.map((item) => (
          <Product key={item.id} product={item} />
        ))}
      </ul>
    </div>
  );
};

const Product = ({ product }) => {
  const { addToWish, setToast, setToastMessage } = useWish();
  return (
    <div className="product">
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Rs {product.price}</p>
        <button
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} is added to wishlist`);
            addToWish(product.id);
          }}
          className="wish-button"
        >
          WISHLIST
        </button>
      </div>
    </div>
  );
};
