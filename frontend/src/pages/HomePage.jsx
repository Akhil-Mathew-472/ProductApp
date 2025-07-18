import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ProductCard } from "../components/ProductCard";
import { useProductStore } from "../store/product";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);
  return (
    <div className="container">
      <h3 className="mt-3 text-center fw-bold">Current Products</h3>
      <div className="container mt-4  ml-10 ">
        <div className="row">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div className="col-md-4 mb-4" key={index}>
                <ProductCard product={product}  />
                {/* Pass necessary props to ProductCard if needed */}
              </div>
            ))
          ) : (
            <div className="d-flex flex-column align-items-center justify-content-center m-4 text-center">
              <h3 className="mb-3">No Products Found</h3>
              <Link to="/create" style={{ fontSize: "1.2rem" }}>
                Create a Product
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
