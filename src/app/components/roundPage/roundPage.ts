import { AsyncPipe } from "@angular/common";
import { Component, effect, inject, signal } from "@angular/core";
import { ActivatedRoute, RouterLink } from "@angular/router";
import type { Observable } from "rxjs";
import { RequestHandler } from "../../requests";
import type { Round } from "../../typing";
import { MapComponent } from "../map/map";
import { NotFound } from "../404/404";

@Component({
  selector: "round-page",
  templateUrl: "./roundPage.html",
  imports: [AsyncPipe, RouterLink, MapComponent, NotFound],
})
export class RoundPage {
  private activatedRoute = inject(ActivatedRoute);
  id = signal("");
  round$!: Observable<Round>;

  protected readonly requestHandler = inject(RequestHandler);

  constructor() {
    this.activatedRoute.params.subscribe((params) => {
      this.id.set(params["id"]);
    });
    effect(() => {
      this.round$ = this.requestHandler.oneRound(this.id());
    });
  }
}
