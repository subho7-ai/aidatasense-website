import { useEffect } from "react";
import { Link } from "react-router-dom";
import architecture from "../assets/snowflake-ingestion-architecture.webp";
import { ZoomableImage } from "../components/ZoomableImage";
import styles from "./caseStudy.module.css";

const PRINCIPLES = [
  ["Modular sources", "Add or change a source without reworking the rest of the pipeline."],
  ["Any delivery style", "Streaming, batch, and API sources all fit the same design."],
  ["Any data shape", "Structured, semi-structured, and unstructured data, balancing cost and value."],
  ["Failure handling everywhere", "Ingestion failures are caught at the source, in the pipeline, and in transformations."],
  ["Secure by default", "Sensitive and non-sensitive data handled with the right controls."],
  ["Quality and governance", "Data quality checks and enterprise governance built in, not bolted on."],
  ["Medallion layers", "Raw, stage, and analytics layers serving different stakeholders."],
  ["Native observability", "Snowflake's own monitoring and alerting to track, observe, and report."],
];

// Streaming-client options compared in the design, with Firehose → S3 → Snowpipe selected.
const OPTIONS = ["Lambda + connector", "Firehose → S3 → Snowpipe", "Kafka connector", "Snowpipe Streaming"];
const SELECTED = 1;
const CRITERIA: [string, string[]][] = [
  ["Reliability", ["Medium", "High", "High", "Medium"]],
  ["Operational overhead", ["Medium", "Low", "High", "Medium"]],
  ["Latency", ["~1 min", "~5 min", "~1 min", "~seconds"]],
  ["Error recovery", ["You build it", "Built in (S3 retry)", "Built in", "You build it"]],
  ["Data loss risk", ["Lambda failures", "Near zero (S3 durable)", "Low", "Client failures"]],
  ["Cost", ["Medium", "Low", "High", "Medium"]],
  ["Complexity", ["Medium", "Low", "High", "Medium"]],
  ["Meets 30-min SLA", ["Yes", "Yes", "Yes", "Yes"]],
  ["Battle-tested", ["Yes", "Most proven", "Yes", "Newer"]],
  ["Best when", ["Custom transform needed before Snowflake", "SLA is 5–30 min and simplicity matters", "Kafka / MSK already in place", "Sub-minute latency is a hard requirement"]],
];

// Worst-case minutes per stage, from "data received" to "in the analytics tables".
const BUDGET: { path: string; segments: [string, number, string][] }[] = [
  {
    path: "SFTP batch",
    segments: [
      ["Transfer → S3", 1, "#a86a3d"],
      ["Snowpipe", 2, "#0e7fb4"],
      ["Wait for task", 15, "#94a3b8"],
      ["Task 1 + dbt", 5, "#227a55"],
    ],
  },
  {
    path: "Kinesis stream",
    segments: [
      ["Firehose buffer", 5, "#7c3aed"],
      ["Snowpipe", 2, "#0e7fb4"],
      ["Wait for task", 15, "#94a3b8"],
      ["Task 1 + dbt", 5, "#227a55"],
    ],
  },
];
const SLA_MINUTES = 30;

function Code({ title, children }: { title: string; children: string }) {
  return (
    <div className={styles.codeCard}>
      <div className={styles.codeHead}>{title}</div>
      <pre>{children}</pre>
    </div>
  );
}

