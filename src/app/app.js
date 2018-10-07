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
    $scope.selected = [];


    this.promise = new Promise((res, rej) => {
      setTimeout(() => {
        res({ data: [{ name: 'mirek' }, { name: 'mirek2' }] })
      }, 2000);
    }).then((desserts) => {
      this.desserts = desserts;
    });
    this.url = 'https://github.com/preboot/angular-webpack';
    this.$mdDialog = $mdDialog;
    this.states = [1, 2, 3]
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

var cardComponentOptions = {
  bindings: {
    title: '@'
  },
  transclude: {
    'title': '?cardTitle',
    'song': '?cardSong',
  },
  template:
    `<div>
      <h3>{{$ctrl.title || "No title"}}</h3>
      <ul>
         <i><div ng-transclude="song">Empty</div></i>
        <i><div ng-transclude="title">Empty</div></i>
      </ul>
    </div>`
};

angular.module(MODULE_NAME, ['ngMaterial', 'ngMessages', 'md.data.table'])
  .directive('app', app).component('multislotCard', cardComponentOptions)
  .controller('AppCtrl', AppCtrl);

angular.module(MODULE_NAME).
  component('greetUser', {
    template: '<div>Hello, {{$ctrl.user}} greetUser component</div>',
    controller: function GreetUserController($element) {
      $($element).click(function () {
        alert($element);
      })
      this.user = 'world';
    }
  });


export default MODULE_NAME;