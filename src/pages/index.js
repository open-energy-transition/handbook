import React from "react";
import DocsTable from "@site/src/components/DocsTable";
import styles from "./index.module.css";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import Layout from "@theme/Layout";
import ParticlesSection from "../components/Particles";


export default function index() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Description will go into a meta tag in <head />"
    >
      <main>
        <div class={styles.centered_text}>The Open Energy Transition Handbook
        <ParticlesSection />
        </div>
        <DocsTable />
      </main>
    </Layout>
  );
}
