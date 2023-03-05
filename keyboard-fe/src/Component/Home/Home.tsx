import React, { useState, useEffect } from "react";
import { getKeyboards } from "../../ApiCall/ApiCall";
import { useNavigate } from "react-router";
import "./Home.scss";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Grid,
  Button,
} from "@mui/material";

import { useQuery, useMutation } from "react-query";

const Home: React.FC = () => {
  let naviagate = useNavigate();

  type apiDataProp = {
    keyboard_id: number;
    keyboard_keycaps: string;
    keyboard_name: string;
    keyboard_switches: string;
    keyboard_type: string;
  };

  const getKeyboardResults = useQuery({
    queryKey: ["keyboards"],
    queryFn: () => getKeyboards(),
  });

  if (getKeyboardResults.isLoading) return <h1>loading</h1>;
  if (getKeyboardResults.isError) return <h1> error</h1>;

  const keyboardHandler = (value: number) => {
    naviagate(`/keyboard-information/${value}`);
  };

  let gridContainer = (keyboard: apiDataProp) => (
    <Grid item xs={16} md={6} lg={4} xl={3} key={keyboard.keyboard_id}>
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            sx={{ fontSize: 14 }}
            color="text.secondary"
            gutterBottom
          ></Typography>
          <Typography variant="h5" component="div">
            {keyboard.keyboard_name}
          </Typography>
        </CardContent>
        <CardActions>
          <Button
            size="small"
            onClick={() => keyboardHandler(keyboard.keyboard_id)}
          >
            Learn More
          </Button>
        </CardActions>
      </Card>
    </Grid>
  );

  return (
    <div>
      <div className="keyboardContainer">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {getKeyboardResults.data.map((apiData: apiDataProp) =>
            gridContainer(apiData)
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Home;
