import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { io } from "socket.io-client";
import Box from "@mui/material/Box";
import "./Forum.css";

function Forum() {
  const [socket, setSocket] = useState(null);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setSocket(io("http://localhost:3500"));

    return () => {
      socket.disconnect();
    };
  }, []);

  const handleForm = (e) => {
    e.preventDefault();
    // console.log(message);
    socket.emit("send-message");
    setMessage("");
  };
  return (
    <div>
      <h1>Forum</h1>
      <Box component="form" onSubmit={handleForm} className="form">
        <TextField
          id="standard-basic"
          label="Send a message"
          variant="standard"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button variant="outlined" type="submit" m className="mui-btn">
          Submit
        </Button>
      </Box>
    </div>
  );
}

export default Forum;
