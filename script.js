/* ===== CONFIG: the ONLY places you need to edit ===== */
const PAYMENT_URL = "https://superprofile.bio/vp/indian-investment-portfolio-tracker-os";
const ASSETS = { // files live in assets/images/. w/h = pixel size (keeps the correct aspect ratio). cat: A-D gallery category
  dashboard:      {src:"assets/images/dashboard.png", w:1916,h:837, cat:"A · Portfolio Dashboard", title:"Main Dashboard", text:"Portfolio value, cost basis, gains and income at a glance, with the data-quality status shown up front.", alt:"Tracker OS Excel main dashboard showing sample portfolio values and a data-quality status"},
  dashAlloc:      {src:"assets/images/dashboard-allocation-chart.png", w:1917,h:837, cat:"A · Portfolio Dashboard", title:"Dashboard Allocation Chart", text:"Asset allocation by class, shown visually on the dashboard.", alt:"Tracker OS dashboard allocation chart by asset class"},
  holdingsGoals:  {src:"assets/images/holdings-and-goal-progress.png", w:1917,h:837, cat:"B · Investment Management", title:"Holdings & Goal Progress", text:"Active holdings alongside progress towards your investment goals.", alt:"Tracker OS dashboard holdings and goal progress tables"},
  prices:         {src:"assets/images/price-updates.png", w:1916,h:842, cat:"B · Investment Management", title:"Price Updates", text:"Prices and valuations are entered manually. There are no live market feeds.", alt:"Tracker OS Price Updates worksheet"},
  allocation:     {src:"assets/images/asset-allocation.png", w:1912,h:842, cat:"B · Investment Management", title:"Asset Allocation", text:"Your investments distributed across asset classes.", alt:"Tracker OS Asset Allocation worksheet"},
  income:         {src:"assets/images/income-analysis.png", w:1916,h:842, cat:"C · Performance Analytics", title:"Income Analysis", text:"Monthly investment income analysis from the income you record.", alt:"Tracker OS monthly investment income analysis chart"},
  performance:    {src:"assets/images/performance.png", w:1917,h:852, cat:"C · Performance Analytics", title:"Performance Analysis", text:"Performance metrics and snapshots to review how your portfolio changes over time.", alt:"Tracker OS Performance worksheet"},
  xirr:           {src:"assets/images/xirr-ledger.png", w:1917,h:841, cat:"C · Performance Analytics", title:"XIRR Ledger", text:"The dated cash-flow ledger behind the XIRR calculation. A calculation-support worksheet, not a register you edit.", alt:"Tracker OS XIRR cash-flow ledger worksheet"},
  gains:          {src:"assets/images/realized-gains.png", w:1917,h:787, cat:"C · Performance Analytics", title:"Realized Gains", text:"Realized gains and losses calculated for investments you have sold.", alt:"Tracker OS Realized Gains worksheet"},
  notionMain:     {src:"assets/images/notion-main-workspace.png", w:1582,h:915, cat:"D · Excel + Notion Workspace", title:"Notion Main Workspace", text:"Your Notion hub. Figures are copied across manually; Excel and Notion do not synchronize.", alt:"Tracker OS Notion main workspace page"},
  notionTx:       {src:"assets/images/notion-transaction-log.png", w:1583,h:912, cat:"D · Excel + Notion Workspace", title:"Notion Transaction Log", text:"A Notion database for documenting each transaction.", alt:"Tracker OS Notion Transaction Log database"}
};
/* ==================================================== */
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
const ready = PAYMENT_URL && !PAYMENT_URL.startsWith("PASTE_");
$$("[data-buy]").forEach(a=>{ if(ready){a.href=PAYMENT_URL;a.rel="noopener";} else console.warn("PAYMENT_URL not set in script.js"); });

function fillShot(el,key,eager){
  const a=ASSETS[key]; el.innerHTML=""; el.style.setProperty("--r",a.w+"/"+a.h);
  const ph=()=>{el.innerHTML='<div class="ph"><b>Preview placeholder</b><span>'+a.title+'</span><span>Add '+a.src+'</span></div>'};
  const img=new Image(); img.alt=a.alt; img.decoding="async"; if(!eager) img.loading="lazy";
  img.width=a.w; img.height=a.h; img.onerror=ph; img.src=a.src; el.appendChild(img);
}
$$(".shot[data-asset]").forEach(el=>fillShot(el,el.dataset.asset,el.hasAttribute("data-eager")));
function makeFig(f,k){
  const a=ASSETS[k]; f.innerHTML='<div class="shot" data-zoom></div><figcaption><span class="cat">'+a.cat+'</span><span class="cat tagS">Sample data</span><strong>'+a.title+'</strong>'+a.text+'</figcaption>';
  f.dataset.k=k; fillShot($(".shot",f),k); f.firstChild.dataset.asset=k;
}
$$("[data-fig]").forEach(f=>makeFig(f,f.dataset.fig));
const GAL=["dashAlloc","holdingsGoals"], gal=$("#gallery");
GAL.forEach(k=>{const f=document.createElement("figure");f.className="fig gcard";makeFig(f,k);gal.appendChild(f)});

