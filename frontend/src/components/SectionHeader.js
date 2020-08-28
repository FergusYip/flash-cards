import React, { Component } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  header: {
    paddingTop: theme.spacing(8),
  },
  createButton: {
    paddingTop: theme.spacing(2),
  },
}));

const SectionHeader = (props) => {
  const classes = useStyles();

  return (
    <Container className={classes.header} maxWidth="md">
      <Grid container>
        <Grid item xs>
          <Typography component="h1" variant="h3">
            {props.title}
          </Typography>
        </Grid>
        <Grid item className={classes.createButton}>
          <Button variant="contained" color="primary">
            {props.buttonText}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SectionHeader;
