import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { CartProvider } from './context/CartContext';
import MainSection from './components/MainSection';
import Products from './components/Products';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import { Routes, Route, useLocation } from 'react-router-dom'; // Importar useLocation
import './App.css';

function App() {
  const location = useLocation(); // Usar useLocation para obtener la ruta actual

  // Definir datos de productos
  const hideHeaderRoutes = ['/register', '/login']; // Rutas donde no quieres mostrar el header
 
  return (
    <CartProvider>
    <div className="App bg-custom-gradient">
      {/* Mostrar el header solo si la ruta actual no está en hideHeaderRoutes */}
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <MainSection />
              <Products />
            </>
          )}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta de registro */}
        <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de inicio de sesión */}
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/productos/:id/relacionados" element={<ProductDetailPage />} />

      </Routes>
      <Footer />
    </div>
    </CartProvider>
  );
}

export default App;
