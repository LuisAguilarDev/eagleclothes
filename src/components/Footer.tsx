import React, { useState } from "react";
import Logo from "../assets/logo.svg";
import Linkedin from "../assets/linkedin.svg";
import Twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import { MdOutlineMail } from "react-icons/md";
import Swal from "sweetalert2";
import "sweetalert2/src/sweetalert2.scss";

export default () => {
  const [email, setEmail] = useState<string>("");
  const [error, setError] = useState(false);

  function handlesubscribe() {
    if (error) {
      return;
    }
    Swal.fire({
      icon: "success",
      title: `<div>Succesfully added to our Newsletter</div>`,
      timer: 1500,
      showConfirmButton: false,
    });
  }
  function handleChange(evt: any) {
    if (
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(evt.target.value)
    ) {
      setError(false);
      return;
    }
    setError(true);
  }
  return (
    <div className="view100vw">
      <footer>
        <div className="Footer_mainContainer">
          <div className="Footer_bottomBox">
            <div>
              <img className="Footer_Logo" src={Logo} alt="Not Found" />
            </div>
            <div className="Footer_itemList">
              <div>
                <span>Home</span>
              </div>
              <div>
                <span>About</span>
              </div>
              <div>
                <span>New Collection</span>
              </div>
              <div>
                <span>Contact</span>
              </div>
              <div>
                <span>Catalog</span>
              </div>
              <div>
                <span>FAQ</span>
              </div>
            </div>
            <div>
              <div className="footer_NewsLetter">
                Be the first to know about our biggest and best sales. We'll
                never send more than one email a month.
              </div>
              <form className="footer_form">
                <input
                  className="footer_NewsLetter_input"
                  placeholder="ENTER YOUR EMAIL"
                  onChange={(evt) => handleChange(evt)}
                />
                <MdOutlineMail
                  onClick={handlesubscribe}
                  className="footer_mailicon"
                />
              </form>
              {error ? (
                <div className="Error">Please enter a valid email address</div>
              ) : null}
              <div className="footer_social">
                <div className="footer_twitter">
                  <a
                    href="https://twitter.com/Luisgerardo900"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img src={Twitter} alt="Not Found" />
                  </a>
                </div>
                <div className="footer_linkedin">
                  <a
                    href="https://www.linkedin.com/in/luisgaguilarg/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="footer_filter"
                      src={Linkedin}
                      alt="Not Found"
                    />
                  </a>
                </div>
                <div className="footer_facebook">
                  <a
                    href="https://www.facebook.com/luis.g.aguilar1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="footer_filter"
                      src={facebook}
                      alt="Not Found"
                    />
                  </a>
                </div>
                <div className="footer_Instagram">
                  <a
                    href="https://www.instagram.com/luisgerardo900/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      className="footer_filter"
                      src={Instagram}
                      alt="Not Found"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="Footer_footer">All rights are reserved</div>
      </footer>
    </div>
  );
};
