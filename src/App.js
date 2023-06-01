import { useState } from "react";
import { useAddProductMutation, useGetGoodsQuery } from "./redux";

const App = () => {
  const [count, setCount] = useState('')
  const [newProduct, setNewProduct] = useState('')
  const {data = [], iseLoading} = useGetGoodsQuery(count)
  const [addProduct, {isError}] = useAddProductMutation();

  const handleAddProduct = async ()=> {
    if (newProduct) {
      await addProduct({name: newProduct}).unwrap()
      setNewProduct('')
    }
  }

  if (iseLoading) return <h2>Loading...</h2>

  return (
    <div>
      <div>
        <input type="text" value={newProduct} onChange={(e) => setNewProduct(e.target.value)}/>
        <button onClick={() => handleAddProduct()}>addProduct </button>
      </div> 
      <div>
        <select value={count} onChange={(e) => setCount(e.target.value)}>
          <option value="''">all</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
        </select>
      </div>
      <ul>
        {data.map(item => (
          <li key={item.id}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App