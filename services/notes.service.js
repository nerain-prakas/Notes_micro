(function() {
  'use strict';

  angular
    .module('notesApp')
    .service('NotesService', NotesService);

  function NotesService() {
    var service = {
      list: list,
      get: get,
      create: create,
      update: update,
      remove: remove,
      togglePin: togglePin,
      toggleFavorite: toggleFavorite,
      seedDemo: seedDemo
    };

    return service;

    function list() {
      var notes = JSON.parse(localStorage.getItem('notes') || '[]');
      return notes.sort(function(a, b) {
        // Pinned notes first
        if (a.pinned && !b.pinned) return -1;
        if (!a.pinned && b.pinned) return 1;
        // Then favorites
        if (a.favorite && !b.favorite) return -1;
        if (!a.favorite && b.favorite) return 1;
        // Then by updated date
        return new Date(b.updatedAt) - new Date(a.updatedAt);
      });
    }

    function get(id) {
      var notes = list();
      return notes.find(function(note) {
        return note.id === id;
      });
    }

    function create(note) {
      var notes = list();
      note.id = Date.now().toString();
      note.createdAt = new Date().toISOString();
      note.updatedAt = note.createdAt;
      note.pinned = false;
      note.favorite = false;
      notes.push(note);
      localStorage.setItem('notes', JSON.stringify(notes));
      return note;
    }

    function update(note) {
      var notes = list();
      var index = notes.findIndex(function(n) {
        return n.id === note.id;
      });
      if (index > -1) {
        note.updatedAt = new Date().toISOString();
        notes[index] = note;
        localStorage.setItem('notes', JSON.stringify(notes));
      }
      return note;
    }

    function remove(id) {
      var notes = list();
      var filtered = notes.filter(function(note) {
        return note.id !== id;
      });
      localStorage.setItem('notes', JSON.stringify(filtered));
    }

    function togglePin(id) {
      var note = get(id);
      if (note) {
        note.pinned = !note.pinned;
        update(note);
      }
      return note;
    }

    function toggleFavorite(id) {
      var note = get(id);
      if (note) {
        note.favorite = !note.favorite;
        update(note);
      }
      return note;
    }

    function seedDemo() {
      var demoNotes = [
        {
          title: 'Welcome to Notes App!',
          content: 'This is a demo note to get you started. You can create, edit, and delete notes.',
          color: '#fff59d'
        },
        {
          title: 'Features',
          content: '✨ Create colorful notes\n📌 Pin important notes\n⭐ Mark favorites\n🎨 Change theme\n⌨️ Keyboard shortcuts',
          color: '#81c784'
        },
        {
          title: 'Keyboard Shortcuts',
          content: 'n - Create new note\n/ - Focus search\nEsc - Close dialogs',
          color: '#90caf9'
        }
      ];

      demoNotes.forEach(function(note) {
        create(note);
      });
    }
  }
})();