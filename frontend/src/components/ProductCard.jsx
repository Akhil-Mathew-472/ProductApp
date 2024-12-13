import React, { useState } from "react";
import { useProductStore } from "../store/product";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit} from "react-icons/fa";
import {MdDelete} from "react-icons/md";

export const ProductCard = ({ product }) => {
  const [updatedProduct, setUpdatedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });
  const [modalOpen, setModalOpen] = useState(false); // For controlling modal visibility

  const { deleteProduct, updateProduct } = useProductStore();

  const handleDelete = async (pid) => {
    const { success, message } = await deleteProduct(pid);
    if (success) {
      toast.success("Product Deleted");
    } else {
      toast.error("Error in deleting");
    }
  };

  const handleUpdate = async (pid, updatedProduct) => {
    const { success, message } = await updateProduct(pid, updatedProduct);
    console.log(success);
    if (success) {
      toast.success("Product Updated");
      setModalOpen(false); // Close the modal after update
    } else {
      toast.error("Error updating product");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  return (
    
    <div className="col-md-4 mb-4 " style={{ width: "340px" }}>
      <div className="card p-3" style={{height:"330px"}}>
      <div className="d-flex justify-content-center" style={{ height: "150px",width:"180px" }}>
      <img
        src={product.image}
        alt={product.name}
        className="card-img-top"
        
      />
    </div>
        <div className="card-body">
          
          <h5 className="card-title fs-4 mb-1"  style={{ marginBottom: "-10px" }}>{product.name}</h5>
          <p className="fw-bold fs-5">₹{product.price}</p>
          {/* Button to open the modal */}
          
          <div className="d-flex">
          <button
            type="button"
            className="btn btn-primary me-2 "
            style={{
                
                  alignItems: "center",
                
      
            }}
            onClick={() => setModalOpen(true)}
          >
            <FaEdit  size={20} style={{margin:"2px",marginLeft:"3px"}} />
          </button>

          {/* Modal */}
          {modalOpen && (
            <div
              className={`modal fade ${modalOpen ? "show" : ""}`}
              id="exampleModal"
              role="dialog"
              aria-labelledby="exampleModalLabel"
              aria-hidden={!modalOpen}
              style={{ display: modalOpen ? "block" : "none" }} // Manually control display
            >
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLabel">
                      Edit Product
                    </h5>
                  </div>
                  <div className="modal-body">
                    {/* Product Update Form */}
                    <form>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="productName"
                          name="name"
                          value={updatedProduct.name}
                          onChange={handleChange}
                          placeholder="Product Name"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="number"
                          className="form-control"
                          id="productPrice"
                          name="price"
                          value={updatedProduct.price}
                          onChange={handleChange}
                          placeholder="Price"
                        />
                      </div>
                      <div className="form-group mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="productImage"
                          name="image"
                          value={updatedProduct.image}
                          onChange={handleChange}
                          placeholder="Image"
                        />
                      </div>
                    </form>
                  </div>
                  <div className="modal-footer">
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setModalOpen(false)}
                    >
                      Close
                    </button>
                    <button
                      type="button"
                      className="btn btn-primary"
                      onClick={() => handleUpdate(product._id, updatedProduct)}
                    >
                      Save changes
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Delete Button */}
          
          <button
            type="button"
            className="btn btn-danger"
            style={{
                
                  alignItems: "center",
      
            }}
            onClick={() => handleDelete(product._id)}
          >
            <MdDelete size={22} style={{margin:"2px",marginLeft:"3px"}} />
          </button>
          </div>
        </div>
      </div>

      {/* Toast Notifications */}
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
  );
};
