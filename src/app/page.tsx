import { redirect } from "next/navigation";

// Manufacturing Planner is the only tool wired up so far — land there
// until there's an actual home/dashboard worth showing.
export default function Home() {
  redirect("/manufacturing");
}
