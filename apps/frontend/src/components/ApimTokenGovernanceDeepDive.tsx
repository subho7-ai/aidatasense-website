import styles from "./ApimTokenGovernanceDeepDive.module.css";

export function ApimTokenGovernanceDeepDive() {
  return (
    <div className={styles.dd}>
      <div className={`${styles.wrap} ${styles.hero}`}>
        <div className={styles.eyebrow}>Gateway · Deep dive</div>
        <h1>
          One token policy. <span className={styles.hl}>Two very different realities</span>, depending on your APIM
          topology.
        </h1>
        <p className={styles.sub}>
          Write <code>token-limit = 100k TPM</code> on Classic Premium&apos;s multi-region gateway, and the system
          quietly admits 300k. Write the same line on Premium v2, and it means exactly what it says. Same policy,
          same intent — the topology decides whether it&apos;s honest.
        </p>
      </div>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <span className={`${styles.topicTag} ${styles.classic}`}>Classic Premium · Multi-region</span>
          <div className={styles.sectionHead}>
            <h2>What multi-region actually deploys</h2>
            <p>
              Adding a region doesn&apos;t clone the whole service — it clones the <strong>gateway</strong>. The
              control plane (management API, developer portal, configuration store) stays in exactly one region and
              replicates outward, read-only, to the rest.
            </p>
          </div>

          <div className={styles.diagramCard}>
            <svg viewBox="0 0 960 260" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="26" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="#8A3320" fontWeight="700" letterSpacing="1">
                PRIMARY · EAST US
              </text>
              <rect x="20" y="40" width="230" height="130" rx="8" fill="#FBEAE4" stroke="#B2482E" strokeWidth="1.2" strokeDasharray="4 3" />
              <text x="35" y="62" fontFamily="IBM Plex Mono, monospace" fontSize="11.5" fill="var(--ink)" fontWeight="700">
                Control plane
              </text>
              <text x="35" y="80" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--muted)">
                management API
              </text>
              <text x="35" y="94" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--muted)">
                developer portal
              </text>
              <text x="35" y="108" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--muted)">
                config store
              </text>
              <rect x="35" y="120" width="200" height="38" rx="6" fill="#fff" stroke="#B2482E" strokeWidth="1" />
              <text x="45" y="135" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Gateway unit
              </text>
              <text x="45" y="149" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                serves + enforces policy
              </text>

              <text x="330" y="26" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--muted)" fontWeight="700" letterSpacing="1">
                SECONDARY · W. EUROPE
              </text>
              <rect x="330" y="40" width="230" height="60" rx="8" fill="#F4F3F9" stroke="#C7C2DE" strokeWidth="1.2" strokeDasharray="4 3" />
              <text x="345" y="62" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Gateway unit
              </text>
              <text x="345" y="76" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                serves + enforces (read-only config)
              </text>

              <text x="330" y="130" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--muted)" fontWeight="700" letterSpacing="1">
                SECONDARY · SE ASIA
              </text>
              <rect x="330" y="144" width="230" height="60" rx="8" fill="#F4F3F9" stroke="#C7C2DE" strokeWidth="1.2" strokeDasharray="4 3" />
              <text x="345" y="166" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Gateway unit
              </text>
              <text x="345" y="180" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                serves + enforces (read-only config)
              </text>

              <path d="M235,90 C 280,90 280,70 330,70" fill="none" stroke="#B2482E" strokeWidth="1.6" />
              <path d="M235,110 C 290,110 290,174 330,174" fill="none" stroke="#B2482E" strokeWidth="1.6" />
              <text x="270" y="60" fontFamily="IBM Plex Mono, monospace" fontSize="8.5" fill="var(--muted)">
                async config replication
              </text>
            </svg>
            <div className={`${styles.callout} ${styles.warn}`}>
              <strong>Only the primary can change configuration.</strong> If it goes down, every gateway keeps
              serving from its replicated copy — you simply can&apos;t publish a policy change until it returns.
            </div>
          </div>

          <div className={styles.diagramCard}>
            <svg viewBox="0 0 960 190" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="20" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--muted)" letterSpacing="0.5">
                SAME POLICY, REPLICATED TO EVERY REGION
              </text>
              <g>
                <rect x="20" y="34" width="220" height="60" rx="8" fill="#F4F3F9" stroke="#C7C2DE" />
                <text x="34" y="56" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--ink)" fontWeight="600">
                  Gateway · East US
                </text>
                <text x="34" y="72" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                  token-limit = 100k TPM (local)
                </text>
              </g>
              <g>
                <rect x="270" y="34" width="220" height="60" rx="8" fill="#F4F3F9" stroke="#C7C2DE" />
                <text x="284" y="56" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--ink)" fontWeight="600">
                  Gateway · W. Europe
                </text>
                <text x="284" y="72" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                  token-limit = 100k TPM (local)
                </text>
              </g>
              <g>
                <rect x="520" y="34" width="220" height="60" rx="8" fill="#F4F3F9" stroke="#C7C2DE" />
                <text x="534" y="56" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--ink)" fontWeight="600">
                  Gateway · SE Asia
                </text>
                <text x="534" y="72" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                  token-limit = 100k TPM (local)
                </text>
              </g>
              <path d="M130,94 L 130,120 M410,94 L 410,120 M630,94 L 630,120" stroke="#C7C2DE" strokeWidth="1.5" />
              <path d="M130,120 L630,120" stroke="#C7C2DE" strokeWidth="1.5" />
              <path d="M380,120 L 380,136" stroke="#B2482E" strokeWidth="1.8" />
              <rect x="20" y="140" width="700" height="42" rx="8" fill="#FBEAE4" stroke="#B2482E" strokeWidth="1.2" />
              <text x="36" y="158" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#8A3320" fontWeight="700">
                INTENDED CEILING: 100k TPM
              </text>
              <text x="260" y="165" fontFamily="IBM Plex Mono, monospace" fontSize="15" fill="#8A3320" fontWeight="700">
                → ACTUALLY ADMITTED: 300k TPM
              </text>
            </svg>
            <div className={`${styles.callout} ${styles.warn}`}>
              <strong>Three regions triple the ceiling.</strong> Counters were never designed to synchronize across
              regions — the limit you configured is enforced once per region, not once in total.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <span className={`${styles.topicTag} ${styles.v2}`}>Premium v2 · Single gateway</span>
          <div className={styles.sectionHead}>
            <h2>One gateway, one counter</h2>
            <p>
              v2&apos;s control plane is platform-managed, not something you deploy into a region — so the topology
              collapses to a single gateway, and the fan-out moves to the <strong>backend</strong> instead: one
              backend pool reaching Foundry deployments across several regions.
            </p>
          </div>

          <div className={styles.diagramCard}>
            <svg viewBox="0 0 960 210" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="24" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--muted)" letterSpacing="0.5">
                YOUR REGION · EAST US
              </text>
              <rect x="20" y="36" width="230" height="130" rx="8" fill="var(--violet-soft)" stroke="var(--violet)" strokeWidth="1.2" strokeDasharray="4 3" />
              <text x="34" y="58" fontFamily="IBM Plex Mono, monospace" fontSize="11" fill="var(--ink)" fontWeight="700">
                Gateway unit
              </text>
              <text x="34" y="74" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                auth + policy · one counter
              </text>
              <rect x="34" y="86" width="200" height="66" rx="6" fill="#fff" stroke="var(--violet)" strokeWidth="1" />
              <text x="44" y="106" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Backend pool
              </text>
              <text x="44" y="122" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                weighted + breaker
              </text>
              <text x="44" y="136" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                spans regions
              </text>

              <text x="330" y="24" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--muted)" letterSpacing="0.5">
                FOUNDRY DEPLOYMENTS
              </text>
              <rect x="330" y="36" width="220" height="40" rx="7" fill="var(--good-soft)" stroke="var(--good)" strokeWidth="1" />
              <text x="344" y="60" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0F5C3C" fontWeight="600">
                Foundry · East US (in-region)
              </text>
              <rect x="330" y="86" width="220" height="40" rx="7" fill="#F4F3F9" stroke="#C7C2DE" strokeWidth="1" />
              <text x="344" y="110" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Foundry · W. Europe
              </text>
              <rect x="330" y="136" width="220" height="40" rx="7" fill="#F4F3F9" stroke="#C7C2DE" strokeWidth="1" />
              <text x="344" y="160" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="var(--ink)" fontWeight="600">
                Foundry · SE Asia
              </text>

              <path d="M234,105 L330,56" fill="none" stroke="var(--good)" strokeWidth="1.6" />
              <path d="M234,120 L330,106" fill="none" stroke="var(--violet)" strokeWidth="1.6" strokeDasharray="4 3" />
              <path d="M234,135 L330,156" fill="none" stroke="var(--violet)" strokeWidth="1.6" strokeDasharray="4 3" />
              <text x="600" y="180" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="var(--muted)">
                dashed = cross-region hop, added latency
              </text>
            </svg>
            <div className={`${styles.callout} ${styles.good}`}>
              <strong>The control plane is no longer something you place.</strong> That removes the primary-region
              dependency of Classic — but distance doesn&apos;t disappear, it reappears on the backend edges instead.
            </div>
          </div>

          <div className={styles.diagramCard}>
            <svg viewBox="0 0 960 190" xmlns="http://www.w3.org/2000/svg">
              <text x="20" y="20" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--muted)" letterSpacing="0.5">
                ONE GATEWAY · ONE COUNTER
              </text>
              <rect x="20" y="34" width="260" height="60" rx="8" fill="var(--violet-soft)" stroke="var(--violet)" />
              <text x="34" y="56" fontFamily="IBM Plex Mono, monospace" fontSize="10.5" fill="var(--ink)" fontWeight="600">
                Gateway · single instance
              </text>
              <text x="34" y="72" fontFamily="IBM Plex Mono, monospace" fontSize="9.5" fill="var(--muted)">
                token-limit = 100k TPM (instance-wide)
              </text>
              <path d="M150,94 L150,120" stroke="var(--violet)" strokeWidth="1.8" />
              <rect x="20" y="126" width="260" height="42" rx="8" fill="var(--good-soft)" stroke="var(--good)" strokeWidth="1.2" />
              <text x="34" y="144" fontFamily="IBM Plex Mono, monospace" fontSize="10" fill="#0F5C3C" fontWeight="700">
                ADMITTED: 100k TPM
              </text>
              <text x="34" y="158" fontFamily="IBM Plex Mono, monospace" fontSize="9" fill="#0F5C3C">
                exactly as configured
              </text>
            </svg>
            <div className={`${styles.callout} ${styles.good}`}>
              <strong>No division by region count, no comment explaining the fudge.</strong> If accurate token
              governance is the reason you put a gateway in front of Foundry at all, this is the strongest argument
              for v2.
            </div>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.wrap}>
          <div className={styles.decision}>
            <div className={styles.sectionHead}>
              <span className={styles.kicker} style={{ color: "#B7A5F5" }}>
                How this lands for you
              </span>
              <h2>Same Foundry fan-out either way. Only the gateway placement — and what it costs you — differs.</h2>
              <p>
                Multi-region is the reason to stay on Classic — it&apos;s the only way to put a gateway physically
                near callers in more than one geography. If your callers are concentrated in one region, that
                advantage buys you little, and v2&apos;s honest counter plus faster scaling is the better trade.
              </p>
            </div>
            <div className={styles.decisionGrid}>
              <div className={`${styles.dcard} ${styles.classic}`}>
                <div className={styles.dt}>STAY ON CLASSIC PREMIUM IF —</div>
                <p>
                  Your callers are genuinely spread across geographies and low-latency regional gateways matter more
                  than exact token enforcement. Budget engineering time to divide your token policy by region count,
                  and document why.
                </p>
              </div>
              <div className={`${styles.dcard} ${styles.v2}`}>
                <div className={styles.dt}>MOVE TO PREMIUM V2 IF —</div>
                <p>
                  Your callers are concentrated in one region, or accurate token governance is the whole reason you
                  put a gateway in front of Foundry. You give up multi-region failover — a regional outage takes down
                  all traffic, with no second gateway to fail over to.
                </p>
              </div>
            </div>
            <div className={styles.actionList}>
              <div className={styles.at}>If you stay on Classic — do this</div>
              <ul>
                <li>
                  Set each region&apos;s policy to <code>intended_TPM ÷ region_count</code>, with a comment
                  explaining why — otherwise the next engineer &quot;fixes&quot; it back upward.
                </li>
                <li>
                  Treat <code>azure-openai-emit-token-metric</code> as the source of truth for total consumption —
                  it&apos;s the only place the true cross-region figure appears.
                </li>
                <li>Size gateway units on concurrent streams, not requests per second — a streaming response holds its connection for the whole generation.</li>
                <li>Provision regional headroom ahead of demand — scaling a Classic Premium region takes tens of minutes, too slow to absorb a burst reactively.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <div className={`${styles.wrap} ${styles.closingNote}`}>
        GATEWAY DEEP DIVE — APIM TOPOLOGY FOR AI TOKEN GOVERNANCE · Verify current Premium v2 multi-region support in
        the Azure portal, as this capability has been under active development.
      </div>
    </div>
  );
}
