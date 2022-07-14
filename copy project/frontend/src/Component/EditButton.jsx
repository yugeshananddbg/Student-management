import React, { useState } from "react";
import "./button.css";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Country, State } from "country-state-city";
import { FormGroup, MenuItem } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import Checkbox from "@mui/material/Checkbox";

const EditButton = (props) => {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(props.props.name);
  const [email, setEmail] = useState(props.props.email);
  const [open, setOpen] = useState(false);
  const [country, setCountry] = useState(props.props.country);
  const [state, setState] = useState(props.props.state);
  const [date, setDate] = useState(props.props.date);
  const [checked, setChecked] = useState(false);
  const [err, setErr] = useState({});

  const handleCheck = (event) => {
    setChecked(event.target.checked);
  };
  const handleCountry = (event) => {
    setCountry(event.target.value);
  };
  const handleState = (event) => {
    setState(event.target.value);
  };
  const btnHandler = () => {
    setOpen(true);
    setEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const validateEmail = (e) => {
    const tempemail = e.target.value;
    const regex = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
    const found = tempemail.match(regex);
    if (found) {
      setEmail(e.target.value);
      setErr({
        email: null,
      });
    } else {
      setErr({
        email: "Invalid Email",
      });
    }
  };
  const validateName = (e) => {
    if (e.target.value.length < 4) {
      setErr({
        name: "Name Should be atleast 4 char long",
      });
    } else {
      setErr({
        name: null,
      });
      setName(e.target.value);
    }
  };

  const editBtnHandler = () => {
    if (name && email && country && state && date) {
      const body = {
        name: name,
        email: email,
        country: country,
        state: state,
        dateOfBirth: new Date(date),
      };
      console.log(body);

      fetch(`http://localhost:4000/api/v1/student/update/${props.props._id}`, {
        method: `PUT`,
        body: JSON.stringify(body),
        headers: {
          "content-Type": "application/json",
        },
      })
        .then((response) => {
          return response.json();
        })
        .then(() => {});
      setOpen(false);
    } else {
      setErr({
        globalErr: "* Please Fill all the field",
      });
    }
  };

  return (
    <>
      <div className="butn">
        <button className="btnStyle eview" onClick={btnHandler}>
          Edit
        </button>
        {edit ? (
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Update Student</DialogTitle>
            <DialogContent>
              <DialogContentText>
                Enter Name and email id of the student to Update
              </DialogContentText>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Enter Name"
                type="text"
                fullWidth
                variant="standard"
                defaultValue={name}
                error={err.name}
                helperText={err.name}
                onChange={validateName}
              />
              <TextField
                autoFocus
                margin="dense"
                id="email"
                label="Enter Email Address"
                type="email"
                fullWidth
                variant="standard"
                error={err.email}
                helperText={err.email}
                defaultValue={email}
                onChange={validateEmail}
              />

              <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                <InputLabel id="demo-select-small">Country</InputLabel>
                <Select
                  labelId="demo-select-small"
                  id="demo-select-small"
                  value={country}
                  label="Country"
                  onChange={handleCountry}
                >
                  {Country &&
                    Country.getAllCountries().map((item) => (
                      <MenuItem value={item.isoCode} key={item.isoCode}>
                        {item.name}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>

              {country && (
                <FormControl sx={{ m: 1, minWidth: 120 }} size="medium">
                  <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={state}
                    label="State"
                    onChange={handleState}
                  >
                    {State &&
                      State.getStatesOfCountry(country).map((item) => (
                        <MenuItem value={item.isoCode} key={item.isoCode}>
                          {item.name}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              )}
              <br />
              <br />
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                  size="small"
                  label="Date of birth"
                  value={date}
                  onChange={(date) => {
                    setDate(date);
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <FormGroup>
                <FormControlLabel
                  control={
                    <Checkbox checked={checked} onChange={handleCheck} />
                  }
                  label="Are you sure all details are correct"
                />
              </FormGroup>

              {err.globalErr ? <div className="err">{err.globalErr}</div> : ""}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose}>Cancel</Button>

              {checked ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={editBtnHandler}
                >
                  Update Student
                </Button>
              ) : (
                <Button
                  variant="outlined"
                  color="success"
                  disabled
                  onClick={editBtnHandler}
                >
                  Update Student
                </Button>
              )}
            </DialogActions>
          </Dialog>
        ) : (
          ""
        )}
      </div>
    </>
  );
};

export default EditButton;
