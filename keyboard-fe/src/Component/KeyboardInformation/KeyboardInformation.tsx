import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteKeyboardById, getKeyboardById } from "../../ApiCall/ApiCall";
import { useNavigate } from "react-router";
import { useQuery, useMutation, useQueryClient } from "react-query";

type keyboardProps = {
  keyboard_id: number;
  keyboard_name: string;
  keyboard_type_name: string;
  switch_name: string;
  switch_type: string;
};

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

  const deleteKeyboardHandler = (id: string | undefined) => {
    deleteKeyboard.mutate(id);
  };

  if (keyboardIdQueryResults.isLoading) return <h1>loading</h1>;
  if (keyboardIdQueryResults.isError) return <h1> error</h1>;

  return (
    <div>
      <div>
        <p>{keyboardIdQueryResults.data?.keyboard_name}</p>
        <p>{keyboardIdQueryResults.data?.keyboard_type_name}</p>
        <p>{keyboardIdQueryResults.data?.switch_name}</p>
        <p>{keyboardIdQueryResults.data?.switch_type}</p>
      </div>

      {keyboardIdQueryResults.data?.keyboard_name ? (
        <div>
          <button onClick={() => deleteKeyboardHandler(id)}>
            delete keyboard
          </button>
        </div>
      ) : null}

      <div>{/* <button onClick={() => backHandler()}>back</button> */}</div>
    </div>
  );
};

export default KeyboardInformation;
