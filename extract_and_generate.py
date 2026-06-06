import os
import sys
import json
import io
import fitz  # PyMuPDF

# Reconfigure stdout and stderr to use UTF-8 on Windows
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

# Paths
WORKSPACE_DIR = os.path.dirname(os.path.abspath(__file__))
PUBLIC_DIR = os.path.join(WORKSPACE_DIR, "public")
DATA_DIR = os.path.join(WORKSPACE_DIR, "src", "data")
PROJECTS_JSON_PATH = os.path.join(DATA_DIR, "projects.json")

# Categories to scan under public/
CATEGORIES = {
    "packaging": {
        "id_prefix": "pkg-design",
        "category_name": "Packaging Design",
        "project_title_prefix": "Premium Packaging",
        "deliverables": ["Packaging Design", "Brand Identity", "Print Setup", "3D Mockups"],
        "overview": "A high-end product packaging showcase designed to elevate the brand's physical presence and captivate shelf attention."
    },
    "social-media": {
        "id_prefix": "sm-design",
        "category_name": "Social Media Design",
        "project_title_prefix": "Social Media Campaign",
        "deliverables": ["Social Media Graphics", "Campaign Art Direction", "Visual Storytelling", "Ad Design"],
        "overview": "Modern and highly engaging digital marketing creatives engineered to build brand equity and drive online conversion."
    },
    "photoshoots": {
        "id_prefix": "photoshoot",
        "category_name": "Photoshoots",
        "project_title_prefix": "Creative Photoshoot",
        "deliverables": ["Product Photography", "Art Direction", "Lighting Design", "Retouching"],
        "overview": "A curated photography series highlighting product aesthetics with professional studio lighting and precise creative direction."
    }
}

def extract_pdf_pages(pdf_path):
    """
    Extracts all pages of a PDF as high-quality PNGs in the same directory.
    Skips if the output files already exist.
    """
    pdf_dir = os.path.dirname(pdf_path)
    pdf_filename = os.path.basename(pdf_path)
    pdf_name_no_ext, _ = os.path.splitext(pdf_filename)
    
    print(f"\nProcessing PDF: {pdf_filename} in {os.path.basename(pdf_dir)}")
    
    try:
        doc = fitz.open(pdf_path)
        num_pages = len(doc)
        print(f"Total pages to extract: {num_pages}")
        
        extracted_files = []
        
        for page_num in range(num_pages):
            out_filename = f"{pdf_name_no_ext}_page_{page_num + 1}.png"
            out_path = os.path.join(pdf_dir, out_filename)
            
            # Check if already extracted
            if os.path.exists(out_path):
                # Ensure it's not a 0-byte corrupted file
                if os.path.getsize(out_path) > 1024:
                    # print(f"  Page {page_num + 1} already extracted, skipping.")
                    extracted_files.append(out_path)
                    continue
            
            print(f"  Extracting page {page_num + 1}/{num_pages}...")
            page = doc.load_page(page_num)
            
            # Use 2.0x zoom matrix for high quality
            mat = fitz.Matrix(2.0, 2.0)
            pix = page.get_pixmap(matrix=mat)
            pix.save(out_path)
            extracted_files.append(out_path)
            
        doc.close()
        print(f"Successfully processed: {pdf_filename}")
        return extracted_files
    except Exception as e:
        print(f"Error processing PDF {pdf_filename}: {e}", file=sys.stderr)
        return []

