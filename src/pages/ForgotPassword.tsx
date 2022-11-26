import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    axios.get(`http://localhost:5000/api/users/forgotPassword/${email}`);
    setSent("sent");
  }

  return (
    <>
      {sent ? (
        <div>We have sent you an email reseting ur password</div>
      ) : (
        <>
          <div>Enter your email:</div>
          <input onChange={validateEmail} type="text" />
          {error ? <div>{error}</div> : null}
          <button onClick={(e) => hanldeSubmit(e, email)}>Continue</button>
        </>
      )}
    </>
  );
};
