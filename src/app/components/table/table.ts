import { Component, inject, OnInit } from "@angular/core";
import { MatTableModule } from "@angular/material/table";
import { RequestHandler } from "../../requests";
import { interval, Observable, startWith, switchMap } from "rxjs";
import { RoundSummary } from "../../typing";


@Component({
  selector: 'round-table',
  templateUrl: './table.html',
  imports: [MatTableModule],
})
export class RoundTable implements OnInit {
  rounds$!: Observable<RoundSummary[]>;
  displayedColumns: string[] = ['id', 'name', 'vehicle_name', 'driver_name'];
  protected readonly requestHandler = inject(RequestHandler)
  ngOnInit(): void {
    this.rounds$ = interval(60000).pipe(
      startWith(0),
      switchMap(() => this.requestHandler.allRounds())
    );
  }
}
