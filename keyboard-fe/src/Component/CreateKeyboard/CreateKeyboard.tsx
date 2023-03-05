import React, { useState, ChangeEvent, useEffect } from "react";
import { useNavigate } from "react-router";
import {
  createKeyboard,
  getKeyboardType,
  getSwitches,
} from "../../ApiCall/ApiCall";
import "./CreateKeyboard.scss";
import { useQuery, useMutation, useQueryClient } from "react-query";

import {
  Grid,
  Button,
  FormHelperText,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  TextField,
  Select,
  SelectChangeEvent,
} from "@mui/material";

type switchProp = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

type keyboardTypeProp = {
  keyboard_type_id: number;
  keyboard_type_name: string;
};

const CreateKeyboard = () => {
  let naviagate = useNavigate();
  let queryClient = useQueryClient();

  const [keyboardName, setKeyboardName] = useState("");
  const [keyboardType, setKeyboardType] = useState("");
  const [keyboardSwitches, setKeyboardSwitches] = useState("");
  const [requireName, setRequireName] = useState(false);

  //#region handlers
  const keyboardNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyboardName(e.target.value);
  };

  const keyboardSwitchHandler = (e: SelectChangeEvent) => {
    setKeyboardSwitches(e.target.value);
  };

  const keyboardTypeHandler = (e: SelectChangeEvent) => {
    setKeyboardType(e.target.value);
  };

  const clearButtonHandler = () => {
    setKeyboardName("");
    setKeyboardType("");
    setKeyboardSwitches("");
  };

  const createKeyboardHandler = () => {
    let keyboardObj = {
      keyboard_name: keyboardName.trim(),
      keyboard_type:
        keyboardType.trim() === "" ? null : parseInt(keyboardType.trim()),
      keyboard_switch:
        keyboardSwitches.trim() === ""
          ? null
          : parseInt(keyboardSwitches.trim()),
    };

    if (keyboardObj.keyboard_name.trim() === "") {
      setRequireName(true);
      return;
    }
    setRequireName(false);
    createKeyboardApiCall.mutate(keyboardObj);
  };
  //#endregion

  //creating keyboard to api
  const createKeyboardApiCall = useMutation({
    mutationFn: createKeyboard,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["keyboards"]);
      if (data.status.includes("Created Keyboard")) {
        naviagate(`/`);
      }
    },
  });

  //getting switches from api
  const getSwitchFromAPI = useQuery({
    queryKey: ["switches"],
    queryFn: async () => {
      const data = await getSwitches();
      return data;
    },
  });

  //getting types from api
  const getTypeFromApi = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const data = await getKeyboardType();
      return data;
    },
  });

  if (getSwitchFromAPI.isLoading) return <h1>loading</h1>;
  if (getSwitchFromAPI.isError) return <h1> error</h1>;
  if (getTypeFromApi.isLoading) return <h1>loading</h1>;
  if (getTypeFromApi.isError) return <h1> error</h1>;

  return (
    <div>
      <div className="createKeyboardInputContainers">
        <Box>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={8}>
              <TextField
                value={keyboardName}
                required
                id="outlined-basic"
                label="Keyboard name"
                variant="outlined"
                fullWidth
                onChange={keyboardNameHandler}
              />
              <FormHelperText style={{ marginBottom: "10px" }}>
                Required
              </FormHelperText>
            </Grid>

            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Keyboard Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={keyboardType}
                  label="keyboardType *"
                  onChange={keyboardTypeHandler}
                >
                  {getTypeFromApi.data.map((item: keyboardTypeProp) => {
                    return (
                      <MenuItem value={item.keyboard_type_id.toString()}>
                        {item.keyboard_type_name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText style={{ marginBottom: "10px" }}>
                  Required
                </FormHelperText>
              </FormControl>
            </Grid>

            <Grid item xs={8}>
              <FormControl fullWidth>
                <InputLabel>Switches</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={keyboardSwitches}
                  label="Switches *"
                  onChange={keyboardSwitchHandler}
                >
                  {getSwitchFromAPI.data.map((item: switchProp) => {
                    return (
                      <MenuItem value={item.switch_id.toString()}>
                        {item.switch_name}
                      </MenuItem>
                    );
                  })}
                </Select>
                <FormHelperText style={{ marginBottom: "10px" }}>
                  Required
                </FormHelperText>
              </FormControl>
            </Grid>
          </Grid>
        </Box>
      </div>

      <div className="createKeyboardButtonContainers">
        <Button
          style={{ margin: "0.4em" }}
          onClick={clearButtonHandler}
          variant="contained"
        >
          Clear
        </Button>
        <Button
          style={{ margin: "0.4em" }}
          onClick={createKeyboardHandler}
          variant="contained"
        >
          Create
        </Button>
      </div>
    </div>
  );
};

export default CreateKeyboard;
