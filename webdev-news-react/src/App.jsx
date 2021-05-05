import { BrowserRouter as Router, Route } from 'react-router-dom'
import { WebContext } from './webContext'
import { UserContext } from './userContext'
import { MessageContext } from './messageContext'
import Header from './components/Header'
import Footer from './components/Footer'
import MainNews from './views/MainNews'
import UserNews from './views/UserNews'
import Login from './views/Login'
import Register from './views/Register'
import { useState, useEffect } from 'react'

function App() {
  const [user, setUser] = useState({
    'token': '',
    'username': '',
    'user_id': ''
  })

  const [message, setMessage] = useState({
    message: '',
    messageType: ''
  })

  useEffect(() => {
    setTimeout(function(){ 
      setMessage('') 
    }, 5000);
  }, [message])

  let BASE_URL

  if (process.env.NODE_ENV === 'development') {
    BASE_URL = process.env.REACT_APP_BASE_URL
  } else {
    BASE_URL = '' 
  }

  return (
    <div className="App">
      <MessageContext.Provider value={{ message, setMessage }}>
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
            <WebContext.Provider value={BASE_URL}>
              <Header />
              <Route exact path="/" component={UserNews} />
              <Route path="/login" component={Login} />
              <Route path="/register" component={Register} />
            </WebContext.Provider>
            <Route path="/main-news" component={MainNews} />
        </Router>
      <Footer />
      </UserContext.Provider>
      </MessageContext.Provider>
    </div>
  );
}

export default App;

// Backend TODO

// Add ability for users to edit their own posts
// set pagination to properly work on user modal
// Refactor (apiservice)
// Tests

// Frontend TODO

// Navbar styling (responsiveness + styling)
// Responsivness (at least to laptop 1366px)
// Click likes: open modal to show users who like (advanced)
