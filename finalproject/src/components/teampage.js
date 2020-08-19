import React from "react";
import { useParams } from "react-router-dom";

function Team() {
  const teamNumber = useParams();
  return <div>View team Here {teamNumber.id}</div>;
}

export default Team;
