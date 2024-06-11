import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import team_data from "../../../team.json";

function ImageComponent(props) {
  const { imageUrl } = props;

  return <img className={styles.tag_image} src={imageUrl} alt="Image" />;
}

function NameLink(props) {
  const { name, externalLink } = props;

  return (
    <Link to={externalLink} target="_blank">
      {name}
    </Link>
  );
}

function GenerateTags({ maintainerEmail }) {
  const memberData = handleSearch(maintainerEmail);

  return (
    <>
      <ImageComponent imageUrl={memberData.image_link} />
      <NameLink
        name={memberData.name}
        externalLink={memberData.redirect_link}
      />
    </>
  );
}

const handleSearch = (email) => {
  const foundResult = team_data.find((item) => item.mail_id === email);
  return foundResult;
};

const MaintainerTag = ({ maintainerEmails }) => {
  return (
    <div className={styles.tag_container}>
      <span className={styles.maintainer}>Maintainers -</span>
      {maintainerEmails.map((email, index) => (
        <React.Fragment key={email}>
          <GenerateTags maintainerEmail={email} />
          {index < maintainerEmails.length - 1 && <span>, </span>}
        </React.Fragment>
      ))}
    </div>
  );
};

export default MaintainerTag;
