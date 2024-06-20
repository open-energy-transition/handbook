#!/bin/bash

# Define the source and destination files
SOURCE_FILE="$(pwd)/CHANGELOG.md"
DEST_FILE="$(pwd)/docs/Handbook/HandbookChangelog.mdx"

# Extract content from source file after "# Changelog"
CONTENT=$(awk '/^# Changelog/{flag=1; next} flag' "$SOURCE_FILE")

# Use sed to replace content after "# Handbook Changelog" in destination file
sed -i.bak -e '/^# Handbook Changelog/,$d' "$DEST_FILE"
echo -e "# Handbook Changelog\n$CONTENT" >> "$DEST_FILE"

# Remove the backup file
rm "$DEST_FILE.bak"

echo "Content from $SOURCE_FILE has been copied and modified in $DEST_FILE"
