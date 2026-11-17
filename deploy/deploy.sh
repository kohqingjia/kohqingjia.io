#!/usr/bin/env bash
# Manual redeploy of kohqingjia.io on qj-vps. Run from your laptop: ./deploy/deploy.sh
# (Merges to main also deploy themselves within ~5 minutes: see deploy/autodeploy.sh.)
set -euo pipefail
ssh qj-vps 'set -e
  cd ~/apps/kohqingjia.io
  exec 9>/tmp/kohqingjia-deploy.lock; flock 9
  git fetch -q origin && git checkout -q main && git reset -q --hard origin/main
  ./deploy/vps-deploy.sh'
