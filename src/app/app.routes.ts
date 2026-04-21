import type { Routes } from "@angular/router";
import { RoundPage } from "./components/roundPage/roundPage";
import { RoundTable } from "./components/table/table";

export const routes: Routes = [
  { path: "**", redirectTo: "rounds" },
  { path: "round/:id", component: RoundPage },
  { path: "rounds", component: RoundTable },
];
