import React from 'react';
import Footer from './components/Footer';
import Header from './components/Header';
import { UserProvider } from './context/UserContext';
import { CartProvider } from './context/CartContext';

import MainSection from './components/MainSection';
import GeneroSection from './components/GeneroSection';
import DashboardPage from './pages/DashboardPage';
import CartPage from './pages/CartPage';
import ProductDetailPage from './pages/ProductDetailPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import TodoProductosPage from './pages/TodoProductosPage';
import CheckoutPage from './pages/CheckoutPage'; // Página de checkout
import { Routes, Route, useLocation } from 'react-router-dom'; // Importar useLocation
import './App.css';

function App() {
  const location = useLocation(); // Usar useLocation para obtener la ruta actual

  // Definir datos de productos
  const hideHeaderRoutes = ['/register', '/login', '/checkout', '/dashboard']; // Rutas donde no quieres mostrar el header
  const hideFooterRoutes = ['/register', '/login', '/checkout', '/dashboard'];
  return (
    
    
    <div className="App  bg-custom-gradient">
      {/* Mostrar el header solo si la ruta actual no está en hideHeaderRoutes */}

      <UserProvider>
        <CartProvider>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      
      <Routes>
        <Route
          path="/"
          element={(
            <>
              <MainSection />
              <GeneroSection />
            </>
          )}
        />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/register" element={<RegisterPage />} /> {/* Ruta de registro */}
        <Route path="/login" element={<LoginPage />} /> {/* Ruta para la página de inicio de sesión */}
        <Route path="/productos/:id" element={<ProductDetailPage />} />
        <Route path="/productos/:id/relacionados" element={<ProductDetailPage />} />
        <Route path="/checkout" element={<CheckoutPage />} /> {/* Ruta de checkout */}
        <Route path="/allproducts" element={<TodoProductosPage />} />
        <Route path="/dashboard" element={<DashboardPage />} /> 
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) && <Footer />}
       </CartProvider>
      </UserProvider>
    </div>
   
    
  );
}

export default App;
