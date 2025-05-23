import { useParams } from 'react-router-dom';
import { formatDate } from '../../utils/FormatDate';

import styles from './City.module.css';
import { BASE_URL } from '../../utils/BASE_URL';
import { useCities } from '../../contexts/CitiesContext';
import { useEffect } from 'react';
import Spinner from '../Spinner/Spinner';
import BackButton from '../BackButton/BackButton';
import { flagEmojiToPNG } from '../../utils/FlagEmoji';

function City() {
  const { id } = useParams();
  const { gitCity, currentCity, isLoading } = useCities();

  useEffect(
    function () {
      gitCity(id);
    },
    [id]
  );

  const { cityName, emoji, date, notes } = currentCity;

  if (isLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{flagEmojiToPNG(emoji || '')}</span> {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
