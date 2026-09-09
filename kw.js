// ISO-8601 Wochenlogik (deutsche KW == ISO-Woche)

const pad = (n) => String(n).padStart(2, '0');

export const formatDe = (d) =>
  `${pad(d.getDate())}.${pad(d.getMonth() + 1)}.${d.getFullYear()}`;

/** ISO-Woche + ISO-Jahr eines Datums (Jahr weicht um Neujahr vom Kalenderjahr ab). */
export function isoWeek(date) {
  const t = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
  t.setUTCDate(t.getUTCDate() + 4 - (t.getUTCDay() || 7)); // Donnerstag dieser Woche
  const year = t.getUTCFullYear();
  const week = Math.ceil(((t - Date.UTC(year, 0, 1)) / 864e5 + 1) / 7);
  return { week, year };
}

/** 52 oder 53 — der 28.12. liegt immer in der letzten ISO-Woche seines Jahres. */
export const weeksInIsoYear = (year) => isoWeek(new Date(year, 11, 28)).week;

/** Montag der Woche, in der `date` liegt (lokale Zeit). */
export function monday(date) {
  const m = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  m.setDate(m.getDate() - ((m.getDay() || 7) - 1));
  return m;
}

/** Montag der ISO-Woche `week` im ISO-Jahr `year`. */
export function isoWeekMonday(year, week) {
  const m = monday(new Date(year, 0, 4)); // der 4.1. liegt immer in KW 1
  m.setDate(m.getDate() + (week - 1) * 7);
  return m;
}

/**
 * Nächstes ISO-Jahr, in dem `week` noch kommt: das aktuelle, falls die Woche
 * noch nicht vorbei ist, sonst das folgende. KW 53 gibt es nicht jedes Jahr,
 * darum ggf. weiterspringen. `week` muss 1..53 sein.
 */
export function upcomingIsoYear(week, from = new Date()) {
  const now = isoWeek(from);
  let year = week >= now.week ? now.year : now.year + 1;
  while (week > weeksInIsoYear(year)) year++;
  return year;
}
