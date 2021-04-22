import React, { useEffect, useState } from "react";
import { v4 as uuid } from "uuid";
import { Container } from "semantic-ui-react";
import { Activity } from "../../features/modules/activity";
import Navbar from "./Navbar";
import ActivitiesDashboard from "../../features/activities/ActivitiesDashboards";
import agent from "../api/agent";
import SpinnerLoader from "../../features/loader/spinnerLoader";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, SetSelected] = useState<Activity | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmiting] = useState(false);

  const createOrEditActivity = (activity: Activity) => {
    setSubmiting(true);
    if (activity.id) {
      agent.Activities.update(activity).then(() => {
        setActivities([
          ...activities.filter((item) => item.id !== activity.id),
          activity,
        ]);
        setEditMode(false);
        setSubmiting(false);
      });
    } else {
      activity.id = uuid();
      agent.Activities.create(activity).then(() => {
        setActivities([...activities, { ...activity }]);
        setEditMode(false);
        setSubmiting(false);
      });
    }

    SetSelected(activity);
  };

  const handleView = (id: string) => {
    const found = activities.find((item) => item.id === id);
    SetSelected(found);
  };

  const handleCancel = () => {
    SetSelected(undefined);
  };

  const deleteActivity = (id: string) => {
    console.log("here");
    setSubmiting(true);
    agent.Activities.delete(id).then(() => {
      setActivities(activities.filter((item) => item.id !== id));
      setSubmiting(false);
    });
  };

  const handleOpenForm = (id?: string) => {
    id ? handleView(id) : handleCancel();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  useEffect(() => {
    agent.Activities.list().then((data) => {
      const newArr = data.map((act) => {
        return {
          ...act,
          date: act.date.split("T")[0],
        };
      });
      setActivities(newArr);
    });
    setLoading(false);
  }, []);

  if (loading) {
    return <SpinnerLoader content="Loading" />;
  }

  return (
    <div>
      <Navbar handleOpenForm={handleOpenForm} />
      <Container style={{ marginTop: "70px" }}>
        <ActivitiesDashboard
          activities={activities}
          selectedView={selected}
          handleView={handleView}
          handleCancel={handleCancel}
          submitting={submitting}
          handleOpenForm={handleOpenForm}
          handleCloseForm={handleCloseForm}
          editMode={editMode}
          createOrEditActivity={createOrEditActivity}
          deleteActivity={deleteActivity}
        />
      </Container>
    </div>
  );
}

export default App;
