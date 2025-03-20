import { useState, useEffect } from "react";
// import reactLogo from "./assets/react.svg";
// import viteLogo from "/vite.svg";
import ProductList from "./ProductList";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetch("http://localhost:8080/api/product")
      .then((response) => response.json())
      .then((data) => setProducts(data));

    fetch("http://localhost:8080/api/product")
      .then((response) => response.json())
      .then((data) => setCategories(data));
  }, []);
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSortChange = (event) => {
    setSortOrder(event.target.value);
  };
  return (
    <div className="container">
      <h1 className="my-4">Product Catalog</h1>
      <div className="row align-items-center mb-4">
        <div className="col-md-3 col-sm-12 mb-12">
          {/* //display cateogry filter */}
          <p>Category filter</p>
        </div>
        <div className="col-md-5 col-sm-12 mb-2">
          <input
            type="text"
            className="form-control"
            placeholder="search for products"
            onChange={handleSearchChange}
          ></input>
        </div>
        <div className="col-md-4 col-sm-12 mb-2">
          <select className="form-control" onChange={handleSortChange}>
            <option value="desc">Sort by price : High c to Low</option>
            <option value="asc">Sort by price: Low to high</option>
          </select>
        </div>
      </div>
      {products.length ? (
        <ProductList products={products} />
      ) : (
        <p>Products are not there</p>
      )}
    </div>
  );
}

export default App;
