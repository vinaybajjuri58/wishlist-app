import { useReducer } from "react";
import { useWish } from "../Context";

export const Products = () => {
  const { products } = useWish();

  const dispatchFunc = (state, action) => {
    switch (action.type) {
      case "SORTBY":
        return { ...state, sortBy: action.payload };
      case "FILTER_SPEED_DEIVERY":
        return { ...state, fastDelivery: !state.fastDelivery };
      case "FILTER_IN_STOCK":
        return { ...state, inStock: !state.inStock };
      case "SEARCH_TEXT":
        return { ...state, searchText: action.payload };
      default:
        return state;
    }
  };

  const [{ sortBy, fastDelivery, inStock, searchText }, dispatch] = useReducer(
    dispatchFunc,
    {
      sortBy: null,
      fastDelivery: false,
      inStock: false,
      searchText: "",
    }
  );

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
  const filterData = (data, fastDelivery) => {
    let filteredData = [...data];
    if (fastDelivery) {
      filteredData = filteredData.filter(
        (product) => product.speedDelivery === fastDelivery
      );
    }
    if (inStock) {
      filteredData = filteredData.filter(
        (product) => product.inStock === inStock
      );
    }
    return filteredData;
  };
  const searchData = (data, searchText) => {
    if (searchText.length > 0) {
      return data.filter((product) =>
        product.brandName.toLowerCase().includes(searchText.toLowerCase())
      );
    }
    return data;
  };

  const sortedData = sortData(products, sortBy);
  const filteredData = filterData(sortedData, fastDelivery, inStock);
  const searchedData = searchData(filteredData, searchText);

  const changeHandler = (event) => {
    dispatch({ type: "SEARCH_TEXT", payload: event.target.value });
  };

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
      <div>
        <label>
          <input
            type="checkbox"
            name="Filter Delivery"
            onChange={() => dispatch({ type: "FILTER_SPEED_DEIVERY" })}
            checked={fastDelivery}
          />
          Fast Delivery
        </label>
        <label>
          <input
            type="checkbox"
            name="Filter inStock"
            onChange={() => dispatch({ type: "FILTER_IN_STOCK" })}
            checked={inStock}
          />
          In Stock
        </label>
      </div>
      <div>
        <label>
          Search :
          <input
            className="input-styled"
            type="text"
            placeholder="search products with brandname"
            value={searchText}
            onChange={changeHandler}
          />
        </label>
      </div>
      <ul className="products-list">
        {searchedData.map((item) => (
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
