import { createContext, useContext, useEffect, useState } from 'react';

const BASE_URL = 'http://localhost:8000/';

const CitiesContext = createContext({});

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    const fetchCities = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok)
          throw new Error('Some unknown error in fetching cities');
        const data = await response.json();
        setCities(data);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    };
    fetchCities();
  }, []);

  async function getCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities/${id}`);
      if (!response.ok) throw new Error('There was an error loading data...');
      const data = await response.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }
  async function createCity(newCity) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('There was an error adding city');
      const data = await response.json();
      console.log(data);
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function removeCity(id) {
    try {
      setIsLoading(true);
      const response = await fetch(`${BASE_URL}cities/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('There was an error deleting city.');
      setCities((cities) => cities.filter((city) => city.id !== id));
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  }

  const cityContextSelectors = {
    cities,
    isLoading,
    currentCity,
    getCity,
    createCity,
    removeCity
  };
  return (
    <CitiesContext.Provider value={cityContextSelectors}>
      {children}
    </CitiesContext.Provider>
  );
}

function useCities() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error('CitiesContext was used outside the CitiesProvider');
  return context;
}

export { CitiesProvider, useCities };
