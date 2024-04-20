export function formatRelativeDate(date: Date) {
  const relativeDate = date.valueOf() - Date.now();
  if (relativeDate < 1000 * 60 * 60 * 24) {
    return new Intl.RelativeTimeFormat("system", {
      numeric: "auto",
    }).format(Math.round(relativeDate / (1000 * 60 * 60)), "hours");
  }
  return new Intl.RelativeTimeFormat("system", {
    numeric: "auto",
  }).format(Math.round(relativeDate / (1000 * 60 * 60 * 24)), "days");
}
