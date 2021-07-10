import { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import Loading from "pages/Loading/Loading";
import Register from "pages/Register/Register";
import RouteWrapper from "./Route";

// * Lazy Imports => Splitting the bundle in multiple parts and only calling them when required. Decreases Webpage loadtime * //
// * Use only if the component takes more than 30kb in webpack bundle * //
const VaccineAvailability = lazy(
  () => import("pages/VaccineAvailability/VaccineAvailability")
);
const News = lazy(() => import("pages/News/News"));

const Routes = () => {
  return (
    <Suspense fallback={<Loading />}>
      <Switch>
        <RouteWrapper exact path="/" component={Register} />
        <RouteWrapper
          exact
          path="/availability"
          component={VaccineAvailability}
        />
        <RouteWrapper exact path="/news" component={News} />
      </Switch>
    </Suspense>
  );
};

export default Routes;
