#!/usr/bin/env bash
# Visit stats for kohqingjia.io, from the VPS's Caddy access log (no tracking script, no cookies).
# Run from your laptop: ./deploy/stats.sh   → builds an HTML report with GoAccess and opens it.
# The log keeps truncated IPs for 30 days and never leaves the VPS except as this report.
set -euo pipefail
out="${TMPDIR:-/tmp}/kohqingjia-stats.html"
ssh qj-vps 'docker run --rm -i -v stardyhub_caddy_data:/data:ro --entrypoint sh allinurl/goaccess:1.9.3 -c \
  "cat /data/logs/kohqingjia*.log | goaccess - --log-format=CADDY --ignore-crawlers --ignore-statics=req \
   --ignore-panel=KEYPHRASES --html-report-title=kohqingjia.io -o html"' > "$out"
echo "report: $out"
[ -n "${NO_OPEN:-}" ] || { command -v open >/dev/null && open "$out"; }
