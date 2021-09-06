import { Home } from "./pages/index";
import { Movie } from "./pages/movie";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/movie/:id" component={Movie} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
