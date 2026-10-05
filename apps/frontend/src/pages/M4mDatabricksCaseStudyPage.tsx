import { useEffect } from "react";
import afterDatabricks from "../assets/m4m-after-databricks.png";
import beforeDetailed from "../assets/m4m-before-detailed.png";
import beforeOverview from "../assets/m4m-before-overview.png";
import { ZoomableImage } from "../components/ZoomableImage";
import styles from "./caseStudy.module.css";

const INTERFACES = [
  { n: 1, data: "Invoice / payment", source: "ARB", via: "M4M", dest: "OCD", protocol: "SFTP", format: "cXML" },
  { n: 2, data: "Master / reference data", source: "M4M", via: "—", dest: "ARB", protocol: "ITK", format: "CSV" },
  { n: 3, data: "Contingent worker data", source: "FDG", via: "M4M", dest: "ARX", protocol: "SFTP", format: "cXML" },
  { n: 4, data: "Contingent worker data", source: "FDG", via: "M4M", dest: "HCM", protocol: "SFTP", format: "CSV" },
  { n: 5, data: "Invoice / payment data", source: "CNC", via: "M4M", dest: "OCD", protocol: "SFTP", format: "CSV" },
  { n: 6, data: "Master / reference data", source: "M4M", via: "—", dest: "FDG", protocol: "SFTP", format: "CSV" },
  { n: 7, data: "Payment status update", source: "M4M", via: "—", dest: "ARB", protocol: "API", format: "JSON" },
  { n: 8, data: "Transactional data", source: "ARB", via: "—", dest: "M4M", protocol: "API", format: "JSON" },
  { n: 9, data: "Master data — users, commodity codes", source: "ARB", via: "—", dest: "M4M", protocol: "API", format: "JSON" },
  { n: 10, data: "Commodity codes file", source: "M4M", via: "—", dest: "OCD", protocol: "SFTP", format: "CSV" },
];

const SOURCE_NFRS = [
  {
    system: "Ariba (ARB)",
    dataClass: "4 · Private",
    restricted: false,
    why: "Strategic business information, ACLs",
    access: "Automated, AD-group birthright",
    rto: "4 hours",
    rpo: "0 min — no data loss",
  },
  {
    system: "Concur (CNC)",
    dataClass: "4 · Private",
    restricted: false,
    why: "ACLs",
    access: "AD groups + manual app roles",
    rto: "1 day",
    rpo: "1 day",
  },
  {
    system: "Fieldglass (FDG)",
    dataClass: "4 · Private",
    restricted: false,
    why: "M4M holds SSNs",
    access: "Automated, AD-group birthright",
    rto: "8 hours",
    rpo: "1 day",
  },
  {
    system: "Cvent (CVT) / Uber (UBR)",
    dataClass: "5 · Restricted",
    restricted: true,
    why: "Cardholder data — card #, expiry, CVV",
    access: "AD groups + manual app roles",
    rto: "120 days",
    rpo: "30 days",
  },
];

const CONSTRAINTS = [
  {
    icon: "✗",
    tone: "bad",
    title: "The data center closes at the end of 2026",
    body: "The current home of M4M goes away. Business continuity is the top priority — a missed cutover means back-office finance stops receiving data.",
  },
  {
    icon: "✗",
    tone: "bad",
    title: "Azure-SSIS runtime is not approved — and may never be",
    body: "The obvious lift-and-shift path for 45 SSIS packages is off the table. Azure Data Factory is approved, but only with the default auto-hosted runtime.",
  },
  {
    icon: "!",
    tone: "warn",
    title: "Self-hosted runtime is still being built",
    body: "The platform team is working on it. Until it lands, ADF cannot reach on-premises sources directly.",
  },
  {
    icon: "!",
    tone: "warn",
    title: "A Microsoft-only team, new to Azure",
    body: "C#, SQL Server, and SSIS — no UI, 45 cascading packages. The team is mid-way through Azure training.",
  },
  {
    icon: "!",
    tone: "warn",
    title: "DevOps for Databricks is 3–4 months out",
    body: "The bank runs GitLab today, but its Azure Databricks standard depends on Azure DevOps. Terraform modules to standardize the environment are in progress.",
  },
  {
    icon: "!",
    tone: "warn",
    title: "Snowflake needs a new engagement",
    body: "Only the Wealth department runs Snowflake. Bringing this application onto it means a fresh negotiation the timeline can't absorb.",
  },
  {
    icon: "✓",
    tone: "ok",
    title: "Databricks is already being set up",
    body: "The bank is working with the Databricks team on control parameters, connectivity, and security for an Azure Databricks environment.",
  },
  {
    icon: "✓",
    tone: "ok",
    title: "The business wants cloud",
    body: "As long as the choice is weighed against business risk and continuity — which is exactly what the phased plan below is built around.",
  },
];

