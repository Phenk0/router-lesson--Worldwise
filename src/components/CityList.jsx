import { useCities } from '../hooks/useCities.js';

import CityItem from './CityItem.jsx';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';

import styles from './CityList.module.css';

function CityList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem key={city.id} city={city} />
      ))}
    </ul>
  );
}

export default CityList;
