import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from "@mui/material";
import { getKeyboardSwitches } from "../../ApiCall/ApiCall";

type switchType = {
  switch_id: number;
  switch_name: string;
  switch_type: string;
};

const ViewSwitches = () => {
  const [switches, setSwitches] = useState([]);

  const getSwitchesFromApi = async () => {
    let getSwitches = await getKeyboardSwitches();

    if (getSwitches) {
      setSwitches(getSwitches);
    }
  };

  useEffect(() => {
    getSwitchesFromApi();
  }, []);

  return (
    <div>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="left">Type</TableCell>
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
            </TableRow>
          ))}
        </TableBody>{" "}
      </Table>
    </div>
  );
};

export default ViewSwitches;
