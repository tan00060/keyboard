import React, { useState, ChangeEvent } from "react";
import { useNavigate } from "react-router";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import {
  Grid,
  Button,
  FormHelperText,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
} from "@mui/material";

import "./CreateSwitch.scss";
import { createKeyboardSwitch } from "../../ApiCall/ApiCall";

const CreateSwitch = () => {
  let naviagate = useNavigate();

  const [switchType, setSwitchType] = React.useState("");
  const [switchName, setSwitchName] = React.useState("");
  const [requiredSwitchName, setRequiredSwitchName] = useState<boolean>(false);
  const [requiredSwitchType, setRequiredSwitchType] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    setSwitchType(event.target.value as string);
  };

  const switchNameHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setSwitchName(event.target.value);
  };

  const createSwitchHandler = async () => {
    if (switchName.trim() === "" || switchType.trim() === "") {
      if (switchName.trim() === "") {
        setRequiredSwitchName(true);
      }

      if (switchType.trim() === "") {
        setRequiredSwitchType(true);
      }
      return;
    }

    setRequiredSwitchType(false);
    setRequiredSwitchName(false);

    let createObject = {
      switch_name: switchName,
      switch_type: switchType,
    };

    let createSwitch = await createKeyboardSwitch(createObject);

    if (createSwitch.status.includes("Created switch")) {
      naviagate("/switches");
    }
  };

  return (
    <div className="createSwitchInputContainer">
      <Box sx={{ width: "100%" }}>
        <Grid container spacing={1} columns={16}>
          <Grid item xs={8}>
            <TextField
              error={requiredSwitchName}
              required
              id="outlined-basic"
              label="Switch Name"
              variant="outlined"
              onChange={switchNameHandler}
              fullWidth
            />
            <FormHelperText>Required</FormHelperText>
          </Grid>

          <Grid item xs={8}>
            <FormControl fullWidth>
              <InputLabel>Switch Type</InputLabel>
              <Select
                error={requiredSwitchType}
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={switchType}
                label="switchType *"
                onChange={handleChange}
              >
                <MenuItem value={"Linear"}>Linear</MenuItem>
                <MenuItem value={"Tactile"}>Tactile</MenuItem>
                <MenuItem value={"Clicky"}>Clicky</MenuItem>
              </Select>
              <FormHelperText>Required</FormHelperText>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <div className="switchCreateButtonContainer">
        <Button onClick={createSwitchHandler} variant="contained">
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateSwitch;
