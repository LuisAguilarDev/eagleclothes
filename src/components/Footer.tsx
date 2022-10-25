import React from "react";
import Logo from "../assets/logo.svg";
import Linkedin from "../assets/linkedin.svg";
import Twitter from "../assets/twitter.svg";
import facebook from "../assets/facebook.svg";
import Instagram from "../assets/instagram.svg";
import { MdOutlineMail } from "react-icons/md";

export default () => {
  return (
    <footer>
      <div className="Footer_bottomBox">
        <div>
          <img className="Footer_Logo" src={Logo} alt="Not Found" />
        </div>
        <div className="Footer_itemList">
          <div>Home</div>
          <div>About</div>
          <div>New Collection</div>
          <div>Contact</div>
          <div>Catalog</div>
          <div>FAQ</div>
        </div>
        <div>
          <div className="footer_NewsLetter">
            Be the first to know about our biggest and best sales. We'll never
            send more than one email a month.
          </div>
          <form className="footer_form">
            <input
              className="footer_NewsLetter_input"
              placeholder="ENTER YOUR EMAIL"
            />
            <MdOutlineMail className="footer_mailicon" />
          </form>
          <div className="footer_social">
            <div className="footer_twitter">
              <img src={Twitter} alt="Not Found" />
            </div>
            <div className="footer_linkedin">
              <img className="footer_filter" src={Linkedin} alt="Not Found" />
            </div>
            <div className="footer_facebook">
              <img className="footer_filter" src={facebook} alt="Not Found" />
            </div>
            <div className="footer_Instagram">
              <img className="footer_filter" src={Instagram} alt="Not Found" />
            </div>
          </div>
        </div>
      </div>
      <div className="Footer_footer">All rights are reserved</div>
    </footer>
  );
};
