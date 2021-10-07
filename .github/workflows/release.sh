#!/usr/bin/env bash

ERROR=$(npm run semantic-release 2>&1)
EXIT_CODE=$?

echo "$ERROR"

if [ $EXIT_CODE -eq 1 ] && [[ $ERROR != *"ENOCHANGE"* ]]; then
  exit 1;
else
  exit 0;
fi
