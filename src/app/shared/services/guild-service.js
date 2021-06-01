import axios from 'axios';
import { apiGlobalConstants } from "@/app/global/config";

const fetchAllGuilds = () => {
  return axios.get(`${apiGlobalConstants.utils}/hermandad/index`);
}

export {
  fetchAllGuilds,
}