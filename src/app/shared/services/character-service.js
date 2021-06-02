import axios from "axios";
import { apiGlobalConstants } from "@/app/global/config";
import { guildMock } from "@/app/shared/utils/mocks/guild.mock";
const fetchCharacter = (realm, name) => {
  return axios.get(
    `${apiGlobalConstants.profile}/wow/character/${realm}/${name}`
  );
};

const renderCharacter = (realm, name) => {
  return axios.get(
    `${apiGlobalConstants.profile}/wow/character/${realm}/${name}/character-media`
  );
};

const fetchCharacterEquipment = (realm, name) => {
  return axios.get(
    `${apiGlobalConstants.profile}/wow/character/${realm}/${name}/equipment`
  );
};

const fetchCharacterSpecialization = (realm, name) => {
  return axios.get(
    `${apiGlobalConstants.profile}/wow/character/${realm}/${name}/specializations`
  );
};

const fetchCharacterStats = (realm, name) => {
  return axios.get(
    `${apiGlobalConstants.profile}/wow/character/${realm}/${name}/statistics`
  );
};

const fetchGuild = () => {
  const data = guildMock;
  return data;
};

const fetchMyCharacters = () => {
  return axios.get(`${apiGlobalConstants.utils}/usuario/personaje/index`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};

const addCharacter = (character, faction) => {
  return axios.post(
    `${apiGlobalConstants.utils}/personaje/nuevo`,
    { realm: character.realm, name: character.name, faction: faction },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Requested-With": "XMLHttpRequest"
      }
    }
  );
};

const deleteCharacter = characterId => {
  return axios.delete(`${apiGlobalConstants.utils}/usuario/personaje/delete`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest",
      "Content-Type": "application/json"
    },
    data: {
      id: characterId
    }
  });
};
export {
  addCharacter,
  deleteCharacter,
  fetchMyCharacters,
  fetchCharacter,
  renderCharacter,
  fetchCharacterEquipment,
  fetchCharacterSpecialization,
  fetchCharacterStats,
  fetchGuild
};
