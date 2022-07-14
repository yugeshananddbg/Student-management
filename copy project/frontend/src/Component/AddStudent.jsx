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
const AddStudent = () => {
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");
  const [country, setCountry] = useState("");
  const [state, setState] = useState("");
  const [date, setDate] = useState(null);
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
  const validateEmail =(e)=>{
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

  }
  const editBtnHandler = () => {
    if (name && email && country && state && date) {
      const body = {
        name: name,
        email: email,
        gender: gender,
        country: country,
        state: state,
        dateOfBirth: new Date(date),
      };
      console.log(body);

      fetch(`http://localhost:4000/api/v1/add`, {
        method: `POST`,
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
    <div className="addBtn">
      <Button color="primary" variant="contained" onClick={btnHandler}>
        Add Student
      </Button>
      {edit ? (
        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Add New Student</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Enter correct details of student to add in table
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
              defaultValue={email}
              error={err.email}
              helperText={err.email}
              onChange={validateEmail}
            />
            <FormLabel id="demo-row-radio-buttons-group-label">
              Gender
            </FormLabel>
            <RadioGroup
              row
              aria-labelledby="demo-row-radio-buttons-group-label"
              name="row-radio-buttons-group"
            >
              <FormControlLabel
                value="female"
                control={<Radio onChange={() => setGender("female")} />}
                label="Female"
              />
              <FormControlLabel
                value="male"
                control={<Radio onChange={() => setGender("male")} />}
                label="Male"
              />
              <FormControlLabel
                value="other"
                control={<Radio onChange={() => setGender("other")} />}
                label="Other"
              />
            </RadioGroup>
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
                control={<Checkbox checked={checked} onChange={handleCheck} />}
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
                color="primary"
                onClick={editBtnHandler}
              >
                Add Student
              </Button>
            ) : (
              <Button
                variant="outlined"
                color="primary"
                disabled
                onClick={editBtnHandler}
              >
                Add Student
              </Button>
            )}
          </DialogActions>
        </Dialog>
      ) : (
        ""
      )}
    </div>
  );
};

export default AddStudent;
