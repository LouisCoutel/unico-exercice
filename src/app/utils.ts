function sortAny<T>(vals: T[keyof T][]) {
  if (vals.some((v) => v == null)) {
    return vals[0] == null ? 1 : -1;
  }
  if (vals.every((v) => typeof v === "string")) {
    return vals[0].localeCompare(vals[1]);
  }
  return vals[0] > vals[1] ? 1 : -1;
}

export function sortBy<T>(key: keyof T, dir: "asc" | "desc" = "asc") {
  return (a: T, b: T) => {
    const vals = [a[key], b[key]];
    const sortVal = sortAny<T>(vals);
    return dir === "asc" ? sortVal : -sortVal;
  };
}
