#!/bin/bash

generate_json() {
    local directory="$1"
    local json="{"

    # Loop through each directory in the given directory
    for folder in "$directory"/*; do
        if [ -d "$folder" ]; then
            # Extract folder name
            folder_name=$(basename "$folder")
            json="$json\"$folder_name\": ["

            # Loop through files in this folder
            for item in "$folder"/*; do
                item_name=$(basename "$item")

                # Check if the item is a file and not index.md or index.mdx
                if [ -f "$item" ] && [ "$item_name" != "index.md" ] && [ "$item_name" != "index.mdx" ]; then
                    
                    # Attempt to extract the sidebar_label from the file's front matter
                    # 1) grep the line that begins with 'sidebar_label:'
                    # 2) use sed to capture the string in quotes
                    sidebar_label=$(grep -m1 '^sidebar_label:' "$item" | sed -E 's/sidebar_label:\s*"(.*)"/\1/')

                    # If the file has a sidebar_label, use it;
                    # otherwise, fall back to the filename (optional)
                    if [ -n "$sidebar_label" ]; then
                        json="$json\"$sidebar_label\", "
                    else
                        # Optional fallback if there is no sidebar_label
                        item_name_no_ext="${item_name%.*}"
                        json="$json\"$item_name_no_ext\", "
                    fi
                fi
            done

            # Remove the trailing comma in the array and close it
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
