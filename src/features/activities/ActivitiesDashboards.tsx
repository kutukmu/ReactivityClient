import { Grid, List } from "semantic-ui-react";
import { Activity } from "../modules/activity";
import ActivitiesList from "./ActivitiesList";
import { observer } from "mobx-react-lite";
import ActivityFilters from "./ActivityFilter";
interface IProps {
  activities: Activity[] | undefined;
}

const ActivitiesDashboard = ({ activities }: IProps) => {
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={10}>
          <List>
            <ActivitiesList />
          </List>
        </Grid.Column>
        <Grid.Column width={6}>
          <ActivityFilters />
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default observer(ActivitiesDashboard);
