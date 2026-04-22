import { AsyncPipe } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { catchError, map, type Observable, of } from "rxjs";
import { RequestHandler } from "../../requests";
import type { RoundSummary } from "../../typing";
import { sortBy } from "../../utils";
import { NotFound } from "../404/404";
import { TableHeader } from "../header/header";
import { SearchBar } from "../search/search";
import type { columnInfo, validDir, validKey } from "./typing";

@Component({
  selector: "round-table",
  templateUrl: "./table.html",
  imports: [TableHeader, RouterLink, AsyncPipe, SearchBar, NotFound],
})
export class RoundTable {
  rounds$!: Observable<RoundSummary[]>;
  sorted$!: Observable<RoundSummary[]>;
  filtered$!: Observable<RoundSummary[]>;
  sortDir = signal<validDir>("default");
  loading = true;
  searchTerm = "";
  noData = signal(true);

  protected readonly requestHandler = inject(RequestHandler);

  handleSearch(value: string) {
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
    this.handleSearch("");
  }

  toH(duration: number): string {
    let minutes = Math.round((duration % 3600) / 60).toString();
    minutes = minutes.length < 2 ? `0${minutes}` : minutes;
    return `${Math.round(duration / 3600)}h${minutes}`;
  }

  constructor() {
    this.rounds$ = this.requestHandler.allRounds().pipe(
      catchError((err) => {
        console.error("Failed to load rounds", err);
        this.noData.set(true);
        this.loading = false;
        return of([]); // fallback value so UI doesn’t break
      }),
    );
    this.loading = false;
    this.noData.set(false);
    this.sortColumn("name");
    this.handleSearch("");
  }
}
