import { useWish } from "../Context";

export const Products = () => {
  const { products } = useWish();
  return (
    <div className="products-list">
      {products.map((item) => (
        <Product key={item.id} product={item} />
      ))}
    </div>
  );
};

const Product = ({ product }) => {
  const { addToWish, setToast, setToastMessage } = useWish();
  return (
    <div className="product">
      <div className="card">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-title">{product.brandName}</h4>
        <p className="card-text">{product.description}</p>
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
