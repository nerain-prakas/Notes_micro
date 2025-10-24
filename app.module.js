(function() {
  'use strict';

  angular
    .module('notesApp', ['ngRoute', 'ngAnimate'])
    .controller('AppController', AppController)
    .run(appRun);

  function AppController($scope, $rootScope, $location, NotesService) {
    $scope.isDarkTheme = localStorage.getItem('darkTheme') === 'true';
    $scope.searchQuery = '';
    $scope.sortOption = '-updatedAt';

    $scope.toggleTheme = function() {
      $scope.isDarkTheme = !$scope.isDarkTheme;
      localStorage.setItem('darkTheme', $scope.isDarkTheme);
    };

    $scope.createNote = function() {
      $location.path('/note/new');
    };

    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;
      
      if (e.key === 'n') {
        $scope.createNote();
        $scope.$apply();
      } else if (e.key === '/') {
        document.querySelector('.search-bar input').focus();
        e.preventDefault();
      }
    });

    $scope.updateSort = function() {
      $rootScope.$broadcast('notes:sort', { option: $scope.sortOption });
    };
  }

  function appRun(NotesService) {
    // Seed demo notes if storage is empty
    if (!localStorage.getItem('notes')) {
      NotesService.seedDemo();
    }
  }
})();