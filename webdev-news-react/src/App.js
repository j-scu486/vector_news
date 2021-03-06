import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { WebContext } from './webContext'
import { UserContext } from './userContext'
import Header from './components/Header'
import Footer from './components/Footer'
import MainNews from './views/MainNews'
import UserNews from './views/UserNews'
import Login from './views/Login'
import { useState } from 'react'

function App() {
  const [user, setUser] = useState({
    'token': '',
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
            </WebContext.Provider>
            <Route path="/main-news" component={MainNews} />
        </Router>
      <Footer />
      </UserContext.Provider>
    </div>
  );
}

export default App;
