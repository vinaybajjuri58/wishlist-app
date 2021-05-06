import { Carousel } from "react-responsive-carousel";
import { imagesArray } from "./images";
export const CarousalComponent = () => {
  return (
    <Carousel
      showThumbs={false}
      showStatus={false}
      autoPlay={true}
      infiniteLoop={true}
    >
      {imagesArray.map((item, index) => (
        <div key={index}>
          <img alt="caurosal" style={{ height: "500px" }} src={item} />
        </div>
      ))}
    </Carousel>
  );
};
