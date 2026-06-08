import re

with open('assets/js/data.js', 'r') as f:
    content = f.read()

# We need to find the `services: [` array.
start_idx = content.find('services: [')
if start_idx == -1:
    print("Could not find services array")
    exit(1)

# Find the opening bracket of the services array
arr_start = content.find('[', start_idx)

# We need to extract the array elements. 
# We can do this by parsing the brackets {}
def extract_objects(text, start_pos):
    objects = []
    pos = start_pos
    while True:
        # Find next opening brace
        obj_start = text.find('{', pos)
        # Check if there is a closing bracket before next brace (end of array)
        end_arr = text.find(']', pos)
        if obj_start == -1 or (end_arr != -1 and end_arr < obj_start):
            break
            
        # Match braces
        count = 0
        in_string = False
        escape = False
        obj_end = -1
        for i in range(obj_start, len(text)):
            c = text[i]
            if escape:
                escape = False
                continue
            if c == '\\':
                escape = True
                continue
            if c == '"' or c == "'":
                # simplistic string parsing
                if not in_string:
                    in_string = c
                elif in_string == c:
                    in_string = False
            
            if not in_string:
                if c == '{':
                    count += 1
                elif c == '}':
                    count -= 1
                    if count == 0:
                        obj_end = i
                        break
        
        if obj_end != -1:
            objects.append((obj_start, obj_end))
            pos = obj_end + 1
        else:
            break
            
    return objects

objects_spans = extract_objects(content, arr_start)
print(f"Found {len(objects_spans)} service objects.")

import os
os.makedirs('assets/js/data', exist_ok=True)

for obj_start, obj_end in objects_spans:
    obj_str = content[obj_start:obj_end+1]
    
    # Extract ID
    id_match = re.search(r'id:\s*"([^"]+)"', obj_str)
    if not id_match:
        id_match = re.search(r'"id":\s*"([^"]+)"', obj_str)
        
    if id_match:
        service_id = id_match.group(1)
        out_content = "window.clinicData = window.clinicData || {};\nwindow.clinicData.services = window.clinicData.services || [];\n\nwindow.clinicData.services.push(" + obj_str + ");\n"
        with open(f'assets/js/data/{service_id}.js', 'w') as out_f:
            out_f.write(out_content)
        print(f"Wrote {service_id}.js")

# Now replace the services array in data.js with an empty array
# The array ends after the last object
last_obj_end = objects_spans[-1][1]
# find the closing bracket of the array
arr_end = content.find(']', last_obj_end)

new_content = content[:arr_start+1] + "\n  ],\n" + content[arr_end+1:].lstrip(" ,\n")

with open('assets/js/data.js', 'w') as f:
    f.write(new_content)
print("Updated data.js")

