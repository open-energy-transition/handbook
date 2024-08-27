#!/bin/bash

CONFIG_FILENAME="docusaurus.config.js"

CONFIG_FILE="./$CONFIG_FILENAME"

# Check if the file exists
if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: File not found at $CONFIG_FILE"
    exit 1
fi

sed -i "s|baseUrl: \`/\${projectName}/\`|baseUrl: \`/\`|g" "$CONFIG_FILE"

# Check if the sed command was successful
if [[ $? -eq 0 ]]; then
    echo "Successfully updated baseUrl in $CONFIG_FILE for PR preview"
else
    echo "Error: Failed to update baseUrl"
fi
