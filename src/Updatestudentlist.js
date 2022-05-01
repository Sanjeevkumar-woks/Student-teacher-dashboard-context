import { useState, useEffect } from "react";
import { URL } from "./App";
import { Updatestudent } from "./Updatestudent";

// Edit User data
export function Updatestudentlist({ id, setCount, setData }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetch(`${URL}/students/${id}`, { method: "GET" })
      .then((x) => x.json())
      .then((x) => setUser(x));
  }, [id]);

  // Component will render only after getting the data
  if (user !== null) {
    return (
      <Updatestudent
        user={user}
        open={open}
        handleClickOpen={handleClickOpen}
        setCount={setCount}
        id={id}
        setData={setData}
      />
    );
  } else {
    return null;
  }
}
