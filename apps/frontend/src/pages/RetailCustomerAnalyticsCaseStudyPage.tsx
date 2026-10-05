import { useEffect } from "react";
import { Link } from "react-router-dom";
import styles from "./caseStudy.module.css";

const SOURCES = [
  { name: "Website", format: "Clickstream events · JSON", lives: "Event files in cloud storage", tells: "What shoppers browse, search, and abandon" },
  { name: "Mobile app", format: "App events · JSON", lives: "Event files in cloud storage", tells: "Sessions, push-notification responses, in-app purchases" },
  { name: "In-store POS", format: "Transactions · relational rows", lives: "Store transaction database", tells: "What was bought, where, and for how much" },
  { name: "Loyalty program", format: "Members & points · relational rows", lives: "CRM database", tells: "Who the shopper is — the key that ties channels together" },
];

const SEGMENTS = [
  { name: "Champions", color: "var(--good)", profile: "Bought recently, often, and spend the most", action: "Early access and referral offers" },
  { name: "Loyal regulars", color: "var(--steel)", profile: "Steady, frequent mid-value buyers", action: "Points boosts to move them up a tier" },
  { name: "Promising new", color: "#5a7fd6", profile: "First purchases in the last few weeks", action: "Welcome series and a second-purchase nudge" },
  { name: "At risk", color: "var(--amber)", profile: "Used to buy often, now gone quiet", action: "Win-back offers before they lapse" },
  { name: "Bargain hunters", color: "#8a6bbf", profile: "Buy mainly during promotions", action: "Promotion alerts, not full-price campaigns" },
];

const ACCESS = [
  { group: "Data engineers", bronze: "yes", silver: "yes", gold: "yes", pii: "yes" },
  { group: "Data scientists", bronze: "no", silver: "yes", gold: "yes", pii: "masked" },
  { group: "Marketing", bronze: "no", silver: "no", gold: "yes", pii: "masked" },
  { group: "Executives", bronze: "no", silver: "no", gold: "dash", pii: "no" },
] as const;

function AccessCell({ value }: { value: "yes" | "no" | "masked" | "dash" }) {
  if (value === "yes") return <span className={styles.yes}>✓ Full</span>;
  if (value === "masked") return <span className={styles.masked}>Masked</span>;
  if (value === "dash") return <span className={styles.yes}>Dashboards only</span>;
  return <span className={styles.no}>—</span>;
}

