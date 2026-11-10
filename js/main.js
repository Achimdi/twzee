/* TWZEE FOODS main script. Every feature runs inside run(), so one failure can never stop the others (errors are logged to the console). */
(()=>{
window.TWZEE_JS=6;
const root=document.documentElement;
setTimeout(()=>root.classList.add("rv-all"),2000); /* failsafe: reveal everything after 2s, whatever happens */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const run=(n,f)=>{try{f()}catch(e){console.error("[twzee] "+n+":",e)}};
const site=typeof SITE!=="undefined"?SITE:{wa:"2349132155228",ig:"https://www.instagram.com/twzee_foods/"};
const M=typeof MENU!=="undefined"?MENU:{};
const I=typeof INFO!=="undefined"?INFO:{};
const within="within "+(String(I.town||"").trim()||"town");
const money=n=>"₦"+Number(n).toLocaleString("en-NG");
const wa=t=>`https://wa.me/${site.wa}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ico=n=>`<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
/* browser storage can be blocked (private mode), so every read and write is wrapped */
const store={get:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* menu building blocks */
const ask=(l,q,c="ghost sm")=>`<a class="btn ${c}" href="${wa(q)}" target="_blank" rel="noopener">${ico("chat")}${l}</a>`;
const img=(f,alt,pos="50% 50%",x="",z)=>`<img src="assets/images/${f}" alt="${esc(alt)}" style="object-position:${pos}${z?`;--z:${z}`:""}" loading="lazy" decoding="async" ${x}>`;
const addBtn=(n,p)=>`<button type="button" class="btn sm add" data-add data-n="${esc(n)}" data-p="${p}" aria-label="Add ${esc(n)} to your order">${ico("plus")}<span>Add</span></button>`;
const buy=()=>`<div class="buy"><strong class="pp"></strong><button type="button" class="btn padd add">${ico("plus")}<span>Add to order</span></button></div>`;
const radio=(l,p,i,inner)=>`<button type="button" role="radio" aria-checked="${i==0}" tabindex="${i==0?0:-1}" data-i="${i}" data-l="${esc(l)}" data-p="${p}">${inner}</button>`;
const H=(ml,sq)=>sq?26+8*Math.sqrt(ml/100):24+ml*.06;
const live=a=>a.filter(i=>i.p!=null||i.ask);
const nm=i=>i.u?`${i.n} (${i.u.replace("per ","")})`:i.n;
const plus=i=>`<button type="button" class="plus" data-add data-n="${esc(nm(i))}" data-p="${i.p}" aria-label="Add ${esc(i.n)} to your order">${ico("plus")}</button>`;
const act=i=>i.ask?ask(i.btn||"Ask us",i.ask):addBtn(nm(i),i.p);
const seg=i=>i.opt?`<div class="seg" role="radiogroup" aria-label="${esc(i.n)}: choose one">${i.opt.map((o,k)=>`<button type="button" role="radio" aria-checked="${k==0}" tabindex="${k?-1:0}" data-o="${esc(o)}">${esc(o)}</button>`).join("")}</div>`:"";
const photo=i=>`<div class="ph">${img(i.f,i.a,i.pos,i.fix?'class="fix"':"",i.z)}</div>`;
const tl=i=>`${i.cls?" "+i.cls:""}"${i.t?` style="--tl:${i.t}"`:""}`;
const tile=i=>`<article class="tile${tl(i)}>${i.f?photo(i):""}<div class="in"><h3>${i.n}</h3>${i.ing?`<p>Ingredients: ${i.ing}</p>`:""}${i.d?`<p>${i.d}</p>`:""}${seg(i)}<div class="buy">${i.p?`<strong class="pp">${money(i.p)}</strong>`:""}${act(i)}</div></div></article>`;
const drink=i=>`<article class="tile${tl(i)}>${i.f?photo(i):""}<div class="in"><div class="pr"><h3>${i.n}</h3><i class="dots"></i><strong>${money(i.p)}</strong>${plus(i)}</div>${i.ing?`<p>Ingredients: ${i.ing}</p>`:""}${i.u?`<small>${i.u}</small>`:""}</div></article>`;
const row=i=>`<div class="pr">${i.f?`<div class="th">${img(i.f,i.a,i.pos)}</div>`:""}<h3>${i.n}</h3><i class="dots"></i><strong>${money(i.p)}</strong>${plus(i)}</div>`;
const sizes=(d,aria,k,c)=>`<div class="sizes" style="--n:${d.sizes.length}" role="radiogroup" aria-label="${aria}">${d.sizes.map((s,i)=>radio(s.l,s.p,i,`<i class="cup ${c}" style="--h:${H(s.ml||parseInt(s.l),d.sq)};--k:${k}"></i><b>${s.l}</b><span>${money(s.p)}</span>`)).join("")}</div>`;
/* "From ₦X": lowest live price in a category (add-ons are not counted) */
const from=d=>{const ps=[d.sizes,d.items,d.bites,d.juices,d.yog,d.packs].filter(Boolean).flat().filter(i=>typeof i.p=="number").map(i=>i.p);return ps.length?`<p class="from">From <b>${money(Math.min(...ps))}</b></p>`:""};
const S={
parfait:d=>[`<div class="mosaic">${d.photos.map(([f,a,o],i)=>`<div class="ph p${i}">${img(f,a,o)}</div>`).join("")}</div>`,`<div class="pick" data-base="Parfait "><h3>Pick a size</h3>${sizes(d,"Parfait size",.6,"")}${buy()}</div>`],
yoghurt:d=>[`<div class="yph">${d.photos.map(([f,a,o,z],i)=>img(f,a,o,i?"":'class="on"',z)).join("")}</div>`,`<div class="pick" data-base="Greek Yoghurt "><h3>Pick a size</h3>${sizes(d,"Greek yoghurt size",1,"tub")}${buy()}</div>`],
granola:d=>[`<div class="ph tall">${img("HERO_PAGE.jpeg","ROC granola pouch next to a Twzee Foods parfait cup","78% 55%")}</div>`,`<div class="pick" data-base="ROC Granola "><h3>Pick a size</h3>${sizes(d,"Granola size",.75,"pouch")}${buy()}</div>`],
shawarma:d=>[`<div class="ph tall">${img("shawarma.jpeg","Twzee Foods shawarma wraps lined up in green and orange branded paper","50% 60%")}</div>`,`<div class="pick" data-base="Shawarma: "><h3>Pick your combo</h3><div class="rows" role="radiogroup" aria-label="Shawarma combo">${d.items.map((s,i)=>radio(s.n,s.p,i,`<b>${s.n}</b><span>${money(s.p)}</span>`)).join("")}</div><p class="lab">Add-ons (optional)</p><div class="chks">${d.extras.map(x=>`<label class="chk"><input type="checkbox" data-x="${x.p}" data-t="${esc(x.n.toLowerCase())}"><span>${x.n}</span><small>+${money(x.p)}</small></label>`).join("")}</div>${buy()}</div><h3 class="h3b">Bites</h3><div class="list">${live(d.bites).map(row).join("")}</div>`],
drinks:d=>["",`<h3>Juices <small>sold per bottle</small></h3><div class="grid">${live(d.juices).map(drink).join("")}</div><h3 class="h3b">Yoghurt drinks <small>500ml bottles</small></h3><div class="grid">${live(d.yog).map(drink).join("")}</div>`],
salads:d=>["",`<div class="grid g2">${live(d.items).map(tile).join("")}</div>`],
chops:d=>["",`<div class="grid">${live(d.packs).map(tile).join("")}</div><div class="single"><p>${d.single}</p>${ask("Ask about pieces",d.singleAsk)}</div>`]
};

/* menu: each category is rendered on its own, so one bad entry cannot blank the whole menu */
run("menu",()=>{const host=$("#menu");if(!host)return;
 Object.keys(S).forEach(k=>run("menu:"+k,()=>{const d=M[k];if(!d)return;const [s,it]=S[k](d);
  host.insertAdjacentHTML("beforeend",`<section class="cat rv" id="${k}"><div class="wrap ed${s?"":" solo"}"><div class="side"><h2>${d.title}</h2>${from(d)}<p class="lead">${d.desc}</p>${s}</div><div class="items">${it}</div></div></section>`)}))});
run("links",()=>{$$("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));$$("[data-ig]").forEach(a=>a.href=site.ig)});

/* the name an Add button puts in the order: a picker's current choice, or the item plus its option (e.g. "Intimate Pack (beef)") */
const nameOf=b=>{if(b.matches(".padd")){const p=b.closest(".pick");return p?p.dataset.n:""}
 const t=b.closest(".tile"),o=t&&$(".seg [aria-checked=true]",t);return o?`${b.dataset.n} (${o.dataset.o.toLowerCase()})`:b.dataset.n};
const refresh=p=>{const r=$("[aria-checked=true]",p);if(!r)return;const xs=$$("input:checked",p),pr=+r.dataset.p+xs.reduce((s,x)=>s+ +x.dataset.x,0);
 p.dataset.n=p.dataset.base+r.dataset.l+(xs.length?" ("+xs.map(x=>x.dataset.t).join(", ")+")":"");p.dataset.p=pr;const pp=$(".pp",p);if(pp)pp.textContent=money(pr)};
run("pickers",()=>$$(".pick").forEach(refresh));
run("tray",()=>{const T=M.trays,p=$("#tray-price"),b=$("#tray-add"),q=$("#tray-ask");if(!T)return;if(p)p.textContent=money(T.p);if(b)b.dataset.p=T.p;if(q&&T.ask)q.href=wa(T.ask)});
run("info",()=>{$$("[data-within]").forEach(e=>e.textContent=within);
 $$("[data-info]").forEach(li=>{const k=li.dataset.info,v=String(I[k]||"").trim();if(!v)return;const s=$("span",li);if(s)s.textContent=v;
  if(k=="phone"){const a=$("a",li);if(a)a.href="tel:"+v.replace(/[^\d+]/g,"")}li.hidden=false});
 const di=$("#dinfo"),txt=[I.hours&&"Open "+String(I.hours).trim(),I.lead&&String(I.lead).trim()].filter(Boolean).join(". ");if(di&&txt){di.textContent=txt+".";di.hidden=false}
 const ln=$("#lead-note");if(ln&&I.lead){ln.textContent=String(I.lead).trim();ln.hidden=false}});
run("delivery",()=>{const D=typeof DELIVERY!=="undefined"?DELIVERY:null;if(D)$$("[data-money]").forEach(e=>{if(D[e.dataset.money]!=null)e.textContent=money(D[e.dataset.money])})});

/* screen-reader announcements */
const liveEl=$("#live");let liveT;
const announce=t=>{if(!liveEl)return;liveEl.textContent="";clearTimeout(liveT);liveT=setTimeout(()=>liveEl.textContent=t,60)};

/* order bar, cart, delivery or pickup, details and the order message */
run("order",()=>{
 const cart=new Map(),bar=$("#bar"),dlg=$("#dlg"),list=$("#list"),send=$("#send");if(!bar||!dlg||!list||!send)return;
 const D=typeof DELIVERY!=="undefined"?DELIVERY:{fee:1500,freeOver:25000};let mode="delivery";
 const fName=$("#f-name"),fAddr=$("#f-addr"),fNote=$("#f-note"),err=$("#err"),clr=$("#clear"),sent=$("#sent"),sendNote=$("#send-note"),cnt=$("#cnt"),cartbtn=$("#cartbtn");
 const val=e=>e?e.value.trim():"";
 const sum=f=>[...cart.values()].reduce((s,i)=>s+f(i),0),subtotal=()=>sum(i=>i.p*i.q),count=()=>sum(i=>i.q);
 const free=()=>subtotal()>=D.freeOver,fee=()=>mode==="delivery"&&!free()?D.fee:0,total=()=>subtotal()+fee();
 const freeTxt="Free (order of "+money(D.freeOver)+" or more)";
 const items=n=>n+" item"+(n==1?"":"s");
 const set=(s,t)=>{const e=$(s);if(e)e.textContent=t};

 /* restore a saved order (kept for 3 days) and the customer's details */
 const saved=store.get("twzee-order");
 if(saved&&Array.isArray(saved.items)&&Date.now()-(+saved.t||0)<2592e5){saved.items.forEach(i=>{if(i&&i.n&&+i.p>0&&+i.q>0)cart.set(String(i.n),{n:String(i.n),p:+i.p,q:Math.min(99,Math.floor(+i.q))})});if(saved.mode==="pickup")mode="pickup";if(fNote&&saved.note)fNote.value=String(saved.note)}
 const det=store.get("twzee-details")||{};if(fName&&det.name)fName.value=String(det.name);if(fAddr&&det.addr)fAddr.value=String(det.addr);
 $$("[name=fulfil]").forEach(r=>r.checked=r.value===mode);
 const save=()=>store.set("twzee-order",{t:Date.now(),mode,note:val(fNote),items:[...cart.values()]});

 const msg=()=>{const L=["Hello Twzee Foods! I'd like to order:",...[...cart.values()].map(i=>`- ${i.q} × ${i.n} (${money(i.p*i.q)})`),"",`Subtotal: ${money(subtotal())}`,
  mode==="pickup"?"Pickup: I will collect my order (no delivery fee)":`Delivery: ${fee()?money(fee())+" flat, "+within:freeTxt}`,`Estimated total: ${money(total())}`,""];
  if(val(fName))L.push("Name: "+val(fName));
  if(mode==="delivery")L.push("Delivery address: "+val(fAddr));
  if(val(fNote))L.push("Notes: "+val(fNote));
  L.push("",mode==="pickup"?"Please confirm availability and a pickup time. Thank you!":"Please confirm availability and delivery. Thank you!");return L.join("\n")};

 const badge=()=>$$("[data-add],.padd").forEach(b=>{const i=cart.get(nameOf(b));if(i)b.dataset.in=i.q;else delete b.dataset.in});
 const unsend=()=>{if(sent)sent.hidden=true;if(sendNote)sendNote.hidden=false};
 const clearErr=()=>{if(err)err.textContent="";[fName,fAddr].forEach(f=>f&&f.removeAttribute("aria-invalid"))};

 function draw(){const n=count();document.body.classList.toggle("has-order",n>0);bar.hidden=!n;
  bar.innerHTML=`<span class="bl">${ico("bag")}View order · ${items(n)}</span><b><small>est.</small> ${money(total())}</b>`;
  if(cnt){cnt.hidden=!n;cnt.textContent=n}
  if(cartbtn)cartbtn.setAttribute("aria-label",n?`Your order, ${items(n)}`:"Order: go to the menu");
  list.innerHTML=[...cart].map(([k,i])=>`<li><div class="li-n"><b>${esc(i.n)}</b><small>${money(i.p)} each</small></div><strong class="li-t">${money(i.p*i.q)}</strong><div class="qty"><button type="button" data-q="${esc(k)}" data-d="-1" aria-label="${i.q==1?"Remove":"One fewer"} ${esc(i.n)}">${ico(i.q==1?"trash":"minus")}</button><output>${i.q}</output><button type="button" data-q="${esc(k)}" data-d="1" aria-label="One more ${esc(i.n)}">${ico("plus")}</button></div></li>`).join("");
  ["#empty"].forEach(s=>{const e=$(s);if(e)e.hidden=!!n});["#checkout","#dfoot"].forEach(s=>{const e=$(s);if(e)e.hidden=!n});
  set("#dt",n?`Your order (${n})`:"Your order");
  set("#sub",money(subtotal()));set("#dfee",mode==="pickup"?"No fee (pickup)":free()||!D.fee?freeTxt:money(D.fee)+" flat, "+within);set("#tot",money(total()));
  set("#tot-note",mode==="pickup"?"Pickup, no delivery fee":fee()?`Includes ${money(fee())} delivery`:"Free delivery included");
  const prog=$("#prog"),pb=$("#pbar");if(prog)prog.hidden=mode==="pickup"||!D.fee;
  set("#nudge",free()?"You've unlocked free delivery.":`Add ${money(D.freeOver-subtotal())} more for free delivery.`);
  if(pb)pb.style.width=Math.min(100,subtotal()/D.freeOver*100)+"%";if(prog)prog.classList.toggle("done",free());
  set("#d-note",free()?"Free on this order":money(D.fee)+" flat, "+within);
  const aw=$("#addr-wrap");if(aw)aw.hidden=mode==="pickup";
  send.href=wa(msg());badge();save()}

 const add=(n,p)=>{const i=cart.get(n)||{n,p,q:0};i.q=Math.min(99,i.q+1);cart.set(n,i);unsend();draw();announce(`${n} added. ${items(count())} in your order.`)};
 const flash=b=>{b.classList.add("ok");clearTimeout(b._t);const s=$("span",b);if(s){if(!b.dataset.lab)b.dataset.lab=s.textContent;s.textContent="Added"}
  b._t=setTimeout(()=>{b.classList.remove("ok");if(s)s.textContent=b.dataset.lab},1100)};
 const open=()=>{if(!dlg.open){disarm();dlg.showModal()}};
 let armT;const disarm=()=>{if(!clr)return;clearTimeout(armT);delete clr.dataset.armed;set("#clear span","Clear my order")};
 const rove=g=>$$("[role=radio]",g).forEach(r=>r.tabIndex=r.getAttribute("aria-checked")=="true"?0:-1);

 document.addEventListener("click",e=>{
  const t=e.target.closest("[data-add],.padd,[role=radio],[data-q],#bar,#close,#cartbtn,#clear,#fresh,#browse,#send,#dlg");if(!t)return;
  if(t.matches("[data-add],.padd")){const n=nameOf(t),pk=t.closest(".pick"),p=t.matches(".padd")?+(pk&&pk.dataset.p):+t.dataset.p;if(n&&p>0){add(n,p);flash(t)}}
  else if(t.matches("[role=radio]")){$$("[role=radio]",t.parentNode).forEach(r=>r.setAttribute("aria-checked",r==t));rove(t.parentNode);const p=t.closest(".pick");if(p)refresh(p);
   const ed=t.closest(".ed"),g=ed&&$(".yph",ed);if(g&&t.closest(".sizes"))$$("img",g).forEach((m,i)=>m.classList.toggle("on",i==+t.dataset.i));badge()}
  else if(t.dataset.q){const k=t.dataset.q,d=+t.dataset.d,i=cart.get(k);if(!i)return;i.q=Math.min(99,i.q+d);if(i.q<1){cart.delete(k);announce(`${i.n} removed.`)}unsend();draw();
   const f=i.q>0&&$(`[data-q="${CSS.escape(k)}"][data-d="${d}"]`,list);(f||$("#list [data-q]")||$("#browse")).focus()}
  else if(t.id=="bar")open();
  else if(t.id=="cartbtn"){if(count()){e.preventDefault();open()}}
  else if(t.id=="close"||t.id=="browse")dlg.close();
  else if(t.id=="clear"){if(t.dataset.armed){disarm();cart.clear();if(fNote)fNote.value="";unsend();draw();announce("Your order has been cleared.");const b=$("#browse");if(b)b.focus()}
   else{t.dataset.armed="1";set("#clear span","Tap again to clear everything");armT=setTimeout(disarm,4000)}}
  else if(t.id=="fresh"){cart.clear();if(fNote)fNote.value="";unsend();draw();dlg.close();announce("Your order has been cleared.")}
  else if(t.id=="send"){clearErr();
   const bad=!val(fName)?[fName,"Please add your name so we know who the order is for."]:mode==="delivery"&&!val(fAddr)?[fAddr,"Please add a delivery address, or choose Pickup."]:null;
   if(bad){e.preventDefault();if(err)err.textContent=bad[1];bad[0].setAttribute("aria-invalid","true");bad[0].focus();return}
   send.href=wa(msg());if(sent)sent.hidden=false;if(sendNote)sendNote.hidden=true}
  else if(e.target==dlg)dlg.close()});
 /* arrow keys move between options in a choice group */
 document.addEventListener("keydown",e=>{const t=e.target.closest&&e.target.closest("[role=radio]");if(!t)return;
  const d={ArrowRight:1,ArrowDown:1,ArrowLeft:-1,ArrowUp:-1}[e.key];if(!d)return;e.preventDefault();
  const g=$$("[role=radio]",t.parentNode),n=g[(g.indexOf(t)+d+g.length)%g.length];n.focus();n.click()});
 document.addEventListener("change",e=>{const p=e.target.closest(".pick");if(p){refresh(p);badge()}if(e.target.name==="fulfil"){mode=e.target.value;clearErr();unsend();draw()}});
 dlg.addEventListener("input",e=>{if(e.target.matches(".fld input,.fld textarea")){e.target.removeAttribute("aria-invalid");if(err)err.textContent="";
  store.set("twzee-details",{name:val(fName),addr:val(fAddr)});send.href=wa(msg());save()}});
 dlg.addEventListener("close",()=>{disarm();if(cartbtn&&count()&&document.activeElement===document.body)cartbtn.focus()});
 draw()});

/* header: hamburger menu and a soft shadow once the page scrolls */
run("nav",()=>{const top=$(".top"),t=$("#menu-toggle"),nav=$("#nav");if(!top||!t||!nav)return;
 const isOpen=()=>top.classList.contains("open");
 const set=o=>{top.classList.toggle("open",o);t.setAttribute("aria-expanded",String(o));t.setAttribute("aria-label",o?"Close menu":"Open menu");document.body.classList.toggle("nav-open",o)};
 t.addEventListener("click",e=>{e.stopPropagation();set(!isOpen())});
 nav.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
 document.addEventListener("click",e=>{if(isOpen()&&!e.target.closest(".top"))set(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&isOpen()){set(false);t.focus()}});
 matchMedia("(min-width:900px)").addEventListener("change",e=>{if(e.matches)set(false)});
 const sh=()=>top.classList.toggle("scrolled",scrollY>8);addEventListener("scroll",sh,{passive:true});sh()});

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
