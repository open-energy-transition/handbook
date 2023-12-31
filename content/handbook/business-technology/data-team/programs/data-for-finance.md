---

title: "Data For Finance"
description: “Discover how GitLab Finance Team members can use data for generating analysis and insights”
---









---

The purpose of this handbook page is to help GitLab Finance Team members understand what data is available and how to self-serve in generating analysis and data insights.

## How to Access Data at GitLab

Data can be accessed through Sisense (formerly known as Periscope), which is GitLab's Business Intelligence (BI) tool and is connected to GitLab's Snowflake data warehouse. The [Sisense page](/handbook/business-technology/data-team/platform/sisensecdt/) of the Data team handbook has general information about Sisense aimed for a wider GitLab audience.

#### Finance toolkit

Some useful links that we recommend for you to bookmark:

- [Information on Enterprise Dimensional Model](/handbook/business-technology/data-team/platform/edw/)
- [DBT documentation](https://dbt.gitlabdata.com/#!/overview) where most of the tables are documented
- [Sisense link](https://app.periscopedata.com/app/gitlab/403199/Welcome-Dashboard-%F0%9F%91%8B)

#### Sisense Quick Start Guide

- Everybody at GitLab should automatically have view access granted through Okta.
- To write your own queries and create your own charts + dashboard, you'll need to create an [access request](https://gitlab.com/gitlab-com/team-member-epics/access-requests/-/issues/new?issuable_template=New+Access+Request) asking for the Editor role.

#### The 2 basic building blocks in Sisense are charts and dashboards.

- Charts are queries to the data warehouse, materialized into visualizations.
- Dashboards are collections of charts and have a unique URL (like a "page").

Note: If you have Editor access, you'll be able to create both of these. New dashboards can be created on the left-hand nav bar and charts can be created by clicking "New Chart" in the top right on any dashboard where you have sufficient permissions.

#### Creating Charts

- Clicking _"New Chart"_ will take you to the Sisense SQL editor. This is a safe environment, meaning you don't need to worry about breaking any of the data infrastructure. The Sisense "user" has read access only and will kill all queries lasting longer than 5 minutes, which fits into GitLab's [frugality](/handbook/values/#frugality) value.
    - The variant of SQL used in the data warehouse is [Snowflake SQL](https://docs.snowflake.net/manuals/index.html).
- A great way to learn about building charts is to watch this 10-minute [Data Onboarding](https://www.youtube.com/watch?v=F4FwRcKb95w&feature=youtu.be) video from Sisense.
- If you do happen to experience timeouts in Sisense (you'll see an error message saying "query killed"), reach out to the Data team for help optimizing your query or run it as a one-off with more computational resources.
- Sisense dashboards can be designated as "Official", meaning it has been reviewed by a Data team member. If you're interested in making your dashboard official, the process is documented [here](/handbook/business-technology/data-team/platform/sisensecdt/#official-badge-for-a-dashboard).

#### How do I know what tables are available?

- The Data team uses a tool called [dbt](https://www.getdbt.com/) for our data transformation layer. A nice feature of dbt is dbt docs, which automatically creates documentation for all of the models in our schema. Our dbt docs instance can be found [here](https://dbt.gitlabdata.com/#!/overview).
    - Navigating to `Projects > gitlab_snowflake > models` will give a list of all of the models (think of these as tables) that exist in the data warehouse. Models are organized in directories according to their data source.
- ![](/handbook/business-technology/data-team/programs/data-for-product-managers/projects_periscope.png)
- Clicking on a model will reveal more details including documentation, a column list, and the underlying SQL.
- Also, Sisense will show a list of all tables available for querying on the left-hand side while in the SQL chart editor.
    - ![](/handbook/business-technology/data-team/programs/data-for-product-managers/schemas.png)
    - Table names are always prefixed by their source name. Models that use the Netsuite, Zuora, and Salesforce data sources will have those prefixes at the beginning of the model.

#### What are the top dashboards for Enterprise Resource Planning?

1. [12 Month Expense Trend](https://app.periscopedata.com/app/gitlab/550489/12-Month-Expense-Trend)
1. [Budget vs. Actuals - Sisense Linking to Google Sheets](https://app.periscopedata.com/app/gitlab/571135/WIP:-Brooks-Sandbox)
1. [Vendor Reporting](https://app.periscopedata.com/app/gitlab/557709/Vendor-Reporting)
1. [Accounting Clean-up Dashboard](https://app.periscopedata.com/app/gitlab/570784/Accounting-Clean-Up)

#### What are the top dashboards for Sales, Annual Recurring Revenue, and Retention Analyses?

1. [FP&A Pliny the Elder](https://app.periscopedata.com/app/gitlab/483768/FP&A-Pliny-the-Elder)
1. [Finance KPIs](https://app.periscopedata.com/app/gitlab/483606/Finance-KPIs)
1. [Sales KPIs](https://app.periscopedata.com/app/gitlab/446004/Sales-KPIs)
1. [Retention](https://app.periscopedata.com/app/gitlab/403244/Retention)
1. [Churned ARR](https://app.periscopedata.com/app/gitlab/474221/Churned-ARR)
1. Sisense has a concept of "Topics" which organizes dashboards into topical areas. Check out the [Finance Topic](https://app.periscopedata.com/app/gitlab/topic/Finance/ab8b11d25ee84f218a8f97567d5505b9) to see additional dashboards available in Sisense and to get inspiration for future charts.

#### Historical Reporting Using Snapshot Data

Coming soon...

#### Snippets

Snippets are great ways to allow Periscope users to build charts without writing any SQL. Anyone with editor access can write their own snippets. Here are some snippets to get you started with your analysis:

Coming soon...
