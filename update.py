import os
import re

directory = r"c:\Users\pange\Desktop\Kishansetu2-main\kishansetu2-main\frontend\src\Pages"
files = ["Login.jsx", "Register.jsx", "VendorDashboard.jsx", "FarmerDashboard.jsx"]

for f in files:
    path = os.path.join(directory, f)
    if not os.path.exists(path):
        continue
        
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
    
    # replace fetch strings
    content = content.replace('fetch("/api/', 'fetch(`${API_BASE}/api/')
    content = content.replace("fetch('/api/", "fetch(`${API_BASE}/api/")
    content = content.replace("fetch(`/api/", "fetch(`${API_BASE}/api/")
    
    # inject the API_BASE declaration after the component declaration
    # Example: const Login = () => {
    component_name = f.replace(".jsx", "")
    pattern = r"(const " + component_name + r" = \(.*?\) => \{)"
    replacement = r"\1\n  const API_BASE = import.meta.env.VITE_API_URL || \"\";"
    
    if "const API_BASE" not in content:
        content = re.sub(pattern, replacement, content)
    
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

print("Files updated.")
