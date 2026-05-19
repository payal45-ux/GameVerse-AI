
// LOADER
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
    animateCounters();
    setTimeout(showStartNotif, 1500);
    initScrollReveal();
  }, 1900);
});

// CUSTOM CURSOR
let mx = 0, my = 0;
document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  document.getElementById('cursor').style.transform = `translate(${mx}px, ${my}px)`;
});

// PARTICLES
(function(){
  const c = document.getElementById('particles-canvas');
  const ctx = c.getContext('2d');
  let W,H,parts=[];
  function resize(){ W=c.width=window.innerWidth; H=c.height=window.innerHeight; }
  resize();
  window.addEventListener('resize',resize);
  for(let i=0;i<80;i++) parts.push({
    x:Math.random()*9999,y:Math.random()*9999,
    vx:(Math.random()-.5)*0.4,vy:(Math.random()-.5)*0.4,
    r:Math.random()*1.5+0.5,
    a:Math.random(),
    c:['#00d4ff','#b400ff','#ff003c','#00ff88'][Math.floor(Math.random()*4)]
  });
  function draw(){
    ctx.clearRect(0,0,W,H);
    parts.forEach(p=>{
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0)p.x=W; if(p.x>W)p.x=0;
      if(p.y<0)p.y=H; if(p.y>H)p.y=0;
      ctx.save();
      ctx.globalAlpha=p.a*0.6;
      ctx.fillStyle=p.c;
      ctx.shadowColor=p.c;
      ctx.shadowBlur=8;
      ctx.beginPath();
      ctx.arc(p.x%W,p.y%H,p.r,0,Math.PI*2);
      ctx.fill();
      ctx.restore();
    });
    requestAnimationFrame(draw);
  }
  draw();
})();

// HERO BG SLIDES
let slideIdx=0;
const slides=document.querySelectorAll('.hero-slide');
setInterval(()=>{
  slides[slideIdx].classList.remove('active');
  slideIdx=(slideIdx+1)%slides.length;
  slides[slideIdx].classList.add('active');
},4000);

// COUNTERS
function animateCounters(){
  const targets=[{id:'counter1',val:500,suf:'+',dur:2000},{id:'counter2',val:1200,suf:'+',dur:2200},{id:'counter3',val:50000,suf:'+',dur:2500},{id:'counter4',val:200,suf:'+',dur:1800}];
  targets.forEach(t=>{
    const el=document.getElementById(t.id);
    let start=0,step=t.val/60,cur=0;
    const iv=setInterval(()=>{
      cur=Math.min(cur+step,t.val);
      el.textContent=(cur>=1000?(cur/1000).toFixed(1)+'K':Math.floor(cur))+t.suf;
      if(cur>=t.val)clearInterval(iv);
    },t.dur/60);
  });
}

// SCROLL REVEAL
function initScrollReveal(){
  const obs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if(e.isIntersecting){ e.target.classList.add('visible'); } });
  },{threshold:0.12});
  document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
}

// SIDEBAR
function toggleSidebar(){ document.getElementById('sidebar').classList.toggle('open'); document.getElementById('backdrop').classList.toggle('show'); }
function closeSidebar(){ document.getElementById('sidebar').classList.remove('open'); document.getElementById('backdrop').classList.remove('show'); }

// NOTIFICATION
let notifTimer;
function showStartNotif(){ showNotif('🎮','Daily Reward Available!','Claim 50 XP today'); }
function showNotif(icon,title,sub){
  const n=document.getElementById('notification');
  if(icon){ n.querySelector('.notif-icon').textContent=icon; n.querySelector('.notif-title').textContent=title; n.querySelector('.notif-sub').textContent=sub; }
  n.classList.add('show');
  clearTimeout(notifTimer);
  notifTimer=setTimeout(()=>n.classList.remove('show'),4000);
}
function closeNotif(){ document.getElementById('notification').classList.remove('show'); }

