import os

directory = r"c:\Users\pange\Desktop\Kishansetu2-main\kishansetu2-main\frontend\src\Pages"
files = ["Login.jsx", "Register.jsx", "VendorDashboard.jsx", "FarmerDashboard.jsx"]

for f in files:
    path = os.path.join(directory, f)
    with open(path, "r", encoding="utf-8") as file:
        content = file.read()
    
    # Replace the escaped quotes with normal quotes
    content = content.replace(r'\|| \"\"', '|| ""')
    content = content.replace(r'\"\"', '""')
    
    with open(path, "w", encoding="utf-8") as file:
        file.write(content)

print("Syntax fixed.")
