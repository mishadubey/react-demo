import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './services/fake-db';
import Preloader from './components/preloader';
const Tasks = lazy(() => import('./pages/tasks'));
const Error404 = lazy(() => import('./pages/error-404'));

const App: React.FC = () => {
  return (
    <>
      <Router>
        <Suspense fallback={<Preloader />}>
          <Switch>
            <Route exact path="/" component={Tasks} />
            <Route path="*" component={Error404} />
          </Switch>
        </Suspense>
      </Router>
    </>
  );
};

export default App;
