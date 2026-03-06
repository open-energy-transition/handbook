#!/bin/bash

# Function to generate JSON for a directory
generate_json() {
    local directory="$1"
    local json="{"

    # Loop through each directory in the given directory
    for folder in "$directory"/*; do
        if [ -d "$folder" ]; then
            # Extract folder name
            folder_name=$(basename "$folder")

            # We'll build an array of objects here
            local items="["

            # Loop through files in the folder
            for item in "$folder"/*; do
                if [ -f "$item" ]; then
                    item_name=$(basename "$item")
                    
                    # Skip index.md or index.mdx
                    if [ "$item_name" != "index.md" ] && [ "$item_name" != "index.mdx" ]; then
                        
                        # Remove extension from the filename
                        local link_name="${item_name%.*}"

                        # Attempt to extract 'sidebar_label' from the front matter
                        # removing any trailing newline/carriage return characters
                        local nice_name=""
                        nice_name=$(grep '^sidebar_label: ' "$item" \
                          | head -n 1 \
                          | sed -E 's/^sidebar_label:\s*"(.*)"/\1/' \
                          | tr -d '\r\n')

                        # If no sidebar_label was found, default to the link_name
                        if [ -z "$nice_name" ]; then
                            nice_name="$link_name"
                        fi

                        # Append object to our items array
                        items="$items{\"link\": \"$link_name\", \"nice_name\": \"$nice_name\"}, "
                    fi
                fi
            done

            # Remove trailing comma and close the array
            items="${items%, }]"
            
            # Add this folder's items array to the JSON
            json="$json\"$folder_name\": $items, "
        fi
    done

    # Remove trailing comma and close the main JSON object
    json="${json%, }}"
    echo "$json"
}

# Get the relative path to the directory
relative_directory="docs"
directory="$(pwd)/$relative_directory"

# Generate the JSON structure
output_json=$(generate_json "$directory")

# Specify the relative path to the output file
output_file="output.json"

# Write JSON to file
echo "$output_json" > "$output_file"

echo "JSON generated and saved as output.json"
