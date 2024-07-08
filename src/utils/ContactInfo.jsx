import React from "react";
import { BiLinkAlt } from "react-icons/bi";
import { Link } from "react-router-dom";

const ContactInfo = ({ title, category, decription, link }) => {
  return (
    <div className=" px-5 md:px-0">
      {title && <p>{title}</p>}
      {category && <p className=" font-light text-category_bio">{category}</p>}
      {decription && <p className=" ">{decription}</p>}
      {link && (
        <div className=" flex items-center gap-3">
          <BiLinkAlt />
          <Link to={link}>{link}</Link>
        </div>
      )}
    </div>
  );
};

export default ContactInfo;
