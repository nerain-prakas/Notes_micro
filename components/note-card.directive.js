(function() {
  'use strict';

  angular
    .module('notesApp')
    .directive('noteCard', noteCard);

  function noteCard() {
    return {
      restrict: 'E',
      scope: {
        note: '=',
        onDelete: '&',
        onPin: '&',
        onFavorite: '&'
      },
      template: `
        <div class="note-card" 
             ng-class="{'pinned': note.pinned, 'favorite': note.favorite}"
             ng-style="{'background-color': note.color}">
          <div class="note-content">
            <h3>{{note.title}}</h3>
            <p>{{note.content}}</p>
          </div>
          <div class="note-actions">
            <button ng-click="onPin({id: note.id})" title="Toggle pin">
              📌
            </button>
            <button ng-click="onFavorite({id: note.id})" title="Toggle favorite">
              ⭐
            </button>
            <button ng-click="onDelete({id: note.id})" title="Delete note">
              🗑️
            </button>
          </div>
        </div>
      `,
      link: function(scope, element) {
        element.on('click', function(e) {
          // Don't navigate if clicking action buttons
          if (e.target.tagName !== 'BUTTON') {
            window.location.href = '#!/note/' + scope.note.id;
          }
        });
      }
    };
  }
})();