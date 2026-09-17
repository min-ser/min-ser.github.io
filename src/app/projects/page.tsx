import {getAreaConfig,getDocuments} from "@/lib/content";
import PageHeader from "@/components/content/PageHeader";
import ProjectModalList from "@/components/projects/ProjectModalList";

export default function Page(){
 const docs=getDocuments("project"),config=getAreaConfig("03_PROJECTS");
 const projects=docs.map(d=>({
  slug:d.slug,
  title:String(d.meta.title||""),
  summary:String(d.meta.summary||""),
  startDate:String(d.meta.startDate||""),
  endDate:String(d.meta.endDate||""),
  status:String(d.meta.status||"completed"),
  careerId:String(d.meta.careerId||""),
  trainingId:String(d.meta.trainingId||""),
  repository:String(d.meta.repository||""),
  featured:Boolean(d.meta.featured),
  skills:Array.isArray(d.meta.skills)?d.meta.skills.map(String):[],
  markdown:d.content
 }));
 return <section className="section pageTop"><PageHeader config={config} count={docs.length}/><ProjectModalList projects={projects}/></section>;
}
