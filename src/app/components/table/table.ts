import { AsyncPipe } from "@angular/common";
import { Component, effect, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import type { Observable } from "rxjs";
import { RequestHandler } from "../../requests";
import type { RoundSummary } from "../../typing";
import { TableHeader } from "./header";
import type { columnInfo } from "./typing";

@Component({
  selector: "round-table",
  templateUrl: "./table.html",
  imports: [TableHeader, RouterLink, AsyncPipe],
})
export class RoundTable {
  rounds$!: Observable<RoundSummary[]>;
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
  toH(duration: number): string {
    return `${Math.round(duration / 3600)}h${Math.round((duration % 3600) / 60)}`;
  }
  displayedColumns = this.columns.map((c) => c.id);
  protected readonly requestHandler = inject(RequestHandler);

  constructor() {
    effect(() => {
      this.rounds$ = this.requestHandler.allRounds();
    });
  }
}
