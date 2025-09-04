import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Landing from './Pages/Dashboard';
import PrivateRoute from './Components/PrivateRoute';
import Product from './Pages/Product';
import AddProduct from './Pages/AddProduct';
import EditProduct from './Pages/EditProduct';
import ProfilePage from './Pages/ProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/landing"
          element={
            <PrivateRoute>
              <Landing />
            </PrivateRoute>
          }
        />
        <Route
          path="/products"
          element={
            <PrivateRoute>
              <Product />
            </PrivateRoute>
          }
        />
        <Route
          path="/product/addproduct"
          element={
            <PrivateRoute>
              <AddProduct />
            </PrivateRoute>
          }
        />
        <Route path="/product/edit-product" element={<PrivateRoute>
          <EditProduct />
        </PrivateRoute>} />
        <Route
          path="/profile"
          element={
            <PrivateRoute>
              <ProfilePage />
            </PrivateRoute>
          } />
      </Routes>
    </Router>
  );
}

export default App;
