(function() {
  'use strict';

  angular
    .module('notesApp')
    .config(routeConfig);

  function routeConfig($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'components/notes-list.html',
        controller: 'NotesController'
      })
      .when('/note/new', {
        templateUrl: 'components/note-editor.html',
        controller: 'NoteEditorController'
      })
      .when('/note/:id', {
        templateUrl: 'components/note-editor.html',
        controller: 'NoteEditorController'
      })
      .otherwise({
        redirectTo: '/'
      });
  }
})();