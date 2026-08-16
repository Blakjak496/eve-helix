import { Factory } from "lucide-react";

import { PageHeader } from "@/components/layout/PageHeader";
import {
  BuildTree,
  Button,
  DataGrid,
  DataTable,
  Field,
  Metric,
  Panel,
  PanelBody,
  PanelHeader,
  TreeNode,
  type DataTableColumn,
} from "@/components/ui";

import styles from "./manufacturing.module.scss";

// Placeholder data — swap for real ESI-backed cost/build calculations
// once the pricing and blueprint services exist.
interface BreakdownRow {
  item: string;
  required: string;
  buildCost: string;
  buyCost: string;
  cheapest: string;
  method: "Build" | "Buy";
}

const breakdown: BreakdownRow[] = [
  {
    item: "Raven Navy Issue Blueprint",
    required: "1",
    buildCost: "68,500,000 ISK",
    buyCost: "68,500,000 ISK",
    cheapest: "68,500,000 ISK",
    method: "Buy",
  },
  {
    item: "Capital Construction Parts",
    required: "40",
    buildCost: "842,112,000 ISK",
    buyCost: "910,400,000 ISK",
    cheapest: "842,112,000 ISK",
    method: "Build",
  },
  {
    item: "Fusion Thruster",
    required: "4",
    buildCost: "146,872,000 ISK",
    buyCost: "183,200,000 ISK",
    cheapest: "146,872,000 ISK",
    method: "Build",
  },
  {
    item: "Construction Parts",
    required: "2,000",
    buildCost: "142,000,000 ISK",
    buyCost: "142,000,000 ISK",
    cheapest: "142,000,000 ISK",
    method: "Buy",
  },
  {
    item: "Carbon Polymers",
    required: "5,000",
    buildCost: "95,500,000 ISK",
    buyCost: "95,500,000 ISK",
    cheapest: "95,500,000 ISK",
    method: "Buy",
  },
  {
    item: "Sylramic Fibers",
    required: "8,000",
    buildCost: "72,000,000 ISK",
    buyCost: "72,000,000 ISK",
    cheapest: "72,000,000 ISK",
    method: "Buy",
  },
];

const columns: DataTableColumn<BreakdownRow>[] = [
  { key: "item", header: "Item", render: (row) => row.item },
  {
    key: "required",
    header: "Required",
    align: "right",
    render: (row) => row.required,
  },
  {
    key: "buildCost",
    header: "Build Cost",
    align: "right",
    render: (row) => row.buildCost,
  },
  {
    key: "buyCost",
    header: "Buy Cost",
    align: "right",
    render: (row) => row.buyCost,
  },
  {
    key: "cheapest",
    header: "Cheapest",
    align: "right",
    render: (row) => (
      <span className="data-table__cell--positive">{row.cheapest}</span>
    ),
  },
  { key: "method", header: "Method", render: (row) => row.method },
];

export default function ManufacturingPlannerPage() {
  return (
    <>
      <PageHeader
        icon={<Factory size={18} />}
        title="Manufacturing Planner"
        description="Plan, build, profit."
      />

      <div className={styles.grid}>
        <Panel className={styles.targetItem}>
          <PanelHeader title="Target Item" />
          <PanelBody>
            <div className={styles.shipRender} aria-hidden="true">
              <Factory size={32} />
            </div>

            <div className={styles.itemName}>Raven Navy Issue</div>
            <div className={styles.itemMeta}>Battleship · Caldari Navy</div>

            <Field label="Quantity" htmlFor="quantity">
              <input id="quantity" type="number" min={1} defaultValue={1} />
            </Field>

            <Field label="Total Build Time" htmlFor="build-time" readOnly>
              <input id="build-time" readOnly value="1d 14h 32m" />
            </Field>

            <Metric
              label="Total Cost (Cheapest)"
              value="1,283,721,512 ISK"
              tone="positive"
            />
          </PanelBody>
        </Panel>

        <Panel className={styles.buildTreePanel}>
          <PanelHeader title="Build Tree" />
          <BuildTree>
            <TreeNode name="Raven Navy Issue" price="1,283,721,512 ISK" />
            <TreeNode
              name="Raven Navy Issue Blueprint"
              quantity="x1"
              price="68,500,000 ISK"
              method="buy"
            />
            <TreeNode
              name="Capital Construction Parts"
              quantity="x40"
              price="842,112,000 ISK"
              method="build"
            />
            <TreeNode
              name="Fusion Thruster"
              quantity="x4"
              price="146,872,000 ISK"
              method="build"
            />
          </BuildTree>
        </Panel>

        <Panel className={styles.facility}>
          <PanelHeader
            title="Facility Selection"
            actions={<Button variant="default">Change</Button>}
          />
          <PanelBody>
            <Field label="Selected Facility" htmlFor="facility">
              <select id="facility" defaultValue="azbel">
                <option value="azbel">Azbel — Engineering Complex</option>
              </select>
            </Field>

            <DataGrid>
              <Metric label="ME Bonus" value="-4.0%" tone="positive" />
              <Metric label="TE Bonus" value="-2.0%" tone="positive" />
              <Metric label="Material Bonus" value="-2.0%" tone="positive" />
              <Metric label="Time Bonus" value="-10.0%" tone="positive" />
              <Metric label="System" value="Jita 0.9" />
              <Metric label="Job Slots" value="11 / 11" />
              <Metric label="Tax Rate" value="1.0%" />
              <Metric label="Security" value="High Sec" />
            </DataGrid>
          </PanelBody>
        </Panel>

        <Panel className={styles.jobPreview}>
          <PanelHeader title="Job Preview" />
          <PanelBody>
            <Metric label="Manufacturing Jobs" value="23" />
            <Metric label="Total Build Time" value="1d 14h 32m" />
            <Metric
              label="Total Build Cost"
              value="1,283,721,512 ISK"
              tone="positive"
            />
            <Metric label="Total Install Cost" value="12,837,215 ISK" />
            <div className={styles.bottomAlign}>
              <Button variant="primary" fullWidth>
                Export to ESI
              </Button>
            </div>
          </PanelBody>
        </Panel>

        <Panel className={styles.breakdown}>
          <PanelHeader title="Cheapest Option Breakdown" />
          <PanelBody>
            <DataTable
              columns={columns}
              rows={breakdown}
              getRowKey={(row) => row.item}
              footer={
                <tr>
                  <td colSpan={4} />
                  <td style={{ textAlign: "right" }}>1,283,721,512 ISK</td>
                  <td />
                </tr>
              }
            />
          </PanelBody>
        </Panel>
      </div>
    </>
  );
}
