import CityItem from '../CityItem/CityItem';
import Message from '../Message/Message';
import Spinner from '../Spinner/Spinner';
import styles from './CityList.module.css';
import { useCities } from '../../contexts/CitiesContext.jsx';
function CityList() {
  const { cities, isLoading } = useCities();

  if (isLoading) return <Spinner />;

  if (!cities.length)
    return (
      <Message message="Add  your first city by clicking on a city on the map" />
    );

  return (
    <ul className={styles.cityList}>
      {cities.map((city) => (
        <CityItem city={city} key={city._id} />
      ))}
    </ul>
  );
}

export default CityList;
