import axios from 'axios';
import { apiGlobalConstants } from '@/app/global/config';

const fetchOneSpell = (spellID) => {
  return axios.get(`${apiGlobalConstants.data}/wow/media/spell/${spellID}`)
}

export {
  fetchOneSpell
}