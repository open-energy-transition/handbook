#!/bin/bash

generate_json() {
    local directory="$1"
    local json="{"

    for folder in "$directory"/*; do
        if [ -d "$folder" ]; then
            folder_name=$(basename "$folder")
            json="$json\"$folder_name\": ["

            for item in "$folder"/*; do
                item_name=$(basename "$item")

                if [ -f "$item" ] && [ "$item_name" != "index.md" ] && [ "$item_name" != "index.mdx" ]; then

                sidebar_label=$(grep -m1 'sidebar_label:' "$item" | sed -E 's/sidebar_label:\s*"(.*)"/\1/')

                    if [ -n "$sidebar_label" ]; then
                        json="$json\"$sidebar_label\", "
                    fi
                fi
            done
            json="${json%, }], "
        fi
    done

    # Remove the trailing comma in the final JSON string and close the object
    json="${json%, }}"
    echo "$json"
}


relative_directory="docs"
directory="$(pwd)/$relative_directory"

# Generate the JSON structure
output_json=$(generate_json "$directory")

# Specify the relative path to the output file
output_file="output.json"

# Write JSON to file
echo "$output_json" > "$output_file"

echo "json generated and saved as output.json"
