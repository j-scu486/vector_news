import { BrowserRouter as Router, Route } from 'react-router-dom'
import { WebContext } from './webContext'
import { UserContext } from './userContext'
import Header from './components/Header'
import Footer from './components/Footer'
import MainNews from './views/MainNews'
import UserNews from './views/UserNews'
import Login from './views/Login'
import Register from './views/Register'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState({
    'token': '',
    'username': '',
    'user_id': ''
  })

  let BASE_URL

  if (process.env.NODE_ENV === 'development') {
    BASE_URL = process.env.REACT_APP_BASE_URL
  } else {
    BASE_URL = '' 
  }

  return (
    <div className="App">
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
    </div>
  );
}

export default App;

// TODO

// Deal with pagination on user modal. Maybe a seperate "see more page??"
// Add user profile page (this is tied to pagination above)
// Image upload with register
// Site-wide messages (eg, you added a post! etc)
// Rankings on side bar (whoever has done the most posts is top). Top 5??
// Like functionality (front-end)