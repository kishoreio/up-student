import axios from 'axios';
import { PRIMARY_SERVER, GET_USER, SAVE_DATA } from '../constants/serverUrls';

const postData = (type, data) => {
  const api = type === 'users' ? GET_USER : SAVE_DATA;
  const URL = PRIMARY_SERVER + api;
  return new Promise((resolve, reject) => {
    axios
      .post(URL, data)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export default postData;
