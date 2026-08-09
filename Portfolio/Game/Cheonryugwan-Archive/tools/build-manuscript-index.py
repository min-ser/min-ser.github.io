from pathlib import Path
import json,re,hashlib
ROOT=Path(__file__).resolve().parents[1]
BASE=ROOT/"story"/"manuscript"
docs=[];seen=set()
for p in sorted(BASE.rglob("*.md")):
 m=re.fullmatch(r"(\d+)권-(\d+)부\.md",p.name)
 if not m: continue
 v,part=map(int,m.groups());doc_id=f"volume-{v:02d}-part-{part:02d}"
 if doc_id in seen: raise RuntimeError(f"중복 ID: {doc_id}")
 seen.add(doc_id);text=p.read_text(encoding="utf-8")
 title=next((x[2:].strip() for x in text.splitlines() if x.startswith("# ")),p.stem)
 docs.append({"id":doc_id,"volume":v,"part":part,"title":title,"filename":p.name,
 "path":"../../"+p.relative_to(ROOT).as_posix(),"status":"published",
 "chapters":len(re.findall(r"^#\s+\d+장",text,re.M)),"episodes":len(re.findall(r"^##\s+\d+화",text,re.M)),
 "characters":len(text.replace("\n","")),"paragraphs":len([x for x in re.split(r"\n\s*\n",text) if x.strip()]),
 "sha256":hashlib.sha256(text.encode()).hexdigest()})
(BASE/"manifest.json").write_text(json.dumps({"version":"0.9.9.0","documents":sorted(docs,key=lambda x:(x["volume"],x["part"]))},ensure_ascii=False,indent=2),encoding="utf-8")
print(f"{len(docs)} documents")
