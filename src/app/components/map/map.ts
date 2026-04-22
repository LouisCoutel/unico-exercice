import {
  type AfterViewInit,
  Component,
  inject,
  input,
  signal,
} from "@angular/core";
import { decode } from "@googlemaps/polyline-codec";
import * as L from "leaflet";
import { catchError, of, tap, timeout } from "rxjs";
import { RequestHandler } from "../../requests";
import { NotFound } from "../404/404";

@Component({
  selector: "app-map",
  templateUrl: "./map.html",
  imports: [NotFound],
})
export class MapComponent implements AfterViewInit {
  private map!: L.Map;
  polyline!: L.Polyline;
  id = input.required<string>();
  loading = true;
  noData = signal<boolean>(false);

  protected readonly requestHandler = inject(RequestHandler);

  private initMap(text: string): void {
    const latlong = decode(text, 6);
    const map = L.map("map");
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(map);
    this.polyline = L.polyline(latlong, { color: "red" }).addTo(map);
    map.setView(latlong[0], 15);
    this.map = map;
    this.loading = false;
  }
  ngAfterViewInit(): void {
    this.requestHandler
      .roundTracking(this.id())
      .pipe(
        timeout(5000),
        tap((text) => {
          this.initMap(text);
        }),

        catchError((error) => {
          console.error("Erreur lors du chargement :", error);
          this.loading = false;
          this.noData.set(true);
          return of(null);
        }),
      )
      .subscribe();
  }
}
