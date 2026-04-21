import {
  type AfterViewInit,
  Component,
  inject,
  type OnInit,
  ViewChild,
} from "@angular/core";
import { MatSort, MatSortModule } from "@angular/material/sort";
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RouterLink } from "@angular/router";
import { RequestHandler } from "../../requests";
import type { RoundSummary } from "../../typing";
import type { columnInfo } from "./typing";

@Component({
  selector: "round-table",
  templateUrl: "./table.html",
  imports: [MatTableModule, MatSortModule, RouterLink],
})
export class RoundTable implements OnInit, AfterViewInit {
  rounds = new MatTableDataSource<RoundSummary>();
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

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.requestHandler
      .allRounds()
      .subscribe((data) => (this.rounds.data = data));
  }
  ngAfterViewInit() {
    this.rounds.sort = this.sort;
  }
}
