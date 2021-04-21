import { Button, Card, Image } from "semantic-ui-react";
import { Activity } from "../modules/activity";

interface IProp {
  activity: Activity | undefined;
  handleCancel: () => void;
  handleOpenForm: (id: string) => void;
  handleCloseForm: () => void;
}

const ActivityCard = ({ activity, handleCancel, handleOpenForm }: IProp) => {
  if (activity) {
    return (
      <Card fluid>
        <Image
          src={`/assets/categoryImages/${activity.category}.jpg`}
          wrapped
          ui={false}
        />
        <Card.Content>
          <Card.Header>{activity.title}</Card.Header>
          <Card.Meta>
            <span className="date">{activity.date}</span>
          </Card.Meta>
          <Card.Description>{activity.description}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group widths={2}>
            <Button
              basic
              color="blue"
              onClick={() => handleOpenForm(activity.id)}
            >
              Edit
            </Button>
            <Button basic color="grey" onClick={handleCancel}>
              Cancel
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    );
  } else {
    return <></>;
  }
};

export default ActivityCard;
