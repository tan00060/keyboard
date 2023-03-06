import React, { useState, ChangeEvent } from "react";
import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  editKeyboardsById,
  getKeyboardSwitches,
  getKeyboardType,
} from "../../ApiCall/ApiCall";

type keyboardTypeProp = {
  keyboard_type_id: number;
  keyboard_type_name: string;
};

type switchProp = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const EditKeyboardModal = ({ keyboard }: any) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let queryClient = useQueryClient();
  const [keyboardSwitches, setKeyboardSwitches] = useState(
    keyboard?.switch_id?.toString()
  );

  const [keyboardType, setKeyboardType] = useState(
    keyboard?.keyboard_type_id?.toString()
  );

  const [keyboardName, setKeyboardName] = useState(keyboard.keyboard_name);

  const keyboardSwitchResults = useQuery({
    queryKey: ["switches"],
    queryFn: async () => {
      const data = await getKeyboardSwitches();
      return data;
    },
  });

  const getTypeFromApi = useQuery({
    queryKey: ["types"],
    queryFn: async () => {
      const data = await getKeyboardType();
      return data;
    },
  });

  const editKeyboardMutation = useMutation({
    mutationFn: editKeyboardsById,
    onSuccess: () => {
      queryClient.invalidateQueries(["keyboard"]);
      handleClose();
    },
  });

  const editKeyboardHandler = (value: {}) => {
    let newKeyboardData = {
      keyboard_id: keyboard.keyboard_id,
      keyboard_name: keyboardName,
      keyboard_type_id: parseInt(keyboardType),
      keyboard_switches: parseInt(keyboardSwitches),
    };

    editKeyboardMutation.mutate(newKeyboardData);
  };

  if (getTypeFromApi.isLoading) return <h1>loading</h1>;
  if (getTypeFromApi.isError) return <h1> error</h1>;
  if (keyboardSwitchResults.isLoading) return <h1>loading</h1>;
  if (keyboardSwitchResults.isError) return <h1> error</h1>;

  const keyboardSwitchHandler = (e: SelectChangeEvent) => {
    setKeyboardSwitches(e.target.value);
  };

  const keyboardTypeHandler = (e: SelectChangeEvent) => {
    setKeyboardType(e.target.value);
  };

  const keyboardNameHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setKeyboardName(e.target.value);
  };

  return (
    <div>
      <Button size="small" onClick={handleOpen}>
        Edit
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Grid container spacing={1} columns={16}>
            <Grid item xs={16}>
              <TextField
                value={keyboardName}
                required
                id="outlined-basic"
                label="Keyboard name"
                variant="outlined"
                fullWidth
                onChange={keyboardNameHandler}
              />
            </Grid>

            <Grid item xs={16}>
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
                      <MenuItem
                        key={item.keyboard_type_id}
                        value={item.keyboard_type_id.toString()}
                      >
                        {item.keyboard_type_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>

            <Grid item xs={16}>
              <FormControl fullWidth>
                <InputLabel>Switches</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={keyboardSwitches}
                  label="Switches *"
                  onChange={keyboardSwitchHandler}
                >
                  {keyboardSwitchResults.data.map((item: switchProp) => {
                    return (
                      <MenuItem
                        key={item.switch_id}
                        value={item.switch_id.toString()}
                      >
                        {item.switch_name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
          </Grid>

          <Grid style={{ textAlign: "right" }}>
            <Button onClick={handleClose}>Close</Button>
            <Button onClick={editKeyboardHandler}>Edit</Button>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
};

export default EditKeyboardModal;
