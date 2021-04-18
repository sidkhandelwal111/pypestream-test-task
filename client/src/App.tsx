import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Main from './components/Main';
import Publish from './components/Publish';
import Subscribe from './components/Subscribe';

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/" exact>
          <Main />
        </Route>
        <Route path="/publish">
          <Publish />
        </Route>
        <Route path="/subscribe">
          <Subscribe />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
