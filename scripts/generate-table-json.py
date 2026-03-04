#!/usr/bin/env python3
"""
scripts/generate-table-json.py

Generate a valid JSON file describing the files structure under the docs/ directory.

Usage:
  python3 scripts/generate-table-json.py --root docs --out output.json

Defaults:
  --root: docs
  --out: output.json

The script groups files by the top-level folder name under the root and for
each file emits an object with `link` (filename without extension) and
`nice_name` (either a detected `sidebar_label` or the filename).
"""

from __future__ import annotations
import argparse
import json
import os
import re
from pathlib import Path
import sys


def nice_name_from_basename(basename: str) -> str:
    # Convert CamelCase or snake/dash to a human-friendly string
    s = re.sub(r"[-_]+", " ", basename)
    s = re.sub(r"([a-z0-9])([A-Z])", r"\1 \2", s)
    return s.strip()


def extract_sidebar_label(path: Path) -> str | None:
    # Simple heuristic: find a line like `sidebar_label: something`
    try:
        with path.open("r", encoding="utf8") as fh:
            for line in fh:
                m = re.match(r"^\s*sidebar_label:\s*(.+)$", line)
                if m:
                    val = m.group(1).strip()
                    # strip surrounding quotes if present
                    if (val.startswith('"') and val.endswith('"')) or (val.startswith("'") and val.endswith("'")):
                        val = val[1:-1]
                    return val.replace("\r", "").replace("\n", "")
    except Exception:
        return None
    return None


def build_map(root: Path) -> dict:
    result: dict = {}
    if not root.exists() or not root.is_dir():
        raise SystemExit(f"Error: root folder not found: {root}")

    for folder in sorted(p for p in root.iterdir() if p.is_dir()):
        items = []
        for f in sorted(folder.iterdir()):
            if not f.is_file():
                continue
            if f.name in ("index.md", "index.mdx"):
                continue
            name_no_ext = f.stem
            nice = extract_sidebar_label(f) or nice_name_from_basename(name_no_ext)
            items.append({"link": name_no_ext, "nice_name": nice})
        result[folder.name] = items
    return result


def main(argv: list[str] | None = None) -> int:
    ap = argparse.ArgumentParser(description="Generate JSON mapping of docs files")
    ap.add_argument("--root", default="docs", help="Root docs folder (default: docs)")
    ap.add_argument("--out", default="output.json", help="Output JSON file (default: output.json)")
    args = ap.parse_args(argv)

    root = Path(args.root)
    out = Path(args.out)

    data = build_map(root)

    out.parent.mkdir(parents=True, exist_ok=True)
    out.write_text(json.dumps(data, ensure_ascii=False, indent=2), encoding="utf8")
    print(f"Wrote {out}", file=sys.stderr)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
