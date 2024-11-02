import React, { useState } from 'react';
import './App.css';

function App() {
  const [username, setUsername] = useState('');
  const [usernames, setUsernames] = useState([]);

  // Handler to add a new username
  const handleAdd = () => {
    if (username.trim() && usernames.length < 100) {
      setUsernames([...usernames, { name: username, checked: false }]);
      setUsername(''); // Clear input after adding
    }
  };

  // Handler to toggle checkbox
  const toggleCheckbox = (index) => {
    const updatedUsernames = [...usernames];
    updatedUsernames[index].checked = !updatedUsernames[index].checked;
    setUsernames(updatedUsernames);
  };

  // Handler to delete checked usernames
  const deleteuser = () => {
    const updatedUsernames = usernames.filter(user => !user.checked);
    setUsernames(updatedUsernames);
  }

  // Handler to save JSON file
  const handleSave = async () => {
    try {
      await fetch('http://localhost:5000/update-usernames', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ usernames: usernames.map(user => user.name) }),
      });
      alert('File saved successfully!');
    } catch (error) {
      console.error('Error saving file:', error);
      alert('Failed to save file');
    }
  };
  

  return (
    <div className="App">
      <h2>Manage Usernames</h2>

      {/* Input field and Add button */}
      <div className="input-section">
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter username"
          maxLength="50"
        />
        <button onClick={handleAdd} disabled={usernames.length >= 100}>
          Add
        </button>
      </div>

      {/* List of usernames with checkboxes */}
      <div className="username-list">
        {usernames.map((user, index) => (
          <div key={index} className="username-item">
            <input
              type="checkbox"
              checked={user.checked}
              onChange={() => toggleCheckbox(index)}
            />
            <span>{user.name}</span>
          </div>
        ))}
      </div>

      {/* Delete button to remove checked usernames */}
      <button className='butt' onClick={deleteuser} disabled={usernames.every(user => !user.checked)}>
        Delete Checked
      </button>

      {/* Save button */}
      <button onClick={handleSave} disabled={usernames.length === 0}>
        Save
      </button>
    </div>
  );
}

export default App;
