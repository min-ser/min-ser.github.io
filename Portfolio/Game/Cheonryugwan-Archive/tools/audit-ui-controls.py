from pathlib import Path
import re,posixpath,sys
ROOT=Path(__file__).resolve().parents[1]
files={p.relative_to(ROOT).as_posix() for p in ROOT.rglob("*") if p.is_file()}
problems=[]
for html_path in ROOT.rglob("*.html"):
    rel=html_path.relative_to(ROOT).as_posix()
    text=html_path.read_text(encoding="utf-8",errors="ignore")
    local=text
    for src in re.findall(r'<script[^>]+src=["\']([^"\']+)["\']',text,re.I):
        src=src.split("?")[0]
        if src.startswith(("http:","https:","//")): continue
        target=posixpath.normpath(posixpath.join(posixpath.dirname(rel),src))
        p=ROOT/target
        if p.is_file(): local+="\n"+p.read_text(encoding="utf-8",errors="ignore")
    for href in re.findall(r'<a\b[^>]*href=["\']([^"\']+)["\']',text,re.I):
        if href.startswith(("http:","https:","mailto:","#","javascript:","data:")): continue
        path=href.split("?")[0].split("#")[0]
        if not path: continue
        target=posixpath.normpath(posixpath.join(posixpath.dirname(rel),path))
        if not (target in files or target+"/index.html" in files):
            problems.append((rel,"BROKEN_LINK",href))
    for m in re.finditer(r'<button\b([^>]*)>(.*?)</button>',text,re.S|re.I):
        attrs,label=m.group(1),re.sub("<.*?>","",m.group(2)).strip()
        if "disabled" in attrs: problems.append((rel,"DISABLED_BUTTON",label))
        mid=re.search(r'\bid=["\']([^"\']+)',attrs)
        # class/data-driven template buttons are allowed.
        if mid and "data-" not in attrs and "onclick" not in attrs:
            bid=mid.group(1)
            if not any(x in local for x in (f"#{bid}",f'getElementById("{bid}")',f"getElementById('{bid}')")):
                problems.append((rel,"UNBOUND_BUTTON",bid))
if problems:
    print("UI AUDIT FAIL")
    for x in problems: print(" | ".join(x))
    sys.exit(1)
print("UI AUDIT PASS: broken links=0, disabled buttons=0, unbound id buttons=0")
