import axios from "axios";
import { useState } from "react";
import { Button } from "@mui/material";

export default () => {
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState("");
  function validateEmail(evt: any) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)
    ) {
      setError("");
      setEmail(evt.target.value);
      return;
    }
    setError("Enter a valid email address");
  }

  function hanldeSubmit(e: any, email: string) {
    e.preventDefault();
    if (error) return;
    axios.get(
      `https://eagleclothes-backend-production.up.railway.app/api/users/forgotPassword/${email}`
    );
    setSent("sent");
  }

  return (
    <>
      {sent ? (
        <div className="login_form">
          <div className="login_label2">
            We have sent you an email reseting ur password
          </div>
        </div>
      ) : (
        <>
          <div className="login_form">
            <div className="login_label">Enter your email:</div>
            <input
              className="login_input"
              onChange={validateEmail}
              type="text"
            />
          </div>
          {error ? <div className="login_error">{error}</div> : null}
          <div className="login_buttonContainer">
            <Button
              sx={{
                borderColor: "#222222",
                color: "#222222",
                height: "40px",
                padding: "12px",
                margin: "12px",
                width: "210px",
                ":hover": { color: "blue" },
              }}
              variant="outlined"
              onClick={(e) => hanldeSubmit(e, email)}
            >
              Continue
            </Button>
          </div>
        </>
      )}
    </>
  );
};
