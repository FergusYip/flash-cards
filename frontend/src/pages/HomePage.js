import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import CameraIcon from "@material-ui/icons/PhotoCamera";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import MenuAppBar from "../components/AppBar";
import SectionHeader from "../components/SectionHeader";
import StackThumbnail from "../components/StackThumbnail";
import Footer from "../components/Footer";

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: theme.spacing(2),
  },
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
  cardGrid: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(8),
  },
  card: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
  },
  cardMedia: {
    paddingTop: "56.25%", // 16:9
  },
  cardContent: {
    flexGrow: 1,
  },
  header: {
    paddingTop: theme.spacing(8),
  },
}));

const stacks = [
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
  {
    name: "stack-name",
    category: "stack-category",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec nec nibh hendrerit nunc mollis fermentum. Etiam dictum sodales mauris a suscipit.",
    stackId: "asdfghjkjhgfdsa",
  },
];

function HomePage() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      <MenuAppBar isAuthenticated={true} />
      <main>
        <SectionHeader title="Stacks" buttonText="New Stack" />
        <Container className={classes.cardGrid} maxWidth="md">
          <Grid container spacing={4}>
            {stacks.map((stack) => (
              <Grid item key={stack.stackId} xs={12} sm={6} md={4}>
                <StackThumbnail stack={stack} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </main>
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;
