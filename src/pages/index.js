import React from "react";
import DocsTable from "@site/src/components/DocsTable";
import styles from "./index.module.css";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";


export default function index() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div class={styles.centered_text}>The OET Handbook</div>
        <DocsTable />
      </main>
    </Layout>
  );
}
