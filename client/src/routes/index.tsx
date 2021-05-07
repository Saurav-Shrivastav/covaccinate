import { lazy, Suspense } from "react";
import { Switch } from "react-router-dom";
import Loading from "pages/Loading/Loading";
import RouteWrapper from "./Route";

// * Lazy Imports => Splitting the bundle in multiple parts and only calling them when required. Decreases Webpage loadtime * //
// * Use only if the component takes more than 30kb in webpack bundle * //
const Register = lazy(() => import("pages/Register/Register"));
const VaccineAvailability = lazy(
  () => import("pages/VaccineAvailability/VaccineAvailability")
);

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
      </Switch>
    </Suspense>
  );
};

export default Routes;
