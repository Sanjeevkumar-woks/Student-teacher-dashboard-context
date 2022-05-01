import { useContext } from "react";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";
import ForumIcon from "@mui/icons-material/Forum";
import { context } from "./App";

export function Dashboard() {
  const { studentdata, teacherdata } = useContext(context);

  return (
    <div className="display">
      <h1 className="heading">Dashboard</h1>
      <div className="report">
        {/* Monthly earning Reflector */}
        <div className="earning-monthly">
          <p>Teachers</p>
          <div className="icons">
            <span>Count</span>
            <h2>{teacherdata.length}</h2>
            <AccountBoxIcon sx={{ fontSize: "40px" }} />
          </div>
        </div>

        {/* Annual Earning Reflector  */}
        <div className="earning-annualy">
          <p>Students</p>

          <div className="icons">
            <span>Count</span>
            <h2>{studentdata.length}</h2>
            <AccountCircleIcon sx={{ fontSize: "40px" }} />
          </div>
        </div>

        {/* Task Complition Reflector */}
        <div className="tasks">
          <p>Tasks</p>
          <div className="icons">
            <span>Percentage</span>
            <h2>50%</h2>
            <AssignmentOutlinedIcon sx={{ fontSize: "40px" }} />
          </div>
        </div>

        {/* Pending Work Reflector */}
        <div className="pending">
          <p>Request</p>
          <div className="icons">
            <span>Count</span>
            <h2>18</h2>
            <ForumIcon sx={{ fontSize: "40px" }} />
          </div>
        </div>
      </div>
    </div>
  );
}
