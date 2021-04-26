import React, { useEffect, useContext } from "react";
import { Container } from "semantic-ui-react";
import Navbar from "./Navbar";
import ActivitiesDashboard from "../../features/activities/ActivitiesDashboards";
import SpinnerLoader from "../../features/loader/spinnerLoader";
import { useStore } from "../stores/store";
import { observer } from "mobx-react-lite";
import { Route, Switch, useLocation } from "react-router-dom";
import Home from "../pages/Homepage";
import ActivitiesForm from "../../features/activities/ActivitiesForm";
import ActivityCard from "../../features/activities/ActivityCard";

function App() {
  const { activityStore } = useContext(useStore());
  const location = useLocation();
  useEffect(() => {
    activityStore.setActivities();
  }, [activityStore]);

  if (activityStore.loading) {
    return <SpinnerLoader content="Loading" />;
  }

  return (
    <div>
      <Route exact path="/" component={Home} />
      <Route
        path={`(/.+)`}
        render={() => {
          return (
            <>
              <Navbar />

              <Container style={{ marginTop: "70px" }}>
                <Switch>
                  <Route
                    exact
                    path="/activities"
                    component={ActivitiesDashboard}
                  />
                  <Route
                    exact
                    path="/activities/:id"
                    component={ActivityCard}
                  />
                  <Route
                    exact
                    key={location.key}
                    path={["/createActivities", "/createActivities/:id"]}
                    component={ActivitiesForm}
                  />
                </Switch>
              </Container>
            </>
          );
        }}
      />
    </div>
  );
}

export default observer(App);
