import { Suspense } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ErrorProvider from './context/useError';
import Loading from './pages/Loading';

import routes from './routes/routes';

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Switch>

          {routes.map(route => {
            return (
              // <ErrorProvider>
              <Route
                path={route.path}
                exact={route.exact}
                component={route.component}
              />
              /* </ErrorProvider> */
            )
          })}

        </Switch>
      </Suspense>

    </Router >
  );
}

export default App;
