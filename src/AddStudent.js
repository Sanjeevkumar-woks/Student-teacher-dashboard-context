import { useNavigate } from "react-router-dom";
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField } from '@mui/material';
import { URL } from './App';

export function AddStudent() {
  let navigate = useNavigate();

  // Add user to the database
  const adduser = (newuser) => {
    fetch(`${URL}/students`,
      {
        method: "POST",
        body: JSON.stringify(newuser),
        headers: { 'Content-Type': 'application/json' }
      }).then((user) => user.json()).then(() => navigate('/teachers'));
  };

  // Newly Added Userdata Object with validation
  let validation = yup.object({
    Name: yup.string().required(),
    Avatar: yup.string().required(),
    Mobile: yup.number().typeError('you must specify a number').required(),
    Mail: yup.string().required(),
  });

  const { handleChange, handleBlur, handleSubmit, values, errors, touched } = useFormik({
    initialValues: { Name: '', Avatar: '', Mail: '', Mobile: '', Status: "Active" },
    validationSchema: validation,
    onSubmit: (newuser) => adduser(newuser)
  });

  return (
    <form className="Adduserlist" onSubmit={handleSubmit}>

      {/* TextField */}
      <TextField className='Addtextfield' label="Name" id="Name" name="Name" variant="standard" type="text"
        onBlur={handleBlur} onInput={handleChange} error={errors.Name && touched.Name} value={values.Name}
        helperText={errors.Name && touched.Name && errors.Name} placeholder="Enter the username" /><br />

      <TextField className='Addtextfield' label="Photo" id="Avatar" name='Avatar' variant="standard" type="text"
        onBlur={handleBlur} onInput={handleChange} error={errors.Avatar && touched.Avatar} value={values.Avatar}
        helperText={errors.Avatar && touched.Avatar && errors.Avatar} placeholder="Profile pic url" /><br />

      <TextField className='Addtextfield' label="Mobile Number" id="Mobile" name='Mobile' variant="standard" type="text"
        onBlur={handleBlur} onInput={handleChange} error={errors.Mobile && touched.Mobile} value={values.Mobile}
        helperText={errors.Mobile && touched.Mobile && errors.Mobile} placeholder="Enter the Mobile Number" /><br />

      <TextField className='Addtextfield' label="Mail" id="Mail" name='Mail' variant="standard" type="mail"
        onBlur={handleBlur} onInput={handleChange} error={errors.Mail && touched.Mail} value={values.Mail}
        helperText={errors.Mail && touched.Mail && errors.Mail} placeholder="Enter the Mailid" /><br />
      <br />
      <Button type='Submit' variant="contained" style={{ marginRight: '4rem', marginBottom: "1rem" }}>Add Student</Button>
    </form>);
}
