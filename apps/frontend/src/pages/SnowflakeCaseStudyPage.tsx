import { useEffect } from "react";
import styles from "./SnowflakeCaseStudyPage.module.css";

export function SnowflakeCaseStudyPage() {
  useEffect(() => {
    document.title = "Two ways in, one warehouse — Snowflake ingestion case study";
  }, []);

  return (
    <div className={styles.page}>
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Use case · Data Engineering on Snowflake</div>
        <h1>
          Two ways in. <em>One</em> warehouse.
          <br />
          Under 30 minutes, every time.
        </h1>
        <p className={styles.sub}>
          A client needed SFTP batch files and real-time Kinesis streams — same JSON shape,
          completely different delivery patterns — to land in the same production-ready
          Snowflake tables, fast.
        </p>

        <div
          className={styles.flowVisual}
          role="img"
          aria-label="Diagram showing SFTP batch files and Kinesis streaming data converging through Snowflake into unified analytics tables in under 30 minutes"
        >
          <svg viewBox="0 0 960 220" xmlns="http://www.w3.org/2000/svg">
            {/* batch path (dashed, amber) */}
            <path
              d="M 40 60 C 260 60, 320 118, 460 118"
              fill="none"
              stroke="var(--batch)"
              strokeWidth="2.5"
              className={`${styles.dashLine} ${styles.flowDashAnim}`}
            />
            {/* stream path (solid, cyan) */}
            <path d="M 40 170 C 260 170, 320 122, 460 122" fill="none" stroke="var(--stream)" strokeWidth="2.5" />

            {/* source labels */}
            <text x="40" y="42" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="var(--batch)" fontWeight="600">
              SFTP · 2x DAILY
            </text>
            <text x="40" y="192" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="var(--stream)" fontWeight="600">
              KINESIS · REAL-TIME
            </text>

            {/* source nodes */}
            <circle cx="34" cy="60" r="5" fill="var(--batch)" />
            <circle cx="34" cy="170" r="5" fill="var(--stream)" />

            {/* convergence node */}
            <circle cx="470" cy="120" r="9" fill="var(--navy)" />
            <text x="470" y="148" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fill="var(--navy)" fontWeight="600">
              SNOWFLAKE
            </text>

            {/* pulse traveling along stream path */}
            <circle
              r="4"
              fill="var(--stream)"
              className={styles.pulseDot}
              style={{ offsetPath: "path('M 40 170 C 260 170, 320 122, 460 122')" }}
            />

            {/* output path */}
            <path d="M 480 120 L 640 120" fill="none" stroke="var(--line)" strokeWidth="2.5" />

            {/* output node : analytics */}
            <rect x="645" y="96" width="180" height="48" rx="9" fill="var(--stream-soft)" stroke="var(--stream)" strokeWidth="1.2" />
            <text x="735" y="115" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--navy)" fontWeight="600">
              FACT / DIM TABLES
            </text>
            <text x="735" y="131" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--muted)">
              Tableau · Power BI
            </text>

            {/* SLA ring */}
            <g transform="translate(895,120)">
              <circle r="26" fill="none" stroke="var(--line)" strokeWidth="5" />
              <circle
                r="26"
                fill="none"
                stroke="var(--good)"
                strokeWidth="5"
                strokeDasharray="163.36"
                strokeDashoffset="130.7"
                transform="rotate(-90)"
              />
              <text y="-2" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="12" fontWeight="700" fill="var(--good)">
                ~5m
              </text>
              <text y="12" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="8" fill="var(--muted)">
                of 30m SLA
              </text>
            </g>
          </svg>
          <div className={styles.flowLegend}>
            <span>
              <i className={`${styles.dot} ${styles.batch}`} /> Batch — SFTP files, 30-min pickup cadence
            </span>
            <span>
              <i className={`${styles.dot} ${styles.stream}`} /> Streaming — Kinesis, continuous
            </span>
          </div>
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The problem</span>
            <h2>Batch and streaming rarely play well together.</h2>
            <p>
              Most pipelines end up as two disconnected systems — one for files, one for events —
              with duplicated transformation logic and no shared way to catch bad data. This
              client needed one coherent pipeline instead, with both sources landing in the same
              trusted tables inside a 30-minute window.
            </p>
          </div>

          <div className={styles.stages}>
            <div className={styles.stage}>
              <div className={styles.stageName}>Land</div>
              <h3>Two intake paths, one staging area</h3>
              <p>
                SFTP files and Kinesis events are captured separately, then written into distinct
                S3 zones — keeping each source's failure modes isolated.
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageName}>Load</div>
              <h3>Independent Snowpipes</h3>
              <p>
                Batch loads on a 30-minute cycle; streaming data auto-ingests continuously. Each
                source moves at its own natural pace.
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageName}>Reconcile</div>
              <h3>Union, dedupe, validate</h3>
              <p>
                A single orchestrated Task layer merges both sources, removes duplicates, and
                quarantines anything that fails validation — automatically.
              </p>
            </div>
            <div className={styles.stage}>
              <div className={styles.stageName}>Serve</div>
              <h3>One set of trusted tables</h3>
              <p>
                Clean, deduplicated data lands in shared Fact and Dimension tables — regardless of
                which door it came in through.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.decisionCard}>
            <div className={styles.sectionHead}>
              <span className={`${styles.kicker} ${styles.decisionKicker}`}>The engineering call</span>
              <h2>Four ways to stream Kinesis into Snowflake. We picked the one that matched the SLA.</h2>
              <p>
                Sub-second latency sounds appealing until you price in the operational overhead. A
                30-minute SLA doesn't need a seconds-fast pipe — it needs a reliable one.
              </p>
            </div>
            <table className={styles.decision}>
              <thead>
                <tr>
                  <th>Approach</th>
                  <th>Latency</th>
                  <th>Reliability</th>
                  <th className={styles.selectedCol}>Best when</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Lambda + connector</td>
                  <td>~1 min</td>
                  <td>Medium</td>
                  <td className={styles.selectedCol}>Custom transform needed pre-Snowflake</td>
                </tr>
                <tr>
                  <td>
                    Firehose → S3 → Snowpipe <span className={styles.badge}>Selected</span>
                  </td>
                  <td>~5 min</td>
                  <td>High</td>
                  <td className={styles.selectedCol}>SLA is 5–30 min, simplicity matters</td>
                </tr>
                <tr>
                  <td>Kafka connector</td>
                  <td>~1 min</td>
                  <td>High</td>
                  <td className={styles.selectedCol}>Kafka/MSK already in place</td>
                </tr>
                <tr>
                  <td>Snowpipe Streaming</td>
                  <td>~seconds</td>
                  <td>Medium</td>
                  <td className={styles.selectedCol}>Sub-minute latency is a hard requirement</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The outcome</span>
            <h2>SLA met with room to spare — and a paper trail when it isn't.</h2>
          </div>
          <div className={styles.outcome}>
            <div className={styles.statBlock}>
              <div className={styles.statNumber}>
                30<span className={styles.of}>min SLA · built to consistently land within it</span>
              </div>
              <div className={styles.statLabel}>
                Both ingestion paths — batch and streaming — are designed to land comfortably
                inside this window.
              </div>
            </div>
            <p style={{ color: "var(--muted)", fontSize: "15px" }}>
              Every run writes to a pipeline metrics table and triggers an automatic alert if any
              batch is at risk of breaching the 30-minute window — so freshness issues surface
              before a client ever has to ask.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.cta}>
            <div>
              <h3>Want the full technical breakdown?</h3>
              <p>Architecture diagrams, Snowpipe/Task configuration, and the private-networking setup, in one PDF.</p>
            </div>
            <a className={styles.btn} href="/downloads/snowflake-case-study.pdf" download>
              → Download full case study
            </a>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>SNOWFLAKE INGESTION CASE STUDY — BATCH + STREAMING UNIFICATION</div>
      </footer>
    </div>
  );
}
