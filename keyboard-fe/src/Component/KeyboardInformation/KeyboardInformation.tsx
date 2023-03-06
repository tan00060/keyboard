import React from "react";
import { useParams } from "react-router-dom";
import { deleteKeyboardById, getKeyboardById } from "../../ApiCall/ApiCall";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "react-query";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import EditKeyboardModal from "../EditKeyboardModal/EditKeyboardModal";

const KeyboardInformation = () => {
  let naviagate = useNavigate();
  let queryClient = useQueryClient();
  let { id } = useParams();

  const keyboardIdQueryResults = useQuery({
    queryKey: ["keyboard", id],
    enabled: id !== null,
    queryFn: async () => {
      const data = await getKeyboardById(id);
      return data;
    },
  });

  const deleteKeyboard = useMutation({
    mutationFn: deleteKeyboardById,

    onSuccess: (data) => {
      queryClient.invalidateQueries(["keyboards"]);
      if (data.status.includes("has been deleted")) {
        naviagate(`/`);
      }
    },
  });

  const backHandler = () => {
    naviagate(`/`);
  };

  const deleteKeyboardHandler = (id: string | undefined) => {
    deleteKeyboard.mutate(id);
  };

  if (keyboardIdQueryResults.isLoading) return <h1>loading</h1>;
  if (keyboardIdQueryResults.isError) return <h1> error</h1>;

  return (
    <div>
      <Card style={{ margin: "auto" }} sx={{ maxWidth: "90%" }}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {keyboardIdQueryResults.data.keyboard_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {keyboardIdQueryResults.data.keyboard_type_name}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {keyboardIdQueryResults.data.switch_name}
          </Typography>{" "}
          <Typography variant="body2" color="text.secondary">
            {keyboardIdQueryResults.data.switch_type}
          </Typography>
        </CardContent>
        <CardActions style={{ justifyContent: "right" }}>
          {keyboardIdQueryResults.data?.keyboard_name ? (
            <Button onClick={() => deleteKeyboardHandler(id)} size="small">
              Delete
            </Button>
          ) : null}
          <EditKeyboardModal keyboard={keyboardIdQueryResults.data} />
          <Button onClick={() => backHandler()} size="small">
            Back
          </Button>
        </CardActions>
      </Card>
    </div>
  );
};

export default KeyboardInformation;
