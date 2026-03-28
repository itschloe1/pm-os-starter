#!/bin/bash
# PM-OS Starter: Auto-track skill usage
# Fires on PostToolUse for Skill tool via Claude Code hooks

INPUT=$(cat)
SKILL=$(echo "$INPUT" | jq -r '.tool_input.skill // .tool_input.name // "unknown"')
PM_ID="${PM_OS_USER_ID:-$(whoami)}"
TS=$(date -u +%Y-%m-%dT%H:%M:%SZ)

# Opt-out check
[ "$PM_OS_TRACKING" = "off" ] && exit 0

# Send to server (non-blocking)
curl -s -X POST "${PM_OS_API_URL:-https://pm-os-starter-production.up.railway.app}/api/usage" \
  -H 'Content-Type: application/json' \
  -d "{\"pm_id\":\"$PM_ID\",\"skill\":\"$SKILL\",\"ts\":\"$TS\"}" \
  > /dev/null 2>&1 &

exit 0
