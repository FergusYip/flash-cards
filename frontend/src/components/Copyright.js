import React from "react";
import Link from "@material-ui/core/Link";
import Typography from "@material-ui/core/Typography";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://github.com/FergusYip">
        Yip Wai Lam Fergus
      </Link>{" "}
      {"2020" || new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
export default Copyright;
