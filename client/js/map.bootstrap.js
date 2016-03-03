import mainModule from './map.main';

angular.element(document).ready(function() {
  angular.bootstrap(document, [mainModule.name], { strictDi: true });
});
