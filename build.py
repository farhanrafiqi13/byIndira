import json
import os
import sys

def run_build():
    print("=== [BUILD] MEMERIKSA INTEGRITAS DAN KELENGKAPAN ASET APLIKASI ===")
    required_files = [
        "index.html",
        "styles.css",
        "sheetApi.js",
        "app.js",
        "manifest.json",
        "logo.png",
        "sw.js",
        "icons/icon-192.png",
        "icons/icon-512.png"
    ]
    
    for f in required_files:
        if not os.path.exists(f):
            print(f"[-] ERROR: File wajib hilang -> {f}")
            sys.exit(1)
        size = os.path.getsize(f)
        print(f"  [OK] {f} ({size:,} bytes)")
        
    # Validasi manifest.json
    try:
        with open("manifest.json", "r", encoding="utf-8") as f:
            manifest = json.load(f)
        assert manifest.get("name"), "Nama aplikasi tidak boleh kosong"
        print(f"  [OK] manifest.json valid -> App: \"{manifest.get('name')}\"")
    except Exception as e:
        print(f"[-] ERROR pada manifest.json: {e}")
        sys.exit(1)
        
    # Validasi index.html
    try:
        with open("index.html", "r", encoding="utf-8") as f:
            html = f.read()
        assert "sheetApi.js" in html, "index.html harus memuat sheetApi.js"
        assert "app.js" in html, "index.html harus memuat app.js"
        assert "<title>" in html, "index.html harus memiliki tag title"
        print("  [OK] index.html valid & memuat sheetApi.js dan app.js")
    except Exception as e:
        print(f"[-] ERROR pada index.html: {e}")
        sys.exit(1)

    # Validasi sheetApi.js
    try:
        with open("sheetApi.js", "r", encoding="utf-8") as f:
            api_js = f.read()
        for fn in ["getAll", "append", "updateRow", "deleteRow", "extractMasterFormulas", "parseAllTabs"]:
            assert fn in api_js, f"sheetApi.js harus menyediakan fungsi {fn}"
        print("  [OK] sheetApi.js valid & menyediakan seluruh fungsi sinkronisasi 2 arah")
    except Exception as e:
        print(f"[-] ERROR pada sheetApi.js: {e}")
        sys.exit(1)

    print("=== [BUILD] BUILD LOKAL BERHASIL & SIAP DIDEPLOY KE PRODUCTION ===\n")

if __name__ == "__main__":
    run_build()
