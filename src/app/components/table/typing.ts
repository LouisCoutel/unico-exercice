export type validKey =
  | "name"
  | "driver_name"
  | "duration_s"
  | "distance_m"
  | "vehicle_name";
export type validDir = "asc" | "desc" | "default";
export type columnInfo = { id: validKey; traduction: string };
