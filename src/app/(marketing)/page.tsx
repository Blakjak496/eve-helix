"use client";

import styles from "./page.module.scss";
import { SystemStatus } from "@/components/ui/SystemStatus";
import { login } from "@/lib/helixApi";
import { Panel } from "@/components/ui";
import {
  IconBlocks,
  IconPlanet,
  IconBuildingWarehouse,
  IconBuildingStore,
  IconRoute,
  IconThinkingHigh,
  IconCrosshair,
  IconUsers,
} from "@tabler/icons-react";

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

        <p>
          Manufacturing, logistics, industry and asset tools built on ESI data —
          with all of your characters in one place.
        </p>

        <button className={styles.loginButtonLarge} onClick={login} />
      </div>
      <hr />
      <div className={styles.content}>
        <h2>The toolset</h2>
        <div className={styles.toolsCards}>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconBlocks className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>
                Manufacturing Planner
              </span>
              <span className={styles.toolCardText}>
                Recursive build-vs-buy across full production chains, priced
                against live Jita markets.
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconPlanet className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Planetary Industry</span>
              <span className={styles.toolCardText}>
                See extractors that need resetting, storage nearing full and
                idle planets - across every character all at once.
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconBuildingWarehouse className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Assets</span>
              <span className={styles.toolCardText}>
                Find any item across any character or location, pulled straight
                from the ESI.
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconBuildingStore className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Market Browser</span>
              <span className={styles.toolCardText}>
                Universe-wide price and volume lookups, with destinations set
                in-game straight from the results.
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconThinkingHigh className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Clone Bay</span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconRoute className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Jump Planner</span>
              <span className={styles.toolCardText}>
                Plot a route for your jump-capable ships, taking ship range and
                Jump Drive Calibration skill level into account
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconUsers className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>
                Multi-character linking
              </span>
              <span className={styles.toolCardText}>
                Link every character across every account to one login — no
                re-authenticating to switch pilots.
              </span>
            </div>
          </Panel>
          <Panel className={styles.toolCard}>
            <div className={styles.toolCardContent}>
              <IconCrosshair className={styles.toolIcon} />
              <span className={styles.toolCardHeader}>Personal Killboard</span>
              <span className={styles.toolCardText}>
                Analyse the entire build tree to find the most cost effective
                way to produce any item
              </span>
            </div>
          </Panel>
        </div>
      </div>
      <hr />
      <div className={styles.content}>
        <Panel>
          <div className={styles.flySmarter}>
            <h2 className={styles.flySmarterHeader}>Ready to fly smarter?</h2>
            <span className={styles.flySmarterDetail}>
              Log in with your EVE Online account
            </span>
            <button className={styles.loginButtonLarge} onClick={login} />
          </div>
        </Panel>
      </div>
    </div>
  );
}
