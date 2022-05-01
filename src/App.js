import "./App.css";
import { createContext, useEffect, useState } from "react";
import { Routes, Route, Link } from "react-router-dom";

//Material UI
//App Bar
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Toolbar from "@mui/material/Toolbar";

//App Bar Icons
import MenuIcon from "@mui/icons-material/Menu";
import Badge from "@mui/material/Badge";
import MailIcon from "@mui/icons-material/Mail";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SchoolIcon from "@mui/icons-material/School";

// Dark Mode
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
// Table

//Dashboard
import { Dashboard } from "./Dashboard";
import { TeachersList } from "./TeachersList";
import { AddTeacher } from "./AddTeacher";
import { StudentsList } from "./StudentsList";
import { AddStudent } from "./AddStudent";

export const URL = `https://6216dcb171e7672e536d1003.mockapi.io`;

export const context=createContext('')

function App() {
  // Dark Mode/ Light Mode Condtional Styling
  let [themechange, setThemechange] = useState("dark");
  let lightmode = (
    <Tooltip title="Light Mode">
      <LightModeIcon style={{ fill: "gold" }} />
    </Tooltip>
  );
  let darkmode = (
    <Tooltip title="Dark Mode">
      <DarkModeIcon style={{ fill: "white" }} />
    </Tooltip>
  );
  let mode = themechange === "light" ? darkmode : lightmode;
  let themebutton = (
    <IconButton
      onClick={() => setThemechange(themechange === "light" ? "dark" : "light")}
    >
      {mode}
    </IconButton>
  );

  // Responsive menu
  const [anchorElNav, setAnchorElNav] = useState(null);

  const Teachers = (
    <Link to="teachers" style={{ textDecoration: "none", color: "white" }}>
      Teachers
    </Link>
  );
  const School = (
    <Link to="/" style={{ textDecoration: "none", color: "white" }}>
      <SchoolIcon />
      School
    </Link>
  );
  const Students = (
    <Link to="students" style={{ textDecoration: "none", color: "white" }}>
      Students
    </Link>
  );
  const pages = [Teachers, Students];

  //Responsive menu opening Handlers
  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const theme = createTheme({
    palette: { mode: themechange },
  });

  //Geting data and setting

  //Students Data
  const[studentdata,setStudentData]=useState([])
  const getstudentsdata = () => {
    fetch(`${URL}/students`, { method: "GET" })
      .then((x) => x.json())
      .then((x) => setStudentData(x));
  };

  //Teachers Data
  const[teacherdata,setTeachertData]=useState([])
  const getteachersdata = () => {
    fetch(`${URL}/students`, { method: "GET" })
      .then((x) => x.json())
      .then((x) => setTeachertData(x));
  };

  useEffect(getstudentsdata,[setStudentData]);
  useEffect(getteachersdata,[setTeachertData]);
  let obj={getstudentsdata,getteachersdata,studentdata,setStudentData,teacherdata,setTeachertData}

  return (
    <ThemeProvider theme={theme}>
      <Paper elevation={0} style={{ borderStyle: "none", minHeight: "100vh" }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <AppBar
            position="static"
            style={{ backgroundColor: themechange === "light" && "#7b49d3" }}
          >
            <Toolbar>
              <Box sx={{ flexGrow: 0.5, display: { xs: "flex", md: "none" } }}>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleOpenNavMenu}
                  color="inherit"
                >
                  <MenuIcon />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorElNav}
                  anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                  }}
                  open={Boolean(anchorElNav)}
                  onClose={handleCloseNavMenu}
                  sx={{
                    display: { xs: "block", md: "none" },
                  }}
                >
                  {pages.map((page) => (
                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
              <Typography variant="h6" component="div" sx={{ flexGrow: 0.2 }}>
                {School}
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: { xs: "none", md: "flex", gap: "1rem" },
                }}
              >
                {pages.map((page) => (
                  <Button
                    key={page}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: "white", display: "block" }}
                  >
                    {page}
                  </Button>
                ))}
              </Box>
              <div className="badge">
                <Badge id="mail" badgeContent={5} color="error">
                  <MailIcon
                    style={{ fill: themechange === "dark" && "greenyellow" }}
                  />
                </Badge>
                <Badge id="notification" badgeContent={7} color="error">
                  <NotificationsIcon
                    style={{ fill: themechange === "dark" && "skyblue" }}
                  />
                </Badge>
                {themebutton}
              </div>
            </Toolbar>
          </AppBar>

          {/* Body */}
          <context.Provider value={obj}>
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route path="teachers" element={<TeachersList />} />
            <Route path="addteacher" element={<AddTeacher />} />
            <Route path="students" element={<StudentsList />} />
            <Route path="addstudent" element={<AddStudent />} />
          </Routes>
          </context.Provider>
          {/* Footer */}
          <Card elevation={2}>
            <footer
              className="footer"
              style={{ backgroundColor: themechange === "light" && "#7b49d3" }}
            >
              <p className="footercontent">
                Copyright © PEMS SchoolWebpage 2022
              </p>
            </footer>
          </Card>
        </Box>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
