// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
var app = angular.module('myNotes', ['ionic', 'starter.controllers', 'starter.services'])

app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('list', {
    url: '/list',
    templateUrl: 'templates/list.html'
  });

  $stateProvider.state('add', {
    url: '/add',
    templateUrl: 'templates/edit.html',
    controller: 'AddCtrl'
  });

  $stateProvider.state('edit', {
    url: '/edit/:noteId',
    templateUrl: 'templates/edit.html',
    controller: 'EditCtrl'
  });

  $urlRouterProvider.otherwise('/list');
});

var notes = [];

function getNote (noteId) {
   for (var i = 0; i < notes.length; i++) {
     if (notes[i].id === noteId){
      return notes[i];
     }
   }
   return undefined;
}

function updateNote (note) {
   for (var i = 0; i < notes.length; i++) {
     if (notes[i].id === note.id){
      notes[i] = note;
      return;
     }
   }
   return undefined;
}

function createNote (note) {
   notes.push(note);
}

app.controller('ListCtrl', function($scope){
  $scope.notes = notes;
});

app.controller('AddCtrl', function($scope, $state){
  $scope.note =  {
    id: new Date().getTime().toString(),
    title: '',
    description: ''
  };

  $scope.save = function(){
    createNote($scope.note);
    $state.go('list');
  };
});

app.controller('EditCtrl', function($scope, $state){
  $scope.note = angular.copy(getNote($state.params.noteId));

  $scope.save = function(){
    updateNote($scope.note);
    $state.go('list');
  };
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});
