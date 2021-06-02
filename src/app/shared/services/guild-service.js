import axios from 'axios';
import { apiGlobalConstants } from "@/app/global/config";

const fetchAllGuilds = () => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad/index`);
}

const fetchOneGuild = (name) => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad`, {
    params: {
      name: name
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
}
const fetchGuildCharacters = (id) => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad/personajes`, {
    params: {
      id: id
    },
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
}
const addGuild = (name, faction) => {
  return axios.post(`${apiGlobalConstants.utils}/hermandad/nuevo`, {name: name, faction: faction}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    }
  });
}

const addCharacterGuild = (name, character_id) => {
  return axios.post(`${apiGlobalConstants.utils}/hermandad/personaje/nuevo`, {name: name, character_id: character_id}, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    }
  });
}

const updateRecluitment = (guildId, open) => {
  return axios.put(`${apiGlobalConstants.utils}/hermandad/reclutaciones`, {guildId, open},{
    // params: {
    //   guildId: guildId,
    //   open: open
    // },
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem('token'),
    }
  })
}
export {
  updateRecluitment,
  fetchAllGuilds,
  addCharacterGuild,
  fetchGuildCharacters,
  fetchOneGuild,
  addGuild,
}