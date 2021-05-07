import { useEffect, useReducer } from "react";
import { useData } from "../../Context";
import { ProductItem } from "./ProductItem.jsx";
import { dispatchFunc } from "./filterReducer";
import { sortData, filterData, searchData } from "./util";
import { useParams } from "react-router-dom";

export const Products = ({ allproducts }) => {
  const { state } = useData();
  useEffect(() => {
    document.title = "Products";
  }, []);
  const { categoryId } = useParams();
  const products =
    allproducts === false
      ? state.products.filter((product) => product.category === categoryId)
      : state.products;

  const [
    { sortBy, fastDelivery, inStock, searchText },
    filterDispatch,
  ] = useReducer(dispatchFunc, {
    sortBy: null,
    fastDelivery: false,
    inStock: false,
    searchText: "",
  });

  const sortedData = sortData(products, sortBy);
  const filteredData = filterData(sortedData, fastDelivery, inStock);
  const searchedData = searchData(filteredData, searchText);

  const changeHandler = (event) => {
    filterDispatch({ type: "SEARCH_TEXT", payload: event.target.value });
  };

  return (
    <div>
      {products.length > 0 ? (
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
                <ProductItem key={item._id} product={item} />
              ))
            ) : (
              <h2 className="text text-large">No products available</h2>
            )}
          </ul>
        </div>
      ) : (
        <h2>Loading Products</h2>
      )}
    </div>
  );
};
