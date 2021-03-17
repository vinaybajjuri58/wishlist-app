import { useWish } from "../Context";

export const WishList = () => {
  const { wishProducts } = useWish();
  return (
    <div className="products-list">
      {wishProducts.length > 0 ? (
        wishProducts.map((item) => <Product key={item.id} product={item} />)
      ) : (
        <h2>No items in WishList</h2>
      )}
    </div>
  );
};

const Product = ({ product }) => {
  const {
    removeFromWish,
    increaseItem,
    removeOneItem,
    moveToCart,
    setToast,
    setToastMessage,
  } = useWish();
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
            setToastMessage(`${product.brandName} removed from wish list`);
            removeFromWish(product.id);
          }}
          className="remove-button"
        >
          X
        </button>
        <button
          onClick={() => {
            setToast("true");
            setToastMessage(`${product.brandName} is added to Cart`);
            moveToCart(product.id, product.count);
          }}
        >
          Move To Cart
        </button>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <button onClick={() => increaseItem(product.id)}>+</button>
          <button onClick={() => removeOneItem(product.id)}>-</button>
        </div>
      </div>
    </div>
  );
};
