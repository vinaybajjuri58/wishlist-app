import { useEffect, useReducer, useState } from "react";
import { useData } from "../../Context";
import { Actions } from "../../Context";
import axios from "axios";
import { ProductItem } from "./ProductItem.jsx";

export const Products = () => {
  const { state, dispatch } = useData();
  const [loadError, setLoadError] = useState(false);
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
        setLoadError(true);
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
      {loadError && <h2>Error in loading Data</h2>}
      {state.products.length > 0 ? (
        <div>
          <div>
            <span className="text">Sort using price :</span>
            <div>
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
                <ProductItem key={item.id} product={item} />
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
