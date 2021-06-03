import axios from "axios";
import { apiGlobalConstants } from "@/app/global/config";

const fetchAllGuilds = () => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad/index`);
};

const fetchOneGuild = name => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad`, {
    params: {
      name: name
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};
const fetchGuildCharacters = id => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad/personajes`, {
    params: {
      id: id
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};
const addGuild = (name, faction) => {
  return axios.post(
    `${apiGlobalConstants.utils}/hermandad/nuevo`,
    { name: name, faction: faction },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
};

const addCharacterGuild = (name, character_id) => {
  return axios.post(
    `${apiGlobalConstants.utils}/hermandad/personajes/nuevo`,
    { name: name, character_id: character_id },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
};

const updateRecluitment = (guildId, open) => {
  return axios.put(
    `${apiGlobalConstants.utils}/hermandad/reclutaciones`,
    { guildId, open },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token")
      }
    }
  );
};

const deleteCharacterGuild = name => {
  return axios.delete(
    `${apiGlobalConstants.utils}/hermandad/personajes/delete`,
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      },
      data: {
        name: name
      }
    }
  );
};

const postMessage = (name, message) => {
  return axios.post(
    `${apiGlobalConstants.utils}/hermandad/mensajes`,
    {
      data: {
        name: name,
        user: localStorage.getItem("user_name"),
        message: message
      }
    },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Requested-With": "XMLHttpRequest",
        "Content-Type": "application/json"
      }
    }
  );
};
export {
  postMessage,
  deleteCharacterGuild,
  updateRecluitment,
  fetchAllGuilds,
  addCharacterGuild,
  fetchGuildCharacters,
  fetchOneGuild,
  addGuild
};
