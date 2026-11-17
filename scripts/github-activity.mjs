// OWNER: Claude. Build step: snapshot QJ's public GitHub contribution calendar into
// public/github-activity.json. No token needed (public profile HTML). Never fails the
// build: on any error it keeps the previous file (or writes an empty one).
import { writeFile, readFile } from 'node:fs/promises';

const USER = 'kohqingjia';
const OUT = new URL('../public/github-activity.json', import.meta.url);

async function main() {
  const res = await fetch(`https://github.com/users/${USER}/contributions`, {
    headers: { 'User-Agent': 'kohqingjia.io build', Accept: 'text/html' },
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  const html = await res.text();
  const days = [...html.matchAll(/data-date="(\d{4}-\d{2}-\d{2})"[^>]*?data-level="(\d)"/g)]
    .map(([, date, level]) => ({ date, level: Number(level) }))
    .sort((a, b) => a.date.localeCompare(b.date));
  if (days.length < 300) throw new Error(`only parsed ${days.length} days`);
  const totalMatch = html.match(/([\d,]+)\s+contributions?\s+in the last year/i);
  const total = totalMatch ? Number(totalMatch[1].replace(/,/g, '')) : null;
  const data = { user: USER, fetchedAt: new Date().toISOString(), total, days };
  await writeFile(OUT, JSON.stringify(data));
  console.log(`github-activity: ${days.length} days, total ${total ?? 'unknown'}`);
}

main().catch(async (err) => {
  console.warn(`github-activity: skipped (${err.message})`);
  try {
    await readFile(OUT);
  } catch {
    await writeFile(OUT, JSON.stringify({ user: USER, fetchedAt: null, total: null, days: [] }));
  }
});
