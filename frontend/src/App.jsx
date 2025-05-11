import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage/Homepage.jsx';
import AppLayout from './pages/AppLayout/AppLayout.jsx';
import Product from './pages/Product/Product.jsx';
import Pricing from './pages/Pricing/Pricing.jsx';
import PageNotFound from './pages/PageNotFound/PageNotFound.jsx';
import Login from './pages/Login/Login.jsx';
import CityList from './components/CityList/CityList.jsx';
import City from './components/City/City.jsx';
import Form from './components/Form/Form.jsx';
import CountryList from './components/CountryList/CountryList.jsx';
import { CitiesProvider } from './contexts/CitiesContext.jsx';
import { ToastContainer } from 'react-toastify';
function App() {
  // const [cities, setCities] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);

  // const BASE_URL = 'http://127.0.0.1:8000/api/v1';

  // useEffect(function () {
  //   async function fetchData() {
  //     try {
  //       setIsLoading(true);
  //       const res = await fetch(`${BASE_URL}/cities`);
  //       const data = await res.json();
  //       setCities(data.data.cities);
  //       // console.log(data.data.cities);
  //     } catch (error) {
  //       alert('There was an error loading data..', error);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }

  //   fetchData();
  // }, []);

  return (
    <>
      <CitiesProvider>
        <BrowserRouter>
          <Routes>
            <Route index element={<Homepage />} />
            <Route path="product" element={<Product />} />
            <Route path="pricing" element={<Pricing />} />
            <Route path="/login" element={<Login />} />
            <Route path="app" element={<AppLayout />}>
              <Route index element={<Navigate replace to="cities" />} />
              <Route path="cities" element={<CityList />} />
              <Route path="cities/:id" element={<City />} />
              <Route path="countries" element={<CountryList />} />
              <Route path="form" element={<Form />} />
            </Route>
            <Route path="*" element={<PageNotFound />} />
          </Routes>
          <ToastContainer />
        </BrowserRouter>
      </CitiesProvider>
    </>
  );
}

export default App;
