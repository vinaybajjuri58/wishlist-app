import { createServer, Model, RestSerializer } from "miragejs";
import { products } from "../Context";
export default function mockServer() {
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
    },
  });
}
