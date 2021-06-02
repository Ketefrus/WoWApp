import Vue from 'vue';
import VeeValidate from 'vee-validate';
// import messagesEs from 'vee-validate/dist/locale/es.js';
import { Validator } from 'vee-validate';

const dict = {
  custom: {
    password: {
      required: 'Debes introducir una contraseña válida',
    },
    repeatPassword: {
      required: 'Las contraseñas deben coincidir', //'Debes repetir la contraseña',
    },
    name: {
      required: 'El campo nombre es obligatorio',
    },
    surnames: {
      required: 'El campo apellidos es obligatorio',
    },
  },
};

Vue.use(VeeValidate)


