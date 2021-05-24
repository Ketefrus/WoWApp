import axios from 'axios';
import { apiGlobalConstants } from '@/app/global/config';

const fetchOneItem = (itemID) => {
  return axios.get(`${apiGlobalConstants.data}/wow/media/item/${itemID}`)
}

export {
  fetchOneItem
}