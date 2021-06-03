import axios from "axios";

const login = (user, password) => {
  return axios.post(
    `http://localhost:8085/auth/login`,
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
  return axios.get(`http://localhost:8085/auth/checkLogged`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "Content-Type": "application/json"
    }
  });
};

const refresh = () => {
  return axios.get(`http://localhost:8085/auth/refresh`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem("token"),
      "X-Requested-With": "XMLHttpRequest"
    }
  });
};
const register = (user, password) => {
  return axios.post(
    `http://localhost:8085/auth/register`,
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
    `http://localhost:8085/auth/password`,
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
