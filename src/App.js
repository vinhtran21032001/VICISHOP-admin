import './App.css';
import Navbar from './components/navbar/Navbar';
import Sidebar from './components/sidebar/Sidebar';
import Home from './pages/home/Home';
import {Route, Routes, BrowserRouter} from 'react-router-dom'
import UserList from './pages/userlist/UserList';
import User from './pages/user/User';
import NewUser from './pages/newuser/NewUser';
import Product from './pages/product/Product';
import Newproduct from './pages/newproduct/Newproduct';
import Products from './pages/products/Products';



function App() {
  return (
    <BrowserRouter>
      <div className="App">
      <Navbar/>      
              <div className="body_container">
              <Sidebar/>

              <div className="main-content">
                <Routes>
                    <Route exact path="/" element={<Home/>} />
                    <Route path="/users" element={<UserList/>} />
                    <Route path="/user/:userId" element={<User/>} />
                    <Route path="/newuser" element={<NewUser/>} />
                    <Route path="/product/:productId" element={<Product/>} />
                    <Route path="/products" element={<Products/>} />
                    <Route path="/newproduct" element={<Newproduct/>} />
                </Routes>
              </div>
              </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
