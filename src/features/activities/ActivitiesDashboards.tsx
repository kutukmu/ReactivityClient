import { Grid, List } from "semantic-ui-react";
import { Activity } from "../modules/activity";
import ActivitiesForm from "./ActivitiesForm";
import ActivitiesList from "./ActivitiesList";
import ActivityCard from "./ActivityCard";

interface IProps {
  activities: Activity[];
  selectedView: Activity | undefined;
  handleView: (id: string) => void;
  handleCancel: () => void;
  handleOpenForm: (id?: string) => void;
  handleCloseForm: () => void;
  editMode: Boolean;
  createOrEditActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
}

const ActivitiesDashboard = ({
  activities,
  handleView,
  handleCancel,
  selectedView,
  handleOpenForm,
  editMode,
  handleCloseForm,
  createOrEditActivity,
  deleteActivity,
}: IProps) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <List>
            <ActivitiesList
              activities={activities}
              handleView={handleView}
              deleteActivity={deleteActivity}
            />
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          {selectedView && !editMode && (
            <ActivityCard
              activity={selectedView}
              handleCancel={handleCancel}
              handleOpenForm={handleOpenForm}
              handleCloseForm={handleCloseForm}
            />
          )}
          {editMode && (
            <ActivitiesForm
              activity={selectedView}
              handleCloseForm={handleCloseForm}
              createOrEditActivity={createOrEditActivity}
            />
          )}
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default ActivitiesDashboard;