def main():
    print("Starting PDF Extraction & Portfolio Generation...")
    
    # 1. First, search for all PDF files in the target directories and extract them
    for arabic_folder in CATEGORIES.keys():
        folder_path = os.path.join(PUBLIC_DIR, arabic_folder)
        if not os.path.exists(folder_path):
            print(f"Warning: Folder {folder_path} does not exist.")
            continue
            
        print(f"\nScanning category folder: {arabic_folder}")
        for root, dirs, files in os.walk(folder_path):
            for file in files:
                if file.lower().endswith(".pdf"):
                    pdf_path = os.path.join(root, file)
                    extract_pdf_pages(pdf_path)

    # 2. Load original projects from projects.json to preserve them
    original_projects = []
    if os.path.exists(PROJECTS_JSON_PATH):
        try:
            with open(PROJECTS_JSON_PATH, "r", encoding="utf-8") as f:
                data = json.load(f)
                # Keep only original Visual Identity projects
                for proj in data:
                    if proj.get("id") in ["synthex-branding", "vi-project-1", "velocity-sports"]:
                        original_projects.append(proj)
            print(f"\nPreserved {len(original_projects)} original Visual Identity projects.")
        except Exception as e:
            print(f"Error reading existing projects.json: {e}", file=sys.stderr)
            
    # If original_projects is empty for some reason, build default structures for them
    if not original_projects:
        print("Warning: Could not find original projects. They will be recreated if needed, but check projects.json backups!")

    # 3. Scan the folders again to construct projects
    scanned_projects = []
    
    for arabic_folder, meta in CATEGORIES.items():
        folder_path = os.path.join(PUBLIC_DIR, arabic_folder)
        if not os.path.exists(folder_path):
            continue
            
        # Get list of subdirectories (like 1, 2, 3, etc.)
        subdirs = [d for d in os.listdir(folder_path) if os.path.isdir(os.path.join(folder_path, d))]
        # Sort subdirectories numerically if possible, otherwise alphabetically
        try:
            subdirs.sort(key=int)
        except ValueError:
            subdirs.sort()
            
        print(f"\nGenerating projects for category '{meta['category_name']}'...")
        
        for subdir in subdirs:
            subdir_path = os.path.join(folder_path, subdir)
            
            # Find all images (PNG, JPG, JPEG, WEBP) in this subdir
            # Exclude PDF files since they are now extracted as PNGs
            images = []
            for root, dirs, files in os.walk(subdir_path):
                for file in files:
                    if file.lower().endswith(('.png', '.jpg', '.jpeg', '.webp')):
                        # Calculate relative path from public directory
                        full_path = os.path.join(root, file)
                        rel_path = os.path.relpath(full_path, PUBLIC_DIR)
                        # Normalize to use forward slashes for URLs
                        web_path = "/" + rel_path.replace("\\", "/")
                        images.append(web_path)
            
            if not images:
                print(f"  Skipping subfolder '{subdir}' (no images found)")
                continue
                
            # Sort images to have a predictable order
            images.sort()
            
            # Create project structure
            proj_id = f"{meta['id_prefix']}-{subdir}"
            proj_title = f"{meta['project_title_prefix']} - Project {subdir}"
            
            # Let's see if we can find a nice cover image (e.g. a file containing 'mockup' or first file)
            # Find a cover image that is NOT a pdf extracted page if possible, or just the first image
            cover_candidates = [img for img in images if 'mockup' in img.lower() or 'cover' in img.lower()]
            hero_image = cover_candidates[0] if cover_candidates else images[0]
            
            gallery = []
            for idx, img in enumerate(images):
                gallery.append({
                    "id": f"{proj_id}-{idx + 1}",
                    "type": "image",
                    "content": img
                })
                
            proj = {
                "id": proj_id,
                "title": proj_title,
                "category": meta["category_name"],
                "heroImage": hero_image,
                "overview": meta["overview"],
                "deliverables": meta["deliverables"],
                "gallery": gallery
            }
            
            scanned_projects.append(proj)
            print(f"  Added project: {proj_title} ({len(gallery)} images)")
            
    # Combine original and scanned projects
    final_projects = original_projects + scanned_projects
    
    # 4. Write back to projects.json
    try:
        os.makedirs(os.path.dirname(PROJECTS_JSON_PATH), exist_ok=True)
        with open(PROJECTS_JSON_PATH, "w", encoding="utf-8") as f:
            json.dump(final_projects, f, indent=2, ensure_ascii=False)
        print(f"\nSuccessfully generated {len(final_projects)} total projects inside projects.json!")
    except Exception as e:
        print(f"Error writing to projects.json: {e}", file=sys.stderr)

if __name__ == "__main__":
    main()
