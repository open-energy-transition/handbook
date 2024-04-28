import React from "react";
import styles from "./styles.module.css";

const ControlledDocBanner = () => {
  return (
    <div
      className={`${styles.controlled_document_banner} controlled_document_bg`}
    >
      <p className={styles.controlled_document_header}>
        This is a Controlled Document
      </p>
      <p>
        In line with GitLab’s regulatory obligations, changes to
        <span> </span>
        <span className={styles.controlled_document_link}>
          controlled documents
        </span>
        <span> </span>
        must be approved or merged by a code owner. All contributions are
        welcome and encouraged.
      </p>
    </div>
  );
};

export default ControlledDocBanner;
