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
        In line with Open Energy Transition regulatory obligations, changes to
        <span> </span>
        <Link to={pageLink}>Controlled documents</Link>
        <span> </span>
        must be approved and merged by a code maintainer. All contributions are
        welcome and encouraged.
      </p>
    </div>
  );
};

export default ControlledDocBanner;
