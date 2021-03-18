import { useWish } from "../Context";
import { useEffect } from "react";

export const WishList = () => {
  const { wishProducts } = useWish();
  useEffect(() => {
    document.title = "Wish List";
  }, []);
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
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Count:{product.count}</p>
        <p className="card-desc">Rs {product.price}</p>
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
