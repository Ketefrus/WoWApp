import axios from "axios";
import { apiGlobalConstants } from "@/app/global/config";
const login = (user, password) => {
  return axios.post(
    `${apiGlobalConstants.auth}/login`,
    { login: user, password: password },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
  );
};

const getLoggedUser = () => {
  return axios.get(`${apiGlobalConstants.auth}/checkLogged`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });
};

const refresh = () => {
  return axios.get(`${apiGlobalConstants.auth}/refresh`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};
const register = (user, password) => {
  return axios.post(
    `${apiGlobalConstants.auth}/register`,
    { username: user, password: password },
    {
      headers: {
        "Content-Type": "application/json",
        "X-Requested-With": "XMLHttpRequest"
      }
    }
  );
};

const changePassword = (password) => {
  return axios.put(
    `${apiGlobalConstants.auth}/password`,
    { password: password },
    {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
        "X-Requested-With": "XMLHttpRequest"
      }
    }
  )
}
const logout = () => {
  localStorage.removeItem("token", resp.data.token); // access_token
  localStorage.removeItem("user_name", resp.data.name);
  localStorage.removeItem("user_id", resp.data.id);
  localStorage.removeItem("login_time", moment());
  localStorage.removeItem("expires_in", resp.data.expires_in);
};
export { changePassword, register, login, getLoggedUser, refresh, logout };
