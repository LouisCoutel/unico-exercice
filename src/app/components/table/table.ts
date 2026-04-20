import { AfterViewInit, Component, inject, OnInit, ViewChild } from "@angular/core";
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from "@angular/material/table";
import { RoundSummary } from "../../typing";
import { RequestHandler } from "../../requests";


@Component({
  selector: 'round-table',
  templateUrl: './table.html',
  imports: [MatTableModule, MatSortModule],
})
export class RoundTable implements OnInit, AfterViewInit {
  rounds = new MatTableDataSource<RoundSummary>();
  dataSource = new MatTableDataSource<RoundSummary>();
  displayedColumns: string[] = ['id', 'name', 'vehicle_name', 'driver_name'];
  protected readonly requestHandler = inject(RequestHandler)

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.requestHandler.allRounds().subscribe(data => this.rounds.data = data)
  }
  ngAfterViewInit() {
    this.rounds.sort = this.sort;
  }
}
