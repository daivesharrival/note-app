// src/App.js
import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [editingIndex, setEditingIndex] = useState(null);

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem('notes'));
    if (storedNotes) {
      setNotes(storedNotes);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleAddNote = () => {
    if (editingIndex !== null) {
      const updatedNotes = [...notes];
      updatedNotes[editingIndex] = { title: noteTitle, content: noteContent };
      setNotes(updatedNotes);
      setEditingIndex(null);
    } else {
      setNotes([...notes, { title: noteTitle, content: noteContent }]);
    }
    setNoteTitle('');
    setNoteContent('');
    setShowPopup(false);
  };

  const handleEditNote = (index) => {
    setNoteTitle(notes[index].title);
    setNoteContent(notes[index].content);
    setEditingIndex(index);
    setShowPopup(true);
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
  };

  return (
    <div className="app">
      <h1>Notes</h1>
      <div className="notes-list">
        {notes.map((note, index) => (
          <div key={index} className="note">
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <button onClick={() => handleEditNote(index)}>Edit</button>
            <button onClick={() => handleDeleteNote(index)}>Delete</button>
          </div>
        ))}
      </div>
      <button className="add-button" onClick={() => setShowPopup(true)}>+</button>
      {showPopup && (
        <div className="popup">
          <div className="popup-content">
            <h2>{editingIndex !== null ? 'Edit Note' : 'Add Note'}</h2>
            <input
              type="text"
              placeholder="Title"
              value={noteTitle}
              onChange={(e) => setNoteTitle(e.target.value)}
            />
            <textarea
              placeholder="Content"
              value={noteContent}
              onChange={(e) => setNoteContent(e.target.value)}
            />
            <button onClick={handleAddNote}>{editingIndex !== null ? 'Update' : 'Add'}</button>
            <button onClick={() => setShowPopup(false)}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
