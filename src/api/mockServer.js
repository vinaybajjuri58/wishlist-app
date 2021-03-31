import { createServer, Model, RestSerializer } from "miragejs";
import { products } from "../Context";
export default function mockServer() {
  const wishListProducts = [];
  const cartProducts = [];
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      product: Model,
      wishList: Model,
      cartList: Model,
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("products");
      this.resource("wishList");
      this.resource("cartList");
      this.get("/products", () => {
        return {
          products,
        };
      });
      this.get("/wishList", () => {
        return {
          wishListProducts,
        };
      });
      this.post("/wishList", (request) => {
        console.log(request);
      });
      this.get("/cartList", () => {
        return {
          cartProducts,
        };
      });
    },
  });
}
