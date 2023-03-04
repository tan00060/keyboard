import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
  Button,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { deleteSwitchById, getKeyboardSwitches } from "../../ApiCall/ApiCall";

type switchType = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

const ViewSwitches = () => {
  const [switches, setSwitches] = useState([]);
  const [open, setOpen] = React.useState(false);
  const [currentSwitch, setCurrentSwitch] = useState<number | null>(null);

  const getSwitchesFromApi = async () => {
    let getSwitches = await getKeyboardSwitches();

    if (getSwitches) {
      setSwitches(getSwitches);
    }
  };

  useEffect(() => {
    getSwitchesFromApi();
  }, []);

  const handleClickOpen = (switchId: number) => {
    setCurrentSwitch(switchId);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentSwitch(null);
    setOpen(false);
  };

  const deleteSwitchHandler = async () => {
    //delete on the DB
    let deleteSwitchResult = await deleteSwitchById(currentSwitch?.toString());
    console.log(deleteSwitchResult);

    if (deleteSwitchResult.status.includes("has been deleted")) {
      //delete locally for new
      let newSwitchList = switches.filter(
        (item: switchType) => item.switch_id !== currentSwitch
      );
      setOpen(false);
      setSwitches(newSwitchList);
    }
  };

  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {switches.map((item: switchType) => (
            <TableRow
              key={item.switch_name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.switch_name}
              </TableCell>
              <TableCell align="left">{item.switch_type}</TableCell>
              <TableCell align="left">
                <Button
                  variant="outlined"
                  onClick={() => handleClickOpen(item.switch_id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Delete Switch?"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this switch?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={deleteSwitchHandler} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ViewSwitches;
