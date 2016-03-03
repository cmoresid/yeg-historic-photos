class LoginService {

  constructor($http, $window, notification) {
    this.$http = $http;
    this.$window = $window;
    this.notification = notification;
  }

  login(email, password) {
    let self = this;

    this.$http.post('/api/Users/login', { "email": email, "password": password })
      .then(function success(response) {
        self.$window.localStorage.setItem('api_token', response.data.id);
        self.$window.localStorage.setItem('username', email);
        self.$window.location.href = "./admin.html#/Photos/list";
      }, function error(response) {
        if (response.status == 401) {
          self.notification.log('Invalid email / password', { addnCls: 'humane-flatty-error' });
        } else {
          self.notification.log('An error has occurred', { addnCls: 'humane-flatty-error' });
        }
      });
  }

  logout() {
    let self = this;

    let url = '/api/Users/logout?access_token=' +
      self.$window.localStorage.getItem('api_token');

    this.$http.post(url)
      .then(function (response) {
        self.$window.localStorage.removeItem('api_token');
        self.$window.localStorage.removeItem('username');
        self.$window.location.href = "./login.html";
      }, function error(response) {
        self.this.notification.log('Unable to logout', { addnCls: 'humane-flatty-error' });
      });
  }

}

LoginService.$inject = ['$http', '$window', 'notification'];

export default LoginService;
