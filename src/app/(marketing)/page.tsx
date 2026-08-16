import styles from "./page.module.scss";
import { SystemStatus } from "@/components/ui/SystemStatus";
import Image from "next/image";
import { Panel } from "@/components/ui";

export default function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.hero}>
        <SystemStatus />
        <h1 className={styles.header}>
          <span>
            EVE Online tools
            <br />
            you actually use.
          </span>
          <span className={styles.textCyan}>One login.</span>
        </h1>

        <h5>
          Manufacturing, logistics, industry and asset tools built on ESI data —
          with all of your characters in one place.
        </h5>

        <Image
          src="/eve-sso-login-black-large.png"
          width={270}
          height={45}
          alt="EVE SSO Login button"
          className={styles.loginButton}
        />
      </div>
      <hr />
      <div className={styles.content}>
        <h2>The toolset</h2>
        <div className={styles.toolsCards}>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
