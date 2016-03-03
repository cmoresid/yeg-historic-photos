class LoginController {

  constructor($scope, $window, LoginService) {
    this.$scope = $scope;
    this.LoginService = LoginService;

    this.$scope.email = $window.localStorage.getItem('username');
    this.$scope.password = '';

    this.$scope.parent = this;
    this.$scope.login = this.login;
    this.$scope.logout = this.logout;
  }

  login(isValid) {
    if (!isValid) {
      return false;
    }

    this.parent.LoginService.login(this.email, this.password);

    return false;
  }

  logout() {
    this.parent.LoginService.logout();
  }

}

LoginController.$inject = ['$scope', '$window', 'LoginService'];

export default LoginController;
