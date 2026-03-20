#!/usr/bin/env bash
set -euo pipefail

LOG_FILE="/var/log/regis-datasec-healthcheck.log"
TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')

if ! curl -sf --max-time 10 "http://127.0.0.1:3004/" > /dev/null 2>&1; then
  echo "[${TIMESTAMP}] FAIL: regis-datasec (port 3004) is not responding" >> "$LOG_FILE"
  exit 1
fi
