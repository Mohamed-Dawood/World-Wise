import {
  Children,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { BASE_URL } from '../utils/BASE_URL.js';
import showToast from '../utils/ShowToast.js';

const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();

        if (!data.success) {
          showToast('error', data.msg || 'Authentication failed');
          return;
        }

        setCities(data.data.cities);
      } catch (error) {
        showToast('error', error.message);
        console.error('There was an error loading data...', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, []);

  async function gitCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      if (!data.success) {
        showToast('error', data.msg || 'Failed to load city');
        return;
      }

      setCurrentCity(data.data);
    } catch (error) {
      showToast('error', 'There was an error loading city...');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newCity),
      });
      const data = await res.json();

      if (!data.success) {
        showToast('error', data.msg || 'Failed to create city');
        return;
      }

      setCities((cities) => [...cities, data.data.city]);
      showToast('success', 'City Added Successfully...');
    } catch (error) {
      showToast('error', 'There was an error in creating city...');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (!data.success) {
        showToast('error', data.msg || 'Failed to delete city');
        return;
      }

      showToast('success', 'City deleted successfully.');
      setCities((cities) => cities.filter((city) => city._id !== id));
    } catch (error) {
      showToast('error', 'There was an error in deleting city.');
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        gitCity,
        currentCity,
        createCity,
        deleteCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);

  if (context === undefined)
    throw new Error('You cannot useCities outside CitiesProvider');

  return context;
}

export { CitiesProvider, useCities };
