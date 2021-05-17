import { reducerFunction } from "./ReducerFunction";
import * as ActionTypes from "./ActionTypes";
import { initialState } from "./DataProvider";
const testProduct = {
  _id: 1,
  name: "Testing",
};
const initialStateWithProducts = {
  ...initialState,
  products: [testProduct],
};
describe("Testing Wishlist functionalities", () => {
  it("Testing Add to wishlist", () => {
    const action = {
      type: ActionTypes.ADD_TO_WISHLIST,
      payload: testProduct._id,
    };
    const state = reducerFunction(initialStateWithProducts, action);
    expect(state).toEqual({
      ...initialStateWithProducts,
      wishProducts: [testProduct],
    });
  });
  it("Testing remove from wishlist", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_WISHLIST,
      payload: testProduct._id,
    };
    const state = reducerFunction(
      { ...initialStateWithProducts, wishProducts: [testProduct] },
      action
    );
    expect(state).toEqual(initialStateWithProducts);
  });
});
describe("Testing cart functionalities", () => {
  it("Testing add to cart", () => {
    const action = {
      type: ActionTypes.ADD_TO_CART,
      payload: testProduct._id,
    };
    const state = reducerFunction(initialStateWithProducts, action);
    expect(state).toEqual({
      ...initialStateWithProducts,
      cartProducts: [{ ...testProduct, quantity: 1 }],
    });
  });
  it("Testing remove from cart", () => {
    const action = {
      type: ActionTypes.REMOVE_FROM_CART,
      payload: testProduct._id,
    };
    const state = reducerFunction(
      { ...initialStateWithProducts, cartProducts: [testProduct] },
      action
    );
    expect(state).toEqual(initialStateWithProducts);
  });
  it("Testing Increase item in cart", () => {
    const action = {
      type: ActionTypes.INCREASE_ITEM_IN_CART,
      payload: testProduct._id,
    };
    const state = reducerFunction(
      {
        ...initialStateWithProducts,
        cartProducts: [{ ...testProduct, quantity: 2 }],
      },
      action
    );
    expect(state).toEqual({
      ...initialStateWithProducts,
      cartProducts: [{ ...testProduct, quantity: 3 }],
    });
  });
  it("Testing decrease item in cart with quantity > 1", () => {
    const action = {
      type: ActionTypes.DECREASE_ITEM_IN_CART,
      payload: testProduct._id,
    };
    const state = reducerFunction(
      {
        ...initialStateWithProducts,
        cartProducts: [{ ...testProduct, quantity: 2 }],
      },
      action
    );
    expect(state).toEqual({
      ...initialStateWithProducts,
      cartProducts: [{ ...testProduct, quantity: 1 }],
    });
  });
  it("Testing decrease item in cart with quantity ==1", () => {
    const action = {
      type: ActionTypes.DECREASE_ITEM_IN_CART,
      payload: testProduct._id,
    };
    const state = reducerFunction(
      {
        ...initialStateWithProducts,
        cartProducts: [{ ...testProduct, quantity: 1 }],
      },
      action
    );
    expect(state).toEqual({
      ...initialStateWithProducts,
      cartProducts: [],
    });
  });
});

describe("Testing move to cart products", () => {
  it("Testing move to cart functionality", () => {
    const action = {
      type: ActionTypes.MOVE_TO_CART_FROM_WISHLIST,
      payload: { id: testProduct._id, count: 1 },
    };
    const state = reducerFunction(
      { ...initialStateWithProducts, wishProducts: [testProduct] },
      action
    );
    expect(state).toEqual({
      ...initialStateWithProducts,
      cartProducts: [{ ...testProduct, quantity: 1 }],
    });
  });
});
