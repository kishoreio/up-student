import { PRIMARY_SERVER, GET_ALL_DATA } from '../constants/serverUrls';

const fetchData = () => {
  return new Promise((resolve, reject) => {
    const URL = PRIMARY_SERVER + GET_ALL_DATA;
    fetch(URL)
      .then((data) => {
        return data.json();
      })
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default fetchData;
