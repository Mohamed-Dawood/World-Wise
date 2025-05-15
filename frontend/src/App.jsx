import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import CityList from './components/CityList/CityList.jsx';
import City from './components/City/City.jsx';
import Form from './components/Form/Form.jsx';
import CountryList from './components/CountryList/CountryList.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { ToastContainer } from 'react-toastify';
import { AuthProvider } from './contexts/AuthContext.jsx';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import { lazy, Suspense } from 'react';
import SpinnerFullPage from './components/SpinnerFullPage/SpinnerFullPage.jsx';

// import Homepage from './pages/Homepage/Homepage.jsx';
// import AppLayout from './pages/AppLayout/AppLayout.jsx';
// import Product from './pages/Product/Product.jsx';
// import Pricing from './pages/Pricing/Pricing.jsx';
// import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
// import Login from './pages/Login/Login.jsx';
// import Register from './pages/Register/Register.jsx';

const Homepage = lazy(() => import('./pages/Homepage/Homepage.jsx'));
const AppLayout = lazy(() => import('./pages/AppLayout/AppLayout.jsx'));
const Product = lazy(() => import('./pages/Product/Product.jsx'));
const Pricing = lazy(() => import('./pages/Pricing/Pricing.jsx'));
const Login = lazy(() => import('./pages/Login/Login.jsx'));
const Register = lazy(() => import('./pages/Register/Register.jsx'));
const PageNotFound = lazy(() =>
  import('./pages/PageNotFound/PageNotFound.jsx')
);
function App() {
  return (
    <>
      <AuthProvider>
        <CitiesProvider>
          <BrowserRouter>
            <Suspense fallback={<SpinnerFullPage />}>
              <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="app"
                  element={
                    <ProtectedRoute>
                      <AppLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Navigate replace to="cities" />} />
                  <Route path="cities" element={<CityList />} />
                  <Route path="cities/:id" element={<City />} />
                  <Route path="countries" element={<CountryList />} />
                  <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
              </Routes>
              <ToastContainer />
            </Suspense>
          </BrowserRouter>
        </CitiesProvider>
      </AuthProvider>
    </>
  );
}

export default App;
