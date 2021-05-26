import axios from 'axios';
import { apiGlobalConstants } from '@/app/global/config';
import { guildMock } from '@/app/shared/utils/mocks/guild.mock';
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

const fetchCharacterStats = (realm, name) => {
  return axios.get(`${apiGlobalConstants.profile}/wow/character/${realm}/${name}/statistics`);
}

const fetchGuild = () => {
  const data = guildMock;
  return data;
}
export {
  fetchCharacter,
  renderCharacter,
  fetchCharacterEquipment,
  fetchCharacterSpecialization,
  fetchCharacterStats,
  fetchGuild
}