/* Lightbox: every screenshot marked data-zoom, in page order */
const lb=$("#lb"), lbBody=$(".lb-body",lb);
const Z=$$("[data-zoom]"); let lastFocus, gi=0;
Z.forEach((s,i)=>{const k=s.dataset.asset||s.closest("[data-k]")?.dataset.k; s.dataset.asset=k;
  s.classList.add("zoomable"); s.tabIndex=0; s.setAttribute("role","button"); s.setAttribute("aria-label","Enlarge: "+ASSETS[k].title);
  s.onclick=()=>openLb(i); s.onkeydown=e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();openLb(i)}}});
function showLb(i){gi=(i+Z.length)%Z.length; const k=Z[gi].dataset.asset,a=ASSETS[k];
  lbBody.innerHTML='<div class="lb-slide"><div class="shot"></div><figcaption><strong>'+a.title+'</strong>'+a.cat+' · Sample data · '+a.text+' ('+(gi+1)+'/'+Z.length+')</figcaption></div>'; fillShot($(".shot",lbBody),k,true);}
function openLb(i){lastFocus=document.activeElement; showLb(i); lb.hidden=false; document.body.style.overflow="hidden"; $(".lb-x").focus();}
function closeLb(){lb.hidden=true; document.body.style.overflow=""; lastFocus&&lastFocus.focus();}
$(".lb-x").onclick=closeLb; $(".lb-prev").onclick=()=>showLb(gi-1); $(".lb-next").onclick=()=>showLb(gi+1);
lb.onclick=e=>{if(e.target===lb)closeLb()};
addEventListener("keydown",e=>{
  if(lb.hidden)return;
  if(e.key==="Escape")closeLb();
  else if(e.key==="ArrowLeft")showLb(gi-1);
  else if(e.key==="ArrowRight")showLb(gi+1);
  else if(e.key==="Tab"){const f=$$("button",lb),first=f[0],last=f[f.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus()}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus()}}
});

/* Mobile nav */
const burger=$(".burger"), menu=$("#menu");
burger.onclick=()=>{const o=menu.classList.toggle("open");burger.setAttribute("aria-expanded",o)};
$$("#menu a").forEach(a=>a.addEventListener("click",()=>{menu.classList.remove("open");burger.setAttribute("aria-expanded","false")}));

addEventListener("keydown",e=>{if(e.key==="Escape"&&menu.classList.contains("open")){menu.classList.remove("open");burger.setAttribute("aria-expanded","false");burger.focus()}});

/* Assessment */
const QS=["Do you know your total investments across different asset classes?","Can you calculate your portfolio's XIRR?","Do you track realized and unrealized gains separately?","Do you maintain records of dividends and interest?","Do you have structured investment goals?"];
const RES=[[1,"Great! You already have a structured investment tracking approach. You might appreciate the advanced analytical capabilities of Tracker OS."],[3,"Your investment tracking system might have some blind spots. There's an opportunity to bring more clarity and structure into your portfolio management."],[5,"Your investments deserve a better tracking system. It might be time to organise your portfolio, understand your returns and manage your investment records more effectively."]];
let ans=Array(QS.length).fill(null), cur=0, touched=false;
const body=$("#q-body"), bar=$("#q-bar"), cnt=$("#q-count"), back=$("#q-back"), nav=$(".q-nav");
function render(){
  if(cur>=QS.length) return result();
  nav.hidden=cur===0; bar.style.width=(cur/QS.length*100)+"%"; cnt.textContent="Question "+(cur+1)+" of "+QS.length;
  body.innerHTML='<div class="qa"><h3 tabindex="-1">'+QS[cur]+'</h3><div class="opts"><button class="opt'+(ans[cur]==="yes"?" sel":"")+'" data-a="yes" aria-pressed="'+(ans[cur]==="yes")+'">Yes</button><button class="opt'+(ans[cur]==="no"?" sel":"")+'" data-a="no" aria-pressed="'+(ans[cur]==="no")+'">No</button></div></div>';
  $$(".opt",body).forEach(b=>b.onclick=()=>{if(b.disabled)return;$$(".opt",body).forEach(x=>x.disabled=true);ans[cur]=b.dataset.a;b.classList.add("sel");touched=true;setTimeout(()=>{cur++;render()},200)});
  bar.parentNode.setAttribute("aria-valuenow",cur);
  if(touched){const t=$(".qa h3",body);t&&t.focus({preventScroll:true})}
}
function result(){
  const no=ans.filter(x=>x==="no").length, msg=RES.find(r=>no<=r[0])[1];
  bar.style.width="100%"; cnt.textContent="Complete"; nav.hidden=false;
  body.innerHTML='<div class="res" tabindex="-1"><div class="big-n">'+no+' of '+QS.length+'</div><small>answers were “No”</small><p>'+msg+'</p><div class="row"><a class="btn btn-primary" href="#solution">DISCOVER YOUR INVESTMENT TRACKER OS</a><button class="btn btn-ghost-dk" id="restart">Restart</button></div></div>';
  bar.parentNode.setAttribute("aria-valuenow",5);$(".res",body).focus({preventScroll:true});
  $("#restart").onclick=()=>{ans.fill(null);cur=0;touched=true;render()};
}
back.onclick=()=>{if(cur>0){cur--;touched=true;render()}}; render();

/* Entrance animations */
const io="IntersectionObserver" in window?new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add("in");io.unobserve(e.target)}}),{threshold:.15}):null;
$$(".card,.panel,.notfor,.onestar,.rv").forEach(el=>{el.classList.add("rv"); io?io.observe(el):el.classList.add("in")});
$("#yr").textContent=new Date().getFullYear();
