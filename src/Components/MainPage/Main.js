import { CarousalComponent } from "./Carousal";
import { Categories } from "./Category";
import "react-responsive-carousel/lib/styles/carousel.min.css";
export const Main = () => {
  return (
    <div className="main">
      <CarousalComponent />
      <h2>Categories</h2>
      <Categories />
    </div>
  );
};
