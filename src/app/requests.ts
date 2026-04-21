import { Injectable } from "@angular/core";
import { decode } from "@googlemaps/polyline-codec";
import { HttpClient } from "@angular/common/http";
import { Round, RoundSummary } from "./typing";

const rootUrl = "https://exo-api.dev.unicofrance.com/";

@Injectable({ providedIn: "root" })
export class RequestHandler {
  constructor(private http: HttpClient) { }
  allRounds() {
    return this.http.get<RoundSummary[]>(`${rootUrl}/round/`, {
      responseType: "json",
    });
  }
  oneRound(id: string) {
    return this.http.get<Round>(`${rootUrl}/round/${id}`, {
      responseType: "json",
    });
  }
  roundTracking(id: string) {
    return this.http.get(`${rootUrl}/round/${id}/track`, {
      responseType: "text",
    });
  }
}
