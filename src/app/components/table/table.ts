import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RoundSummary } from "../../typing";
import { RequestHandler } from "../../requests";
import { columnInfo } from "./typing";


@Component({
  selector: 'round-table',
  templateUrl: './table.html',
  imports: [MatTableModule, MatSortModule],
})
export class RoundTable implements OnInit, AfterViewInit {
  rounds = new MatTableDataSource<RoundSummary>();
  columns: columnInfo[] = [
    { id: "id", traduction: "Id" },
    { id: "name", traduction: "Nom" },
    { id: "driver_name", traduction: "Conducteur" },
    { id: "vehicle_name", traduction: "Véhicule" },
    { id: "duration_s", traduction: "Durée (s)" },
    { id: "distance_m", traduction: "Distance (m)" }
  ]
  displayedColumns = this.columns.map(c => c.id);
  protected readonly requestHandler = inject(RequestHandler)


  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.requestHandler.allRounds().subscribe(data => this.rounds.data = data)
  }
  ngAfterViewInit() {
    this.rounds.sort = this.sort;
  }
}
