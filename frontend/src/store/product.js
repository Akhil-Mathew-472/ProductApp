import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "Please fill in all fields." };
    }

    
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();

      if (!res.ok) {
        return { success: false, message: data.message || "Error creating product" };
      }

      set((state) => ({ products: [...state.products, data.data] }));
      return { success: true, message: "Product created successfully." };
    
  },
  fetchProducts : async () =>{
    const res  = await fetch("/api/products");
    const data = await res.json()
    set({products:data.data})
  },
  deleteProduct: async (pid)=>{
   
    const res = await fetch(`/api/products/${pid}`,{
      method:"DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      
    })
  
    const data = await res.json()
    if(!data.success) return {success:false,message:data.message}

    set(state => ({
      products: state.products.filter(product => product._id !== pid),
    }));
    
    return {success:true,message:data.message}
  },
   updateProduct: async (pid, updatedProduct) => {
    try {
      const response = await fetch(`/api/products/${pid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedProduct),
      });
      if (!response.ok) throw new Error("Failed to update product");
      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Update Error:", error);
      return { success: false, message: error.message || "Error updating product" };
    }
  }
}));
