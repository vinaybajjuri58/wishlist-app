import { createServer, Model, RestSerializer } from "miragejs";
import { products } from "../Context";
export default function mockServer() {
  createServer({
    serializers: {
      application: RestSerializer,
    },

    models: {
      product: Model,
      wish: Model,
      cart: Model,
    },
    seeds(server) {
      products.forEach((item) => {
        server.create("product", item);
      });
      [].forEach((item) => {
        server.create("wish", item);
      });
      [].forEach((item) => {
        server.create("cart", item);
      });
    },

    routes() {
      this.namespace = "api";
      this.timing = 1000;
      this.resource("products");
      this.resource("wishes");
      this.resource("carts");
    },
  });
}
