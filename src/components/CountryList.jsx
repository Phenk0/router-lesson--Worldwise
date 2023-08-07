import { useCities } from '../hooks/useCities.js';

import Message from './Message.jsx';
import CountryItem from './CountryItem.jsx';
import Spinner from './Spinner.jsx';

import styles from './CountryList.module.css';

function CountryList() {
  const { isLoading, cities } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first country by clicking on a country on the map" />
    );

  const countries = cities.reduce((acc, city) => {
    if (!acc.find((el) => el.country === city.country))
      return [
        ...acc,
        { country: city.country, emoji: city.emoji, id: city.id }
      ];
    else return acc;
  }, []);
  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem key={country.id} country={country} />
      ))}
    </ul>
  );
}

export default CountryList;