// THEME TOGGLE
let darkMode=true;
function toggleTheme(){
  darkMode=!darkMode;
  if(!darkMode){
    document.documentElement.style.setProperty('--bg-void','#f0f4ff');
    document.documentElement.style.setProperty('--bg-dark','#e8eef8');
    document.documentElement.style.setProperty('--bg-card','#ffffff');
    document.documentElement.style.setProperty('--text-primary','#0a1a2e');
    document.documentElement.style.setProperty('--text-secondary','#2a4a6a');
    document.querySelector('.theme-toggle').textContent='☀️';
  } else {
    document.documentElement.style.setProperty('--bg-void','#020408');
    document.documentElement.style.setProperty('--bg-dark','#060c14');
    document.documentElement.style.setProperty('--bg-card','#0a1220');
    document.documentElement.style.setProperty('--text-primary','#e8f4ff');
    document.documentElement.style.setProperty('--text-secondary','#7ba7c4');
    document.querySelector('.theme-toggle').textContent='🌙';
  }
}

// SEARCH SUGGESTIONS
const allGames=['BGMI','PUBG Battlegrounds','Valorant','GTA V','Minecraft','COD Warzone','Free Fire','Apex Legends','Fortnite','CS2','Rocket League'];
function showSearchSugg(v){
  const box=document.getElementById('search-suggestions');
  if(!v.trim()){box.style.display='none';return;}
  const matches=allGames.filter(g=>g.toLowerCase().includes(v.toLowerCase()));
  if(!matches.length){box.style.display='none';return;}
  box.innerHTML=matches.slice(0,5).map(m=>`<div class="search-item" onclick="selectGame('${m}')">${m}</div>`).join('');
  box.style.display='block';
}
function selectGame(g){document.getElementById('searchInput').value=g;document.getElementById('search-suggestions').style.display='none';}
document.addEventListener('click',e=>{if(!e.target.closest('.nav-search'))document.getElementById('search-suggestions').style.display='none';});

// AI CHATBOT
const aiResponses={
  'sensitivity':['For BGMI: Camera Sensitivity TP: 95-100, FPP: 80-85. ADS: 4x: 18-22, 6x: 12-16, 8x: 8-10. Gyroscope: Always ON at 150-200%. Adjust based on your phone! 🎯','Recommended BGMI Pro Settings: Free Look 80, Camera 95, ADS Red Dot 65, 2x 45, 4x 22, 6x 14. These are the most common settings used in BGMI Pro League.'],
  'weapon':['Top guns right now: 1) M416 (most versatile) 2) AKM (high damage) 3) Beryl M762 (aggressive) 4) DP-28 (spraying). For beginners: stick to M416 + SKS combo. 🔫','Meta loadout: M416 with 6x + Compensator | Beryl M762 close range. This combo works in 90% of situations.'],
  'rank':['Rank push tips: 1) Play in off-peak hours (2-6 AM) 2) Always use vehicle for rotation 3) Avoid early fights 4) Land in less populated areas 5) Play for placement, not kills. Top 5 = +15 RP 👑','Pro strategy: In first 2 circles, only take fights if they\'re 100% winning. After circle 3, third-party weak enemies. Position > Kills for ranking up.'],
  'landing':['Best drops: Pochinki for loot + fights | Military Base for top-tier loot | Rozhok for quick start | School for mid-game fights | Georgopol for sneaky loot. 🗺️','BGMI hot drops: Pochinki, School, Georgopol Containers. Safe drops: Primorsk, Mylta Power, Kameshki. For consistent chicken dinners: land Mylta Power!'],
  'loadout':['WARZONE S4 META: Primary: MORS Sniper + RAM-7 assault | Perks: Double Time + Sleight of Hand + Hardline | Equipment: Semtex + Flash. 💣','BGMI Current Meta: M416 (4x + Comp + Ext QD) + AKM (Thumb + Stock + Ext). This loadout dominates at all ranges.'],
};

function getAIResponse(msg){
  msg=msg.toLowerCase();
  if(msg.includes('sens'))return aiResponses.sensitivity[Math.floor(Math.random()*2)];
  if(msg.includes('weapon')||msg.includes('gun')||msg.includes('loadout')&&!msg.includes('warzone'))return aiResponses.weapon[Math.floor(Math.random()*2)];
  if(msg.includes('rank')||msg.includes('push'))return aiResponses.rank[Math.floor(Math.random()*2)];
  if(msg.includes('land')||msg.includes('drop')||msg.includes('spot'))return aiResponses.landing[Math.floor(Math.random()*2)];
  if(msg.includes('loadout')||msg.includes('warzone'))return aiResponses.loadout[Math.floor(Math.random()*2)];
  return 'Great question! For the best advice on "'+msg.substring(0,30)+'...", I\'d recommend checking our dedicated guide section. Want me to search for specific tips? Try asking about sensitivity, weapons, ranking, drop zones, or loadouts! 🎮';
}

