import { useState, useEffect } from "react";
import { URL } from "./App";
import { Updateteacher } from "./Updateteacher";

// Edit User data

export function Updateteacherlist({ id, setCount, setData }) {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const handleClickOpen = () => {
    setOpen(true);
  };

  useEffect(() => {
    fetch(`${URL}/teachers/${id}`, { method: "GET" })
      .then((x) => x.json())
      .then((x) => setUser(x));
  }, [id]);

  // Component will render only after getting the data
  if (user !== null) {
    return (
      <Updateteacher
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
