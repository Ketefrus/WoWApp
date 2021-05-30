import axios from 'axios';

const login = (user, password) => {
  return axios.post(`http://localhost:8085/auth/login`, {login: user, password: password}, {
    headers: {
      "Content-Type": "application/json",
      "X-Requested-With": "XMLHttpRequest"
    }});
}

const getLoggedUser = () => {
  return axios.get(`http://localhost:8085/auth/checkLogged`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
      "Content-Type": "application/json",
    }
  })
}

const refresh = () => {
  return axios.get(`http://localhost:8085/auth/refresh`, {
    headers: {
      Authorization: "Bearer " + localStorage.getItem('token'),
      "X-Requested-With": "XMLHttpRequest"
    }
  })
}
export {
  login,
  getLoggedUser,
  refresh
}