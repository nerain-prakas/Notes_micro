(function() {
  'use strict';

  angular
    .module('notesApp')
    .controller('NotesController', NotesController);

  function NotesController($scope, NotesService) {
    $scope.notes = [];
    $scope.searchQuery = '';
    $scope.sortOption = '-updatedAt';

    function loadNotes() {
      $scope.notes = NotesService.list();
    }

    $scope.deleteNote = function(id) {
      if (confirm('Are you sure you want to delete this note?')) {
        NotesService.remove(id);
        loadNotes();
      }
    };

    $scope.togglePin = function(id) {
      NotesService.togglePin(id);
      loadNotes();
    };

    $scope.toggleFavorite = function(id) {
      NotesService.toggleFavorite(id);
      loadNotes();
    };

    // Search filter
    $scope.filterNotes = function(note) {
      if (!$scope.searchQuery) return true;
      var search = $scope.searchQuery.toLowerCase();
      return note.title.toLowerCase().includes(search) ||
             note.content.toLowerCase().includes(search);
    };

    // Initialize
    loadNotes();

    // Listen for sort changes
    $scope.$on('notes:sort', function(event, data) {
      $scope.sortOption = data.option;
    });
  }
})();