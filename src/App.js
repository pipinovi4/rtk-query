import { useState } from "react";
import {
  useDeleteProductMutation,
  useAddProductMutation,
  useGetGoodsQuery,
} from "./redux/goodApi";

const App = () => {
  const [count, setCount] = useState("");
  const [newProduct, setNewProduct] = useState("");
  const { data = [], iseLoading } = useGetGoodsQuery(count);
  const [addProduct] = useAddProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const handleAddProduct = async () => {
    if (newProduct) {
      await addProduct({ name: newProduct }).unwrap();
      setNewProduct("");
    }
  };
  const hadleDeleteProduct = async (id) => {
    await deleteProduct(id).unwrap();
  };

  if (iseLoading) return <h2>Loading...</h2>;

  return (
    <div>
      <div>
        <input
          type="text"
          value={newProduct}
          onChange={(e) => setNewProduct(e.target.value)}
        />
        <button onClick={() => handleAddProduct()}>addProduct </button>
      </div>
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map((item) => (
          <li
            key={item.id}
            style={{ cursor: "pointer" }}
            onClick={() => hadleDeleteProduct(item.id)}
          >
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
