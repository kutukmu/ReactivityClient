import { Item, Segment, Button, Label } from "semantic-ui-react";
import { Activity } from "../modules/activity";

interface IProps {
  activities: Activity[];
  handleView: (id: string) => void;
  deleteActivity: (id: string) => void;
}

const ActivitiesList = ({ activities, handleView, deleteActivity }: IProps) => {
  const handleClick = (id: string) => {
    handleView(id);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => {
          return (
            <Item>
              <Item.Content>
                <Item.Header as="a">{activity.title}</Item.Header>
                <Item.Meta>{activity.date}</Item.Meta>
                <Item.Description>{activity.description}</Item.Description>
                <Item.Extra>
                  {activity.city} {activity.venue}
                </Item.Extra>
                <Item.Extra>
                  <div>
                    <Button
                      color="red"
                      floated="right"
                      content="Remove"
                      onClick={() => deleteActivity(activity.id)}
                    />
                    <Button
                      primary
                      floated="right"
                      onClick={() => handleClick(activity.id)}
                    >
                      View
                    </Button>
                  </div>

                  <Label>{activity.category}</Label>
                </Item.Extra>
              </Item.Content>
            </Item>
          );
        })}
      </Item.Group>
    </Segment>
  );
};

export default ActivitiesList;
