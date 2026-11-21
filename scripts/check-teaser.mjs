// Public teaser quality checks: no credentials, payments, or private app code.
import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, resolve } from "node:path";

const root=resolve(".");
const doc=name=>readFileSync(join(root,"docs",name),"utf8");
const pages=["index.html","about.html","privacy.html","delete-account.html","copyright.html","launch-status.html"];
for (const page of pages) assert.ok(existsSync(join(root,"docs",page)), "Missing "+page);
const home=doc("index.html"), founder=doc("about.html");
assert.match(home,/<title>[^<]*PlateRipple/i,"Homepage title must use PlateRipple");
assert.match(founder,/<title>[^<]*Phenyo Lumatha[^<]*PlateRipple/i,"Founder title must be accurate");
assert.match(home,/Founded by Phenyo Lumatha/i,"Homepage must credit the founder");
assert.match(founder,/Founder of PlateRipple/i,"Founder profile must identify the project");
assert.match(home,/<meta name="robots" content="index,follow">/,"Homepage must allow indexing");
assert.match(founder,/<meta name="robots" content="index,follow">/,"Founder page must allow indexing");
assert.match(home,/not yet accepting registrations/i,"Teaser must accurately disclose no production service");
assert.match(founder,/not yet available for real orders/i,"Founder page must not claim working orders");
assert.match(doc("copyright.html"),/not evidence of a copyright registration/i);
assert.match(doc("privacy.html"),/pre-launch|prelaunch/i);
const base="https://peezypalulu-blip.github.io/FoodLoop/";
assert.ok(doc("sitemap.xml").includes(base+"about.html"),"Sitemap missing founder page");
assert.ok(doc("robots.txt").includes(base+"sitemap.xml"),"Robots should link sitemap");
for(const name of ["index.html","about.html"]){
 const content=doc(name);
 const scripts=[...content.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
 assert.ok(scripts.length>0,"Missing structured data in "+name);
 for(const match of scripts){
   const graph=JSON.parse(match[1]);
   assert.ok(JSON.stringify(graph).includes("Phenyo Lumatha"),"Missing founder identity in "+name);
 }
}
for(const page of pages){
 const html=doc(page);
 for(const x of html.matchAll(/(?:href|src)="([^"#?]+)(?:\?[^"]*)?"/g)){
   const href=x[1];
   if(/^(?:https?:|mailto:|tel:|data:|\/?\/)/i.test(href)) continue;
   assert.ok(!href.includes(".."),"Disallow upward path in "+page+": "+href);
   assert.ok(existsSync(join(root,"docs",href)),page+" has broken local link to "+href);
 }
}
const files=readdirSync(join(root,"docs"),{recursive:true}).filter(x=>/\.(?:html|js|json|xml|md|txt|svg)$/i.test(x));
for(const file of files){
 const s=doc(file);
 assert.doesNotMatch(s,/\b(?:sk_(?:live|test|proj)-[a-zA-Z0-9]{12,}|sb_secret_[a-zA-Z0-9]{12,}|pk_live_[a-zA-Z0-9]{12,})\b/,"Potential secret in "+file);
}
console.log("PlateRipple public teaser: founder, links, schema, indexing, privacy and secret guard passed.");
