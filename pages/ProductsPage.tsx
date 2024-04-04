import { useState, useEffect, FormEvent } from "react";

// Define the types for your product state
type Product = {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  category?: string; // If you use categories, make sure to provide a correct type
  images: string[];
};

function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
  });

  // Fetch products when the component mounts
  useEffect(() => {
    async function getProducts() {
      const response = await fetch("/api/products");
      const data = await response.json();
      if (response.ok) {
        setProducts(data.data);
      } else {
        console.error(data.error);
        // Handle error here, e.g., show an error message
      }
    }

    getProducts();
  }, []);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewProduct({ ...newProduct, [e.target.name]: e.target.value });
  };

  // Handle form submission for a new product
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const response = await fetch("/api/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    });

    const data = await response.json();
    if (response.ok) {
      setProducts([...products, data.data]);
      // Reset the form
      setNewProduct({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
      });
    } else {
      console.error(data.error);
      // Handle error here, e.g., show an error message
    }
  };

  return (
    <div>
      <h1>Products</h1>

      {/* Display a list of products */}
      <ul>
        {products.map((product) => (
          <li key={product._id}>
            {product.name} - ${product.price} - ${product.description}
          </li>
        ))}
      </ul>

      {/* Form for adding a new product */}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          value={newProduct.name}
          onChange={handleChange}
          placeholder="Product Name"
          required
        />
        <input
          type="text"
          name="description"
          value={newProduct.description}
          onChange={handleChange}
          placeholder="Product Description"
          required
        />
        <input
          type="number"
          name="price"
          value={newProduct.price}
          onChange={handleChange}
          placeholder="Product Price"
          required
        />
        <input
          type="number"
          name="stock"
          value={newProduct.stock}
          onChange={handleChange}
          placeholder="Stock Quantity"
          required
        />
        {/* Uncomment and use this if you have categories set up */}
        {/* <input
          type="text"
          name="category"
          value={newProduct.category}
          onChange={handleChange}
          placeholder="Category ID"
        /> */}
        <button type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default ProductsPage;
