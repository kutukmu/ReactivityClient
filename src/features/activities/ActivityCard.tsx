import { Grid } from "semantic-ui-react";
import { useContext, useEffect } from "react";
import { useStore } from "../../app/stores/store";

import { observer } from "mobx-react-lite";
import SpinnerLoader from "../loader/spinnerLoader";
import { useParams } from "react-router";
import ActiviyDetailedHeader from "./ActivityDetailedHeader";
import ActivityDetailerInfo from "./ActivityDetailedInfo";
import ActivityChatting from "./ActivityChatting";
import ActivityDetailedSidebar from "./ActivityDetailedSidebar";
const ActivityCard = (props: any) => {
  const { activityStore } = useContext(useStore());
  const { activity, loading } = activityStore;
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    activityStore.activityDetails(id);
  }, [id, activityStore]);

  if (!activity || loading) {
    return <SpinnerLoader content="Loading" />;
  }

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActiviyDetailedHeader activity={activity} />
        <ActivityDetailerInfo activity={activity} />
        <ActivityChatting />
      </Grid.Column>
      <Grid.Column width={6}>
        <ActivityDetailedSidebar />
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityCard);
