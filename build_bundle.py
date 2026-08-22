import os

root_dir = os.path.dirname(os.path.abspath(__file__))
tree_file = os.path.join(root_dir, "PROJECT_TREE.txt")
output_file = os.path.join(root_dir, "sdh-engine-bundle.txt")

lines_written = 0

with open(tree_file, "r", encoding="utf-8") as tf:
    tree_paths = [line.strip() for line in tf if line.strip()]

with open(output_file, "w", encoding="utf-8") as out:
    for rel_path in tree_paths:
        clean_rel = rel_path.lstrip("./")
        if not clean_rel or clean_rel == ".":
            continue
        
        full_path = os.path.join(root_dir, clean_rel)
        
        # Skip if directory, zip, or binary/large dump file if inappropriate
        if os.path.isdir(full_path):
            continue
        if clean_rel.endswith(".zip") or clean_rel == "sdh-engine-bundle.txt":
            continue

        if os.path.exists(full_path):
            out.write(f"===== FILE: {clean_rel} =====\n")
            try:
                with open(full_path, "r", encoding="utf-8", errors="replace") as f:
                    content = f.read()
                    out.write(content)
                    if not content.endswith("\n"):
                        out.write("\n")
            except Exception as e:
                out.write(f"[Error reading file: {e}]\n")
            out.write("\n")

# Calculate total lines and file size
total_lines = 0
with open(output_file, "r", encoding="utf-8") as f:
    for _ in f:
        total_lines += 1

size_bytes = os.path.getsize(output_file)
size_kb = size_bytes / 1024
size_mb = size_kb / 1024

print(f"BUNDLE CREATED SUCCESSFULLY!")
print(f"Path: {output_file}")
print(f"Total Lines: {total_lines}")
print(f"Size: {size_bytes} bytes ({size_kb:.2f} KB / {size_mb:.2f} MB)")
