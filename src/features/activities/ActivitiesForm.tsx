import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Button, Form, Segment } from "semantic-ui-react";
import { observer } from "mobx-react-lite";
import { useStore } from "../../app/stores/store";
import { useHistory, useParams } from "react-router";
import { v4 as uuid } from "uuid";
import SpinnerLoader from "../loader/spinnerLoader";
import { Link } from "react-router-dom";
const ActivitiesForm = () => {
  const history = useHistory();
  const { activityStore } = useContext(useStore());
  const {
    submitting,
    createOrEditActivity,
    activityDetails,
    loading,
  } = activityStore;

  const [formValues, setValues] = useState({
    id: "",
    title: "",
    city: "",
    date: "",
    description: "",
    venue: "",
    category: "",
  });

  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    const f = async () => {
      if (id) {
        await activityDetails(id).then((res) => setValues(res!));
      }
    };

    f();
  }, [activityDetails, id]);

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
    if (formValues.id) {
      createOrEditActivity(formValues).then(() => {
        history.push(`/activities/${formValues.id}`);
      });
    } else {
      formValues.id = uuid();
      createOrEditActivity(formValues).then(() => {
        history.push(`/activities/${formValues.id}`);
      });
    }
  };

  if (loading) return <SpinnerLoader />;

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
          as={Link}
          to="/activities"
        />
      </Form>
    </Segment>
  );
};

export default observer(ActivitiesForm);
