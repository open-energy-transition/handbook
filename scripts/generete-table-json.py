import os
import json

def generate_folder_list(directory):
    folder_dict = {}
    for root, dirs, files in os.walk(directory):
        relative_path = os.path.relpath(root, directory)
        if relative_path == '.':
            relative_path = ''
        folder_dict[relative_path] = []

        for file in files:
            if file != 'index.mdx':
                file_name, _ = os.path.splitext(file)
                folder_dict[relative_path].append(file_name)
        
        for dir in dirs:
            folder_dict[relative_path].append(dir)

    # Remove empty keys
    folder_dict = {k: v for k, v in folder_dict.items() if v and k}

    return folder_dict

def save_to_json(data, filename):
    with open(filename, 'w') as json_file:
        json.dump(data, json_file, indent=4)

if __name__ == "__main__":
    repo_root = os.getcwd()
    directory = os.path.join(repo_root,"docs")
    folder_dict = generate_folder_list(directory)
    json_filename = "output.json"
    save_to_json(folder_dict, json_filename)
    print(f"Folder list saved to {json_filename}")
