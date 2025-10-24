(function() {
  'use strict';

  angular
    .module('notesApp')
    .controller('NoteEditorController', NoteEditorController);

  function NoteEditorController($scope, $routeParams, $location, NotesService) {
    $scope.note = {
      title: '',
      content: '',
      color: '#ffffff'
    };

    $scope.colors = [
      '#ffffff', // White
      '#fff59d', // Yellow
      '#81c784', // Green
      '#90caf9', // Blue
      '#f48fb1', // Pink
      '#ce93d8', // Purple
      '#ff8a65', // Orange
      '#a1887f'  // Brown
    ];

    if ($routeParams.id && $routeParams.id !== 'new') {
      var existingNote = NotesService.get($routeParams.id);
      if (existingNote) {
        $scope.note = angular.copy(existingNote);
      } else {
        $location.path('/');
      }
    }

    $scope.save = function() {
      if (!$scope.note.title) {
        alert('Title is required!');
        return;
      }

      if ($scope.note.id) {
        NotesService.update($scope.note);
      } else {
        NotesService.create($scope.note);
      }
      
      $location.path('/');
    };

    $scope.cancel = function() {
      $location.path('/');
    };

    $scope.selectColor = function(color) {
      $scope.note.color = color;
    };

    // Close on escape
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        $scope.cancel();
        $scope.$apply();
      }
    });
  }
})();