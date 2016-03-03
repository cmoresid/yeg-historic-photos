import mainModule from './login.main';
import $ from 'jquery';

angular.element(document).ready(function() {
  $('.hide').removeClass('hide');
  angular.bootstrap(document, [mainModule.name], { strictDi: true });
});
