import assert from 'node:assert/strict';
import { isoWeek, weeksInIsoYear, monday, formatDe } from './kw.js';

const d = (y, m, day) => new Date(y, m - 1, day);

// 01.01.2026 ist ein Donnerstag -> KW 1/2026
assert.deepEqual(isoWeek(d(2026, 1, 1)), { week: 1, year: 2026 });
// Jahresgrenze: 29.12.2025 gehört schon zu KW 1/2026
assert.deepEqual(isoWeek(d(2025, 12, 29)), { week: 1, year: 2026 });
// 01.01.2021 ist ein Freitag -> noch KW 53/2020
assert.deepEqual(isoWeek(d(2021, 1, 1)), { week: 53, year: 2020 });
assert.deepEqual(isoWeek(d(2026, 9, 9)), { week: 37, year: 2026 });
assert.deepEqual(isoWeek(d(2026, 12, 31)), { week: 53, year: 2026 });

assert.equal(weeksInIsoYear(2026), 53); // 1.1. = Do
assert.equal(weeksInIsoYear(2020), 53); // Schaltjahr, 1.1. = Mi
assert.equal(weeksInIsoYear(2025), 52);

assert.equal(monday(d(2026, 9, 9)).getDate(), 7);   // Mi -> Mo
assert.equal(monday(d(2026, 9, 7)).getDate(), 7);   // Mo -> Mo
assert.equal(monday(d(2026, 9, 13)).getDate(), 7);  // So -> Mo derselben Woche

assert.equal(formatDe(d(2026, 9, 7)), '07.09.2026');


// --- Route /<woche> ---
const { isoWeekMonday, upcomingIsoYear } = await import('./kw.js');
const today = d(2026, 9, 9); // KW 37/2026

assert.equal(upcomingIsoYear(40, today), 2026); // noch nicht vorbei
assert.equal(upcomingIsoYear(37, today), 2026); // genau diese Woche
assert.equal(upcomingIsoYear(7, today), 2027);  // schon vorbei -> nächstes Jahr
assert.equal(upcomingIsoYear(53, d(2027, 1, 5)), 2032); // erstes 53-Wochen-Jahr danach
assert.equal(weeksInIsoYear(2032), 53);

assert.equal(isoWeekMonday(2026, 37).toDateString(), d(2026, 9, 7).toDateString());
assert.equal(isoWeekMonday(2026, 1).toDateString(), d(2025, 12, 29).toDateString());
assert.equal(isoWeekMonday(2020, 53).toDateString(), d(2020, 12, 28).toDateString());

console.log('ok');
