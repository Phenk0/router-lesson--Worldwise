import { useEffect, useState } from 'react';

import styles from './Form.module.css';
import Button from './Button.jsx';
import BackButton from './BackButton.jsx';
import { useUrlPosition } from '../hooks/useUrlPosition.js';
import Spinner from './Spinner.jsx';
import Message from './Message.jsx';
import { useCities } from '../hooks/useCities.js';
import { useNavigate } from 'react-router-dom';

function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

const BASE_URL = 'https://api.bigdatacloud.net/data/reverse-geocode-client';

function Form() {
  const [lat, lng] = useUrlPosition();
  const { createCity, isLoading } = useCities();
  const navigate = useNavigate();

  const [cityName, setCityName] = useState('');
  const [country, setCountry] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [notes, setNotes] = useState('');
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  const [emoji, setEmoji] = useState('');
  const [geoCodingError, setGeoCodingError] = useState('');

  useEffect(() => {
    if (!lat && !lng) return;
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        setGeoCodingError('');
        const response = await fetch(
          `${BASE_URL}?latitude=${lat}&longitude=${lng}`
        );
        const data = await response.json();

        if (!data.countryCode)
          throw new Error(
            "That doesn't seem to be a city. Click somewhere else"
          );

        setCityName(data.city || data.locality);
        setCountry(data.countryName);
        setEmoji(convertToEmoji(data.countryCode));
      } catch (error) {
        console.log(error.message);
        setGeoCodingError(error.message);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    fetchCityData();
  }, [lat, lng]);

  if (geoCodingError) return <Message message={geoCodingError} />;

  if (isLoadingGeocoding) return <Spinner />;

  if (!lat && !lng) return <Message message="Start by clicking on the map" />;

  async function handleSubmit(event) {
    event.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes,
      position: { lat, lng }
    };
    await createCity(newCity);
    navigate('/app/cities');
  }

  return (
    <form
      className={`${styles.form} ${isLoading ? styles.loading : ''}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          type="date"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary">Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
