/* TWZEE FOODS main script. Every feature runs inside run(), so one failure can never stop the others (errors are logged to the console). */
(()=>{
window.TWZEE_JS=12;
const root=document.documentElement;
setTimeout(()=>root.classList.add("rv-all"),2000); /* failsafe: reveal everything after 2s, whatever happens */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const run=(n,f)=>{try{f()}catch(e){console.error("[twzee] "+n+":",e)}};
const site=typeof SITE!=="undefined"?SITE:{wa:"2349132155228",waShow:"+234 913 215 5228",ig:"https://www.instagram.com/twzee_foods/",igHandle:"@twzee_foods"};
const CATS=typeof MENU!=="undefined"&&Array.isArray(MENU)?MENU:[];
const I=typeof INFO!=="undefined"?INFO:{};
const SL=typeof SLIDES!=="undefined"?SLIDES:[],FE=typeof FEATURED!=="undefined"?FEATURED:[];
const town=String(I.town||"").trim(),within="within "+(town||"town");
const money=n=>"₦"+Number(n).toLocaleString("en-NG");
const wa=t=>`https://wa.me/${site.wa}?text=${encodeURIComponent(t)}`;
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const ico=n=>`<svg class="i" aria-hidden="true"><use href="#i-${n}"/></svg>`;
const items=n=>n+" item"+(n==1?"":"s");
/* browser storage can be blocked (private mode), so every read and write is wrapped */
const store={get:k=>{try{return JSON.parse(localStorage.getItem(k))}catch(e){return null}},set:(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* photos: web copies in assets/web, a 600px one for cards and a 1200px one for large views */
const PV=typeof PHOTOS_V!=="undefined"?PHOTOS_V:1; /* photo version from menu-data.js: a new number makes browsers fetch replaced photos */
const src=(k,w)=>`assets/web/${k}-${w}.jpg?v=${PV}`;
const abs=(k,w)=>new URL(src(k,w),document.baseURI).href; /* full address, needed inside CSS url() */
const pic=(k,alt,o={})=>`<img src="${src(k,600)}" srcset="${src(k,600)} 600w, ${src(k,1200)} 1200w" sizes="${o.sizes||"(min-width:1024px) 270px, (min-width:700px) 33vw, 50vw"}" alt="${esc(alt)}"${o.pos?` style="object-position:${o.pos}"`:""} loading="${o.eager?"eager":"lazy"}" decoding="async">`;

/* product index: hidden products (no price and no ask) are left out everywhere */
const P={},PC={};
CATS.forEach(c=>(c.items||[]).forEach(i=>{if(i.p==null&&!i.sizes&&!i.ask)return;P[i.id]=i;PC[i.id]=c}));
const visible=c=>(c.items||[]).filter(i=>P[i.id]===i);
const lo=i=>i.sizes?Math.min(...i.sizes.map(s=>s.p)):i.p;
const priceTxt=i=>i.sizes?`From ${money(lo(i))}`:i.p!=null?money(i.p):"Ask for pricing";
const priceHtml=i=>i.sizes?`<small>From</small>${money(lo(i))}`:i.p!=null?money(i.p):"Ask for pricing";
const simple=i=>!i.sizes&&!i.extras&&!i.opt&&!i.ask&&i.p!=null;

const act=i=>i.ask?`<a class="btn sm ghost" href="${wa(i.ask)}" target="_blank" rel="noopener">${ico("chat")}<span>${esc(i.btn||"Ask us")}</span></a>`
 :simple(i)?`<button type="button" class="btn sm add" data-quick="${i.id}" data-badge="${i.id}" aria-label="Add ${esc(i.n)} to your order">${ico("plus")}<span>Add</span></button>`
 :`<button type="button" class="btn sm add" data-open="${i.id}" data-badge="${i.id}" aria-label="Choose options for ${esc(i.n)}">${ico("plus")}<span>Choose</span></button>`;
const card=(i,wide)=>{const has=i.img&&i.img.length;
 return `<article class="card${wide?" wide":""}"><div class="card-img${has?"":" noimg"}">${has?pic(i.img[0],i.n,{pos:i.pos}):`<span aria-hidden="true">${esc(i.n)}</span>`}${i.tag?`<span class="tag">${esc(i.tag)}</span>`:""}</div>`+
 `<div class="card-body"><h3><button type="button" class="card-open" data-open="${i.id}">${esc(i.n)}</button></h3><p class="card-d">${esc(i.d||(i.ing?"Ingredients: "+i.ing:""))}</p>${wide&&i.sizes?`<ul class="mini">${i.sizes.map(s=>`<li><span>${esc(s.l)}</span><b>${money(s.p)}</b></li>`).join("")}</ul>`:""}`+
 `<div class="card-foot">${i.p==null&&!i.sizes?"":`<span class="price">${priceHtml(i)}${i.unit?`<small>${esc(i.unit)}</small>`:""}</span>`}${act(i)}</div></div></article>`};

/* menu: each category is rendered on its own, so one bad entry cannot blank the whole menu */
run("menu",()=>{const host=$("#menu"),chips=$("#chips");if(!host)return;
 CATS.forEach(c=>run("menu:"+c.id,()=>{const its=visible(c);if(!its.length)return;
  const ps=its.map(lo).filter(n=>typeof n=="number");
  if(chips)chips.insertAdjacentHTML("beforeend",`<a href="#${c.id}">${esc(c.title)}</a>`);
  host.insertAdjacentHTML("beforeend",`<section class="cat rv" id="${c.id}" aria-labelledby="h-${c.id}"><div class="wrap"><div class="cat-head"><h2 id="h-${c.id}">${esc(c.title)}</h2>${ps.length?`<p class="from">From <b>${money(Math.min(...ps))}</b></p>`:""}<p class="lead">${esc(c.blurb||"")}</p></div><div class="grid${its.length==1?" one":""}">${its.map(i=>card(i,its.length==1)).join("")}</div>${c.note?`<p class="cat-note">${ico("leaf")}<span>${esc(c.note)}</span></p>`:""}</div></section>`)}))});
run("cats",()=>{const ul=$("#cats"),fm=$("#fmenu");CATS.filter(c=>visible(c).length).forEach(c=>{
 if(ul)ul.insertAdjacentHTML("beforeend",`<li><a href="#${c.id}"><span class="cimg">${c.icon?pic(c.icon,"",{sizes:"140px"}):""}</span><b>${esc(c.title)}</b><small>${items(visible(c).length)}</small></a></li>`);
 if(fm)fm.insertAdjacentHTML("beforeend",`<li><a href="#${c.id}">${esc(c.title)}</a></li>`)})});
run("featured",()=>{const r=$("#feat-row"),its=FE.map(id=>P[id]).filter(Boolean);if(!r)return;if(!its.length){$("#featured").hidden=true;return}
 r.innerHTML=its.map(i=>card(i)).join("");
 $$("[data-row]").forEach(b=>b.addEventListener("click",()=>r.scrollBy({left:+b.dataset.row*r.clientWidth*.8,behavior:"smooth"})))});

/* contact details and links from menu-data.js */
run("links",()=>{$$("[data-wa]").forEach(a=>a.href=wa(a.dataset.wa));$$("[data-ig]").forEach(a=>a.href=site.ig);
 $$("[data-wa-show]").forEach(e=>e.textContent=site.waShow||"+"+site.wa);$$("[data-ig-show]").forEach(e=>e.textContent=site.igHandle||"Instagram");
 const ev=$("#event-ask");if(ev)ev.href=wa("Hello Twzee Foods! I'd like to plan an event. Date, number of guests and what I'd like:\n");
 const t=P["food-tray"],tf=$("#tray-from");if(t&&tf)tf.textContent=money(lo(t))});
run("info",()=>{$$("[data-within]").forEach(e=>e.textContent=within);if(town)$$("[data-town]").forEach(e=>e.textContent=town);
 $$("[data-info]").forEach(li=>{const k=li.dataset.info,v=String(I[k]||"").trim();if(!v)return;const s=$("span",li);if(s)s.textContent=v;
  if(k=="phone"){const a=$("a",li);if(a)a.href="tel:"+v.replace(/[^\d+]/g,"")}li.hidden=false});
 if(I.hours){$$("[data-hours-text]").forEach(e=>e.textContent=I.hours);const h=$("[data-hours-short]");if(h){$("span",h).textContent="Open "+I.hours;h.hidden=false}
  const fh=$("#faq-hours");if(fh)fh.textContent=`We're open ${I.hours}. You can send an order at any time, and we confirm it when we open.`}
 if(I.address)$$("[data-info-address]").forEach(e=>e.textContent="Pickup: "+I.address);
 const di=$("#dinfo"),txt=[I.hours&&!I.open&&"Open "+String(I.hours).trim(),I.lead&&String(I.lead).trim()].filter(Boolean).join(". ");if(di&&txt){di.textContent=txt+".";di.hidden=false}
 const ln=$("#lead-note");if(ln&&I.lead){ln.textContent=String(I.lead).trim();ln.hidden=false}});
run("delivery",()=>{const D=typeof DELIVERY!=="undefined"?DELIVERY:null;if(D)$$("[data-money]").forEach(e=>{if(D[e.dataset.money]!=null)e.textContent=money(D[e.dataset.money])})});

/* opening hours: live "Open now / Closed" badge, weekly card and a note in the cart. Always Nigerian time (UTC+1, no daylight saving), wherever the visitor is. */
run("hours",()=>{const O=I.open;if(!O||O.from==null||O.to==null)return;
 const DN=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],DL=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
 const days=String(O.days||"").split(",").map(d=>DN.findIndex(x=>x.toLowerCase()==d.trim().slice(0,3).toLowerCase())).filter(d=>d>=0);if(!days.length)return;
 const t=h=>{const hh=Math.floor(h)%24,m=Math.round((h-Math.floor(h))*60);return (hh%12||12)+(m?":"+String(m).padStart(2,"0"):"")+(hh<12?"am":"pm")};
 const span=`${t(O.from)} to ${t(O.to)}`;
 const mf=d=>(d+6)%7,sorted=[...days].sort((a,b)=>mf(a)-mf(b));
 const range=sorted.length==7?"Every day":mf(sorted[sorted.length-1])-mf(sorted[0])==sorted.length-1?`${DL[sorted[0]]} to ${DL[sorted[sorted.length-1]]}`:sorted.map(d=>DN[d]).join(", ");
 const now=()=>{const d=new Date(Date.now()+36e5);return {day:d.getUTCDay(),h:d.getUTCHours()+d.getUTCMinutes()/60}};
 const state=()=>{const {day,h}=now();
  if(days.includes(day)&&h>=O.from&&h<O.to){const soon=O.to-h<=1;return {open:true,soon,text:`${soon?"Closing soon":"Open now"} · until ${t(O.to)}`}}
  if(days.includes(day)&&h<O.from)return {open:false,next:`${t(O.from)} today`};
  for(let k=1;k<=7;k++){const d=(day+k)%7;if(days.includes(d))return {open:false,next:`${t(O.from)} ${k==1?"tomorrow":DL[d]}`}}
  return {open:false}};
 const sh=$("#strip-hours");if(sh)sh.innerHTML=`<span class="ic">${ico("clock")}</span><span><b>Open ${span}</b><small>${range}</small></span>`;
 const wk=$("#week");if(wk)wk.innerHTML=[1,2,3,4,5,6,0].map(d=>`<li data-d="${d}"${days.includes(d)?"":' class="off"'}><b>${DL[d]}</b><span>${days.includes(d)?span:"Closed"}</span></li>`).join("");
 const hc=$("#hours");if(hc)hc.hidden=false;
 const tick=()=>{const s=state(),{day}=now(),txt=s.open?s.text:"Closed"+(s.next?` · opens ${s.next}`:"");
  $$("[data-status]").forEach(e=>{e.hidden=false;e.classList.toggle("is-open",s.open);e.classList.toggle("soon",!!s.soon);const sp=$("span",e);if(sp)sp.textContent=txt});
  if(wk)$$("li",wk).forEach(li=>{const on=+li.dataset.d===day;li.classList.toggle("today",on);if(on)li.setAttribute("aria-current","date");else li.removeAttribute("aria-current")});
  const cn=$("#closed-note");if(cn){cn.hidden=s.open;cn.textContent=s.open?"":`We're closed right now${s.next?` and open again at ${s.next}`:""}. You can still send your order, and we'll confirm it when we open.`}};
 tick();setInterval(tick,6e4)});

/* screen-reader announcements and the short "Added" notice */
const liveEl=$("#live");let liveT;
const announce=t=>{if(!liveEl)return;liveEl.textContent="";clearTimeout(liveT);liveT=setTimeout(()=>liveEl.textContent=t,60)};
const toastEl=$("#toast");let toastT;
const toast=t=>{if(!toastEl)return;$("#toast-t").textContent=t;toastEl.hidden=false;requestAnimationFrame(()=>toastEl.classList.add("show"));clearTimeout(toastT);
 toastT=setTimeout(()=>{toastEl.classList.remove("show");setTimeout(()=>{if(!toastEl.classList.contains("show"))toastEl.hidden=true},250)},2800)};

/* the order: bar, cart, delivery or pickup, details and the order message. addToOrder and openCart are used by the product view. */
let addToOrder=()=>{},openCart=()=>{};
run("order",()=>{
 const cart=new Map(),bar=$("#bar"),dlg=$("#dlg"),list=$("#list"),send=$("#send");if(!bar||!dlg||!list||!send)return;
 const D=typeof DELIVERY!=="undefined"?DELIVERY:{fee:1500,freeOver:25000};let mode="delivery";
 const fName=$("#f-name"),fAddr=$("#f-addr"),fNote=$("#f-note"),err=$("#err"),clr=$("#clear"),sent=$("#sent"),sendNote=$("#send-note"),cnt=$("#cnt"),cartbtn=$("#cartbtn");
 const val=e=>e?e.value.trim():"";
 const sum=f=>[...cart.values()].reduce((s,i)=>s+f(i),0),subtotal=()=>sum(i=>i.p*i.q),count=()=>sum(i=>i.q);
 const free=()=>subtotal()>=D.freeOver,fee=()=>mode==="delivery"&&!free()?D.fee:0,total=()=>subtotal()+fee();
 const freeTxt="Free (order of "+money(D.freeOver)+" or more)";
 const set=(s,t)=>{const e=$(s);if(e)e.textContent=t};

 /* restore a saved order (kept for 3 days) and the customer's details */
 const saved=store.get("twzee-order");
 if(saved&&Array.isArray(saved.items)&&Date.now()-(+saved.t||0)<2592e5){saved.items.forEach(i=>{if(i&&i.n&&+i.p>0&&+i.q>0)cart.set(String(i.n),{n:String(i.n),p:+i.p,q:Math.min(99,Math.floor(+i.q)),pid:i.pid?String(i.pid):""})});if(saved.mode==="pickup")mode="pickup";if(fNote&&saved.note)fNote.value=String(saved.note)}
 const det=store.get("twzee-details")||{};if(fName&&det.name)fName.value=String(det.name);if(fAddr&&det.addr)fAddr.value=String(det.addr);
 $$("[name=fulfil]").forEach(r=>r.checked=r.value===mode);
 const save=()=>store.set("twzee-order",{t:Date.now(),mode,note:val(fNote),items:[...cart.values()]});

 const msg=()=>{const L=["Hello Twzee Foods! I'd like to order:",...[...cart.values()].map(i=>`- ${i.q} × ${i.n} (${money(i.p*i.q)})`),"",`Subtotal: ${money(subtotal())}`,
  mode==="pickup"?"Pickup: I will collect my order (no delivery fee)":`Delivery: ${fee()?money(fee())+" flat, "+within:freeTxt}`,`Estimated total: ${money(total())}`,""];
  if(val(fName))L.push("Name: "+val(fName));
  if(mode==="delivery")L.push("Delivery address: "+val(fAddr));
  if(val(fNote))L.push("Notes: "+val(fNote));
  L.push("",mode==="pickup"?"Please confirm availability and a pickup time. Thank you!":"Please confirm availability and delivery. Thank you!");return L.join("\n")};

 /* how many of each product are in the order, shown on its Add/Choose button */
 const badge=()=>{const by={};cart.forEach(i=>{if(i.pid)by[i.pid]=(by[i.pid]||0)+i.q});$$("[data-badge]").forEach(b=>{const q=by[b.dataset.badge];if(q)b.dataset.in=q;else delete b.dataset.in})};
 const unsend=()=>{if(sent)sent.hidden=true;if(sendNote)sendNote.hidden=false};
 const clearErr=()=>{if(err)err.textContent="";[fName,fAddr].forEach(f=>f&&f.removeAttribute("aria-invalid"))};

 function draw(){const n=count();document.body.classList.toggle("has-order",n>0);bar.hidden=!n;
  bar.innerHTML=`<span class="bl">${ico("bag")}View order · ${items(n)}</span><b><small>est.</small> ${money(total())}</b>`;
  if(cnt){cnt.hidden=!n;cnt.textContent=n}
  if(cartbtn)cartbtn.setAttribute("aria-label",n?`Your order, ${items(n)}`:"Order: go to the menu");
  list.innerHTML=[...cart].map(([k,i])=>`<li><div class="li-n"><b>${esc(i.n)}</b><small>${money(i.p)} each</small></div><strong class="li-t">${money(i.p*i.q)}</strong><div class="qty"><button type="button" data-q="${esc(k)}" data-d="-1" aria-label="${i.q==1?"Remove":"One fewer"} ${esc(i.n)}">${ico(i.q==1?"trash":"minus")}</button><output>${i.q}</output><button type="button" data-q="${esc(k)}" data-d="1" aria-label="One more ${esc(i.n)}">${ico("plus")}</button></div></li>`).join("");
  const em=$("#empty");if(em)em.hidden=!!n;["#checkout","#dfoot"].forEach(s=>{const e=$(s);if(e)e.hidden=!n});
  set("#dt",n?`Your order (${n})`:"Your order");
  set("#sub",money(subtotal()));set("#dfee",mode==="pickup"?"No fee (pickup)":free()||!D.fee?freeTxt:money(D.fee)+" flat, "+within);set("#tot",money(total()));
  set("#tot-note",mode==="pickup"?"Pickup, no delivery fee":fee()?`Includes ${money(fee())} delivery`:"Free delivery included");
  const prog=$("#prog"),pb=$("#pbar");if(prog)prog.hidden=mode==="pickup"||!D.fee;
  set("#nudge",free()?"You've unlocked free delivery.":`Add ${money(D.freeOver-subtotal())} more for free delivery.`);
  if(pb)pb.style.width=Math.min(100,subtotal()/D.freeOver*100)+"%";if(prog)prog.classList.toggle("done",free());
  set("#d-note",free()?"Free on this order":money(D.fee)+" flat, "+within);
  const aw=$("#addr-wrap");if(aw)aw.hidden=mode==="pickup";
  send.href=wa(msg());badge();save()}

 addToOrder=(n,p,pid,q=1)=>{const i=cart.get(n)||{n,p,q:0,pid};i.q=Math.min(99,i.q+q);cart.set(n,i);unsend();draw();
  announce(`${n} added. ${items(count())} in your order.`);toast(`${q>1?q+" × ":""}${n} added`)};
 const flash=b=>{b.classList.add("ok");clearTimeout(b._t);const s=$("span",b);if(s){if(!b.dataset.lab)b.dataset.lab=s.textContent;s.textContent="Added"}
  b._t=setTimeout(()=>{b.classList.remove("ok");if(s)s.textContent=b.dataset.lab},1100)};
 openCart=()=>{if(!dlg.open){disarm();const pd=$("#pd");if(pd&&pd.open)pd.close();dlg.showModal()}};
 let armT;const disarm=()=>{if(!clr)return;clearTimeout(armT);delete clr.dataset.armed;set("#clear span","Clear my order")};

 document.addEventListener("click",e=>{
  const t=e.target.closest("[data-quick],[data-q],#bar,#close,#cartbtn,#clear,#fresh,#browse,#send,#toast-view,#dlg");if(!t)return;
  if(t.dataset.quick){const i=P[t.dataset.quick];if(i&&i.p>0){addToOrder(i.n,i.p,i.id);flash(t)}}
  else if(t.dataset.q){const k=t.dataset.q,d=+t.dataset.d,i=cart.get(k);if(!i)return;i.q=Math.min(99,i.q+d);if(i.q<1){cart.delete(k);announce(`${i.n} removed.`)}unsend();draw();
   const f=i.q>0&&$(`[data-q="${CSS.escape(k)}"][data-d="${d}"]`,list);(f||$("#list [data-q]")||$("#browse")).focus()}
  else if(t.id=="bar"||t.id=="toast-view")openCart();
  else if(t.id=="cartbtn"){if(count()){e.preventDefault();openCart()}}
  else if(t.id=="close"||t.id=="browse")dlg.close();
  else if(t.id=="clear"){if(t.dataset.armed){disarm();cart.clear();if(fNote)fNote.value="";unsend();draw();announce("Your order has been cleared.");const b=$("#browse");if(b)b.focus()}
   else{t.dataset.armed="1";set("#clear span","Tap again to clear everything");armT=setTimeout(disarm,4000)}}
  else if(t.id=="fresh"){cart.clear();if(fNote)fNote.value="";unsend();draw();dlg.close();announce("Your order has been cleared.")}
  else if(t.id=="send"){clearErr();
   const bad=!val(fName)?[fName,"Please add your name so we know who the order is for."]:mode==="delivery"&&!val(fAddr)?[fAddr,"Please add a delivery address, or choose Pickup."]:null;
   if(bad){e.preventDefault();if(err)err.textContent=bad[1];bad[0].setAttribute("aria-invalid","true");bad[0].focus();return}
   send.href=wa(msg());if(sent)sent.hidden=false;if(sendNote)sendNote.hidden=true}
  else if(e.target==dlg)dlg.close()});
 document.addEventListener("change",e=>{if(e.target.name==="fulfil"){mode=e.target.value;clearErr();unsend();draw()}});
 dlg.addEventListener("input",e=>{if(e.target.matches(".fld input,.fld textarea")){e.target.removeAttribute("aria-invalid");if(err)err.textContent="";
  store.set("twzee-details",{name:val(fName),addr:val(fAddr)});send.href=wa(msg());save()}});
 dlg.addEventListener("close",()=>{disarm();if(cartbtn&&count()&&document.activeElement===document.body)cartbtn.focus()});
 draw()});

/* product view: full photo, details, size/option choice, quantity and Add to order */
run("product",()=>{const pd=$("#pd"),media=$("#pd-media"),body=$("#pd-body"),buy=$("#pd-buy");if(!pd||!media||!body||!buy)return;
 let i=null,st={},opener=null;
 const price=()=>(i.sizes?i.sizes[st.s].p:i.p)+[...st.x].reduce((a,k)=>a+i.extras[k].p,0);
 const name=()=>i.n+(i.sizes?(i.join||" ")+i.sizes[st.s].l:"")+(st.x.size?" ("+[...st.x].sort().map(k=>i.extras[k].n.toLowerCase()).join(", ")+")":"")+(i.opt?" ("+i.opt[st.o].toLowerCase()+")":"");
 const imgKey=()=>(i.sizes&&i.sizes[st.s].img)||(i.img||[])[st.im]||null;
 const showImg=()=>{const k=imgKey(),m=$(".pd-main",media);if(!m)return;
  m.style.setProperty("--bg",k?`url('${abs(k,600)}')`:"none");m.innerHTML=k?`<img src="${src(k,1200)}" alt="${esc(i.n)}">`:`<span>${esc(i.n)}</span>`;m.classList.toggle("noimg",!k);
  $$(".pd-thumbs button",media).forEach(b=>b.setAttribute("aria-pressed",String(b.dataset.k===k)))};
 const upd=()=>{const pr=$("#pd-price");if(pr){pr.hidden=i.p==null&&!i.sizes;pr.textContent=pr.hidden?"":money(price())+(i.unit?` · ${i.unit}`:"")}
  const q=$("#pd-q");if(q)q.textContent=st.q;const tt=$("#pd-tot");if(tt)tt.textContent=money(price()*st.q);showImg()};
 const radios=(name,legend,opts)=>`<fieldset class="pd-opt"><legend>${legend}</legend><div class="pills">${opts.map((o,k)=>`<label class="pill"><input type="radio" name="${name}" value="${k}"${k==0?" checked":""}><span>${o}</span></label>`).join("")}</div></fieldset>`;
 const open=(id,from)=>{i=P[id];if(!i)return;opener=from||document.activeElement;st={s:0,x:new Set(),o:0,q:1,im:0};const c=PC[id];
  const imgs=i.img||[];
  media.innerHTML=`<div class="pd-main"></div>${imgs.length>1?`<div class="pd-thumbs">${imgs.map(k=>`<button type="button" data-k="${k}" aria-label="Show photo">${pic(k,"",{sizes:"80px"})}</button>`).join("")}</div>`:""}`;
  body.innerHTML=`<p class="pd-cat">${esc(c?c.title:"")}</p><h2 id="pd-n">${esc(i.n)}</h2>${i.tag?`<span class="tag">${esc(i.tag)}</span>`:""}<p class="pd-price" id="pd-price"></p>`+
   (i.d?`<p class="pd-d">${esc(i.d)}</p>`:"")+(i.ing?`<p class="pd-ing"><b>Ingredients</b>${esc(i.ing)}</p>`:"")+
   (i.sizes?radios("pd-s",i.join?"Choose your combo":"Choose a size",i.sizes.map(s=>`<b>${esc(s.l)}</b><small>${money(s.p)}</small>`)):"")+
   (i.opt?radios("pd-o","Choose one",i.opt.map(o=>`<b>${esc(o)}</b>`)):"")+
   (i.extras?`<fieldset class="pd-opt"><legend>Add-ons <small>(optional)</small></legend>${i.extras.map((x,k)=>`<label class="chk"><input type="checkbox" name="pd-x" value="${k}"><span>${esc(x.n)}</span><small>+${money(x.p)}</small></label>`).join("")}</fieldset>`:"")+
   (i.ask2?`<p class="pd-more"><a href="${wa(i.ask2)}" target="_blank" rel="noopener">${ico("chat")}Have a question about this? Chat with us</a></p>`:"");
  buy.innerHTML=i.ask?`<a class="btn block" href="${wa(i.ask)}" target="_blank" rel="noopener">${ico("chat")}${esc(i.btn||"Ask us")}</a>`
   :`<div class="qty" role="group" aria-label="Quantity"><button type="button" data-pq="-1" aria-label="One fewer">${ico("minus")}</button><output id="pd-q" aria-live="polite">1</output><button type="button" data-pq="1" aria-label="One more">${ico("plus")}</button></div><button type="button" class="btn" id="pd-add" data-badge="${i.id}">${ico("plus")}<span>Add to order · <b id="pd-tot"></b></span></button>`;
  upd();if(!pd.open)pd.showModal();body.scrollTop=0;pd.scrollTop=0;const x=$("#pd-x");if(x)x.focus()};
 document.addEventListener("click",e=>{const t=e.target.closest("[data-open]");if(t){e.preventDefault();open(t.dataset.open,t)}});
 pd.addEventListener("change",e=>{if(!i)return;const t=e.target;if(t.name=="pd-s")st.s=+t.value;else if(t.name=="pd-o")st.o=+t.value;else if(t.name=="pd-x"){t.checked?st.x.add(+t.value):st.x.delete(+t.value)}upd()});
 pd.addEventListener("click",e=>{if(!i)return;const t=e.target.closest("[data-pq],#pd-add,#pd-x,.pd-thumbs button");
  if(!t){if(e.target==pd)pd.close();return}
  if(t.dataset.pq){st.q=Math.max(1,Math.min(99,st.q+ +t.dataset.pq));upd()}
  else if(t.id=="pd-x")pd.close();
  else if(t.id=="pd-add"){addToOrder(name(),price(),i.id,st.q);pd.close()}
  else if(t.dataset.k){st.im=(i.img||[]).indexOf(t.dataset.k);if(i.sizes&&i.sizes[st.s].img){/* a size photo is showing: show the chosen one anyway */const k=t.dataset.k,m=$(".pd-main",media);m.style.setProperty("--bg",`url('${abs(k,600)}')`);m.innerHTML=`<img src="${src(k,1200)}" alt="${esc(i.n)}">`;$$(".pd-thumbs button",media).forEach(b=>b.setAttribute("aria-pressed",String(b===t)))}else showImg()}});
 pd.addEventListener("close",()=>{if(opener&&document.contains(opener)&&!$("#dlg").open)opener.focus()})});

/* promotional banners: swipe, arrows, dots, autoplay that pauses on hover, focus, touch, when hidden or for reduced motion */
run("promo",()=>{const box=$("#promo"),tr=$("#promo-track"),dots=$("#promo-dots");if(!box||!tr)return;
 const sl=SL.filter(s=>s.img&&(!s.go||P[s.go]));if(!sl.length){box.hidden=true;return}
 tr.innerHTML=sl.map((s,k)=>{const i=P[s.go];return `<div class="slide" role="group" aria-roledescription="slide" aria-label="${k+1} of ${sl.length}${i?": "+esc(i.n):""}">`+
  `<div class="slide-img" style="--bg:url('${abs(s.img,600)}')">${pic(s.img,i?`${i.n} poster`:"Twzee Foods promotion",{sizes:"(min-width:900px) 560px, 100vw",eager:k==0})}</div>`+
  (i?`<div class="slide-cap"><span><b>${esc(i.n)}</b><small>${priceTxt(i)}</small></span><button type="button" class="btn sm or" data-open="${i.id}" tabindex="${k?-1:0}">Order${ico("arrow")}</button></div>`:"")+`</div>`}).join("");
 dots.innerHTML=sl.map((s,k)=>`<button type="button" aria-label="Show banner ${k+1}"></button>`).join("");
 const reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;let cur=0,paused=reduce,hold=false,seen=true,timer;
 const mark=()=>{$$("button",dots).forEach((d,k)=>d.setAttribute("aria-current",String(k==cur)));$$(".slide",tr).forEach((s,k)=>{s.setAttribute("aria-hidden",String(k!=cur));$$("button,a",s).forEach(b=>b.tabIndex=k==cur?0:-1)})};
 const go=k=>{cur=(k+sl.length)%sl.length;tr.scrollTo({left:tr.clientWidth*cur,behavior:reduce?"auto":"smooth"});mark()};
 let st;tr.addEventListener("scroll",()=>{clearTimeout(st);st=setTimeout(()=>{const k=Math.round(tr.scrollLeft/tr.clientWidth);if(k!=cur){cur=k;mark()}},80)},{passive:true});
 const pb=$("#promo-pause");const setP=p=>{paused=p;if(pb){pb.innerHTML=ico(p?"play":"pause");pb.setAttribute("aria-label",p?"Play banners":"Pause banners")}};
 setInterval(()=>{if(!paused&&!hold&&seen&&!document.hidden&&sl.length>1)go(cur+1)},5500);
 const P1=$("#promo-prev"),N1=$("#promo-next");if(P1)P1.onclick=()=>go(cur-1);if(N1)N1.onclick=()=>go(cur+1);if(pb)pb.onclick=()=>setP(!paused);
 dots.addEventListener("click",e=>{const b=e.target.closest("button");if(b)go($$("button",dots).indexOf(b))});
 box.addEventListener("mouseenter",()=>hold=true);box.addEventListener("mouseleave",()=>hold=false);
 box.addEventListener("focusin",()=>hold=true);box.addEventListener("focusout",()=>hold=false);
 let ht;tr.addEventListener("pointerdown",()=>{hold=true;clearTimeout(ht);ht=setTimeout(()=>hold=false,8000)});
 new IntersectionObserver(([e])=>seen=e.isIntersecting,{threshold:.3}).observe(box);
 addEventListener("resize",()=>tr.scrollTo({left:tr.clientWidth*cur}));
 setP(paused);mark()});

/* header: hamburger menu and a soft shadow once the page scrolls */
run("nav",()=>{const top=$(".top"),t=$("#menu-toggle"),nav=$("#nav");if(!top||!t||!nav)return;
 const isOpen=()=>top.classList.contains("open");
 const set=o=>{top.classList.toggle("open",o);t.setAttribute("aria-expanded",String(o));t.setAttribute("aria-label",o?"Close menu":"Open menu");document.body.classList.toggle("nav-open",o)};
 t.addEventListener("click",e=>{e.stopPropagation();set(!isOpen())});
 nav.addEventListener("click",e=>{if(e.target.closest("a"))set(false)});
 document.addEventListener("click",e=>{if(isOpen()&&!e.target.closest(".top"))set(false)});
 document.addEventListener("keydown",e=>{if(e.key==="Escape"&&isOpen()){set(false);t.focus()}});
 matchMedia("(min-width:900px)").addEventListener("change",e=>{if(e.matches)set(false)});
 const sh=()=>top.classList.toggle("scrolled",scrollY>40);addEventListener("scroll",sh,{passive:true});sh()});

/* category chip bar: active chip follows the section in view */
run("chips",()=>{const chips=$("#chips");if(!chips)return;const links=$$("a",chips);
 const spy=new IntersectionObserver(es=>es.forEach(e=>{if(!e.isIntersecting)return;
  links.forEach(a=>{const on=a.hash=="#"+e.target.id;if(on){a.setAttribute("aria-current","true");chips.scrollTo({left:a.offsetLeft-chips.clientWidth/2+a.offsetWidth/2,behavior:"smooth"})}else a.removeAttribute("aria-current")})}),{rootMargin:"-35% 0px -60% 0px"});
 links.forEach(a=>{const s=a.hash&&$(a.hash);if(s)spy.observe(s)})});

run("fab",()=>{const f=$("footer");if(f)new IntersectionObserver(([e])=>document.body.classList.toggle("at-end",e.isIntersecting)).observe(f)});

/* kitchen video: plays (muted) while on screen, unless reduced motion or data saver is on */
run("video",()=>{const v=$("#vid");if(!v)return;const fig=v.parentNode,pp=$("#pp"),snd=$("#snd"),big=$(".bigplay");
 const svg=d=>`<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">${d}</svg>`;
 const IC={play:svg('<path d="M7 4v16l13-8z" fill="currentColor"/>'),pause:svg('<path d="M6 4h4v16H6zM14 4h4v16h-4z" fill="currentColor"/>'),
  on:svg('<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 8a5 5 0 010 8M18.5 5.5a9 9 0 010 13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>'),
  off:svg('<path d="M4 9v6h4l5 4V5L8 9z" fill="currentColor"/><path d="M16 9l5 6M21 9l-5 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>')};
 const calm=matchMedia("(prefers-reduced-motion:reduce)").matches||(navigator.connection&&navigator.connection.saveData);
 let userPaused=!!calm;
 const sync=()=>{fig.classList.toggle("stopped",v.paused);
  if(pp){pp.innerHTML=IC[v.paused?"play":"pause"]+`<span>${v.paused?"Play":"Pause"}</span>`;pp.setAttribute("aria-label",v.paused?"Play video":"Pause video")}
  if(snd){snd.innerHTML=IC[v.muted?"off":"on"]+`<span>${v.muted?"Sound off":"Sound on"}</span>`;snd.setAttribute("aria-pressed",String(!v.muted));snd.setAttribute("aria-label",v.muted?"Turn sound on":"Turn sound off")}};
 ["play","pause","volumechange"].forEach(ev=>v.addEventListener(ev,sync));
 const play=()=>{const r=v.play();r&&r.catch(()=>{})};
 const toggle=()=>{if(v.paused){userPaused=false;play()}else{userPaused=true;v.pause()}};
 if(pp)pp.addEventListener("click",toggle);if(big)big.addEventListener("click",toggle);v.addEventListener("click",toggle);
 if(snd)snd.addEventListener("click",()=>{v.muted=!v.muted;if(!v.muted)v.volume=1});
 sync();
 new IntersectionObserver(([e])=>{if(e.isIntersecting){if(!userPaused)play()}else if(!v.paused)v.pause()},{threshold:.35}).observe(fig)});

/* scroll reveal (content is visible by default; hidden only once the "js" class is on) */
run("reveal",()=>{const rv=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");rv.unobserve(e.target)}}),{threshold:.05});$$(".rv").forEach(el=>rv.observe(el))});
root.classList.add("js");
})();
