import { Result } from "./errors"
import type { components } from "./schema"

type RoundSummary = components["schemas"]["RoundSummary"]
type Round = components["schemas"]["Round"]

import { decode, encode, LatLngTuple } from "@googlemaps/polyline-codec";

const rootUrl = "https://exo-api.dev.unicofrance.com/"

const fetchAny = async <T>(url: string, parser: (res: Response) => Promise<T>): Promise<Result<T, number>> => {
  const res = await fetch(url)
  if (res.ok) {
    const value = await parser(res)
    return { success: res.ok, value: value }
  }
  return { success: res.ok, error: res.status }
}

const polylineParse = async (res: Response) => {
  const text = await res.text()
  return decode(text)

}
export const allRounds = () => fetchAny<RoundSummary[]>(`${rootUrl}/round/`, res => res.json())
export const oneRound = (id: string) => fetchAny<Round>(`${rootUrl}/round/${id}`, res => res.json())
export const roundTracking = (id: string) => fetchAny<LatLngTuple[]>(`${rootUrl}/round/${id}/track`, polylineParse)

