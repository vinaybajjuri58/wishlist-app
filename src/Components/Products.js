import { useReducer } from "react";
import { useWish } from "../Context";

export const Products = () => {
  const { products } = useWish();

  const dispatchFunc = (state, action) => {
    switch (action.type) {
      case "SORTBY":
        return { ...state, sortBy: action.payload };

      default:
        return state;
    }
  };

  const [{ sortBy }, dispatch] = useReducer(dispatchFunc, {
    sortBy: null,
  });

  const sortData = (data, sortBy) => {
    if (sortBy && sortBy === "SORT_LOW_TO_HIGH") {
      return data.sort((a, b) => {
        return a.price - b.price;
      });
    }
    if (sortBy && sortBy === "SORT_HIGH_TO_LOW") {
      return data.sort((a, b) => {
        return b.price - a.price;
      });
    }
    return data;
  };

  const sortedData = sortData(products, sortBy);

  return (
    <div>
      <div>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORTBY", payload: "SORT_LOW_TO_HIGH" })
            }
            checked={sortBy && sortBy === "SORT_LOW_TO_HIGH"}
          />
          LOW TO HIGH
        </label>
        <label>
          <input
            type="radio"
            name="sort"
            onChange={() =>
              dispatch({ type: "SORTBY", payload: "SORT_HIGH_TO_LOW" })
            }
            checked={sortBy && sortBy === "SORT_HIGH_TO_LOW"}
          />
          HIGH TO LOW
        </label>
      </div>
      <ul className="products-list">
        {sortedData.map((item) => (
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
