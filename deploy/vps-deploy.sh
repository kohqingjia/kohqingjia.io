#!/usr/bin/env bash
# Runs ON the VPS from the repo root: rebuild the site container, then smoke-test the live site.
# Called by deploy/deploy.sh (manual, from a laptop) and deploy/autodeploy.sh (cron).
set -euo pipefail
cd "$(dirname "$0")/.."
echo "deploying $(git log --oneline -1)"
docker compose -f deploy/compose.yaml up -d --build --quiet-pull 2>&1 | tail -2
sleep 2
fail=0
for p in /KohQingJia_Resume.pdf $(docker exec kohqingjia-site sh -c 'grep -o "<loc>[^<]*" /srv/sitemap.xml' | sed 's|<loc>https://kohqingjia.io||'); do
  code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://kohqingjia.io$p")
  [ "$code" = 200 ] || { echo "FAIL $code $p"; fail=1; }
done
[ "$(curl -s -o /dev/null -w "%{http_code}" https://kohqingjia.io/definitely-not-a-page)" = 404 ] || { echo "FAIL 404 page"; fail=1; }
[ $fail = 0 ] && echo "all routes OK"
exit $fail
