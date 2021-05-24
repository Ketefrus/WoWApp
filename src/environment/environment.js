const { VUE_APP_API_DOMAIN, VUE_APP_API_USER, VUE_APP_API_DATA, NODE_ENV = '' } = process.env;

const environment = NODE_ENV.toLocaleLowerCase();
const baseURL = VUE_APP_API_DOMAIN;
const data = VUE_APP_API_DATA;
const user = VUE_APP_API_USER;

export {
  environment,
  baseURL,
  data,
  user
}
