import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Button, IconButton, Paper } from "@mui/material";
import AddReactionIcon from "@mui/icons-material/AddReaction";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { context, URL } from "./App";
import { Updatestudentlist } from "./Updatestudentlist";

export function StudentsList() {
  let navigate = useNavigate();
  const { getstudentsdata, studentdata, setStudentData } = useContext(context);

  let [count, setCount] = useState(0);

  const del = (id) => {
    fetch(`${URL}/students/${id}`, { method: "DELETE" })
      .then((data) => data.json())
      .then(() => getstudentsdata());
  };
  return (
    <div className="display">
      <p className="heading">Students-List</p>
      <Button
        variant="outlined"
        sx={{ ml: "47%", mt: "10px" }}
        onClick={() => navigate("/addstudent")}
      >
        <AddReactionIcon />
        Student
      </Button>
      {/* // Table Heading */}
      <TableContainer component={Paper} id="table">
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="center">Photo</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="center">Mobile</TableCell>
              <TableCell align="center">Email</TableCell>
              <TableCell align="center">Status</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>

          {/* Table Body */}
          <TableBody>
            {/* Table Body */}
            {studentdata.map(({ Name, Avatar, Mobile, Mail, Status, id }) => {
              return (
                //  Table row : Individual user data
                <TableRow
                  className="userdata"
                  key={id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row" align="center">
                    <img className="userpic" src={Avatar} alt={Name}></img>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="username">{Name} </p>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="userphnno">{Mobile} </p>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="usermail">{Mail} </p>
                  </TableCell>
                  <TableCell align="center">
                    {" "}
                    <p className="status">{Status} </p>
                  </TableCell>
                  <TableCell align="center">
                    <div className="action">
                      <IconButton onClick={() => del(id)} color="error">
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        onClick={() => {
                          setCount(id);
                        }}
                      >
                        <ModeEditIcon color="success" />
                      </IconButton>
                      {count !== 0 ? (
                        <Updatestudentlist
                          id={count}
                          setCount={setCount}
                          setData={setStudentData}
                        />
                      ) : null}
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
