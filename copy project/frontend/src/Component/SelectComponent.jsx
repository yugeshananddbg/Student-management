import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function TextFieldSizes() {
  const [value, setValue] = useState("");
  const [err, setErr] = useState({});
  const btnHandler = (e) => {
    const val=e.target.value
    setValue(val)
    if (value.length < 4) {
      setErr({
        email: "Email Should be 4 caracteer long incorrect",
      });
    } else {
      setErr({
        email: null,
      });
    }
    
  };
  console.log(value)
  return (
    <Box
      component="form"
      sx={{
        "& .MuiTextField-root": { m: 1, width: "25ch" },
      }}
      autoComplete="off"
    >
      <TextField
        error={err.email}
        label="Size"
        id="outlined-size-normal"
        defaultValue={value}
        helperText={err.email}
        onChange={btnHandler}
      />
    </Box>
  );
}
