import './login.vendor'
import humane from 'humane-js';

import LoginController from './controllers/login';
import LoginService from './services/login.service'

let mainModule = angular.module('loginApp', [])
  .factory('notification', function() {
    humane.timeout = 5000;
    humane.clickToClose = true;

    return humane;
  })
  .controller(LoginController.name, LoginController)
  .service(LoginService.name, LoginService);

export default mainModule;
