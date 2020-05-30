import React from "react";
import axios from "axios";

import Header from "../components/Header";
import Stack from "../components/Stack";

function ProfilePage({ match }) {
  const { profile } = match.params;

  return (
    <div className="app" style={{ position: "relative" }}>
      <Stack />
    </div>
  );
}

export default ProfilePage;
