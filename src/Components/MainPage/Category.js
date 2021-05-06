import { Link } from "react-router-dom";
import { useData } from "../../Context";
export const Categories = () => {
  const { state } = useData();
  return (
    <div>
      {state.categories.map((item, index) => (
        <Link to={`/category/${item._id}`} key={index}>
          {item.name}
        </Link>
      ))}
    </div>
  );
};
