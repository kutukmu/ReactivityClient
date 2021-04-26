import Calendar from "react-calendar";
import { Header, Menu } from "semantic-ui-react";

const ActivityFilters = () => {
  return (
    <>
      <Menu vertical size="large" style={{ width: "100%", marginTop: "25px" }}>
        <Header
          icon="filter"
          attached
          color="teal"
          style={{ width: "100%" }}
          content="Filters"
        />
        <Menu.Item content="All Activities"></Menu.Item>
        <Menu.Item content="I am Going"></Menu.Item>
        <Menu.Item content="I'm hosting"></Menu.Item>
      </Menu>
      <Header />
      <Calendar />
    </>
  );
};

export default ActivityFilters;