const OPPORTUNITIES = [
  { title: "Data-driven", body: "Enriched supplier data — performance, financial health, certifications — curated in gold tables for cost-optimization insights." },
  { title: "Innovation", body: "AI on governed procurement data: natural-language questions over gold tables, with Unity Catalog controlling what the AI can see." },
  { title: "Scale", body: "New regions and users get workspaces bound to the same governance model instead of a new set of servers." },
  { title: "DevOps", body: "Everything — infrastructure, jobs, notebooks — in Git and promoted through dev, cert, and prod by CI/CD." },
  { title: "Approval workflows", body: "Approval data from AMA lands in the same lakehouse as invoices and payments, so cycle-time bottlenecks become measurable." },
  { title: "Preemptive cost control", body: "Spend data and budget limits side by side, so overspend is flagged before invoices are paid, not after." },
];

export function M4mDatabricksCaseStudyPage() {
  useEffect(() => {
    document.title = "From 45 SSIS packages to a governed lakehouse — M4M on Azure Databricks";
  }, []);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Case study · Finance &amp; regulatory reporting · Azure Databricks</div>
        <h1>
          From 45 SSIS packages to a <span className={styles.accent}>governed lakehouse</span> — before the data
          center goes dark.
        </h1>
        <p className={styles.sub}>
          How a bank&apos;s finance and regulatory reporting system of record — &quot;Money Manager&quot; (M4M) —
          moves off a closing data center and onto Azure Databricks, when the usual lift-and-shift route isn&apos;t
          approved and the team is still learning Azure.
        </p>

        <div className={styles.statRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>45</div>
            <div className={styles.statLabel}>cascading SSIS packages</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>10</div>
            <div className={styles.statLabel}>interfaces · SFTP, API, ITK</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>12</div>
            <div className={styles.statLabel}>external &amp; internal systems</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>0 min</div>
            <div className={styles.statLabel}>strictest RPO (Ariba)</div>
          </div>
        </div>
        <div className={styles.deadlineStrip}>
          <span className={styles.dot} /> DATA CENTER SHUTDOWN — END OF 2026 · BUSINESS CONTINUITY IS PRIORITY #1
        </div>
      </div>

      {/* 1. THE SYSTEM TODAY */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>01</span>The system today
            </span>
            <h2>A five-year-old ETL hub that back-office finance can&apos;t run without.</h2>
            <p>
              M4M pulls procurement, expense, workforce, and event data from SaaS platforms, shapes it with C#, SQL,
              and SSIS, and hands it to back-office systems. It&apos;s the system of record — there is no fallback.
            </p>
          </div>

          <div className={styles.grid3}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>External SaaS sources</div>
              <div className={styles.chipRow}>
                <span className={styles.chip}>
                  SAP Ariba (ARB)<span className={styles.chipNote}>procure-to-pay, spend</span>
                </span>
                <span className={styles.chip}>
                  Concur (CNC)<span className={styles.chipNote}>travel &amp; expense</span>
                </span>
                <span className={styles.chip}>
                  Fieldglass (FDG)<span className={styles.chipNote}>contingent workforce</span>
                </span>
                <span className={styles.chip}>
                  Cvent (CVT)<span className={styles.chipNote}>events</span>
                </span>
                <span className={styles.chip}>
                  Uber for Business (UBR)<span className={styles.chipNote}>via Concur</span>
                </span>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>The ETL hub — M4M</div>
              <div className={styles.chipRow}>
                <span className={`${styles.chip} ${styles.chipCore}`}>4 servers</span>
                <span className={styles.chip}>SQL Server 2017 + SSIS</span>
                <span className={styles.chip}>.NET 4.5 in SSIS</span>
                <span className={styles.chip}>SQL Server 2022 analytics</span>
                <span className={styles.chip}>.NET 8 · Vue.js · Hangfire</span>
                <span className={styles.chip}>SAP Integration Toolkit</span>
                <span className={styles.chip}>Power BI</span>
              </div>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Internal back-office systems</div>
              <div className={styles.chipRow}>
                <span className={styles.chip}>OCD · Oracle integration</span>
                <span className={styles.chip}>Financial Control (FCS)</span>
                <span className={styles.chip}>Approvals (AMA)</span>
                <span className={styles.chip}>Agile Roster (ARX)</span>
                <span className={styles.chip}>Workday (HCM)</span>
                <span className={styles.chip}>Workspace Mgmt (IWM)</span>
                <span className={styles.chip}>Corporate Card (CCC)</span>
              </div>
            </div>
          </div>

          <div className={styles.figureHead} style={{ marginTop: 28 }}>
            <span className={`${styles.figureBadge} ${styles.figureBadgeBefore}`}>Before</span>
            How M4M is built today
          </div>
          <div className={styles.beforeGrid}>
            <figure className={styles.figure}>
              <ZoomableImage
                src={beforeOverview}
                alt="Ten-thousand-feet view of the M4M ETL application: external SaaS and SFTP feeds into SQL Server 2017 and 2022 databases, with Power BI reporting and SFTP exchange to Oracle OCI and mainframe"
                className={styles.figureImg}
              />
              <figcaption>Ten-thousand-feet view — SaaS in over API and SFTP, two SQL Server databases, Power BI out.</figcaption>
            </figure>
            <figure className={styles.figure}>
              <ZoomableImage
                src={beforeDetailed}
                alt="Detailed existing implementation of M4M: external suppliers and SAP cloud applications exchange data with SQL Server middleware (archival, ETL, and reporting databases), which feeds back-office systems OCD, FCS, AMA, ARX, Workday, IWM, and Corporate Credit Card"
                className={styles.figureImg}
              />
              <figcaption>Existing implementation — every SFTP batch and API flow through the SQL Server middleware.</figcaption>
            </figure>
          </div>
          <p className={styles.tableNote}>Click either diagram to view it full size.</p>

          <h3 className={styles.cardTitle} style={{ marginTop: 28 }}>
            The ten interfaces M4M keeps alive
          </h3>
          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Data</th>
                  <th>Source</th>
                  <th>Via</th>
                  <th>Destination</th>
                  <th>Protocol</th>
                  <th>Format</th>
                </tr>
              </thead>
              <tbody>
                {INTERFACES.map((row) => (
                  <tr key={row.n}>
                    <td className={styles.key}>{row.n}</td>
                    <td>{row.data}</td>
                    <td className={styles.key}>{row.source}</td>
                    <td>{row.via}</td>
                    <td className={styles.key}>{row.dest}</td>
                    <td>
                      <span className={`${styles.tag} ${row.protocol === "API" ? styles.tagApi : styles.tagSftp}`}>
                        {row.protocol}
                      </span>
                    </td>
                    <td className={styles.mono}>{row.format}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            Anything not listed defaults to SFTP and CSV. ITK is the vendor-supplied SAP Integration Toolkit.
          </p>
        </div>
      </section>

      {/* 2. REQUIREMENTS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>02</span>What the new platform must honor
            </span>
            <h2>The non-functional requirements don&apos;t get lighter in the cloud.</h2>
            <p>
              Every source brings its own data classification and recovery targets. The target platform inherits all
              of them — not an average.
            </p>
          </div>

          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Data class</th>
                  <th>Why</th>
                  <th>Access model</th>
                  <th>RTO</th>
                  <th>RPO</th>
                </tr>
              </thead>
              <tbody>
                {SOURCE_NFRS.map((row) => (
                  <tr key={row.system}>
                    <td className={styles.key}>{row.system}</td>
                    <td>
                      <span className={`${styles.tag} ${row.restricted ? styles.tagRestricted : styles.tagPrivate}`}>
                        {row.dataClass}
                      </span>
                    </td>
                    <td>{row.why}</td>
                    <td>{row.access}</td>
                    <td className={styles.mono}>{row.rto}</td>
                    <td className={styles.mono}>{row.rpo}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className={styles.grid3} style={{ marginTop: 16 }}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Retention</div>
              <p className={styles.prose} style={{ margin: 0 }}>
                Master and transactional data is <strong>kept forever</strong> — never archived or purged while the
                subscription is active.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Availability</div>
              <p className={styles.prose} style={{ margin: 0 }}>
                <strong>99.9%</strong>, business hours 8 am–5 pm. Batch jobs run outside business hours.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Change windows</div>
              <p className={styles.prose} style={{ margin: 0 }}>
                Bi-weekly, <strong>Wed 8:00 pm – Thu 6:59 am</strong>. Critical fixes ship as expedited hot fixes.
                Dynatrace monitors the ARB, CNC, and FDG endpoints.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CONSTRAINTS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>03</span>The constraints
            </span>
            <h2>Every easy path has already been ruled out.</h2>
          </div>
          <div className={styles.constraintList}>
            {CONSTRAINTS.map((item) => (
              <div key={item.title} className={styles.constraint}>
                <span
                  className={`${styles.constraintIcon} ${
                    item.tone === "bad" ? styles.iconBad : item.tone === "warn" ? styles.iconWarn : styles.iconOk
                  }`}
                  aria-hidden
                >
                  {item.icon}
                </span>
                <p>
                  <strong>{item.title}</strong>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. DECISION */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.decisionCard}>
            <div className={styles.sectionHead}>
              <span className={`${styles.kicker} ${styles.decisionKicker}`}>
                <span className={styles.chapter}>04</span>The engineering call
              </span>
              <h2>Rebuild on Azure Databricks — and let AI carry the conversion load.</h2>
              <p>
                With the SSIS runtime off the table, the 45 packages have to become something else anyway. The only
                question is what — and Databricks is the one platform already being stood up for the bank.
              </p>
            </div>
            <div className={styles.decisionScroll}>
              <table className={styles.decision}>
                <thead>
                  <tr>
                    <th>Path</th>
                    <th>Approval</th>
                    <th>Fits the timeline?</th>
                    <th>Verdict</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Lift &amp; shift SSIS to Azure-SSIS runtime</td>
                    <td>Not approved — may never be</td>
                    <td>Would, if it were allowed</td>
                    <td>
                      Ruled out<span className={`${styles.badge} ${styles.badgeBad}`}>Blocked</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Rebuild in Azure Data Factory only</td>
                    <td>Approved (auto-hosted runtime)</td>
                    <td>Can&apos;t reach on-prem until self-hosted runtime ships; complex C# logic fits poorly</td>
                    <td>
                      Used for file transfer only<span className={`${styles.badge} ${styles.badgeWarn}`}>Partial</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Move to Snowflake</td>
                    <td>Needs a new enterprise engagement</td>
                    <td>No — negotiation alone outlasts the deadline</td>
                    <td>
                      Future state<span className={`${styles.badge} ${styles.badgeWarn}`}>Later</span>
                    </td>
                  </tr>
                  <tr>
                    <td>Rebuild on Azure Databricks</td>
                    <td>Being set up with the Databricks team</td>
                    <td>Yes — if code conversion is accelerated</td>
                    <td>
                      Selected<span className={`${styles.badge} ${styles.badgeGood}`}>Go</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* 5. ARCHITECTURE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>05</span>Target architecture
            </span>
            <h2>Three ways in, one governed medallion, one way out to Power BI.</h2>
            <p>
              Batch files, SaaS APIs, and an Oracle database each get the ingestion pattern that suits them. From the
              raw zone on, everything lives in Unity Catalog — with lineage and access control on every table.
            </p>
          </div>

          <div className={styles.figureHead}>
            <span className={`${styles.figureBadge} ${styles.figureBadgeAfter}`}>After</span>
            M4M on Azure Databricks
          </div>
          <figure className={styles.figure}>
            <ZoomableImage
              src={afterDatabricks}
              alt="Target Azure Databricks architecture: on-premises batch files, SaaS APIs over REST OAuth 2, and Oracle OCD over ODBC land in an ADLS drop zone and raw zone, flow through silver and gold layers under Unity Catalog, and are consumed by Power BI; steps numbered 1 to 5"
              className={styles.figureImg}
            />
            <figcaption>
              Three ingestion paths into a Unity Catalog–governed raw, silver, and gold lakehouse, read by Power BI.
              Steps ① to ⑤ are walked through in the next chapter.
            </figcaption>
          </figure>
          <p className={styles.tableNote}>Click the diagram to view it full size.</p>
        </div>
      </section>

      {/* 6. WALKTHROUGH */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>06</span>How data moves
            </span>
            <h2>Follow one invoice from Ariba to a Power BI dashboard.</h2>
          </div>
          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <div>
                <h3>Pull from the SaaS APIs — with a lookback window</h3>
                <p>
                  A scheduled Databricks notebook calls Ariba, Fieldglass, Concur, Uber for Business, and Workday over
                  REST with OAuth 2, paging through results. Secrets come from <strong>Azure Key Vault</strong>, never
                  from code. Each run re-reads a <strong>lookback window</strong> of recent records, so late updates
                  and missed runs heal themselves on the next pull — the same property that protects Ariba&apos;s
                  zero-data-loss RPO.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={`${styles.stepNum} ${styles.stepNumPlain}`}>·</span>
              <div>
                <h3>Batch files land in the ADLS drop zone</h3>
                <p>
                  cXML invoices and CSV accounting files keep arriving through the bank&apos;s existing
                  Transmission/Automic file transfer, with Data Factory moving them into per-source folders.{" "}
                  <strong>Auto Loader</strong> picks up only new files and a <strong>Delta MERGE</strong> upserts them
                  into one managed Delta table per folder — so a re-delivered file never creates duplicates.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <div>
                <h3>Read Oracle OCD over ODBC</h3>
                <p>
                  A notebook job connects to the OCD Oracle database over ODBC and pulls only what changed since the
                  last run into a managed table in the raw zone — no full reloads.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <div>
                <h3>Rebuild the reporting views in silver</h3>
                <p>
                  The SQL Server views and stored procedures Power BI used to read —{" "}
                  <span className={styles.mono}>invoice_summary</span>,{" "}
                  <span className={styles.mono}>payment_status_dashboard</span>,{" "}
                  <span className={styles.mono}>contingent_worker_report</span>,{" "}
                  <span className={styles.mono}>locations · travel_spend</span> — become managed Delta tables built
                  by materialized views over raw. Same names, same meaning, new engine.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>4</span>
              <div>
                <h3>Run the converted business logic as Lakeflow Jobs</h3>
                <p>
                  The 45 cascading SSIS packages become Python notebooks. Their run order — today encoded as packages
                  calling packages — becomes <strong>task dependencies in a Lakeflow Job</strong>, so the cascade is
                  visible, retryable step by step, and scheduled outside business hours.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>5</span>
              <div>
                <h3>Produce the finance outputs</h3>
                <p>
                  <span className={styles.mono}>payment_notices</span>,{" "}
                  <span className={styles.mono}>invoice_payments</span>, and{" "}
                  <span className={styles.mono}>company_gl</span> are built as managed Delta tables, then published
                  to gold through materialized views — where Power BI and external partners read them, under Unity
                  Catalog grants.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. CODE CONVERSION */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>07</span>Converting 45 packages
            </span>
            <h2>AI writes the first draft. The old system grades it.</h2>
            <p>
              All SSIS and C# logic is converted to Python with an AI code generator — Claude Haiku, Codex, or Gemini;
              any of them works. This is a <strong>migration, not a redesign</strong>: the business logic must match
              the existing code exactly, so every converted package is proven against the output it replaces.
            </p>
          </div>

          <div className={styles.pipeline}>
            <div className={styles.pipeStep}>
              <strong>Extract</strong>
              Package logic and embedded C# from each of the 45 packages
            </div>
            <span className={styles.pipeArrow}>→</span>
            <div className={styles.pipeStep}>
              <strong>Generate</strong>
              AI drafts the equivalent PySpark notebook
            </div>
            <span className={styles.pipeArrow}>→</span>
            <div className={styles.pipeStep}>
              <strong>Review</strong>
              The team — who know the C# — check every rule
            </div>
            <span className={styles.pipeArrow}>→</span>
            <div className={styles.pipeStep}>
              <strong>Prove</strong>
              Run side by side; outputs must reconcile exactly
            </div>
          </div>

          <div className={styles.codeGrid}>
            <div className={styles.codeCard}>
              <div className={styles.codeHead}>Before · C# inside an SSIS script task (illustrative)</div>
              <pre>{`if (row.InvoiceStatus == "PAID" && row.PaidDate != null)
    row.PaymentStatus = "SETTLED";
else if (row.DueDate < DateTime.Today)
    row.PaymentStatus = "OVERDUE";
else
    row.PaymentStatus = "OPEN";`}</pre>
            </div>
            <div className={styles.codeCard}>
              <div className={styles.codeHead}>After · PySpark notebook (illustrative)</div>
              <pre>{`from pyspark.sql import functions as F

payments = spark.table("prod.raw.ariba_invoices").withColumn(
    "payment_status",
    F.when((F.col("invoice_status") == "PAID")
           & F.col("paid_date").isNotNull(), "SETTLED")
     .when(F.col("due_date") < F.current_date(), "OVERDUE")
     .otherwise("OPEN"),
)`}</pre>
            </div>
          </div>
          <div className={styles.codeCard} style={{ marginTop: 16 }}>
            <div className={styles.codeHead}>Prove · parity check against the legacy output (illustrative)</div>
            <pre>{`legacy = spark.read.jdbc(legacy_sql_url, "dbo.invoice_payments", properties=creds)
new    = spark.table("prod.silver.invoice_payments")

mismatches = legacy.exceptAll(new).union(new.exceptAll(legacy))
assert mismatches.count() == 0, "converted logic does not match SSIS output"`}</pre>
          </div>
        </div>
      </section>

      {/* 8. SECURITY & NFR MAPPING */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>08</span>Meeting the requirements
            </span>
            <h2>Every requirement from chapter 02, mapped to a platform control.</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>Requirement</th>
                  <th>How the lakehouse meets it</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.key}>AD-group access</td>
                  <td>
                    Entra ID groups sync to the Databricks account; Unity Catalog grants go to groups on catalogs and
                    schemas, so birthright access keeps working without per-user grants.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>Class 4 · SSN</td>
                  <td>
                    Restricted schemas plus Unity Catalog column masks, so SSNs are visible only to the groups that
                    need them. Encrypted at rest and in transit.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>Class 5 · cardholder data</td>
                  <td>
                    Isolated in its own schema with masking and tight grants. Card security codes (CVV) must not be
                    stored at all under PCI DSS — drop them at ingestion rather than mask them later.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>Secrets</td>
                  <td>OAuth credentials and connection strings live in Azure Key Vault, read at run time.</td>
                </tr>
                <tr>
                  <td className={styles.key}>Keep forever</td>
                  <td>
                    Managed Delta tables with no purge jobs. Routine file cleanup only removes superseded file
                    versions — current data is never deleted.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>RPO 0 · RTO 4 h (Ariba)</td>
                  <td>
                    Geo-redundant storage for the lakehouse, jobs defined in code so they redeploy fast, and the
                    lookback window to re-pull anything in flight from the source.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>Change windows</td>
                  <td>
                    Jobs and notebooks promoted dev → cert → prod through CI/CD, deployed in the bi-weekly Wednesday
                    window; hot fixes through the same pipeline.
                  </td>
                </tr>
                <tr>
                  <td className={styles.key}>Lineage &amp; audit</td>
                  <td>
                    Unity Catalog records table- and column-level lineage from raw to gold, so a regulator&apos;s
                    &quot;where did this number come from?&quot; has an answer.
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 9. ROADMAP */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>09</span>The phased plan
            </span>
            <h2>Run old and new side by side — cut over one source at a time.</h2>
            <p>
              Business continuity sets the rules: SSIS keeps running until each interface has been proven on
              Databricks, and every cutover happens in a scheduled change window.
            </p>
          </div>
          <div className={styles.roadmap}>
            <div className={styles.phase} style={{ borderTopColor: "var(--navy)" }}>
              <span className={styles.phaseLabel} style={{ color: "var(--navy)" }}>
                Phase 0
              </span>
              <h3>Foundation</h3>
              <ul>
                <li>Workspaces and Unity Catalog: dev, cert, prod</li>
                <li>Key Vault, networking, ADLS drop zone</li>
                <li>Terraform modules with the platform team</li>
              </ul>
            </div>
            <div className={styles.phase} style={{ borderTopColor: "var(--good)" }}>
              <span className={styles.phaseLabel} style={{ color: "var(--good)" }}>
                Phase 1
              </span>
              <h3>Land the data</h3>
              <ul>
                <li>All 10 interfaces into the raw zone</li>
                <li>SSIS still the system of record</li>
              </ul>
            </div>
            <div className={styles.phase} style={{ borderTopColor: "var(--steel)" }}>
              <span className={styles.phaseLabel} style={{ color: "var(--steel)" }}>
                Phase 2
              </span>
              <h3>Convert &amp; prove</h3>
              <ul>
                <li>AI-assisted conversion of the 45 packages</li>
                <li>Parity checks against SQL Server outputs</li>
              </ul>
            </div>
            <div className={styles.phase} style={{ borderTopColor: "var(--amber)" }}>
              <span className={styles.phaseLabel} style={{ color: "var(--amber)" }}>
                Phase 3
              </span>
              <h3>Cut over</h3>
              <ul>
                <li>Source by source, in change windows</li>
                <li>Power BI repointed to gold</li>
                <li>SSIS retired before shutdown</li>
              </ul>
            </div>
            <div className={styles.phase} style={{ borderTopColor: "var(--dbx)" }}>
              <span className={styles.phaseLabel} style={{ color: "var(--dbx)" }}>
                Phase 4
              </span>
              <h3>Modernize</h3>
              <ul>
                <li>Supplier insights and AI on gold data</li>
                <li>Snowflake revisited only if it earns a place</li>
              </ul>
            </div>
          </div>
          <div className={styles.deadlineMarker}>DATA CENTER SHUTDOWN · END OF 2026</div>
        </div>
      </section>

      {/* 10. RISKS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>10</span>What we&apos;re still watching
            </span>
            <h2>Open risks — named early, with a plan for each.</h2>
          </div>
          <div className={styles.riskGrid}>
            <div className={styles.risk}>
              <div className={styles.rt}>Reaching on-prem before the self-hosted runtime exists</div>
              <p>
                Data Factory can&apos;t reach on-premises file shares on the auto-hosted runtime alone.
              </p>
              <p className={styles.riskMitigation}>
                → Keep the existing Transmission/Automic transfer as the bridge into ADLS until the runtime ships.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Push today, pull tomorrow</div>
              <p>
                M4M pushes files and API calls to OCD, ARX, HCM, Fieldglass, and Ariba. The target design publishes
                gold data for consumers to pull.
              </p>
              <p className={styles.riskMitigation}>
                → Confirm each downstream system can pull; keep outbound SFTP/API delivery jobs for any that can&apos;t.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>AI-converted logic that&apos;s subtly wrong</div>
              <p>Generated code can look right and still differ on edge cases — rounding, nulls, date boundaries.</p>
              <p className={styles.riskMitigation}>
                → No package cuts over until its parity check passes on real production volumes.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>DevOps arrives after the code</div>
              <p>Terraform modules and Azure DevOps pipelines are 3–4 months out; GitLab is today&apos;s tool.</p>
              <p className={styles.riskMitigation}>
                → Keep all notebooks and job definitions in Git from day one, so pipelines plug in when ready.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>New data center services may lag</div>
              <p>Some dependent services in the new data center may not be available on time.</p>
              <p className={styles.riskMitigation}>
                → Track each dependency on the enterprise service portal with the platform architecture team.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>A team learning Python and Azure at once</div>
              <p>The people who know the business rules are the ones still in training.</p>
              <p className={styles.riskMitigation}>
                → AI drafts the code; the team&apos;s job becomes reviewing logic they already understand.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11. OPPORTUNITIES */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>11</span>What it unlocks
            </span>
            <h2>The migration is the deadline. The lakehouse is the payoff.</h2>
          </div>
          <div className={styles.grid3}>
            {OPPORTUNITIES.map((item) => (
              <div key={item.title} className={styles.card}>
                <div className={styles.cardTitle}>{item.title}</div>
                <p className={styles.prose} style={{ margin: 0, fontSize: 14 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 12. OUTCOME */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>12</span>The outcome
            </span>
            <h2>Off the closing data center — without betting the business on a big bang.</h2>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>Continuity is protected</strong> — SSIS stays live until each interface is proven on Databricks,
              and every cutover happens inside an approved change window.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>The blocked path stops mattering</strong> — instead of waiting on an SSIS runtime that may never
              be approved, the logic moves to a platform the bank is already standing up.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>→</div>
            <p>
              <strong>Governance gets stronger, not weaker</strong> — Unity Catalog adds lineage, masking, and
              group-based grants that the SQL Server setup never had.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>M4M MODERNIZATION CASE STUDY — SSIS TO AZURE DATABRICKS LAKEHOUSE</div>
      </footer>
    </div>
  );
}
