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
        <div class={styles.centered_text}>The Open Energy Transition Handbook</div>
        <div className={styles.subcontainer}>
          <p>Welcome to the Open Energy Transition Handbook repository!</p>
          <p>
            This repository serves as a centralized hub for managing and
            tracking policies company-wide for Open Energy Transition.
          </p>
          <p>
            visit OET website{" "}
            <span>
              <Link to={"https://openenergytransition.org/"}>here</Link>
            </span>{" "}
          </p>

          <p>Website Structure</p>
        </div>
        <DocsTable />
      </main>
    </Layout>
  );
}
