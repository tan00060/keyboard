import React, { useState, useEffect, MouseEvent } from "react";
import { keyboard } from "@testing-library/user-event/dist/keyboard";
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

const Home: React.FC = () => {
  let naviagate = useNavigate();

  const [apiData, setApiData] = useState([]);
  const [errorMessage, setErrorMessage] = useState<boolean>(false);

  type apiDataProp = {
    keyboard_id: number;
    keyboard_keycaps: string;
    keyboard_name: string;
    keyboard_switches: string;
    keyboard_type: string;
  };

  const getKeyboardData = async () => {
    let data = await getKeyboards();
    if (data) {
      setApiData(data);
    }

    if (data.code === "ERR_NETWORK") {
      setErrorMessage(true);
    }
  };

  const keyboardHandler = (value: number) => {
    naviagate(`/keyboard-information/${value}`);
  };

  useEffect(() => {
    getKeyboardData();
  }, []);

  let gridContainer = (keyboard: apiDataProp) => (
    <Grid item xs={16} md={6} lg={4} xl={3}>
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
      {errorMessage ? (
        <div>No Data</div>
      ) : (
        <div className="keyboardContainer">
          <Grid container spacing={{ xs: 2, md: 3 }}>
            {apiData.map((apiData: apiDataProp) => gridContainer(apiData))}
          </Grid>
        </div>
      )}
    </div>
  );
};

export default Home;
