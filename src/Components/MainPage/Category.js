import { Link } from "react-router-dom";
import { useData } from "../../Context";
export const Categories = () => {
  const { state } = useData();
  return (
    <div className="catgory">
      <ul className="category-container">
        {state.categories.map((item, index) => (
          <div key={index} className="category-box">
            <Link to={`/category/${item._id}`}>
              <h4 class="card-title">{item.name}</h4>
            </Link>
            <p className="card-text">{item.description}</p>
          </div>
        ))}
        <div className="category-box">
          <Link to={`/products`}>
            <h4 class="card-title">All Books</h4>
          </Link>
          <p className="card-text">Collection of all the books in the store</p>
        </div>
      </ul>
    </div>
  );
};
