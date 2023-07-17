import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Product from './components/Product';
import ProductAdd from './components/ProductAdd';
import ProductUpdate from './components/ProductUpdate';
import Login from './components/Login';


function App() {

  return (
    <div >
      <Navbar />
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='product' element={<Product/>}></Route>
          <Route path='create' element={<ProductAdd/>}></Route>
          <Route path='update' element={<ProductUpdate/>}></Route>
          <Route path='login' element={<Login/>}></Route>
        </Routes>
    </div>
  );
}

export default App;
