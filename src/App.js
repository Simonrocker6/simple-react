import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IncidentList from './components/IncidentList';
import IncidentDetail from './components/IncidentDetail';
import NewIncident from './components/NewIncident';

function App() {
  return (
    <Router>
      <div>
        <Switch>
          <Route path="/incidents/new" component={NewIncident} />
          <Route path="/incidents/:id" component={IncidentDetail} />
          <Route path="/" component={IncidentList} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;