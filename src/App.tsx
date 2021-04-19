import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios from "axios";
import { Header, List } from "semantic-ui-react";

function App() {
  const [activities, setActivities] = useState([]);
  useEffect(() => {
    const data = axios
      .get("http://localhost:5000/api/Activities")
      .then((res) => {
        console.log(res);
        setActivities(res.data);
      });
  }, []);
  return (
    <div>
      <Header icon="users" content="Welcome to the My new Applicaton " />

      <List>
        {activities.map((act: any) => {
          return <List.Item key={act.id}>{act.title}</List.Item>;
        })}
      </List>
    </div>
  );
}

export default App;
