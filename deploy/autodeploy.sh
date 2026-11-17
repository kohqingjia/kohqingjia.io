#!/usr/bin/env bash
# Auto-deploy, run by cron on the VPS every 5 minutes:
#   */5 * * * * /home/qingjia/apps/kohqingjia.io/deploy/autodeploy.sh >> /home/qingjia/backups/kohqingjia-deploy.log 2>&1
# Deploys only when origin/main has moved AND GitHub CI passed on that commit.
# Pull-based on purpose: no deploy keys or server credentials stored in GitHub.
set -euo pipefail
cd "$(dirname "$0")/.."
exec 9>/tmp/kohqingjia-deploy.lock
flock -n 9 || exit 0   # a deploy is already running

git fetch -q origin main
new=$(git rev-parse origin/main)
[ "$new" = "$(git rev-parse HEAD)" ] && exit 0

# CI status for that commit (public repo: no token needed).
ci=$(curl -fsS --max-time 15 "https://api.github.com/repos/kohqingjia/kohqingjia.io/commits/$new/check-runs" \
  | python3 -c 'import json,sys; r=json.load(sys.stdin)["check_runs"]; print("pass" if r and all(c["conclusion"]=="success" for c in r) else "pending" if any(c["status"]!="completed" for c in r) or not r else "fail")')
case $ci in
  pending) exit 0 ;;  # try again next run
  fail) [ "$(cat /tmp/kohqingjia-deploy.skipped 2>/dev/null)" = "$new" ] || { echo "$(date -Is) CI failed on ${new:0:7}, not deploying"; echo "$new" > /tmp/kohqingjia-deploy.skipped; }; exit 0 ;;
esac

echo "$(date -Is) auto-deploy ${new:0:7}"
git checkout -q main && git reset -q --hard "$new"
./deploy/vps-deploy.sh
