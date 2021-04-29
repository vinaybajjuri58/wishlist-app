export const sortData = (data, sortBy) => {
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

export const filterData = (data, fastDelivery, inStock) => {
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

export const searchData = (data, searchText) => {
  if (searchText.length > 0) {
    return data.filter((product) =>
      product.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
  return data;
};
