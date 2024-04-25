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
            json="$json\"$folder_name\": ["

            # Loop through files and directories in the folder
            for item in "$folder"/*; do
                item_name=$(basename "$item")
                # Remove file extension
                item_name_no_ext="${item_name%.*}"
                json="$json\"$item_name_no_ext\", "
            done

            # Remove the trailing comma and close the array
            json="${json%, }], "
        fi
    done

    # Remove the trailing comma and close the JSON object
    json="${json%, }}"
    echo "$json"
}

# Get the relative path to the directory
# directory="/home/akshat/oet-handbook/docs"
relative_directory="docs"
directory="$(pwd)/$relative_directory"

# Generate the JSON structure
output_json=$(generate_json "$directory")

# Specify the relative path to the output file
output_file="output.json"

# Write JSON to file
echo "$output_json" > "$output_file"

echo "json generated and saved as output.json"
