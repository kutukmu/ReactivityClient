import React, { useEffect, useState } from "react";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { Container } from "semantic-ui-react";
import { Activity } from "../../features/modules/activity";
import Navbar from "./Navbar";
import ActivitiesDashboard from "../../features/activities/ActivitiesDashboards";

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [selected, SetSelected] = useState<Activity | undefined>(undefined);
  const createOrEditActivity = (activity: Activity) => {
    if (activity.id) {
      setActivities([
        ...activities.filter((item) => item.id !== activity.id),
        activity,
      ]);
    } else {
      activity.id = uuid();
      setActivities([...activities, { ...activity }]);
    }

    SetSelected(activity);
    setEditMode(false);
  };

  const handleView = (id: string) => {
    const found = activities.find((item) => item.id === id);
    SetSelected(found);
  };

  const handleCancel = () => {
    SetSelected(undefined);
  };

  const deleteActivity = (id: string) => {
    setActivities(activities.filter((item) => item.id !== id));
  };

  const handleOpenForm = (id?: string) => {
    id ? handleView(id) : handleCancel();
    setEditMode(true);
  };

  const handleCloseForm = () => {
    setEditMode(false);
  };

  useEffect(() => {
    const data = axios
      .get<Activity[]>("http://localhost:5000/api/Activities")
      .then((res) => {
        setActivities(res.data);
      });
  }, []);

  return (
    <div>
      <Navbar handleOpenForm={handleOpenForm} />
      <Container style={{ marginTop: "70px" }}>
        <ActivitiesDashboard
          activities={activities}
          selectedView={selected}
          handleView={handleView}
          handleCancel={handleCancel}
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
