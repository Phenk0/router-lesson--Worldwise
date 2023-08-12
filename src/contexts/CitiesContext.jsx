// noinspection ExceptionCaughtLocallyJS

import { createContext, useCallback, useEffect, useReducer } from 'react';

const BASE_URL = 'http://localhost:8000/';

const CitiesContext = createContext({});

const initialState = {
  cities: [],
  isLoading: false,
  currentCity: {},
  error: ''
};

function reducer(state, action) {
  const { type, payload } = action;
  switch (type) {
    case 'loading':
      return { ...state, isLoading: true };
    case 'cities/loaded':
      return {
        ...state,
        isLoading: false,
        cities: payload
      };
    case 'city/loaded':
      return { ...state, isLoading: false, currentCity: payload };
    case 'city/created':
      return { ...state, isLoading: false, cities: [...state.cities, payload] };
    case 'city/deleted':
      return {
        ...state,
        isLoading: false,
        cities: state.cities.filter((city) => city.id !== payload),
        currentCity: {}
      };
    case 'rejected':
      return {
        ...state,
        isLoading: false,
        error: payload
      };
    default:
      throw new Error('Unknown action type');
  }
}

function CitiesProvider({ children }) {
  const [{ cities, isLoading, currentCity, error }, dispatch] = useReducer(
    reducer,
    initialState,
    undefined
  );

  useEffect(() => {
    const fetchCities = async () => {
      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}cities`);
        if (!response.ok)
          throw new Error('Some unknown error in fetching cities');
        const data = await response.json();
        dispatch({ type: 'cities/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    };
    fetchCities();
  }, []);

  const getCity = useCallback(
    async (id) => {
      if (Number(id) === currentCity.id) return;

      dispatch({ type: 'loading' });
      try {
        const response = await fetch(`${BASE_URL}cities/${id}`);
        if (!response.ok) throw new Error('There was an error loading data...');
        const data = await response.json();
        dispatch({ type: 'city/loaded', payload: data });
      } catch (error) {
        dispatch({ type: 'rejected', payload: error.message });
      }
    },
    [currentCity.id]
  );
  async function createCity(newCity) {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(`${BASE_URL}cities`, {
        method: 'POST',
        body: JSON.stringify(newCity),
        headers: { 'Content-Type': 'application/json' }
      });
      if (!response.ok) throw new Error('There was an error adding city');
      const data = await response.json();
      dispatch({ type: 'city/created', payload: data });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  async function removeCity(id) {
    dispatch({ type: 'loading' });
    try {
      const response = await fetch(`${BASE_URL}cities/${id}`, {
        method: 'DELETE'
      });
      if (!response.ok) throw new Error('There was an error deleting city.');
      dispatch({ type: 'city/deleted', payload: id });
    } catch (error) {
      dispatch({ type: 'rejected', payload: error.message });
    }
  }

  const cityContextSelectors = {
    cities,
    isLoading,
    error,
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

export { CitiesProvider, CitiesContext };
