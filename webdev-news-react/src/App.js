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

  return (
    <div className="App">
      <UserContext.Provider value={{ user, setUser }}>
        <Router>
            <WebContext.Provider value="http://127.0.0.1:5000/">
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

// Deal with pagination on main page as well as user modal. Maybe a seperate "see more page??"
// Image upload with register
// Rankings on side bar (whoever has done the most posts is top). Top 5??
// Login page: Error handling
// Register page: Error handling
// Filter functionality
// Like functionality (front-end)