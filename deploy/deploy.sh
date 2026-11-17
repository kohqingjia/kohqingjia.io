#!/usr/bin/env bash
# Redeploy kohqingjia.io on qj-vps. Run from your laptop: ./deploy/deploy.sh
# Pulls main on the VPS, rebuilds the container, then smoke-tests the live site.
set -euo pipefail
ssh qj-vps 'set -e
  cd ~/apps/kohqingjia.io
  git fetch -q origin && git checkout -q main && git reset -q --hard origin/main
  echo "deploying $(git log --oneline -1)"
  docker compose -f deploy/compose.yaml up -d --build --quiet-pull 2>&1 | tail -2
  sleep 2
  fail=0
  for p in / /projects /about $(ls src/content/projects | sed "s/\.md$//; s|^|/|"); do
    code=$(curl -s -o /dev/null -w "%{http_code}" --max-time 15 "https://kohqingjia.io$p")
    [ "$code" = 200 ] || { echo "FAIL $code $p"; fail=1; }
  done
  [ "$(curl -s -o /dev/null -w "%{http_code}" https://kohqingjia.io/definitely-not-a-page)" = 404 ] || { echo "FAIL 404 page"; fail=1; }
  [ $fail = 0 ] && echo "all routes OK"; exit $fail'
