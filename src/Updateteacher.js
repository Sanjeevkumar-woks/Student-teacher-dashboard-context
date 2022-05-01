import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import { URL } from "./App";

export function Updateteacher({
  open,
  user,
  id,
  handleClickOpen,
  setCount,
  setData,
}) {
  let navigate = useNavigate();
  // Destruturing from old user data
  const { Name, Avatar, Mobile, Mail } = user;

  // Opens the dialogbox
  handleClickOpen();

  // Update user data
  const updateuser = (updateduser) => {
    fetch(`${URL}/teachers/${id}`, {
      method: "PUT",
      body: JSON.stringify(updateduser),
      headers: { "Content-Type": "Application/Json" },
    })
      .then((x) => x.json())
      .then(() => setCount(0))
      .then(() => getdata());
  };

  // Get data after the update
  const getdata = () => {
    fetch(`${URL}/teachers`, { method: "GET" })
      .then((x) => x.json())
      .then((x) => setData(x))
      .then(() => navigate("/teachers"));
  };

  // Validation
  let validation = yup.object({
    Name: yup.string().required(),
    Avatar: yup.string().required(),
    Mobile: yup.number().typeError("Must Be a Number").required(),
    Mail: yup.string().required(),
  });

  const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
    useFormik({
      initialValues: {
        Name: Name,
        Avatar: Avatar,
        Mobile: Mobile,
        Mail: Mail,
        Status: "Active",
      },
      validationSchema: validation,
      onSubmit: (updateduser) => updateuser(updateduser),
    });

  return (
    <div className="Updateuserlist">
      {/* Popup Menu */}
      <Dialog open={open}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Update User</DialogTitle>

          {/* TextField */}
          <DialogContent>
            <TextField
              type="text"
              value={values.Name}
              name="Name"
              id="Name"
              onInput={handleChange}
              onBlur={handleBlur}
              error={errors.Name && touched.Name}
              helperText={errors.Name && touched.Name && errors.Name}
              className="Updatetextfield"
              label="Name"
              variant="standard"
              placeholder="Enter the username"
            />
            <br />

            <TextField
              type="text"
              value={values.Avatar}
              name="Avatar"
              id="Avatar"
              onInput={handleChange}
              onBlur={handleBlur}
              error={errors.Avatar && touched.Avatar}
              helperText={errors.Avatar && touched.Avatar && errors.Avatar}
              className="Updatetextfield"
              label="Picture"
              variant="standard"
              placeholder="Profile pic url"
            />
            <br />

            <TextField
              type="string"
              value={values.Mobile}
              name="Mobile"
              id="Mobile"
              onInput={handleChange}
              onBlur={handleBlur}
              error={errors.Mobile && touched.Mobile}
              helperText={errors.Mobile && touched.Mobile && errors.Mobile}
              className="Updatetextfield"
              label="Mobile"
              variant="standard"
              placeholder="Enter the Mobile Number"
            />
            <br />

            <TextField
              type="mail"
              value={values.Mail}
              name="Mail"
              id="Mail"
              onInput={handleChange}
              onBlur={handleBlur}
              error={errors.Mail && touched.Mail}
              helperText={errors.Mail && touched.Mail && errors.Mail}
              className="Updatetextfield"
              label="Mail"
              variant="standard"
              placeholder="Enter the Mailid"
            />
            <br />
          </DialogContent>

          <DialogActions>
            <Button
              variant="contained"
              type="submit"
              style={{ marginRight: "5rem", marginBottom: "1rem" }}
            >
              Save
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