export function RetailCustomerAnalyticsCaseStudyPage() {
  useEffect(() => {
    document.title = "One customer, four channels — retail customer analytics on Databricks";
  }, []);

  return (
    <div className={styles.page}>
      {/* HERO */}
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Use case · Retail customer analytics · Databricks lakehouse</div>
        <h1>
          One customer, four channels, <span className={styles.accent}>one governed view</span>.
        </h1>
        <p className={styles.sub}>
          How a retailer turns website, mobile app, in-store, and loyalty data — four formats in four separate
          systems — into customer segments that marketing can act on and executives can track, all on one platform.
        </p>
        <div className={styles.statRow}>
          <div className={styles.stat}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>channels, each in its own format</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>1</div>
            <div className={styles.statLabel}>unified customer ID</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>5</div>
            <div className={styles.statLabel}>shopper segments</div>
          </div>
          <div className={styles.stat}>
            <div className={styles.statValue}>4</div>
            <div className={styles.statLabel}>teams, each seeing only what it should</div>
          </div>
        </div>
        <p className={styles.disclaimer}>
          This is an illustrative scenario: it shows a typical design for this problem rather than a specific
          company. Names, segments, and code are examples.
        </p>
      </div>

      {/* 01 CHALLENGE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>01</span>The challenge
            </span>
            <h2>The same shopper looks like four different people.</h2>
            <p>
              A customer who browses on the website, buys in store, and redeems points in the app shows up in four
              systems with four IDs. Nobody can answer the basic question — who are our best customers? — without
              stitching it together by hand.
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>Source</th>
                  <th>Format</th>
                  <th>Where it lives</th>
                  <th>What it tells you</th>
                </tr>
              </thead>
              <tbody>
                {SOURCES.map((source) => (
                  <tr key={source.name}>
                    <td className={styles.key}>{source.name}</td>
                    <td>{source.format}</td>
                    <td>{source.lives}</td>
                    <td>{source.tells}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* 02 ARCHITECTURE FLOW */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>02</span>Diagram flow
            </span>
            <h2>From four sources to three audiences, through one lakehouse.</h2>
            <p>
              Data moves left to right through bronze, silver, and gold layers, then up to the people who use it.
              Unity Catalog governs every step. The numbers match the walkthrough below.
            </p>
          </div>

          <div className={styles.flow}>
            <div className={styles.flowRow}>
              <div className={`${styles.stage} ${styles.stageSources}`}>
                <div className={styles.stageTitle}>Sources</div>
                <div className={styles.stageItem}>
                  Website<span>JSON clickstream</span>
                </div>
                <div className={styles.stageItem}>
                  Mobile app<span>JSON app events</span>
                </div>
                <div className={styles.stageItem}>
                  In-store POS<span>Transaction DB</span>
                </div>
                <div className={styles.stageItem}>
                  Loyalty program<span>CRM DB</span>
                </div>
              </div>
              <div className={styles.flowArrow} aria-hidden>
                →
              </div>
              <div className={`${styles.stage} ${styles.stageIngest}`}>
                <div className={styles.stageTitle}>
                  <span className={styles.flowNum}>1</span>Ingest
                </div>
                <div className={styles.stageItem}>
                  Auto Loader<span>New event files, incrementally</span>
                </div>
                <div className={styles.stageItem}>
                  Change data capture<span>Inserts and updates from the databases</span>
                </div>
              </div>
              <div className={styles.flowArrow} aria-hidden>
                →
              </div>
              <div className={`${styles.stage} ${styles.stageBronze}`}>
                <div className={styles.stageTitle}>Bronze</div>
                <div className={styles.stageItem}>
                  Raw, as received<span>One streaming table per source</span>
                </div>
              </div>
              <div className={styles.flowArrow} aria-hidden>
                →
              </div>
              <div className={`${styles.stage} ${styles.stageSilver}`}>
                <div className={styles.stageTitle}>
                  <span className={styles.flowNum}>2</span>Silver
                </div>
                <div className={styles.stageItem}>
                  Cleaned &amp; validated<span>Data-quality expectations</span>
                </div>
                <div className={styles.stageItem}>
                  Unified customer<span>Identity resolution across channels</span>
                </div>
              </div>
              <div className={styles.flowArrow} aria-hidden>
                →
              </div>
              <div className={`${styles.stage} ${styles.stageGold}`}>
                <div className={styles.stageTitle}>
                  <span className={styles.flowNum}>3</span>Gold
                </div>
                <div className={styles.stageItem}>
                  customer_360<span>One row per shopper</span>
                </div>
                <div className={styles.stageItem}>
                  customer_features<span>Recency, frequency, spend</span>
                </div>
                <div className={styles.stageItem}>
                  customer_segments<span>Written back by the model</span>
                </div>
              </div>
            </div>

            <div className={styles.flowUp} aria-hidden>
              ↓
            </div>

            <div className={styles.consumers}>
              <div className={styles.consumer}>
                <div className={styles.consumerWho}>
                  <span className={styles.flowNum}>4</span>Data scientists
                </div>
                <div className={styles.consumerTool}>MLflow</div>
                Train and track the segmentation model; score every shopper into gold.
              </div>
              <div className={styles.consumer}>
                <div className={styles.consumerWho}>
                  <span className={styles.flowNum}>5</span>Marketing
                </div>
                <div className={styles.consumerTool}>Databricks SQL</div>
                Query segments directly to build campaign audiences.
              </div>
              <div className={styles.consumer}>
                <div className={styles.consumerWho}>
                  <span className={styles.flowNum}>5</span>Executives
                </div>
                <div className={styles.consumerTool}>Live dashboards</div>
                Track campaign results and segment movement over time.
              </div>
            </div>

            <div className={styles.govBand}>
              <span className={styles.flowNum}>6</span> UNITY CATALOG{" "}
              <span>— access control, PII masking, and lineage across every layer</span>
            </div>
          </div>
        </div>
      </section>

      {/* 03 WALKTHROUGH */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>03</span>Step by step
            </span>
            <h2>What happens at each stage, and why.</h2>
          </div>

          <div className={styles.steps}>
            <div className={styles.step}>
              <span className={styles.stepNum}>1</span>
              <div>
                <h3>Ingest everything, incrementally</h3>
                <p>
                  A <strong>Lakeflow Declarative Pipeline</strong> (formerly Delta Live Tables) lands each source in
                  its own bronze table. <strong>Auto Loader</strong> picks up only new website and app event files,
                  while <strong>change data capture</strong> streams inserts and updates from the POS and loyalty
                  databases. Nothing is reloaded in full, and raw data is kept as received so any later step can be
                  replayed.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.codeCard} style={{ marginTop: 12 }}>
            <div className={styles.codeHead}>Bronze · pipeline SQL (illustrative)</div>
            <pre>{`CREATE OR REFRESH STREAMING TABLE bronze_web_events
AS SELECT * FROM STREAM read_files(
  '/Volumes/retail/raw/web_events/', format => 'json'
);`}</pre>
          </div>

          <div className={styles.steps} style={{ marginTop: 16 }}>
            <div className={styles.step}>
              <span className={styles.stepNum}>2</span>
              <div>
                <h3>Clean, validate, and unify the customer</h3>
                <p>
                  Silver tables apply <strong>expectations</strong> — data-quality rules the pipeline enforces,
                  dropping or flagging bad rows and reporting how many failed. Then comes the step that makes
                  everything else possible: <strong>identity resolution</strong>. Loyalty IDs, hashed emails, and phone
                  numbers link a shopper&apos;s web sessions, app events, and in-store receipts to a single{" "}
                  <span className={styles.mono}>customer_id</span>.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.codeCard} style={{ marginTop: 12 }}>
            <div className={styles.codeHead}>Silver · expectations (illustrative)</div>
            <pre>{`CREATE OR REFRESH STREAMING TABLE silver_pos_transactions (
  CONSTRAINT has_store   EXPECT (store_id IS NOT NULL) ON VIOLATION DROP ROW,
  CONSTRAINT valid_total EXPECT (total_amount > 0)
)
AS SELECT * FROM STREAM(bronze_pos_transactions);`}</pre>
          </div>

          <div className={styles.steps} style={{ marginTop: 16 }}>
            <div className={styles.step}>
              <span className={styles.stepNum}>3</span>
              <div>
                <h3>Build the gold customer view</h3>
                <p>
                  Gold turns unified activity into business-ready tables: <span className={styles.mono}>customer_360</span>{" "}
                  with one row per shopper, and <span className={styles.mono}>customer_features</span> with the
                  signals the model needs — <strong>recency</strong> (days since last purchase),{" "}
                  <strong>frequency</strong> (orders in 12 months), <strong>monetary</strong> value (spend in 12
                  months), plus channel mix and promotion usage.
                </p>
              </div>
            </div>
            <div className={styles.step}>
              <span className={styles.stepNum}>4</span>
              <div>
                <h3>Segment shoppers with MLflow</h3>
                <p>
                  Data scientists train a clustering model on the gold features, comparing runs with different numbers
                  of segments. <strong>MLflow</strong> records every run&apos;s parameters and metrics, and the chosen
                  model is registered in Unity Catalog — so it&apos;s versioned and governed like a table. A weekly job
                  scores every shopper and writes the result to{" "}
                  <span className={styles.mono}>customer_segments</span>.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.codeCard} style={{ marginTop: 12 }}>
            <div className={styles.codeHead}>Segmentation · MLflow (illustrative)</div>
            <pre>{`import mlflow
from sklearn.cluster import KMeans
from sklearn.pipeline import make_pipeline
from sklearn.preprocessing import StandardScaler

mlflow.set_registry_uri("databricks-uc")
features = spark.table("retail.gold.customer_features").toPandas()
X = features[["recency_days", "frequency_12m", "monetary_12m"]]

with mlflow.start_run(run_name="rfm-kmeans-k5"):
    model = make_pipeline(StandardScaler(), KMeans(n_clusters=5, random_state=42)).fit(X)
    mlflow.log_param("n_clusters", 5)
    mlflow.sklearn.log_model(
        model, "model",
        registered_model_name="retail.ml.customer_segmentation",
        input_example=X.head(5),
    )`}</pre>
          </div>

          <div className={styles.steps} style={{ marginTop: 16 }}>
            <div className={styles.step}>
              <span className={styles.stepNum}>5</span>
              <div>
                <h3>Put segments to work</h3>
                <p>
                  Marketing queries <span className={styles.mono}>customer_segments</span> directly through{" "}
                  <strong>Databricks SQL</strong> to build campaign audiences — no export, no waiting on an engineer.
                  Executives follow campaign results and how shoppers move between segments on{" "}
                  <strong>live dashboards</strong>. Both run on a SQL warehouse, so heavy pipeline work never slows
                  them down.
                </p>
              </div>
            </div>
          </div>
          <div className={styles.codeCard} style={{ marginTop: 12 }}>
            <div className={styles.codeHead}>Marketing · Databricks SQL (illustrative)</div>
            <pre>{`SELECT region, COUNT(*) AS shoppers, ROUND(AVG(monetary_12m), 2) AS avg_spend
FROM retail.gold.customer_segments
WHERE segment = 'At risk'
GROUP BY ALL
ORDER BY shoppers DESC;`}</pre>
          </div>
        </div>
      </section>

      {/* 04 SEGMENTS */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>04</span>The segments
            </span>
            <h2>Five shopper groups, each with a different campaign.</h2>
            <p>
              Clustering finds the groups; marketing names them and decides what each one should hear. These five are
              a typical outcome of segmenting on recency, frequency, and spend.
            </p>
          </div>
          <div className={styles.segmentGrid}>
            {SEGMENTS.map((segment) => (
              <div key={segment.name} className={styles.segment} style={{ borderTopColor: segment.color }}>
                <div className={styles.segmentName}>{segment.name}</div>
                <p style={{ margin: "4px 0 0" }}>{segment.profile}</p>
                <p className={styles.segmentAction}>→ {segment.action}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 05 GOVERNANCE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>05</span>
              <span className={styles.flowNum} style={{ marginRight: 6 }}>
                6
              </span>
              Governance
            </span>
            <h2>The right teams see the right data — enforced, not assumed.</h2>
            <p>
              Customer data is personal data. Unity Catalog grants decide which layers each team can reach, column
              masks hide personal details from anyone who doesn&apos;t need them, and lineage shows exactly which
              sources fed every segment.
            </p>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>Team</th>
                  <th>Bronze</th>
                  <th>Silver</th>
                  <th>Gold</th>
                  <th>Email &amp; phone</th>
                </tr>
              </thead>
              <tbody>
                {ACCESS.map((row) => (
                  <tr key={row.group}>
                    <td className={styles.key}>{row.group}</td>
                    <td>
                      <AccessCell value={row.bronze} />
                    </td>
                    <td>
                      <AccessCell value={row.silver} />
                    </td>
                    <td>
                      <AccessCell value={row.gold} />
                    </td>
                    <td>
                      <AccessCell value={row.pii} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className={styles.codeGrid} style={{ marginTop: 16 }}>
            <div className={styles.codeCard}>
              <div className={styles.codeHead}>Column mask · hide email (illustrative)</div>
              <pre>{`CREATE FUNCTION retail.gov.mask_email(email STRING)
RETURN CASE
  WHEN is_account_group_member('data_engineers') THEN email
  ELSE '***@***'
END;

ALTER TABLE retail.gold.customer_360
  ALTER COLUMN email SET MASK retail.gov.mask_email;`}</pre>
            </div>
            <div className={styles.codeCard}>
              <div className={styles.codeHead}>Grants · gold for marketing (illustrative)</div>
              <pre>{`GRANT USE CATALOG ON CATALOG retail TO marketing;
GRANT USE SCHEMA  ON SCHEMA retail.gold TO marketing;
GRANT SELECT      ON SCHEMA retail.gold TO marketing;

-- No grants on bronze or silver: marketing
-- simply cannot see raw or intermediate data.`}</pre>
            </div>
          </div>
        </div>
      </section>

      {/* 06 COMPUTE */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>06</span>Right compute for each team
            </span>
            <h2>Each workload runs on the compute built for it.</h2>
          </div>
          <div className={styles.tableWrap}>
            <table className={styles.data}>
              <thead>
                <tr>
                  <th>Workload</th>
                  <th>Who</th>
                  <th>Compute</th>
                  <th>Why</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className={styles.key}>Ingest &amp; transform</td>
                  <td>Data engineers</td>
                  <td>Pipeline on job or serverless compute</td>
                  <td>Spins up per run and shuts down after — no idle cost</td>
                </tr>
                <tr>
                  <td className={styles.key}>Model development</td>
                  <td>Data scientists</td>
                  <td>All-purpose cluster</td>
                  <td>Interactive notebooks for exploring and training</td>
                </tr>
                <tr>
                  <td className={styles.key}>Weekly scoring</td>
                  <td>Scheduled job</td>
                  <td>Job compute</td>
                  <td>Production run, isolated from experiments</td>
                </tr>
                <tr>
                  <td className={styles.key}>Queries &amp; dashboards</td>
                  <td>Marketing, executives</td>
                  <td>SQL warehouse</td>
                  <td>Built for many concurrent SQL users and BI</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className={styles.tableNote}>
            See{" "}
            <Link to="/platforms/databricks#architecture" style={{ textDecoration: "underline" }}>
              compute types on the Databricks page
            </Link>{" "}
            for how all-purpose clusters, job clusters, and SQL warehouses differ.
          </p>
        </div>
      </section>

      {/* 07 OUTCOME */}
      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>
              <span className={styles.chapter}>07</span>The outcome
            </span>
            <h2>From four disconnected systems to one platform everyone trusts.</h2>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>One customer, one ID</strong> — every channel resolves to the same shopper, so &quot;who are our
              best customers?&quot; has a single answer.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>Self-service for marketing</strong> — campaign audiences come straight from SQL on governed
              segments, without exports or engineering tickets.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>Privacy by design</strong> — personal details are masked by default, access follows team
              membership, and lineage traces every segment back to its sources.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>RETAIL CUSTOMER ANALYTICS — ILLUSTRATIVE DATABRICKS LAKEHOUSE USE CASE</div>
      </footer>
    </div>
  );
}
