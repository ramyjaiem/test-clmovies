import { Layout } from 'layout';
import About from 'pages/About';
import Home from 'pages/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

type routeType = {
  path: string;
  key: string;
  exact: boolean;
  component: any;
  routes?: routeType[];
};

type RenderRoutesProps = {
  routes: routeType[];
};

const ROUTES: routeType[] = [
  { path: '/', key: 'ROOT', exact: true, component: () => <Home /> },
  { path: '/about', key: 'ROOT', exact: true, component: () => <About /> },
];

function RouteWithSubRoutes(route: routeType) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props: any) => (
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}

export function RenderRoutes({ routes }: RenderRoutesProps) {
  return (
    <Router>
      <Switch>
        <Layout>
          {routes.map((route, i) => {
            return <RouteWithSubRoutes {...route} />;
          })}
          
        </Layout>
      </Switch>
    </Router>
  );
}

export default ROUTES;
