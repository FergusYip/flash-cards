import React from "react";
import axios from "axios";

import ProfileDetails from "../components/ProfileDetails";
import AuthContext from "../AuthContext";

function ProfilePage({ match }) {
  const { userId } = match.params;

  const token = React.useContext(AuthContext);

  const [values, setValues] = React.useState({
    // name: userId.name,
    // email: userId.email,
  });

  const handleChange = (name) => (event) => {
    setValues({ ...values, [name]: event.target.value });
  };

  function handleSubmit(event) {
    event.preventDefault();

    const { email, password } = values;

    // Quick validation
    if (!email || !password) return;

    // Send to backend
    axios
      .post(`/auth/login`, { email, password })
      .then((response) => {
        console.log(response);
        const data = response.data;
      })
      .catch((err) => {});
  }

  return (
    <div className="container">
      <h1>Profile</h1>
      <ProfileDetails name="asdf" email="fads" />
    </div>
  );
}

export default ProfilePage;
