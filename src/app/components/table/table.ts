import { AsyncPipe } from "@angular/common";
import { Component, effect, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { map, type Observable } from "rxjs";
import { RequestHandler } from "../../requests";
import type { RoundSummary } from "../../typing";
import { sortBy } from "../../utils";
import { TableHeader } from "./header";
import { SearchBar } from "./search";
import type { columnInfo, validDir, validKey } from "./typing";

@Component({
  selector: "round-table",
  templateUrl: "./table.html",
  imports: [TableHeader, RouterLink, AsyncPipe, SearchBar],
})
export class RoundTable {
  rounds$!: Observable<RoundSummary[]>;
  sorted$!: Observable<RoundSummary[]>;
  filtered$!: Observable<RoundSummary[]>;
  sortDir = signal<validDir>("default");
  searchTerm = "";

  handleSearch(value: string) {
    console.log("YO");
    if (value.length > 0) {
      this.filtered$ = this.sorted$.pipe(
        map((sorted) => [...sorted].filter((r) => r.name.includes(value))),
      );
    } else {
      this.filtered$ = this.sorted$.pipe(map((sorted) => [...sorted]));
    }
  }

  columns: columnInfo[] = [
    { id: "name", traduction: "Nom de la tournée" },
    { id: "driver_name", traduction: "Nom du conducteur" },
    { id: "vehicle_name", traduction: "Nom du véhicule" },
    { id: "duration_s", traduction: "Durée" },
    { id: "distance_m", traduction: "Distance parcourue" },
  ];
  toKm(distance: number): string {
    return `${Math.round(distance / 10) / 100} km`;
  }
  toggleDir() {
    const opts: validDir[] = ["asc", "desc", "default"];
    const i = opts.indexOf(this.sortDir());
    this.sortDir.set(opts[(i + 1) % 3]);
  }

  sortColumn(key: validKey) {
    this.toggleDir();
    if (this.sortDir() === "default") {
      this.sorted$ = this.rounds$.pipe(map((rounds) => [...rounds]));
    } else {
      this.sorted$ = this.rounds$.pipe(
        map((rounds) =>
          [...rounds].sort(sortBy(key, this.sortDir() as "asc" | "desc")),
        ),
      );
    }
  }
  toH(duration: number): string {
    return `${Math.round(duration / 3600)}h${Math.round((duration % 3600) / 60)}`;
  }
  displayedColumns = this.columns.map((c) => c.id);
  protected readonly requestHandler = inject(RequestHandler);

  constructor() {
    this.rounds$ = this.requestHandler.allRounds();
    this.sortColumn("name");
    this.handleSearch("");
  }
}
