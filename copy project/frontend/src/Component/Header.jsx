
import "./Header.css";
import  React from "react";
// import Button from "@mui/material/Button";
// import TextField from "@mui/material/TextField";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogContentText from "@mui/material/DialogContentText";
// import DialogTitle from "@mui/material/DialogTitle";
// import { Link } from "react-router-dom";

const Header = () => {
//  const [open, setOpen] = useState(false);
//  const [name, setName] = useState("")
//  const [email, setEmail] = useState("")

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = () => {
//     setOpen(false);
//   };

//   const addBtnHandler = () =>{
//     const body={
//         name: name,
//         email: email
//     }
    

//     fetch("http://localhost:4000/api/v1/add/", {
//       method: `POST`,
//       body: JSON.stringify(body),
//       headers: {
//         "content-Type": "application/json",
//       },
//     })
//       .then((response) => {
//         return response.json();
//       })
//       .then(() => {});
//        setOpen(false);

// }
  return (
    <div className="header">
      <div className="logo">
        <h1>Ekant</h1>
      </div>
      {/* <div className="menu">
        <ul>
          <li>
            <Link to="/">Home</Link>
            <Link to="/" onClick={handleClickOpen}>
              Add student
            </Link>
          </li>
        </ul>
      </div> */}
      {/* <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Add Student</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter Name and email id of the student to add
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            autoFocus
            margin="dense"
            id="email"
            label="Enter Email Address"
            type="email"
            fullWidth
            variant="standard"
            onChange={(e) => setEmail(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={addBtnHandler}>Add Student</Button>
        </DialogActions>
      </Dialog> */}
    </div>
  );
};

export default Header;