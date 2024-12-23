import { useState, useEffect } from 'react'
import axios from 'axios'
import Note from './components/Note'
import LoginForm from './components/Login'
import NoteForm from './components/NoteForm'
import Togglable from './components/Toggable'
import noteService from './services/notes'
import loginService from './services/login'
import './App.css'

const App = () => {
  const [allNotes, setAllNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
 
  useEffect(() => {
    noteService
    .getAll()
    .then(initialNotes => {
      setAllNotes(initialNotes)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      noteService.setToken(user.token)
    }
  }, [])
  
  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value)
  };

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username, password,
      })
      console.log(user)

      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )

      noteService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong username or password')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const handleLogout = (event) => {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')

      if (loggedUserJSON) {
        window.localStorage.removeItem( 'loggedNoteappUser')
        setUser(null)
        setUsername('')
        setPassword('')
      }
    } catch (exception) {
      console.log(exception.message)
      setErrorMessage('wrong username or password')
    }
  }
  
  const addNote = (event) => {
    event.preventDefault();
    console.log('button clicked', event.target);
    const noteObject = {
      content: newNote,
      important: Math.random() > 0.5,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        console.log(returnedNote);
        setAllNotes(allNotes.concat(returnedNote));
        setNewNote('');
      })
  };

  const toggleImportanceOf = (id) => {
    const note = allNotes.find(n => n.id === id)
    const changedNote = {...note, important: !note.important}

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setAllNotes(allNotes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already deleted from server`
        )
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000)
        setAllNotes(allNotes.filter(note => note.id !== id))
      })
  }

  const Notification = ({ message }) => {
    if (message === null) {
      return null
    }

    return (
      <div className='error'>
        {message}
      </div>
    )
  }

  const Footer = () => {
    const footerStyle = {
      color: 'green',
      fontStyle: 'italic',
      fontSize: 16
    }

    return (
      <div style={footerStyle}>
        <br />
        <em>Note app, Department of Computer Science, University of Helsinki 2024</em>
      </div>
    )
  }

  const notesToShow = showAll
    ? allNotes
    : allNotes.filter((note) => note.important)

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>
      
      {user === null ? 
      <Togglable buttonLabel='login'>
       <LoginForm 
         handleSubmit={handleLogin}
         handleUsernameChange={( {target } )=> setUsername(target.value)}
         handlePasswordChange={({ target }) => setPassword(target.value)}
         username={username}
         password={password}
       />
     </Togglable>
      : 
      <div>
        <p>{user.name} logged-in</p>
        <button type='submit' onClick={handleLogout}>log out</button>
        <Togglable buttonLabel='new note'>
          <NoteForm 
            onSubmit={addNote}
            value={newNote}
            handleChange={handleNoteChange}
          />
        </Togglable>
      </div>
      }

      <h2>Notes</h2>
      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important': 'all'}
        </button>
      </div>
      <ul>
        {notesToShow.map((note) => 
          <Note 
            key={note.id} 
            note={note} 
            toggleImportance={() => toggleImportanceOf(note.id)}
          />
        )}
      </ul>
      
      <Footer />
    </div>
  )
}

export default App
