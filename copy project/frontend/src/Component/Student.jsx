import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import "./Student.css";

import EditButton from "./EditButton.jsx";
import DeleteButton from "./DeleteButton.jsx";
import { Link } from "react-router-dom";

const Student = () => {
  const [data, setData] = useState([]);
 
  const fetchData = () => {
    fetch("http://localhost:4000/api/v1/student")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, [data]);

  const columns = [
    {
      name: "Student Name",
      selector: (row) => row.name,
    },
    {
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Date of Birth",
      selector: (row) => row.dateOfBirth,
    },
    {
      name: "Country",
      selector: (row) => row.country,
    },
    {
      name: "State",
      selector: (row) => row.state,
    },
    {
      cell: (row) => <EditButton props={row} />,
    },
    {
      cell: (row) => <DeleteButton props={row} />,
    },
  ];
  const customStyles = {
    headCells: {
      style: {
        backgroundColor: "rgba(81, 27, 131, 0.219)",
        color: "rgb(81, 27, 131 )",
        letterSpacing: "2px",
        textAlign: "center",
      },
    },
  };
  return (
    <>
      <div className="studentTable">
        <DataTable
          columns={columns}
          style={{ background: "red" }}
          data={data}
          pagination
          fixedHeader
          fixedHeaderScrollHeight="250px"
          customStyles={customStyles}
          highlightOnHover
          subHeader
          subHeaderComponent={
            <div className="subComponent">
              <h2>STUDENT DETAILS TABLE</h2>
            </div>
          }
          subHeaderAlign="left"
        />
      </div>
    </>
  );
};

export default Student;
