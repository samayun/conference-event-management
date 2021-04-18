import { Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import ServiceProvider from "./context/ServiceProvider";
import AdminProvider from "./context/AdminProvider";
// import ErrorProvider from './context/useError';
import Loading from "./pages/Loading";
import PrivateRoute from "./routes/PrivateRoute";
import AuthRedirectRoute from "./routes/AuthRedirectRoute";
import routes from "./routes/routes";
import ReviewProvider from "./context/ReviewProvider";
import OrderProvider from "./context/OrderProvider";

function App() {
  return (
    <Router>
      <AuthProvider>
        <ServiceProvider>
          <ReviewProvider>
            <AdminProvider>
              <OrderProvider>
                <Suspense fallback={<Loading />}>
                  <Switch>
                    {routes.map((route) => {
                      return route.authorization === "private" ? (
                        <PrivateRoute
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ) : route.authorization === "IfAuthRedirectBack" ? (
                        <AuthRedirectRoute
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      ) : (
                        <Route
                          path={route.path}
                          exact={route.exact}
                          component={route.component}
                        />
                      );
                    })}
                  </Switch>
                </Suspense>
              </OrderProvider>
            </AdminProvider>
          </ReviewProvider>
        </ServiceProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