export function SnowflakeCaseStudyPage() {
  useEffect(() => {
    document.title = "Two ways in, one warehouse — Snowflake batch + streaming ingestion on AWS";
  }, []);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Case study · Data engineering on Snowflake · AWS</div>
        <h1>
          Two ways in. <span className={styles.accent}>One</span> warehouse. Under 30 minutes, every time.
        </h1>
        <p className={styles.sub}>
          A client running on AWS needed SFTP batch files and real-time Kinesis streams — the same JSON, delivered in
          completely different ways — to land in the same production-ready Snowflake tables within 30 minutes of
          arriving.
        </p>
        <div className={styles.statRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>2×</div>
            <div className={styles.statLabel}>SFTP batches a day, &lt;1 GB compressed each</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>Real-time</div>
            <div className={styles.statLabel}>Kinesis event streams</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>1</div>
            <div className={styles.statLabel}>JSON shape for both sources</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>30 min</div>
            <div className={styles.statLabel}>from receipt to final tables</div>
          </div>
        </div>
        <div className={styles.deadlineStrip}>
          <span className={styles.dot} /> SLA · DATA IN FINAL SNOWFLAKE TABLES WITHIN 30 MINUTES OF BEING RECEIVED
        </div>
      </div>

      {/* 01 PROBLEM */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>01</span>The problem
            </span>
            <h2>Batch and streaming rarely play well together.</h2>
            <p>
              Most teams end up with two disconnected pipelines — one for files, one for events — with duplicated
              transformation logic and no shared way to catch bad data. This client needed one coherent pipeline: both
              sources landing in the same trusted tables, inside the same 30-minute window.
            </p>
          </div>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Source 1 · SFTP batch files</div>
              <p className={styles.prose} style={{ margin: 0 }}>
                Delivered <strong>twice a day</strong>, each file under <strong>1 GB compressed</strong>. Once received,
                they must load into Snowflake automatically and be transformed into the final tables.
              </p>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Source 2 · Kinesis streams</div>
              <p className={styles.prose} style={{ margin: 0 }}>
                <strong>Near real-time</strong> events that must also stream into Snowflake — in the same JSON format as
                the files, and into the same final tables.
              </p>
            </div>
          </div>
          <p className={styles.tableNote}>
            Beyond the known requirements, the design also had to call out where it could struggle — the weaknesses to
            test before and after go-live (chapter 08).
          </p>
        </div>
      </section>

      {/* 02 PRINCIPLES */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>02</span>Design principles
            </span>
            <h2>Built for the next source, not just these two.</h2>
          </div>
          <div className={styles.grid3}>
            {PRINCIPLES.map(([title, body], index) => (
              <div key={title} className={styles.card}>
                <div className={styles.cardTitle}>
                  {String(index + 1).padStart(2, "0")} · {title}
                </div>
                <p className={styles.prose} style={{ margin: 0, fontSize: 14 }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 03 ARCHITECTURE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>03</span>Target architecture
            </span>
            <h2>AWS lands it. Snowflake loads, cleans, and serves it.</h2>
            <p>
              Both sources are captured by AWS services in the client&apos;s own account and written to separate S3
              prefixes. From there, Snowflake takes over: two independent Snowpipes, a raw → stage → analytics
              medallion, and Tableau and Power BI on top.
            </p>
          </div>
          <div className={styles.figureHead}>
            <span className={`${styles.figureBadge} ${styles.figureBadgeAfter}`}>Architecture</span>
            Consume streaming &amp; batch data into Snowflake
          </div>
          <figure className={styles.figure}>
            <ZoomableImage
              src={architecture}
              alt="Architecture: in the client's AWS environment, SFTP files arrive through AWS Transfer Family and Kinesis streams through Kinesis Firehose, both landing in an S3 staging bucket under sftp and kinesis prefixes; in Snowflake, two stages feed raw tables holding JSON as VARIANT; Task 1 unions, validates, and de-duplicates into a stage schema, with quarantine, pipeline metrics, and a 30-minute SLA alert; Task 2 runs dbt into fact and dimension tables; Tableau and Power BI read the analytics layer"
              className={styles.figureImg}
            />
            <figcaption>
              ① Sources · ② AWS integration (Transfer Family, Firehose, S3) · ③ Snowflake (Snowpipes, tasks, medallion
              layers, quality &amp; monitoring) · ④ Reports. Click to view full size.
            </figcaption>
          </figure>

          <div className={styles.steps} style={{ marginTop: 16 }}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <div>
                <h3>Sources</h3>
                <p>SFTP files twice a day, and a continuous Kinesis stream — both carrying the same JSON records.</p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <div>
                <h3>AWS integration</h3>
                <p>
                  <strong>AWS Transfer Family</strong> provides the SFTP endpoint and writes each received file straight
                  to <span className={styles.mono}>s3://…/sftp/</span>. <strong>Kinesis Data Firehose</strong> buffers
                  the stream and delivers batches to <span className={styles.mono}>s3://…/kinesis/</span>. Separate
                  prefixes keep each source&apos;s failures isolated.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <div>
                <h3>Snowflake</h3>
                <p>
                  Two Snowpipes watch the two prefixes and load each new file into its own <strong>raw</strong> table as
                  VARIANT. <strong>Task 1</strong> unions both raw tables, de-duplicates, validates, and quarantines bad
                  records into the <strong>stage</strong> schema; <strong>Task 2</strong>, chained after it, runs dbt to
                  build the <strong>analytics</strong> fact and dimension tables.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>4</span>
              <div>
                <h3>Reports</h3>
                <p>
                  Tableau (over OAuth) and Power BI (through its data gateway) query the analytics layer, with
                  materialized views and dbt models serving the heaviest dashboards.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 04 DECISION */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.decisionCard}>
            <div className={styles.sectionHead}>
              <span className={`${styles.kicker} ${styles.decisionKicker}`}>
                <span className={styles.chapter}>04</span>The engineering call
              </span>
              <h2>Four ways to stream Kinesis into Snowflake. We picked the one that matched the SLA.</h2>
              <p>
                Seconds-level latency sounds appealing until you price in the operational overhead. A 30-minute SLA
                doesn&apos;t need the fastest pipe — it needs the most reliable one.
              </p>
            </div>
            <div className={styles.decisionScroll}>
              <table className={styles.decision}>
                <thead>
                  <tr>
                    <th>Criteria</th>
                    {OPTIONS.map((option, index) => (
                      <th key={option}>
                        {option}
                        {index === SELECTED && <span className={`${styles.badge} ${styles.badgeGood}`}>Selected</span>}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {CRITERIA.map(([criterion, values]) => (
                    <tr key={criterion}>
                      <td>{criterion}</td>
                      {values.map((value, index) => (
                        <td key={index} style={index === SELECTED ? { background: "rgba(79, 194, 143, 0.12)" } : undefined}>
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
          <p className={styles.tableNote}>
            Since this design was drawn up, Firehose can also deliver straight into Snowflake tables using Snowpipe
            Streaming, skipping S3. It&apos;s worth evaluating — but the S3 landing zone remains the simpler way to replay
            data after a failure.
          </p>
        </div>
      </section>

      {/* 05 SETUP */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>05</span>Connecting AWS to Snowflake
            </span>
            <h2>Five steps, no long-lived keys.</h2>
            <p>
              Snowflake reads the bucket through an IAM role it&apos;s trusted to assume — no access keys are stored
              anywhere. The order matters: the role&apos;s trust policy needs values that only exist once the Snowflake
              integration has been created.
            </p>
          </div>
          <div className={styles.pipeline}>
            {[
              ["1 · AWS", "Create an IAM role with read access to the bucket"],
              ["2 · Snowflake", "Create a storage integration pointing at that role"],
              ["3 · AWS", "Add Snowflake's IAM user and external ID to the role's trust policy"],
              ["4 · Snowflake", "Create a stage per prefix using the integration"],
              ["5 · Both", "Create tables and pipes, then wire S3 events to the pipes"],
            ].map(([step, what], index, all) => (
              <div key={step} style={{ display: "contents" }}>
                <div className={styles.pipeStep}>
                  <strong>{step}</strong>
                  {what}
                </div>
                {index < all.length - 1 && <span className={styles.pipeArrow}>→</span>}
              </div>
            ))}
          </div>
          <div className={styles.codeGrid}>
            <Code title="Steps 2–4 · integration and stages">{`CREATE STORAGE INTEGRATION S3_INTEGRATION
  TYPE = EXTERNAL_STAGE
  STORAGE_PROVIDER = 'S3'
  ENABLED = TRUE
  STORAGE_AWS_ROLE_ARN = 'arn:aws:iam::<account-id>:role/snowflake-role'
  STORAGE_ALLOWED_LOCATIONS = ('s3://client-data-ingestion/sftp/',
                               's3://client-data-ingestion/kinesis/');

-- Step 3: copy STORAGE_AWS_IAM_USER_ARN and STORAGE_AWS_EXTERNAL_ID
-- from this output into the IAM role's trust policy
DESC INTEGRATION S3_INTEGRATION;

CREATE STAGE RAW.S3_SFTP_STAGE
  URL = 's3://client-data-ingestion/sftp/'
  STORAGE_INTEGRATION = S3_INTEGRATION;

CREATE STAGE RAW.S3_KINESIS_STAGE
  URL = 's3://client-data-ingestion/kinesis/'
  STORAGE_INTEGRATION = S3_INTEGRATION;`}</Code>
            <Code title="Step 5 · raw tables and auto-ingest pipes">{`CREATE TABLE RAW.RAW_SFTP_FILES (
  v VARIANT, source_file STRING, loaded_at TIMESTAMP_LTZ);

-- Loads each file as soon as S3 reports it — no schedule needed
CREATE PIPE RAW.RAW_SFTP_PIPE AUTO_INGEST = TRUE AS
  COPY INTO RAW.RAW_SFTP_FILES (v, source_file, loaded_at)
  FROM (SELECT $1, METADATA$FILENAME, CURRENT_TIMESTAMP()
        FROM @RAW.S3_SFTP_STAGE)
  FILE_FORMAT = (TYPE = 'JSON' STRIP_OUTER_ARRAY = TRUE);

-- RAW_KINESIS_EVENTS and RAW_KINESIS_PIPE are identical,
-- reading from @RAW.S3_KINESIS_STAGE.

-- The notification_channel column is the SQS queue to set
-- as the destination of the bucket's S3 event notifications
SHOW PIPES IN SCHEMA RAW;`}</Code>
          </div>
          <p className={styles.tableNote}>
            Pipes are serverless — they don&apos;t take a warehouse, and they don&apos;t take a schedule. With auto-ingest,
            each file is loaded as soon as it lands; the every-15-minutes cadence belongs to the task in the next
            chapter.
          </p>
        </div>
      </section>

      {/* 06 PIPELINE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>06</span>Inside Snowflake
            </span>
            <h2>One task cleans both sources. One task builds the model.</h2>
            <p>
              Because both sources share a JSON shape, the business logic is written once. Task 1 runs every 15 minutes
              and calls a stored procedure; Task 2 is chained to run straight after it.
            </p>
          </div>
          <div className={styles.grid2}>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Task 1 · raw → stage (every 15 min)</div>
              <ol className={styles.prose} style={{ margin: 0, paddingLeft: 20, fontSize: 14 }}>
                <li>
                  <strong>Union</strong> new rows from the SFTP and Kinesis raw tables
                </li>
                <li>
                  <strong>De-duplicate</strong> on the business key — both sources can repeat records
                </li>
                <li>
                  <strong>Validate</strong> required fields and types
                </li>
                <li>
                  <strong>Quarantine</strong> failures with the reason, instead of dropping them
                </li>
                <li>
                  <strong>Write</strong> clean rows to the stage schema
                </li>
                <li>
                  <strong>Record</strong> row counts and timings in the pipeline metrics table
                </li>
                <li>
                  <strong>Mark</strong> the raw rows as processed
                </li>
              </ol>
            </div>
            <div className={styles.card}>
              <div className={styles.cardTitle}>Task 2 · stage → analytics (after Task 1)</div>
              <p className={styles.prose} style={{ margin: 0, fontSize: 14 }}>
                Runs the dbt project that builds the <strong>fact and dimension tables</strong> in the analytics layer,
                with dbt tests guarding the model. Materialized views on top keep the heaviest dashboards fast.
              </p>
              <div className={styles.cardTitle} style={{ marginTop: 16 }}>
                Quality &amp; monitoring
              </div>
              <p className={styles.prose} style={{ margin: 0, fontSize: 14 }}>
                <strong>Quarantine</strong> holds every rejected record for review and replay.{" "}
                <strong>Pipeline metrics</strong> capture each run. An <strong>SLA alert</strong> fires before any data
                gets close to 30 minutes old without reaching the analytics layer.
              </p>
            </div>
          </div>
          <div className={styles.codeGrid} style={{ marginTop: 16 }}>
            <Code title="Tasks · chained (illustrative)">{`CREATE TASK STG.T1_UNION_VALIDATE
  WAREHOUSE = TRANSFORM_WH
  SCHEDULE  = '15 MINUTE'
AS
  CALL STG.SP_UNION_DEDUP_VALIDATE();

CREATE TASK STG.T2_DBT_ANALYTICS
  WAREHOUSE = TRANSFORM_WH
  AFTER STG.T1_UNION_VALIDATE
AS
  EXECUTE DBT PROJECT ANALYTICS.DBT.RETAIL_MODEL ARGS = 'build';

-- Resume the child first, then the root
ALTER TASK STG.T2_DBT_ANALYTICS RESUME;
ALTER TASK STG.T1_UNION_VALIDATE RESUME;`}</Code>
            <Code title="SLA alert · warn at 25 minutes (illustrative)">{`CREATE ALERT OPS.SLA_AT_RISK
  WAREHOUSE = OPS_WH
  SCHEDULE  = '5 MINUTE'
  IF (EXISTS (
    SELECT 1
    FROM OPS.PIPELINE_METRICS
    WHERE processed = FALSE
      AND DATEDIFF('minute', received_at, CURRENT_TIMESTAMP()) > 25))
  THEN
    CALL SYSTEM$SEND_EMAIL(
      'OPS_EMAIL_INT', 'data-team@example.com',
      'Ingestion SLA at risk',
      'Data received over 25 minutes ago has not reached analytics.');`}</Code>
          </div>

          <div className={styles.figureHead} style={{ marginTop: 28 }}>
            Latency budget · worst case, received → analytics
          </div>
          <div className={styles.card}>
            <div className={styles.budget}>
              {BUDGET.map((row) => {
                const total = row.segments.reduce((sum, [, minutes]) => sum + minutes, 0);
                return (
                  <div key={row.path} className={styles.budgetRow}>
                    <span className={styles.budgetLabel}>{row.path}</span>
                    <div className={styles.budgetBar}>
                      {row.segments.map(([label, minutes, color]) => (
                        <span
                          key={label}
                          className={styles.budgetSeg}
                          style={{ width: `${(minutes / SLA_MINUTES) * 100}%`, background: color }}
                          title={`${label}: ${minutes} min`}
                        >
                          {minutes >= 4 ? label : ""}
                        </span>
                      ))}
                      <span className={styles.budgetSla} style={{ left: "calc(100% - 2px)" }} aria-hidden />
                    </div>
                    <span className={styles.budgetTotal}>
                      ≤ {total} min
                    </span>
                  </div>
                );
              })}
            </div>
            <p className={styles.tableNote}>
              The bar is the full 30-minute SLA. The biggest slice is waiting for the next task run — so if the margin
              ever gets tight, shorten the task schedule or switch Task 1 to run whenever new raw data arrives, instead
              of resizing anything.
            </p>
          </div>
        </div>
      </section>

      {/* 07 NETWORK */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>07</span>Keeping it private
            </span>
            <h2>The baseline uses the internet. The hardened design never touches it.</h2>
            <p>
              The baseline assumes data travels from the client&apos;s environment to Snowflake over the internet,
              encrypted with TLS. For sensitive data, the hardened design keeps every hop on private AWS networking: no
              internet gateway, no NAT, and Snowflake reached over AWS PrivateLink.
            </p>
          </div>
          <div className={styles.net}>
            <div className={styles.netGrid}>
              <div className={`${styles.netZone} ${styles.netOnprem}`}>
                <div className={styles.netZoneTitle}>Client on-premises</div>
                <div className={styles.netItem}>
                  SFTP senders &amp; Kinesis producers<span>source systems</span>
                </div>
              </div>
              <div className={styles.netLink}>
                <b>⇄</b>Direct Connect<span style={{ fontWeight: 400 }}>VPN backup</span>
              </div>
              <div className={`${styles.netZone} ${styles.netVpc}`}>
                <div className={styles.netZoneTitle}>AWS VPC · 10.0.0.0/16 · us-east-1</div>
                <div className={styles.netBlocked}>No internet gateway · no NAT · no 0.0.0.0/0 route</div>
                <div className={styles.netSubnets}>
                  {[
                    ["Subnet A · 10.0.1.0/24 · us-east-1a", "primary"],
                    ["Subnet B · 10.0.2.0/24 · us-east-1b", "redundant"],
                  ].map(([name, role]) => (
                    <div key={name} className={styles.netSubnet}>
                      <div className={styles.netSubnetTitle}>{name}</div>
                      {role === "primary" && (
                        <div className={styles.netItem}>
                          AWS Transfer Family SFTP<span>port 22 from the VPC</span>
                        </div>
                      )}
                      <div className={styles.netItem}>
                        Kinesis &amp; Firehose endpoints<span>interface · 443</span>
                      </div>
                      <div className={styles.netItem}>
                        Snowflake PrivateLink endpoint<span>interface · 443</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={styles.netItem}>
                  S3 gateway endpoint → s3://client-data-ingestion<span>SSE-S3 encryption · sftp/ and kinesis/ prefixes</span>
                </div>
              </div>
              <div className={styles.netLink}>
                <b>⇄</b>PrivateLink<span style={{ fontWeight: 400 }}>AWS backbone · 443</span>
              </div>
              <div className={`${styles.netZone} ${styles.netSnow}`}>
                <div className={styles.netZoneTitle}>Snowflake account</div>
                <div className={styles.netItem}>
                  PrivateLink URL<span>…privatelink.snowflakecomputing.com</span>
                </div>
                <div className={styles.netItem}>
                  Network policy<span>only the PrivateLink endpoint may connect</span>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.riskGrid} style={{ marginTop: 16 }}>
            <div className={styles.risk}>
              <div className={styles.rt}>Watch the bucket policy</div>
              <p>
                Locking the bucket to <em>only</em> the client&apos;s S3 gateway endpoint would also lock out Snowflake —
                Snowpipe reads S3 from Snowflake&apos;s own AWS network, not the client&apos;s.
              </p>
              <p className={styles.riskMitigation}>
                → Allow the client&apos;s VPC endpoint <em>and</em> Snowflake&apos;s VPC IDs, which{" "}
                <span className={styles.mono}>SYSTEM$GET_SNOWFLAKE_PLATFORM_INFO()</span> returns.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Same region, no egress</div>
              <p>The bucket and the Snowflake account should sit in the same AWS region.</p>
              <p className={styles.riskMitigation}>→ Keeps reads fast and avoids cross-region data transfer charges.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 RISKS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>08</span>What we&apos;d still watch closely
            </span>
            <h2>No pipeline is risk-free on day one.</h2>
            <p>These are the things to validate before — and after — go-live.</p>
          </div>
          <div className={styles.riskGrid}>
            <div className={styles.risk}>
              <div className={styles.rt}>Duplicate records</div>
              <p>Kinesis delivers at least once, and SFTP files can be re-sent.</p>
              <p className={styles.riskMitigation}>→ Test the de-duplication against replayed files and duplicate events, not just clean data.</p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Silent ingestion failures</div>
              <p>A missing S3 event notification or a stalled pipe quietly stops new data from landing.</p>
              <p className={styles.riskMitigation}>→ Monitor pipe status and load history, and alert on a source that goes quiet.</p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Schema drift</div>
              <p>VARIANT columns accept structural changes without erroring at load time.</p>
              <p className={styles.riskMitigation}>→ Validate expected fields in Task 1 and quarantine anything that doesn&apos;t match.</p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Where the clock starts</div>
              <p>The SLA starts when data is received — not when it reaches Snowflake.</p>
              <p className={styles.riskMitigation}>→ Capture a received-at timestamp at the source and measure end to end.</p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Overlapping task runs</div>
              <p>If a run ever takes longer than 15 minutes, the next one is skipped, eating into the margin.</p>
              <p className={styles.riskMitigation}>→ Track task duration in pipeline metrics and alert well before it nears the interval.</p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Traffic spikes</div>
              <p>A burst on the stream means more, larger Firehose files at once.</p>
              <p className={styles.riskMitigation}>→ Load-test peak volume; Snowpipe scales on its own, but the task warehouse may need headroom.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 09 OUTCOME */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>09</span>The outcome
            </span>
            <h2>SLA met with room to spare — and a paper trail when it isn&apos;t.</h2>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>One pipeline, two sources</strong> — files and events share the same raw → stage → analytics path
              and the same business logic.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>Inside the 30-minute window</strong> — with a worst case of under 30 minutes on both paths, and an
              alert that fires before the SLA is at risk.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>→</div>
            <p>
              <strong>Want the one-page summary?</strong>{" "}
              <a href="/downloads/snowflake-case-study.pdf" download style={{ textDecoration: "underline" }}>
                Download the case study PDF
              </a>
              . Or see how a full migration decision weighed Snowflake against Databricks in the{" "}
              <Link to="/case-studies/m4m-databricks-modernization" style={{ textDecoration: "underline" }}>
                M4M modernization case study
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>SNOWFLAKE INGESTION CASE STUDY — BATCH + STREAMING ON AWS</div>
      </footer>
    </div>
  );
}
