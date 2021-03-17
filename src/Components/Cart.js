import { useWish } from "../Context";
export const Cart = () => {
  const { cartProducts } = useWish();
  return (
    <div className="products-list">
      {cartProducts.length > 0 ? (
        cartProducts.map((item) => <Product key={item.id} product={item} />)
      ) : (
        <h2>No items in Cart</h2>
      )}
    </div>
  );
};

const Product = ({ product }) => {
  const { removeFromCart, setToast, setToastMessage } = useWish();
  return (
    <div className="wish-product">
      <div className="card">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-title">{product.brandName}</h4>
        <p className="card-text">{product.description}</p>
        <p className="card-text">{product.count}</p>
        <button
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} removed from Cart`);
            removeFromCart(product.id);
          }}
          className="remove-button"
        >
          X
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <button onClick={() => increaseItem(product.id)}>+</button>
          <button onClick={() => removeOneItem(product.id)}>-</button> */}
        </div>
      </div>
    </div>
  );
};
