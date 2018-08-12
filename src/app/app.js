import '../style/app.css';
import template from './dialog1.tmpl.html'
let app = () => {
  return {
    template: require('./app.html'),
    controller: 'AppCtrl',
    controllerAs: 'app'
  }
};

class AppCtrl {
  constructor($scope, $mdDialog, $timeout) {
    this.url = 'https://github.com/preboot/angular-webpack';
    this.$mdDialog = $mdDialog;
    $timeout(() => {
      this.show = true;
    }, 1000);
  }
  showAlert() {
    // Appending dialog to document.body to cover sidenav in docs app
    // Modal dialogs should fully cover application
    // to prevent interaction outside of dialog
    this.$mdDialog.show(
      this.$mdDialog.alert()
        .parent(angular.element(document.querySelector('#popupContainer')))
        .clickOutsideToClose(true)
        .title('This is an alert title')
        .textContent('You can specify some description text in here.')
        .ariaLabel('Alert Dialog Demo')
        .ok('Got it!')
    );
  };
  showAdvanced() {
    this.$mdDialog.show({
      template: template,
      parent: angular.element(document.body),
      clickOutsideToClose: true,
      fullscreen: false
    });
  };
}

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages'])
  .directive('app', app)
  .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;