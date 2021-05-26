import axios from 'axios';
import { apiGlobalConstants } from '@/app/global/config';

const fetchCharacter = (realm, name) => {
 return axios.get(`${apiGlobalConstants.profile}/wow/character/${realm}/${name}`)
}

const renderCharacter = (realm, name) => {
  return axios.get(`${apiGlobalConstants.profile}/wow/character/${realm}/${name}/character-media`)
}

const fetchCharacterEquipment = (realm, name) => {
  return axios.get(`${apiGlobalConstants.profile}/wow/character/${realm}/${name}/equipment`)
}

const fetchCharacterSpecialization = (realm, name) => {
  return axios.get(`${apiGlobalConstants.profile}/wow/character/${realm}/${name}/specializations`)
}
export {
  fetchCharacter,
  renderCharacter,
  fetchCharacterEquipment,
  fetchCharacterSpecialization
}