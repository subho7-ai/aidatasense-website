import { useEffect } from "react";
import styles from "./EtlMigrationCaseStudyPage.module.css";

export function EtlMigrationCaseStudyPage() {
  useEffect(() => {
    document.title = "The data center is shutting down — legacy ETL migration case study";
  }, []);

  return (
    <div className={styles.page}>
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Use case · Legacy platform migration</div>
        <h1>
          The data center is shutting down.
          <br />
          The ETL system isn&apos;t ready to move.<span className={styles.hot}>&nbsp;</span>
        </h1>
        <p className={styles.sub}>
          A bank&apos;s 5-year-old finance &amp; procurement ETL system — built on C#, SQL Server, and 45 cascading
          SSIS packages — needs a new home before end of 2026, without a rewrite the current team can&apos;t ship in
          time.
        </p>

        <div className={styles.deadlineStrip}>
          <span className={styles.dot} /> DATA CENTER DECOMMISSION — END OF 2026 · BUSINESS CONTINUITY IS THE #1
          CONSTRAINT
        </div>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The system today</span>
            <h2>One ETL pipeline, six external systems, zero room for downtime.</h2>
            <p>
              &quot;Magellan M4G&quot; is the system of record feeding back-office finance systems — payments,
              invoices, contingent worker data, master reference data — moving via SFTP and API in CSV, cXML, and
              JSON.
            </p>
          </div>
          <div className={styles.sysmap}>
            <div className={styles.sysmapRow}>
              <span className={`${styles.chip} ${styles.core}`}>Magellan M4G</span>
              <span className={styles.chip}>SQL Server 2017 + SSIS</span>
              <span className={styles.chip}>45 cascading packages</span>
              <span className={styles.chip}>C# / .NET</span>
            </div>
            <div className={styles.sysmapRow}>
              <span className={styles.chip}>SAP Ariba</span>
              <span className={styles.chip}>Concur</span>
              <span className={styles.chip}>Fieldglass</span>
              <span className={styles.chip}>Cvent</span>
              <span className={styles.chip}>Uber for Business</span>
            </div>
            <div className={styles.sysmapRow}>
              <span className={styles.chip}>Workday</span>
              <span className={styles.chip}>Financial Control System</span>
              <span className={styles.chip}>Approval Mgmt</span>
              <span className={styles.chip}>Corporate Credit Card</span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The constraint</span>
            <h2>Every &quot;obvious&quot; cloud path has a catch.</h2>
            <p>
              The team&apos;s own skillset is C#, SQL, and SSIS. Azure Data Factory is approved — but has no SSIS
              runtime set up yet. Databricks is under evaluation — but its DevOps tooling is 3-4 months from ready,
              and the team doesn&apos;t know Azure. Snowflake works for one department — but moving this application
              there needs a fresh negotiation the deadline doesn&apos;t allow.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The approach</span>
            <h2>A phased migration — not a big-bang rewrite.</h2>
            <p>
              Meet the deadline first with the lowest-risk path, then modernize incrementally once the platform and
              the team are actually ready.
            </p>
          </div>

          <div className={styles.timeline}>
            <svg viewBox="0 0 980 210" xmlns="http://www.w3.org/2000/svg">
              <line x1="20" y1="150" x2="900" y2="150" stroke="var(--line)" strokeWidth="2" />
              <line x1="900" y1="115" x2="900" y2="185" stroke="var(--danger)" strokeWidth="2.5" />
              <text
                x="900"
                y="105"
                textAnchor="middle"
                fontFamily="IBM Plex Mono, monospace"
                fontSize="11"
                fill="var(--danger)"
                fontWeight="700"
              >
                DC SHUTDOWN
              </text>

              {/* phase 1 */}
              <circle cx="140" cy="150" r="7" fill="var(--good)" />
              <rect x="55" y="30" width="170" height="78" rx="8" fill="#EAF6EF" stroke="var(--good)" strokeWidth="1.2" />
              <text x="140" y="52" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--good)" fontWeight="700">
                PHASE 1 · NOW
              </text>
              <text x="140" y="72" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                Lift &amp; shift via
              </text>
              <text x="140" y="88" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                Azure-SSIS Runtime
              </text>
              <text x="140" y="102" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                No package rewrite needed
              </text>

              {/* phase 2 */}
              <circle cx="480" cy="150" r="7" fill="var(--steel)" />
              <rect x="395" y="30" width="170" height="78" rx="8" fill="var(--steel-soft)" stroke="var(--steel)" strokeWidth="1.2" />
              <text x="480" y="52" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--steel)" fontWeight="700">
                PHASE 2 · +3-6 MO
              </text>
              <text x="480" y="72" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                Modernize into
              </text>
              <text x="480" y="88" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                Databricks, source by source
              </text>
              <text x="480" y="102" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                Once DevOps + training land
              </text>

              {/* phase 3 */}
              <circle cx="760" cy="150" r="7" fill="var(--amber)" />
              <rect x="675" y="30" width="170" height="78" rx="8" fill="var(--amber-soft)" stroke="var(--amber)" strokeWidth="1.2" />
              <text x="760" y="52" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--amber)" fontWeight="700">
                PHASE 3 · OPTIONAL
              </text>
              <text x="760" y="72" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                Revisit Snowflake
              </text>
              <text x="760" y="88" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="600">
                where it already fits
              </text>
              <text x="760" y="102" textAnchor="middle" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                Not on the critical path
              </text>

              <path d="M225,150 L390,150" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 4" />
              <path d="M565,150 L670,150" stroke="var(--line)" strokeWidth="2" strokeDasharray="4 4" />
            </svg>
            <div className={styles.phaseLegend}>
              <span>
                <i className={`${styles.sw} ${styles.p1}`} />
                Phase 1 — meets the deadline
              </span>
              <span>
                <i className={`${styles.sw} ${styles.p2}`} />
                Phase 2 — modernizes at a safe pace
              </span>
              <span>
                <i className={`${styles.sw} ${styles.p3}`} />
                Phase 3 — kept open, not urgent
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.decisionCard}>
            <div className={styles.sectionHead}>
              <span className={`${styles.kicker} ${styles.decisionKicker}`}>The engineering call</span>
              <h2>Why lift-and-shift first, instead of rewriting for Databricks immediately?</h2>
              <p>
                The team knows SSIS. The deadline doesn&apos;t move. Rewriting 45 cascading packages for a platform
                the team hasn&apos;t used yet, on tooling that isn&apos;t finished, is the highest-risk option
                available — precisely when risk tolerance is lowest.
              </p>
            </div>
            <table className={styles.decision}>
              <thead>
                <tr>
                  <th>Path</th>
                  <th>Team fit</th>
                  <th>Tooling readiness</th>
                  <th>Best when</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    Azure-SSIS Runtime<span className={styles.badge}>Selected · Phase 1</span>
                  </td>
                  <td>High — same C#/SQL/SSIS skills</td>
                  <td>Ready today</td>
                  <td>Deadline is fixed and non-negotiable</td>
                </tr>
                <tr>
                  <td>Rewrite for Databricks now</td>
                  <td>Low — team still training on Azure</td>
                  <td>DevOps/Terraform tooling 3-4 months out</td>
                  <td>No hard deadline, time to retrain</td>
                </tr>
                <tr>
                  <td>Migrate to Snowflake now</td>
                  <td>Low — only one dept. has experience</td>
                  <td>Requires new enterprise negotiation</td>
                  <td>Already a Snowflake-standard shop</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>What we&apos;d still watch closely</span>
            <h2>Real constraints, not hypothetical ones.</h2>
          </div>
          <div className={styles.riskGrid}>
            <div className={styles.risk}>
              <div className={styles.rt}>GitLab → Azure DevOps gap</div>
              <p>
                Databricks&apos; hard dependency on Azure DevOps conflicts with the team&apos;s current GitLab-based
                workflow — this needs to be resolved before Phase 2 can start, not discovered mid-migration.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Data classification carries over</div>
              <p>
                Some source data (e.g. cardholder data from Uber for Business) is classified Restricted. Whatever
                platform hosts it inherits those same encryption, access, and audit requirements — not a lighter bar
                just because the platform is newer.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Disaster recovery targets vary by source</div>
              <p>
                RTOs range from 0 minutes (Ariba) to 120 days (Cvent). Phase 1&apos;s lift-and-shift needs to preserve
                each source&apos;s existing DR commitment, not average them into one blanket SLA.
              </p>
            </div>
            <div className={styles.risk}>
              <div className={styles.rt}>Phase 2 depends on people, not just tooling</div>
              <p>
                The current team is still completing Azure training. A tooling-ready Databricks environment
                doesn&apos;t help if the people who&apos;d build on it aren&apos;t ready at the same time.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.sectionHead}>
            <span className={styles.kicker}>The outcome</span>
            <h2>Business continuity first. Modernization on its own timeline.</h2>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>✓</div>
            <p>
              <strong>Phase 1 clears the hard deadline</strong> without asking the team to learn a new platform under
              time pressure — the existing SSIS logic moves, unchanged, onto supported Azure infrastructure.
            </p>
          </div>
          <div className={styles.outcomeBlock}>
            <div className={styles.ic}>→</div>
            <p>
              <strong>Phase 2 modernizes deliberately</strong> — one source system at a time into Databricks, once
              both the DevOps tooling and the team&apos;s Azure skills are actually ready, instead of forcing both
              under deadline pressure.
            </p>
          </div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className={styles.wrap}>LEGACY ETL MIGRATION CASE STUDY — PHASED CLOUD MODERNIZATION</div>
      </footer>
    </div>
  );
}
