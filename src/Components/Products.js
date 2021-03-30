import { useEffect, useReducer } from "react";
import { useData } from "../Context";
import { Actions } from "../Context";
import axios from "axios";
// import { useAxios } from "./useAxios";

export const Products = () => {
  const { state, dispatch } = useData();
  useEffect(() => {
    document.title = "Products";
  }, []);
  useEffect(() => {
    (async () => {
      try {
        const { data: products } = await axios.get("/api/products");
        dispatch({
          type: Actions.SET_PRODUCTS_DATA,
          payload: products.products,
        });
      } catch (err) {
        console.log(err);
      }
    })();
  }, [dispatch]);

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

  const [
    { sortBy, fastDelivery, inStock, searchText },
    filterDispatch,
  ] = useReducer(dispatchFunc, {
    sortBy: null,
    fastDelivery: false,
    inStock: false,
    searchText: "",
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

  const sortedData = sortData(state.products, sortBy);
  const filteredData = filterData(sortedData, fastDelivery, inStock);
  const searchedData = searchData(filteredData, searchText);

  const changeHandler = (event) => {
    filterDispatch({ type: "SEARCH_TEXT", payload: event.target.value });
  };

  return (
    <div>
      {state.products.length > 0 ? (
        <div>
          <div>
            <span className="text">Sort using price</span>
            <label>
              <input
                type="radio"
                name="sort"
                onChange={() =>
                  filterDispatch({
                    type: "SORTBY",
                    payload: "SORT_LOW_TO_HIGH",
                  })
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
                  filterDispatch({
                    type: "SORTBY",
                    payload: "SORT_HIGH_TO_LOW",
                  })
                }
                checked={sortBy && sortBy === "SORT_HIGH_TO_LOW"}
              />
              HIGH TO LOW
            </label>
          </div>
          <div>
            <span className="text">Filters : </span>
            <label>
              <input
                type="checkbox"
                name="Filter Delivery"
                onChange={() =>
                  filterDispatch({ type: "FILTER_SPEED_DEIVERY" })
                }
                checked={fastDelivery}
              />
              Fast Delivery
            </label>
            <label>
              <input
                type="checkbox"
                name="Filter inStock"
                onChange={() => filterDispatch({ type: "FILTER_IN_STOCK" })}
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
            {searchedData.length > 0 ? (
              searchedData.map((item) => (
                <Product key={item.id} product={item} />
              ))
            ) : (
              <h2 className="text text-large">
                No products available with "{searchText}" brandname
              </h2>
            )}
          </ul>
        </div>
      ) : (
        <h2>Loading Products</h2>
      )}
    </div>
  );
};

const Product = ({ product }) => {
  const { dispatch, setToast, setToastMessage, state } = useData();
  const inCartProducts = (id) => {
    return state.cartProducts.findIndex((item) => item.id === id) === -1
      ? false
      : true;
  };
  const inWishProducts = (id) => {
    return state.wishProducts.findIndex((item) => item.id === id) === -1
      ? false
      : true;
  };

  return (
    <div className="product">
      <div className="card card-shopping">
        <img src={product.url} alt="" className="card-img" />
        <h4 className="card-brand">{product.brandName}</h4>
        <p className="card-desc">{product.description}</p>
        <p className="card-desc">Rs {product.price}</p>

        {inWishProducts(product.id) ? (
          <span
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} removed from  wishlist`);
              dispatch({
                type: Actions.REMOVE_FROM_WISHLIST,
                payload: product.id,
              });
            }}
            className="wish-button"
            role="button"
          >
            <i class="fas fa-heart"></i>
          </span>
        ) : (
          <span
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to wishlist`);
              dispatch({ type: Actions.ADD_TO_WISHLIST, payload: product.id });
            }}
            className="wish-button"
            role="button"
          >
            <i class="far fa-heart"></i>
          </span>
        )}

        {inCartProducts(product.id) ? (
          <button
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              dispatch({ type: Actions.REMOVE_FROM_CART, payload: product.id });
            }}
            className="button button-primary"
          >
            REMOVE FROM CART
          </button>
        ) : (
          <button
            onClick={() => {
              setToast("true");
              setToastMessage(`${product.brandName} is added to Cart`);
              dispatch({ type: Actions.ADD_TO_CART, payload: product.id });
            }}
            className="button button-primary"
          >
            ADD TO CART
          </button>
        )}
      </div>
    </div>
  );
};
