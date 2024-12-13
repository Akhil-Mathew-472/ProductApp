import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductStore } from "../store/product";

const CreatePage = ({isDarkMode,setIsDarkMode}) => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });

  const { createProduct } = useProductStore();
  const handleAddProduct = async (e) => {
    e.preventDefault();
    console.log("hello")
    const { success, message } = await createProduct(newProduct);
    console.log("Message:", message);
    console.log("Success:", success);
    
    setTimeout(() => {
      // Show success toast
      toast.success("Product created successfully!");
    }, 500);
  };

  return (
    <div
      className="container d-flex justify-content-center align-items-center"
      style={{ marginTop: "76px" }}
    >
      <div
        className={`card shadow-lg p-4 ${
          isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`}
        style={{ width: "100%", maxWidth: "800px" }}
      >
        <h1 className="text-center mb-4 text-primary">Create New Product</h1>
        <form className={`bg-light p-4 rounded ${
          isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
        }`} >
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Product Name"
              name="name"
              value={newProduct.name}
              onChange={(e) =>
                setNewProduct({ ...newProduct, name: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Price"
              name="price"
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Image URL"
              name="image"
              value={newProduct.image0}
              onChange={(e) =>
                setNewProduct({ ...newProduct, image: e.target.value })
              }
            />
          </div>
          <div className="form-group mb-3">
            <button
              type="submit"
              onClick={handleAddProduct}
              className="btn btn-primary w-100 py-2 fw-bold"
            >
              Add Product
            </button>
          </div>
        </form>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
      </div>
    </div>
  );
};

export default CreatePage;