function addMsg(text,isUser){
  const div=document.createElement('div');
  div.className='msg '+(isUser?'msg-user':'msg-bot');
  div.textContent=text;
  const msgs=document.getElementById('chatMessages');
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}
function showTyping(){
  const div=document.createElement('div');
  div.className='msg msg-bot msg-typing';
  div.id='typing-indicator';
  div.innerHTML='<div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div>';
  const msgs=document.getElementById('chatMessages');
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}
function removeTyping(){ const t=document.getElementById('typing-indicator'); if(t)t.remove(); }

function sendChat(){
  const input=document.getElementById('chatInput');
  const val=input.value.trim();
  if(!val)return;
  addMsg(val,true);
  input.value='';
  showTyping();
  setTimeout(()=>{
    removeTyping();
    addMsg(getAIResponse(val),false);
  },900+Math.random()*600);
}
function sendQuick(txt){ document.getElementById('chatInput').value=txt; sendChat(); }
// ===== MODAL =====
function openModal(type) {
  document.getElementById('modalOverlay').classList.add('open');
  switchModal(type);
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
}
function handleOverlayClick(e) {
  if (e.target === document.getElementById('modalOverlay')) closeModal();
}
function switchModal(type) {
  const isLogin = type === 'login';
  document.getElementById('tab-login').classList.toggle('active', isLogin);
  document.getElementById('tab-signup').classList.toggle('active', !isLogin);
  document.getElementById('form-login').style.display = isLogin ? 'block' : 'none';
  document.getElementById('form-signup').style.display = isLogin ? 'none' : 'block';
  document.getElementById('modalTitle').textContent = isLogin ? 'Welcome Back' : 'Create Account';
  document.getElementById('modalSub').textContent = isLogin
    ? 'Log in to save your game plans and access your history.'
    : 'Sign up free and start building your game today.';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });

// LIVE CHAT
const liveChatUsers=['ProGamer_X','NightShadow','SkyKing','EliteShooter','ZeroRecoil','MLG_Dev','ChaosX'];
const liveMsgs=['Just got chicken dinner! 🏆','This map rotation is insane','Anyone duo up?','Try hip fire only challenge lol','My ping says 20 but plays like 200','That update broke recoil completely','Top 5 landing spot is definitely Pochinki'];
function sendLiveMsg(){
  const input=document.getElementById('liveChatInput');
  const val=input.value.trim();
  if(!val)return;
  addLiveMsg('You',val);
  input.value='';
  setTimeout(()=>addLiveMsg(liveChatUsers[Math.floor(Math.random()*liveChatUsers.length)],liveMsgs[Math.floor(Math.random()*liveMsgs.length)]),1200+Math.random()*1500);
}
function addLiveMsg(user,text){
  const div=document.createElement('div');
  div.className='chat-msg';
  div.innerHTML=`<div class="user">${user}</div><div class="text">${text}</div>`;
  const msgs=document.getElementById('liveMessages');
  msgs.appendChild(div);
  msgs.scrollTop=msgs.scrollHeight;
}
function toggleChat(){
  const w=document.getElementById('chatWindow');
  w.classList.toggle('open');
}
// Random live messages
setInterval(()=>{
  if(document.getElementById('chatWindow').classList.contains('open')){
    addLiveMsg(liveChatUsers[Math.floor(Math.random()*liveChatUsers.length)],liveMsgs[Math.floor(Math.random()*liveMsgs.length)]);
  }
},5000);

// DAILY REWARD
function claimReward(el){
  if(el.classList.contains('claimed'))return;
  el.classList.add('claimed');
  el.innerHTML=el.innerHTML+'<div class="claim-check">✓</div>';
  showNotif('💎','+50 XP Claimed!','Keep the streak going for bigger rewards!');
}

// MOUSE PARALLAX on hero
document.getElementById('hero').addEventListener('mousemove',e=>{
  const rect=document.getElementById('hero').getBoundingClientRect();
  const x=(e.clientX-rect.left)/rect.width-.5;
  const y=(e.clientY-rect.top)/rect.height-.5;
  document.querySelector('.hero-content').style.transform=`translate(${x*8}px,${y*6}px)`;
});

