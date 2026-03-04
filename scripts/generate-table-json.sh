#!/bin/bash

set -euo pipefail

# This script generates a valid JSON file (output.json) describing files under
# the docs/ directory. The previous pure-shell approach concatenated strings
# and could emit invalid JSON when a value contained quotes or newlines.
#
# Here we use an embedded Python script to reliably build the JSON and write it
# with proper escaping.

ROOT_DIR="$(pwd)/docs"
OUT_FILE="output.json"

if [ ! -d "$ROOT_DIR" ]; then
  echo "Error: docs directory not found at $ROOT_DIR" >&2
  exit 1
fi

python3 - <<'PY'
import os, json, re, sys
root = os.path.join(os.getcwd(), 'docs')
result = {}

# Iterate top-level directories in docs/
for folder_name in sorted(os.listdir(root)):
    folder = os.path.join(root, folder_name)
    if not os.path.isdir(folder):
        continue
    items = []
    # Iterate files in the folder
    for fname in sorted(os.listdir(folder)):
        p = os.path.join(folder, fname)
        if not os.path.isfile(p):
            continue
        if fname in ('index.md', 'index.mdx'):
            continue
        name_no_ext = os.path.splitext(fname)[0]
        nice_name = name_no_ext
        # Try to extract sidebar_label: value from the file (simple heuristic)
        try:
            with open(p, 'r', encoding='utf8') as fh:
                for line in fh:
                    m = re.match(r'^\s*sidebar_label:\s*(.+)$', line)
                    if m:
                        val = m.group(1).strip()
                        # strip surrounding quotes if present
                        if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                            val = val[1:-1]
                        # remove any trailing carriage returns/newlines
                        val = val.replace('\r', '').replace('\n', '')
                        nice_name = val
                        break
        except Exception:
            # ignore read errors and fall back to filename
            pass
        items.append({"link": name_no_ext, "nice_name": nice_name})
    result[folder_name] = items

# Write JSON to output.json in repository root
with open('output.json', 'w', encoding='utf8') as out:
    json.dump(result, out, ensure_ascii=False, indent=2)

print('Wrote output.json', file=sys.stderr)
PY

echo "JSON generated and saved as $OUT_FILE"
