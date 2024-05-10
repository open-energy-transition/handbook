import React from "react";

import data from "../../../output.json";
import styles from "./styles.module.css";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";

const DocsTable = () => {
  return (
    <div class={styles.container}>
      {Object.keys(data).map((key) => (
        <div class={styles.component}>
          <PageLinkTable key={key} title={key} items={data[key]} />
        </div>
      ))}
    </div>
  );
};

function camelCaseToNormalText(camelCase) {
  let spacedText = camelCase.replace(/([A-Z])/g, " $1").trim();

  let normalText = spacedText
    .toLowerCase()
    .replace(/(^|\s)(\S)/g, function (match) {
      return match.toUpperCase();
    });

  return normalText;
}

const PageLinkTable = ({ key, title, items }) => {
  const { siteConfig } = useDocusaurusContext();
  const docsBasePath = siteConfig.presets[0].at(1).docs.routeBasePath;
  const pageLink = `${docsBasePath}/${title}`;
  return (
    <div className={styles.table_container}>
      <table className={styles.my_table} key={key}>
        <thead>
          <tr>
            <th className={styles.column_width}>
              <Link to={pageLink}>{camelCaseToNormalText(title)}</Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {items.map((item, index) => (
            <tr key={index}>
              <td className={styles.column_width}>
                <Link to={`${pageLink}/${item}`}>
                  {camelCaseToNormalText(item)}
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DocsTable;
