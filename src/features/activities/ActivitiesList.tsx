import { useContext, Fragment } from "react";
import { Item, Header } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";

import { observer } from "mobx-react-lite";
import ActivityListItem from "./ActivityListItem";
const ActivitiesList = () => {
  const { activityStore } = useContext(useStore());
  const { groupedActivities } = activityStore;

  return (
    <>
      {groupedActivities.map(([group, activities]) => (
        <Fragment key={group}>
          <Header sub color="teal">
            {group}
          </Header>
          <Item.Group divided>
            {activities.map((activity) => (
              <ActivityListItem key={activity.id} activity={activity} />
            ))}
          </Item.Group>
        </Fragment>
      ))}
    </>
  );
};

export default observer(ActivitiesList);
