import React, { useState } from "react";
import "./button.css";
import { Link } from "react-router-dom";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const EditButton = (props) => {
  const [open, setOpen] = useState(false);
  const [dlt, setDlt] = useState(false);

  const btnHandler = () => {
    setOpen(true);
    setDlt(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const dltBtnHandler = () => {
    fetch(`http://localhost:4000/api/v1/student/delete/${props.props._id}`, {
      method: `DELETE`,
      body: JSON.stringify(props.props),
      headers: {
        "content-Type": "application/json",
      },
    })
      .then((response) => {
        return response.json();
      })
      .then(() => {});
    setOpen(false);
  };
  return (
    <div className="butn">
      <button className="btnStyle dview" onClick={btnHandler}>
        Delete
      </button>
      {dlt ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogContent>
            <DialogContentText>
              Are you Sure to delete Student : {props.props.name}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button variant="contained" color="error" onClick={dltBtnHandler}>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};

export default EditButton;
