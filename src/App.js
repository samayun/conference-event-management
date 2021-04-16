import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Loading from './pages/Loading';

import routes from './routes/routes';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>

          {routes.map(route => {
            return <Route
              path={route.path}
              exact={route.exact}
              component={route.component}
            />
          })}

        </Switch>
      </Suspense>

    </Router >
  );
}

export default App;
