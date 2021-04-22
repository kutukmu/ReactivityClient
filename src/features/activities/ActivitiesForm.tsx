import React, { FormEvent, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { Activity } from "../modules/activity";
import agent from "../../app/api/agent";
interface IProp {
  activity: Activity | undefined;
  handleCloseForm: () => void;
  createOrEditActivity: (activity: Activity) => void;
  submitting: boolean;
}

const ActivitiesForm = ({
  activity,
  handleCloseForm,
  createOrEditActivity,
  submitting,
}: IProp) => {
  const defaultState = activity ?? {
    id: "",
    title: "",
    city: "",
    date: "",
    description: "",
    venue: "",
    category: "",
  };
  const [formValues, setValues] = useState(defaultState);

  const handleChange = (
    event: FormEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setValues({
      ...formValues,
      [event.currentTarget.name]: event.currentTarget.value,
    });
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    createOrEditActivity(formValues);
  };

  return (
    <Segment clearing>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <input
            placeholder="Title"
            name="title"
            value={formValues.title}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <textarea
            placeholder="Description"
            name="description"
            value={formValues.description}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Category"
            name="category"
            value={formValues.category}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            type="date"
            placeholder="Date"
            name="date"
            value={formValues.date}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="City"
            name="city"
            value={formValues.city}
            onChange={handleChange}
          />
        </Form.Field>
        <Form.Field>
          <input
            placeholder="Venue"
            name="venue"
            value={formValues.venue}
            onChange={handleChange}
          />
        </Form.Field>
        <Button
          floated="right"
          type="submit"
          positive
          content="Submit"
          loading={submitting}
        />
        <Button
          floated="right"
          type="button"
          content="Cancel"
          onClick={handleCloseForm}
        />
      </Form>
    </Segment>
  );
};

export default ActivitiesForm;
