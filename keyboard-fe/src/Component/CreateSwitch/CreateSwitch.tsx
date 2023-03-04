import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import TextField from "@mui/material/TextField";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { Grid, Button, FormHelperText } from "@mui/material";

import "./CreateSwitch.scss";
import { createKeyboardSwitch } from "../../ApiCall/ApiCall";

type switchProp = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

const CreateSwitch = () => {
  const [switchType, setSwitchType] = React.useState("");
  const [switchName, setSwitchName] = React.useState("");
  const [requiredSwitchName, setRequiredSwitchName] = useState<boolean>(false);
  const [requiredSwitchType, setRequiredSwitchType] = useState<boolean>(false);

  const handleChange = (event: SelectChangeEvent) => {
    console.log(event.target.value);
    setSwitchType(event.target.value as string);
  };

  const switchNameHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
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
      console.log(createSwitch);
      console.log("switch has been created, move to view switches page later");
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
