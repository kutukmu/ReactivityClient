import { useState, MouseEvent } from "react";
import { Item, Segment, Button, Label } from "semantic-ui-react";
import { Activity } from "../modules/activity";

interface IProps {
  activities: Activity[];
  handleView: (id: string) => void;
  deleteActivity: (id: string) => void;
  submitting: boolean;
}

const ActivitiesList = ({
  activities,
  handleView,
  deleteActivity,
  submitting,
}: IProps) => {
  const [name, setName] = useState("");

  const handleClick = (id: string) => {
    handleView(id);
  };

  const handleDelete = (
    event: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>
  ): void => {
    setName(event.currentTarget.name);
    deleteActivity(event.currentTarget.name);
  };
  return (
    <Segment>
      <Item.Group divided>
        {activities.map((activity) => {
          return (
            <Item key={activity.id}>
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
                      name={activity.id}
                      loading={submitting && name === activity.id}
                      content="Remove"
                      onClick={(e) => handleDelete(e)}
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
