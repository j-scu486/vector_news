import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { WebContext } from './context'
import Header from './components/Header'
import Footer from './components/Footer'
import MainNews from './views/MainNews'
import UserNews from './views/UserNews'

function App() {
  return (
    <div className="App">
      <Header />
        <Router>
            <WebContext.Provider value="http://127.0.0.1:5000/">
              <Route exact path="/" component={UserNews} />
            </WebContext.Provider>
            <Route exact path="/main-news" component={MainNews} />
        </Router>
      <Footer />
    </div>
  );
}

export default App;
