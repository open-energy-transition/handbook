import React from "react";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const ControlledDocBanner = () => {
  const { siteConfig } = useDocusaurusContext();
  const docsBasePath = siteConfig.presets[0].at(1).docs.routeBasePath;
  const pageLink = `${docsBasePath}/Handbook/ControlledDocument`;
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
        <Link to={pageLink}>controlled documents</Link>
        <span> </span>
        must be approved or merged by a code owner. All contributions are
        welcome and encouraged.
      </p>
    </div>
  );
};

export default ControlledDocBanner;
