/* TWZEE FOODS main script. Every feature runs inside run(), so one failure can never stop the others (errors are logged to the console). */
(()=>{
window.TWZEE_JS=5;
const root=document.documentElement;
setTimeout(()=>root.classList.add("rv-all"),2000); /* failsafe: reveal everything after 2s, whatever happens */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const run=(n,f)=>{try{f()}catch(e){console.error("[twzee] "+n+":",e)}};
const site=typeof SITE!=="undefined"?SITE:{wa:"2349132155228",ig:"https://www.instagram.com/twzee_foods/"};
const M=typeof MENU!=="undefined"?MENU:{};
const money=n=>"₦"+n.toLocaleString("en-NG");
const wa=t=>`https://wa.me/${site.wa}?text=${encodeURIComponent(t)}`;
const ask=(l,q,c="ghost sm")=>`<a class="btn ${c}" href="${wa(q)}" target="_blank" rel="noopener">${l}</a>`;
const img=(f,alt,pos="50% 50%",x="",z)=>`<img src="assets/images/${f}" alt="${alt}" style="object-position:${pos}${z?`;--z:${z}`:""}" loading="lazy" decoding="async" ${x}>`;
const addBtn=(n,p)=>`<button type="button" class="btn sm" data-add data-n="${n}" data-p="${p}">Add to order</button>`;
const buy=()=>`<div class="buy"><strong class="pp"></strong><button type="button" class="btn padd">Add to order</button></div>`;
const radio=(l,p,i,inner)=>`<button type="button" role="radio" aria-checked="${i==0}" data-i="${i}" data-l="${l}" data-p="${p}">${inner}</button>`;
const H=(ml,sq)=>sq?26+8*Math.sqrt(ml/100):24+ml*.06;
const live=a=>a.filter(i=>i.p!=null||i.ask);
const nm=i=>i.u?`${i.n} (${i.u.replace("per ","")})`:i.n;
const plus=i=>`<button type="button" class="plus" data-add data-n="${nm(i)}" data-p="${i.p}" aria-label="Add ${i.n} to order">+</button>`;
const act=i=>i.ask?ask(i.btn||"Ask on WhatsApp",i.ask):addBtn(nm(i),i.p);
const photo=i=>`<div class="ph">${img(i.f,i.a,i.pos,i.fix?'class="fix"':"",i.z)}</div>`;
const tl=i=>`${i.cls?" "+i.cls:""}"${i.t?` style="--tl:${i.t}"`:""}`;
const tile=i=>`<article class="tile${tl(i)}>${i.f?photo(i):""}<div class="in"><h3>${i.n}</h3>${i.ing?`<p>Ingredients: ${i.ing}</p>`:""}${i.d?`<p>${i.d}</p>`:""}<div class="buy">${i.p?`<strong class="pp">${money(i.p)}</strong>`:""}${act(i)}</div></div></article>`;
const drink=i=>`<article class="tile${tl(i)}>${i.f?photo(i):""}<div class="in"><div class="pr"><h3>${i.n}</h3><i class="dots"></i><strong>${money(i.p)}</strong>${plus(i)}</div>${i.ing?`<p>Ingredients: ${i.ing}</p>`:""}${i.u?`<small>${i.u}</small>`:""}</div></article>`;
const row=i=>`<div class="pr">${i.f?`<div class="th">${img(i.f,i.a,i.pos)}</div>`:""}<h3>${i.n}</h3><i class="dots"></i><strong>${money(i.p)}</strong>${plus(i)}</div>`;
const sizes=(d,aria,k,c)=>`<div class="sizes" style="--n:${d.sizes.length}" role="radiogroup" aria-label="${aria}">${d.sizes.map((s,i)=>radio(s.l,s.p,i,`<i class="cup ${c}" style="--h:${H(s.ml||parseInt(s.l),d.sq)};--k:${k}"></i><b>${s.l}</b><span>${money(s.p)}</span>`)).join("")}</div>`;
const S={
parfait:d=>[`<div class="mosaic">${d.photos.map(([f,a,o],i)=>`<div class="ph p${i}">${img(f,a,o)}</div>`).join("")}</div>`,`<div class="pick" data-base="Parfait "><h3>Pick a size</h3>${sizes(d,"Parfait size",.6,"")}${buy()}</div>`],
yoghurt:d=>[`<div class="yph">${d.photos.map(([f,a,o,z],i)=>img(f,a,o,i?"":'class="on"',z)).join("")}</div>`,`<div class="pick" data-base="Greek Yoghurt "><h3>Pick a size</h3>${sizes(d,"Greek yoghurt size",1,"tub")}${buy()}</div>`],
granola:d=>[`<div class="ph tall">${img("HERO_PAGE.jpeg","ROC granola pouch next to a Twzee Foods parfait cup","78% 55%")}</div>`,`<div class="pick" data-base="ROC Granola "><h3>Pick a size</h3>${sizes(d,"Granola size",.75,"pouch")}${buy()}</div>`],
shawarma:d=>[`<div class="ph tall">${img("shawarma.jpeg","Twzee Foods shawarma wraps lined up in green and orange branded paper","50% 60%")}</div>`,`<div class="pick" data-base="Shawarma: "><div class="rows" role="radiogroup" aria-label="Shawarma combo">${d.items.map((s,i)=>radio(s.n,s.p,i,`<b>${s.n}</b><span>${money(s.p)}</span>`)).join("")}</div><p class="lab">Add-ons (optional)</p>${d.extras.map(x=>`<label class="chk"><input type="checkbox" data-x="${x.p}" data-t="${x.n.toLowerCase()}"> ${x.n} +${money(x.p)}</label>`).join("")}${buy()}</div><h3 class="h3b">Bites</h3><div class="list">${live(d.bites).map(row).join("")}</div>`],
drinks:d=>["",`<h3>Juices <small>sold per bottle</small></h3><div class="grid">${live(d.juices).map(drink).join("")}</div><h3 class="h3b">Yoghurt drinks <small>500ml bottles</small></h3><div class="grid">${live(d.yog).map(drink).join("")}</div>`],
salads:d=>["",`<div class="grid g2">${live(d.items).map(tile).join("")}</div>`],
chops:d=>["",`<div class="grid">${live(d.packs).map(tile).join("")}</div><div class="single"><p>${d.single}</p>${ask("Ask on WhatsApp",d.singleAsk)}</div>`]
};

/* menu: each category is rendered on its own, so one bad entry cannot blank the whole menu */
run("menu",()=>{const host=$("#menu");if(!host)return;
 Object.keys(S).forEach(k=>run("menu:"+k,()=>{const d=M[k];if(!d)return;const [s,it]=S[k](d);
  host.insertAdjacentHTML("beforeend",`<section class="cat rv" id="${k}"><div class="wrap ed"><div class="side"><h2>${d.title}</h2><p class="lead">${d.desc}</p>${s}</div><div class="items">${it}</div></div></section>`)}))});
run("links",()=>{$$("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));$$("[data-ig]").forEach(a=>a.href=site.ig)});
const refresh=p=>{const r=$("[aria-checked=true]",p);if(!r)return;const xs=$$("input:checked",p),pr=+r.dataset.p+xs.reduce((s,x)=>s+ +x.dataset.x,0);
 p.dataset.n=p.dataset.base+r.dataset.l+(xs.length?" ("+xs.map(x=>x.dataset.t).join(", ")+")":"");p.dataset.p=pr;const pp=$(".pp",p);if(pp)pp.textContent=money(pr)};
run("pickers",()=>$$(".pick").forEach(refresh));
run("tray",()=>{const T=M.trays,p=$("#tray-price"),b=$("#tray-btn");if(!T)return;if(p)p.textContent=money(T.p);if(b)b.href=wa(T.ask)});

/* order bar, drawer, delivery or pickup, and the WhatsApp message */
run("order",()=>{
 const cart=new Map(),bar=$("#bar"),dlg=$("#dlg"),list=$("#list"),send=$("#send");if(!bar||!dlg||!list)return;
 const D=typeof DELIVERY!=="undefined"?DELIVERY:{fee:1500,freeOver:25000};let mode="delivery";
 const sum=f=>[...cart.values()].reduce((s,i)=>s+f(i),0),subtotal=()=>sum(i=>i.p*i.q),count=()=>sum(i=>i.q);
 const free=()=>subtotal()>=D.freeOver,fee=()=>mode==="delivery"&&!free()?D.fee:0,total=()=>subtotal()+fee();
 const freeTxt="Free (order of "+money(D.freeOver)+" or more)";
 const dtext=()=>mode==="pickup"?"No fee (pickup)":free()||!D.fee?freeTxt:money(D.fee)+" flat, within town";
 const set=(s,t)=>{const e=$(s);if(e)e.textContent=t};
 const msg=()=>{const L=["Hello Twzee Foods! I'd like to order:",...[...cart.values()].map(i=>`- ${i.q} × ${i.n} (${money(i.p*i.q)})`),`Subtotal: ${money(subtotal())}`,
  mode==="pickup"?"Pickup: I will collect my order (no delivery fee)":`Delivery: ${fee()?money(fee())+" flat, within town":freeTxt}`,`Estimated total: ${money(total())}`];
  if(mode==="delivery")L.push("My delivery address: ");
  L.push(mode==="pickup"?"Please confirm availability and a pickup time. Thank you!":"Please confirm availability and delivery. Thank you!");return L.join("\n")};
 function draw(){const n=count();document.body.classList.toggle("has-order",n>0);bar.hidden=!n;
  bar.innerHTML=`<span>Your order · ${n} item${n>1?"s":""}</span><b>est. ${money(total())}</b>`;
  list.innerHTML=[...cart].map(([k,i])=>`<li><div><b>${i.n}</b><br><small>${money(i.p)} each</small></div><div class="qty"><button type="button" data-q="${k}" data-d="-1" aria-label="Fewer ${i.n}">−</button><output>${i.q}</output><button type="button" data-q="${k}" data-d="1" aria-label="More ${i.n}">+</button></div><button type="button" class="rm" data-rm="${k}">Remove</button></li>`).join("");
  set("#sub",money(subtotal()));set("#dfee",dtext());set("#tot",money(total()));
  set("#nudge",mode==="pickup"||!n?"":free()?"You have free delivery.":"Add "+money(D.freeOver-subtotal())+" more for free delivery.");
  set("#d-note",money(D.fee)+" flat, within town");
  if(send)send.href=wa(msg());if(!n&&dlg.open)dlg.close()}
 const add=(n,p)=>{const i=cart.get(n)||{n,p,q:0};i.q++;cart.set(n,i);draw()};
 const flash=b=>{if(b.classList.contains("plus")){b.classList.add("ok");return setTimeout(()=>b.classList.remove("ok"),900)}const t=b.textContent;b.textContent="Added";setTimeout(()=>b.textContent=t,900)};
 document.addEventListener("click",e=>{
  const t=e.target.closest("[data-add],.padd,[role=radio],[data-q],[data-rm],#bar,#close,#dlg");if(!t)return;
  if(t.matches("[data-add]")){add(t.dataset.n,+t.dataset.p);flash(t)}
  else if(t.matches(".padd")){const p=t.closest(".pick");if(p){add(p.dataset.n,+p.dataset.p);flash(t)}}
  else if(t.matches("[role=radio]")){$$("[role=radio]",t.parentNode).forEach(r=>r.setAttribute("aria-checked",r==t));const p=t.closest(".pick");if(p)refresh(p);
   const ed=t.closest(".ed"),g=ed&&$(".yph",ed);if(g)$$("img",g).forEach((m,i)=>m.classList.toggle("on",i==+t.dataset.i))}
  else if(t.dataset.q){const i=cart.get(t.dataset.q);if(i){i.q+=+t.dataset.d;if(i.q<1)cart.delete(t.dataset.q);draw()}}
  else if(t.dataset.rm){cart.delete(t.dataset.rm);draw()}
  else if(t.id=="bar")dlg.showModal();
  else if(t.id=="close"||e.target==dlg)dlg.close()});
 document.addEventListener("change",e=>{const p=e.target.closest(".pick");if(p)refresh(p);if(e.target.name==="fulfil"){mode=e.target.value;draw()}})});
run("delivery",()=>{const D=typeof DELIVERY!=="undefined"?DELIVERY:null;if(D)$$("[data-money]").forEach(e=>{if(D[e.dataset.money]!=null)e.textContent=money(D[e.dataset.money])})});

/* hamburger menu */
run("nav",()=>{const top=$(".top"),t=$("#menu-toggle"),nav=$("#nav");if(!top||!t||!nav)return;
 const isOpen=()=>top.classList.contains("open");
 const set=o=>{top.classList.toggle("open",o);t.setAttribute("aria-expanded",String(o));t.setAttribute("aria-label",o?"Close menu":"Open menu");document.body.classList.toggle("nav-open",o)};
 t.addEventListener("click",e=>{e.stopPropagation();set(!isOpen())});
 nav.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
 document.addEventListener("click",e=>{if(isOpen()&&!e.target.closest(".top"))set(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&isOpen()){set(false);t.focus()}});
 matchMedia("(min-width:900px)").addEventListener("change",e=>{if(e.matches)set(false)})});

/* category chip bar: active chip follows the section in view */
run("chips",()=>{const chips=$("#chips");if(!chips)return;const links=$$("a",chips);
 const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  links.forEach(a=>{const on=a.hash=="#"+e.target.id;if(on){a.setAttribute("aria-current","true");chips.scrollTo({left:a.offsetLeft-chips.clientWidth/2+a.offsetWidth/2,behavior:"smooth"})}else a.removeAttribute("aria-current")})}),{rootMargin:"-35% 0px -60% 0px"});
 links.forEach(a=>{const s=a.hash&&$(a.hash);if(s)spy.observe(s)})});

run("fab",()=>{const f=$("footer");if(f)new IntersectionObserver(([e])=>document.body.classList.toggle("at-end",e.isIntersecting)).observe(f)});

/* intro video */
run("video",()=>{const v=$("#vid");if(!v)return;const fig=v.parentNode,pp=$("#pp"),snd=$("#snd"),big=$(".bigplay");
 const svg=d=>`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${d}</svg>`;
 const IC={play:svg('<path d="M7 4v16l13-8z" fill="currentColor"/>'),pause:svg('<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>'),
  on:svg('<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8a5 5 0 010 8M18.5 5.5a9 9 0 010 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  off:svg('<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>')};
 let userPaused=false,scrollPaused=false;
 const sync=()=>{fig.classList.toggle("stopped",v.paused&&!scrollPaused);
  if(pp){pp.innerHTML=IC[v.paused?"play":"pause"]+`<span>${v.paused?"Play":"Pause"}</span>`;pp.setAttribute("aria-label",v.paused?"Play video":"Pause video")}
  if(snd){snd.innerHTML=IC[v.muted?"off":"on"]+`<span>${v.muted?"Sound off":"Sound on"}</span>`;snd.setAttribute("aria-pressed",String(!v.muted));snd.setAttribute("aria-label",v.muted?"Turn sound on":"Turn sound off")}};
 ["play","pause","volumechange"].forEach(ev=>v.addEventListener(ev,sync));
 const toggle=()=>{if(v.paused){userPaused=false;scrollPaused=false;const r=v.play();r&&r.catch(()=>{})}else{userPaused=true;v.pause()}};
 if(pp)pp.addEventListener("click",toggle);if(big)big.addEventListener("click",toggle);v.addEventListener("click",toggle);
 if(snd)snd.addEventListener("click",()=>{v.muted=!v.muted;if(!v.muted)v.volume=1});
 const calm=matchMedia("(prefers-reduced-motion:reduce)").matches||(navigator.connection&&navigator.connection.saveData);
 if(calm){userPaused=true;v.removeAttribute("autoplay");v.pause()}else{const r=v.play();r&&r.catch(()=>{userPaused=true;sync()})}
 sync();
 new IntersectionObserver(([e])=>{if(!e.isIntersecting){if(!v.paused){scrollPaused=true;v.pause()}}else if(scrollPaused&&!userPaused){scrollPaused=false;const r=v.play();r&&r.catch(()=>{})}},{threshold:.25}).observe(fig)});

/* scroll reveal (content is visible by default; hidden only once the "js" class is on) */
run("reveal",()=>{const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.05});$$(".rv").forEach(el=>rv.observe(el))});
root.classList.add("js");
})();
