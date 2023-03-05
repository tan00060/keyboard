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
import { useMutation, useQuery, useQueryClient } from "react-query";

type switchType = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

const ViewSwitches = () => {
  const [open, setOpen] = React.useState(false);
  const [currentSwitch, setCurrentSwitch] = useState<number | null>(null);
  let queryClient = useQueryClient();

  const switchesQueryResults = useQuery({
    queryKey: ["switches"],
    queryFn: () => getKeyboardSwitches(),
  });

  const handleClickOpen = (switchId: number) => {
    setCurrentSwitch(switchId);
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentSwitch(null);
    setOpen(false);
  };

  const deleteKeyboardSwitch = useMutation({
    mutationFn: deleteSwitchById,
    onSuccess: () => {
      queryClient.invalidateQueries(["switches"]);
      setOpen(false);
    },
  });

  const deleteSwitchHandler = async () => {
    deleteKeyboardSwitch.mutate(currentSwitch?.toString());
  };

  if (switchesQueryResults.isLoading) return <h1>loading</h1>;
  if (switchesQueryResults.isError) return <h1> error</h1>;

  return (
    <div>
      <Table
        style={{ background: "white", margin: "auto", width: "90%" }}
        size="small"
        sx={{ minWidth: 650 }}
        aria-label="simple table"
      >
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
            <TableCell align="left">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {switchesQueryResults.data.map((item: switchType) => (
            <TableRow
              key={item.switch_id}
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
