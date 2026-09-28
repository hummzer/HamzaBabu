<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

type Project = { title:string; cat:string; desc:string; stack:string[]; repo?:string; live?:string; status:string; featured?:boolean }
const menu = ref(false), progress = ref(0), active = ref('home'), revealObserver = ref<IntersectionObserver | null>(null), route = ref(window.location.pathname)
const projects:Project[] = [
  {title:'Momo',cat:'LIVE · TRADING SYSTEMS',desc:'Lightweight catalogue for systematic trading strategies and indicators across MQL5, MQL4, Pine Script, Python and Rust.',stack:['Vue','Vite','Trading Systems','MQL5'],repo:'https://github.com/hummzer/Momo',live:'https://momo-jade-ten.vercel.app',status:'LIVE',featured:true},
  {title:'BotForge',cat:'LIVE · BOT AUTOMATION',desc:'Trading-bot product interface for bot creation, backtesting, live-bot workflows and reporting.',stack:['Next.js','TypeScript','Trading','Automation'],repo:'https://github.com/hummzer/BotForge',live:'https://bot-forge-ten.vercel.app',status:'LIVE',featured:true},
  {title:'Finesse Detailing',cat:'LIVE · SERVICE PLATFORM',desc:'Production detailing business website focused on premium presentation, service discovery and conversion.',stack:['Next.js','React','Web','SEO'],repo:'https://github.com/hummzer/FinesseDetailingLtd',live:'https://finesse-detailing.vercel.app',status:'LIVE',featured:true},
  {title:'cbcElimu',cat:'LIVE · EDUCATION PLATFORM',desc:'Curriculum-focused learning platform covering structured study content, assessments and digital learning workflows.',stack:['Web','Education','Curriculum','AppDeploy'],repo:'https://github.com/hummzer/cbcElimu',live:'https://33-learn-103pf9.v2.appdeploy.ai',status:'LIVE',featured:true},
  {title:'Elite Nursing Medics',cat:'LIVE · FULL-STACK PLATFORM',desc:'Production nursing education platform spanning exam preparation, quizzes, student workflows and a Laravel/MySQL API layer.',stack:['Next.js','TypeScript','Laravel','PHP','MySQL'],repo:'https://github.com/hummzer/QlexNursing33',live:'https://elitenursingmedics.com',status:'LIVE',featured:true},
  {title:'The Exquisite Hour',cat:'LIVE · LUXURY COMMERCE',desc:'Premium online boutique for luxury timepieces, jewellery, perfumes and accessories.',stack:['Next.js','TypeScript','Prisma','Tailwind'],repo:'https://github.com/hummzer/Exquisite',live:'https://www.exquisitehour.com',status:'LIVE',featured:true},
  {title:'The 5th Millionaire',cat:'LIVE · TRADING EDUCATION',desc:'Trading education platform for free XAUUSD classes, psychology, risk management and gold strategy content.',stack:['React','Vite','SEO','Web'],repo:'https://github.com/hummzer/5thMillionaire',live:'https://5thmillionairecapital.com',status:'LIVE',featured:true},
  {title:'33 Solutions',cat:'LIVE · COMPANY PLATFORM',desc:'Company web platform work across application architecture, content, SEO, deployment and product engineering.',stack:['Next.js','React','JavaScript','SEO'],repo:'https://github.com/hummzer/33Soulutions',live:'https://33solutions.com',status:'LIVE',featured:true},
  {title:'Maxim — Technical Blog',cat:'LIVE · TECHNICAL BLOG',desc:'Technical writing and experiments covering software engineering, security, systems, automation and development.',stack:['Vue','Vite','Technical Writing','Web'],repo:'https://github.com/hummzer/Maxim',live:'https://maxim-bay.vercel.app/blogs',status:'LIVE',featured:true},
  {title:'Lewis Favor Kibet',cat:'LIVE · PROFESSIONAL WEBSITE',desc:'Professional website implementation with profile content, SEO and CV delivery.',stack:['React','Vite','SEO','Responsive UI'],repo:'https://github.com/hummzer/Lewis',live:'https://www.lewisfavorkibet.com',status:'LIVE',featured:true},
  {title:'Python for Security',cat:'SECURITY · OPEN SOURCE',desc:'Hands-on Python security tooling, reconnaissance, automation and offensive-security foundations.',stack:['Python','Linux','Security','CLI'],repo:'https://github.com/hummzer/Python-for-Security',status:'PUBLIC'},
  {title:'STRIX',cat:'SECURITY · OPEN SOURCE',desc:'Security-oriented engineering and offensive-tooling exploration.',stack:['Python','Security','Automation'],repo:'https://github.com/hummzer/strix',status:'PUBLIC'},
  {title:'GoldViper',cat:'QUANT · PRIVATE',desc:'Private XAUUSD quantitative research and execution systems. Evidence is public-facing; source stays private.',stack:['MQL5','MQL4','XAUUSD','Research'],repo:'https://github.com/hummzer/GoldViper',status:'PRIVATE'},
  {title:'MQL5 Systems',cat:'QUANT · PRIVATE',desc:'Evidence archive of MetaTrader strategy, indicator and execution systems.',stack:['MQL5','MQL4','Pinescript'],repo:'https://github.com/hummzer/MQL5',status:'PRIVATE'},
  {title:'YouTube Automation Lab',cat:'AUTOMATION · PERSONAL',desc:'Python, media and workflow automation for playlists, Shorts, channels and publishing.',stack:['Python','FFmpeg','n8n','CLI'],repo:'https://github.com/hummzer/YoutubeShortsGenerator',status:'PRIVATE'},
  {title:'Open Source Home Security',cat:'OPEN SOURCE · INFRASTRUCTURE',desc:'Residential security engineering around HAOS, Proxmox, Frigate, MQTT, go2rtc, HACS, Tailscale and mixed-vendor CCTV.',stack:['HAOS','Proxmox','Frigate','MQTT'],repo:'https://github.com/hummzer/HamzaBabu',status:'DOCUMENTED'}
]
const featured = computed(() => projects.filter(p=>p.featured))
const servicePackages = [
  {title:'FULL-STACK WEB BUILD',cat:'PACKAGE · WEB ENGINEERING',desc:'Production web application design, frontend, backend/API integration, database, deployment and handover. Scoped to the product, pages, integrations and delivery requirements.',price:'CUSTOM QUOTE',steps:'Discovery → architecture → build → deployment → handover',subject:'Full-Stack Web Build Package'},
  {title:'RED TEAM / SECURITY ASSESSMENT',cat:'PACKAGE · CYBERSECURITY',desc:'Authorized web and application security assessment covering attack-surface mapping, reconnaissance, validation, findings and a remediation report.',price:'CUSTOM QUOTE',steps:'Scope → reconnaissance → validation → report → remediation review',subject:'Red Team Security Assessment Package'},
  {title:'AUTOMATION SYSTEM',cat:'PACKAGE · AUTOMATION',desc:'Custom automation for business, media, data or operational workflows using Python, APIs, n8n, CLI tooling and scheduled processing.',price:'CUSTOM QUOTE',steps:'Workflow map → implementation → integrations → testing → handover',subject:'Automation System Package'},
  {title:'EA / QUANT SYSTEMS',cat:'PACKAGE · QUANT ENGINEERING',desc:'Custom EA and quantitative-system engineering for XAUUSD research, multi-strategy execution, historical backtesting, risk controls and strategy portfolios.',price:'CUSTOM QUOTE',steps:'Strategy selection → data test → optimisation → risk → delivery',subject:'EA / Quant Systems Package'},
  {title:'COMPLETE SECURITY INSTALLATION',cat:'PACKAGE · RESIDENTIAL SECURITY',desc:'End-to-end design, networking, HAOS/Proxmox build, CCTV integration, detection, access automation, remote access, dashboards and commissioning. Pricing is custom to property size, hardware count, network complexity and automation scope.',price:'CUSTOM QUOTE',steps:'Site survey → architecture → installation → automation → handover',subject:'Home Security Installation Enquiry'}
]
const archive = computed(() => projects.filter(p=>!p.featured && !['Python for Security','STRIX','GoldViper','MQL5 Systems'].includes(p.title)))
const skills = [
  ['FRONTEND','Vue.js','React','Next.js','TypeScript','JavaScript','HTML/CSS'],
  ['BACKEND','Laravel','PHP','Node.js','REST APIs','MySQL','PostgreSQL','Prisma'],
  ['SECURITY','Red Teaming','Web Security','Python Security','Linux','Recon','HTB','picoCTF'],
  ['SYSTEMS','Linux','Docker','Git/GitHub','Proxmox','Networking','HAOS','Frigate','MQTT','Tailscale','HACS','go2rtc'],
  ['LANGUAGES','TypeScript','JavaScript','PHP','Python','SQL','MQL5/MQL4','Bash','Zsh']
]
const quantExecutables = [
  {slug:'gold-scalper-trading',title:'Gold Scalper Trading',platform:'MT4 / EX4'},
  {slug:'dark-gold-ea',title:'Dark Gold EA',platform:'MT4 / SET'},
  {slug:'ft-gold-robot',title:'FT Gold Robot v5.4',platform:'MT4 / PACKAGE'},
  {slug:'gold-hunter-v9',title:'GOLD HUNTER V9 MT5 EA',platform:'MT5 / EA'},
  {slug:'goldminer-ai',title:'Goldminer AI MT4',platform:'MT4 / PACKAGE'},
  {slug:'orion-gold-scalper',title:'ORION GOLD SCALPER V4.0',platform:'MT4 / PACKAGE'},
  {slug:'super-gold-v2',title:'Super Gold V2.0',platform:'MT4 / EA'},
  {slug:'gold-reaper',title:'The Gold Reaper V1.5',platform:'MT4 / EA'}
]
const customQuant = [
  ['Opening Range Breakout','Tracks a designated London or New York opening range. A confirmed close beyond the range triggers directional entry.','15/30m window · breakout close','SL opposite extreme or midpoint'],
  ['Supply & Demand Zone Rejection','Detects base zones before sharp momentum extensions and seeks confirmed pullbacks into unmitigated zones.','Zone detection · confirmation candle','Zone invalidation / structural target'],
  ['Moving Average Cross + Trend Filter','Fast EMA crosses the slow EMA while a macro condition such as 200 SMA slope or ADX validates direction.','EMA 9/20 vs 50/200 · ADX option','Trend-filtered crossover'],
  ['Bollinger Band Mean Reversion','Fades closes outside the outer Bollinger Band when RSI or Stochastic confirms an overextended state.','BB(20,2) · RSI/Stoch filter','Return toward SMA20'],
  ['Donchian Channel Breakout','Turtle-style breakout using the highest high and lowest low over a rolling N-bar channel.','20-bar default','Opposite shorter channel / exit rule'],
  ['MACD Zero-Line Momentum','Requires a MACD zero-line crossover plus increasing histogram momentum for at least two bars.','MACD · histogram acceleration','Momentum invalidation / structural exit'],
  ['Fibonacci Retracement Pullback','Maps a recent swing high-low and looks for reversal inside the 61.8–78.6% retracement area.','61.8/78.6% zone','Prior structural extreme'],
  ['SuperTrend MTF Trend Following','ATR-backed SuperTrend flips only on confirmed closes, with higher-timeframe trend context available.','ATR SuperTrend · MTF','Dynamic SuperTrend stop'],
  ['VWAP Session Reversion','Uses session VWAP and standard-deviation bands to fade extreme deviations back toward fair value.','VWAP · ±1/±2σ','VWAP mean reversion'],
  ['BOS & ChoCH Structure Engine','Tracks confirmed swing pivots. Minor breaks classify continuation while major counter-trend breaks flag structural reversal.','Swing pivots · BOS · ChoCH','Structural invalidation / liquidity'],
  ['RSI Divergence Reversal','Identifies price higher-high / RSI lower-high or inverse divergence, then waits for a countertrend swing break.','RSI divergence · swing break','Countertrend structure'],
  ['ATR Breakout Volatility Expansion','Detects compressed ranges relative to rolling ATR and places conditional breakout orders beyond the compression bar.','ATR compression threshold','Opposite side / volatility stop']
].map((x,i)=>({id:i+1,name:x[0],description:x[1],logic:x[2],exit:x[3],source:'// '+x[0]+'\\n// strategy architecture + execution layer\\n// partial source window; full custom implementation available by request.'}))
const quantIndicators = [
  ['VP-v6','Volume / profile toolkit'],['FiboRetracement','Fibonacci retracement tooling'],['Smart Money Concepts','SMC-oriented chart tooling'],['SupportResistance','Support / resistance tooling'],['FXSSI Trading Sessions','Trading-session visualization'],['KT Risk Reward','Risk/reward chart tooling'],['AutoTrendLines','Automatic trendline tooling'],['Candlestick Pattern Detector','Candlestick pattern detection']
]
const quantFilter = ref('executables')
const automationOpen = ref(null)
const toggleAutomation = (id) => { automationOpen.value = automationOpen.value === id ? null : id }
const customOpen = ref(null)
const toggleCustom = (id) => { customOpen.value = customOpen.value === id ? null : id }
const checkoutItem = ref(null)
const openCheckout = (name) => { checkoutItem.value = name }
const closeCheckout = () => { checkoutItem.value = null }
const isDetail = computed(() => route.value.startsWith('/quant/'))
const activeQuant = computed(() => quantExecutables.find(x => '/quant/'+x.slug === route.value))
const openQuant = (slug) => { history.pushState({}, '', '/quant/'+slug); route.value=window.location.pathname; window.scrollTo({top:0,behavior:'smooth'}) }
const syncRoute = () => { route.value=window.location.pathname }
const closeQuant = () => { history.pushState({}, '', '/'); route.value='/'; window.scrollTo({top:0,behavior:'smooth'}) }
const youtube = [
  ['WALES','Channel automation / media workflow','Automated collection and processing around a channel workflow.'],
  ['Shorts Creation','Short-form production pipeline','Python + FFmpeg-oriented workflow for assembling and preparing short-form videos.'],
  ['Playlist Automation','Playlist / playback tooling','Python utilities for YouTube playlist looping and controlled playback.'],
  ['Channel Bots','Channel operations','Automation concepts for repeatable channel actions and content preparation.'],
  ['Funny-Moment Extraction','Media processing','Automation research for extracting reusable moments from longer media.'],
  ['Transporter / Hive','Automation orchestration','Orchestration concept for moving media and jobs through multiple processing stages.'],
  ['Medusa CPU Shorts Maker','Local-first video generation','CPU-conscious Shorts workflow designed around constrained local hardware.'],
  ['n8n Publishing / Strategy','Workflow automation','Source-data ingestion, structured content generation and publishing strategy.'],
  ['Children’s Shorts Pipeline','Open-source media generation','Story → images → image-to-video → voice/music → 9:16 MP4 using ComfyUI, Wan 2.1, Flux/SDXL, Piper and FFmpeg.']
]
const youtubeSourcePreview = `def download_video(urls, output_dir="downloads"):
    os.makedirs(output_dir, exist_ok=True)
    for url in tqdm(urls, desc="Downloading", unit="video"):
        cmd = [
            "yt-dlp", "-f", "best[ext=mp4]",
            "-o", f"{output_dir}/%(title).40s.%(ext)s", url
        ]
        subprocess.run(cmd, stdout=subprocess.DEVNULL,
                       stderr=subprocess.DEVNULL)

def is_video_duration_valid(video_path):
    clip = mp.VideoFileClip(video_path)
    return 1800 <= clip.duration <= 3600

def transcribe_audio(video_path):
    model = whisper.load_model("tiny")
    audio_path = video_path.replace(".mp4", ".mp3")
    mp.VideoFileClip(video_path).audio.write_audiofile(
        audio_path, logger=None
    )
    result = model.transcribe(audio_path)
    return result["segments"]

def create_shorts(video_path, segments, output_dir="shorts", max_count=10):
    os.makedirs(output_dir, exist_ok=True)
    video = mp.VideoFileClip(video_path)
    segment_pool = [
        seg for seg in segments
        if seg["end"] - seg["start"] >= 10
    ]
    random.shuffle(segment_pool)

    for index, seg in enumerate(segment_pool[:max_count], start=1):
        start = seg["start"]
        duration = min(
            seg["end"] - start,
            random.randint(30, 60)
        )
        clip = video.subclip(start, start + duration).resize(height=720)
        clip.write_videofile(
            f"{output_dir}/short_{index}.mp4",
            codec="libx264",
            audio_codec="aac",
            threads=1,
            logger=None
        )

def process_videos(links):
    download_video(links)
    files = [
        file for file in os.listdir("downloads")
        if file.endswith(".mp4")
    ]
    for file in files:
        path = os.path.join("downloads", file)
        if is_video_duration_valid(path):
            segments = transcribe_audio(path)
            create_shorts(path, segments)
`
const youtubeArchitecture = [
  ['01','INPUT','YouTube URL or newline-delimited URL list','youtubelinks.txt / CLI arguments'],
  ['02','INGEST','yt-dlp downloads source video as MP4','best[ext=mp4] + deterministic output naming'],
  ['03','GATE','Reject videos outside the 30–60 minute source window','MoviePy duration validation'],
  ['04','TRANSCRIBE','Extract audio and segment speech','Whisper tiny model'],
  ['05','SELECT','Build a pool of transcript segments >= 10 seconds','segment filtering + shuffle'],
  ['06','RENDER','Create 30–60 second vertical-friendly clips','MoviePy + libx264 + AAC'],
  ['07','APP','Expose the workflow through the web application','Next.js pages + API route'],
  ['08','PERSIST','Prisma layer and application data model','src/lib/prisma.ts + Prisma schema'],
  ['09','EXTEND','Additional media/AI pipelines can attach here','FFmpeg / ComfyUI / Piper / n8n']
]

const systems = [
  ['HAOS / Proxmox','HAOS installed as a Proxmox VM with dual NICs and separated management/camera paths.','Virtualization · Linux · Infrastructure'],
  ['Network segmentation','Four logical security zones cover management, cameras/NVR, IoT/intercom and household traffic.','VLANs · Firewalling · Routing'],
  ['Video intelligence','Frigate manages 22 configured devices while go2rtc normalizes streams for dashboard viewing and detection.','Frigate · go2rtc · RTSP · WebRTC'],
  ['Automation backbone','Mosquitto carries Frigate and Double Take events into Home Assistant decision logic; HACS manages integrations.','MQTT · HACS · YAML'],
  ['Physical automation','Centurion D6 gate control, relay timing, presumed-open state, auto-close, alerts, ANPR and known-vehicle recognition.','Relays · ANPR · Automation'],
  ['PTZ choreography','Dahua PTZ Back and Front run day/night patrol scripts with named presets and dwell timing.','Dahua · CGI · PTZ · Bash'],
  ['Identity + access','Hikvision KD8003/KH9510 ISAPI, Reolink ANPR, Double Take and CompreFace were combined into one access workflow.','ISAPI · ANPR · Face recognition'],
  ['Remote access','Tailscale provides encrypted remote access without router port-forwarding; camera routes are not advertised.','WireGuard · Tailscale'],
  ['Daily reporting','Frigate REST endpoints feed an automated daily security report with snapshots and review links.','REST · Reporting · Notifications'],
  ['Build + documentation','40-page technical record covering architecture, installation, commissioning failures, solutions and source-file structure.','Documentation · Troubleshooting']
]
const osFlavors = ['Zorin OS','Kali Linux','Arch Linux','Ubuntu','Other Linux environments used during experimentation']
const credLinks = [
  ['⌁','DEVELOPMENT ACTIVITY','WakaTime','Longitudinal coding activity and language usage.','https://wakatime.com/@za34'],
  ['⌘','SOURCE CODE','GitHub','Public engineering archive and open-source work.','https://github.com/hummzer'],
  ['λ','PROBLEM SOLVING','LeetCode','Algorithms, data structures and practice.','https://leetcode.com/u/IfADl0sOFQ/'],
  ['⌁','CYBERSECURITY','Hack The Box','Hands-on security labs and challenge practice.','https://www.hackthebox.com/']
]
const downloadCv = () => {
  const cv = 'SALIM HAMZA\nFULL-STACK WEB DEVELOPER · RED TEAMER / CYBERSECURITY ANALYST\nNairobi, Kenya · Remote\n\nBSc Information Technology — JKUAT\nCurrent: 33 Solutions — Full-stack Web Developer\n\nFrontend: Vue.js, React, Next.js, TypeScript, JavaScript\nBackend: Laravel, PHP, Node.js, MySQL, PostgreSQL, Prisma\nSecurity: Red teaming, web security, Python security, Linux, reconnaissance, HTB, picoCTF\nSystems: Proxmox, HAOS, Frigate, MQTT, Tailscale, Docker, networking\nAutomation: Python, Bash, Zsh, n8n, FFmpeg, YouTube/media pipelines\nQuant: MQL4/MQL5, XAUUSD research, MetaTrader, TradingView\n\nGitHub: https://github.com/hummzer\nWakaTime: https://wakatime.com/@za34\nCredly: https://www.credly.com/users/salim-hamza.bea036d1\nLeetCode: https://leetcode.com/u/IfADl0sOFQ/\n'
  const a=document.createElement('a'); a.href=URL.createObjectURL(new Blob([cv],{type:'text/plain'})); a.download='Salim_Hamza_CV.txt'; a.click()
}
function scrollSpy(){
  const max=document.documentElement.scrollHeight-innerHeight; progress.value=max?scrollY/max:0
  const ids=['home','work','experience','quant','systems','services','skills','security','credentials','contact']
  for(const id of ids){const e=document.getElementById(id); if(e && e.getBoundingClientRect().top < innerHeight*.4) active.value=id}
}
onMounted(()=>{
  addEventListener('scroll',scrollSpy,{passive:true})
  addEventListener('popstate',syncRoute)
  revealObserver.value = new IntersectionObserver((entries)=>{
    entries.forEach((entry)=>{
      if(entry.isIntersecting) entry.target.classList.add('is-visible')
    })
  },{threshold:0.12,rootMargin:'0px 0px -8% 0px'})
  document.querySelectorAll('main > section, .featured article, .archive .row, .quant-grid article, .system-grid article, .package, .media-list article, .skill-grid > div, .cred-grid > *').forEach((el)=>el.classList.add('reveal'))
  document.querySelectorAll('.reveal').forEach((el)=>revealObserver.value?.observe(el))
})
onBeforeUnmount(()=>{
  removeEventListener('scroll',scrollSpy)
  revealObserver.value?.disconnect()
  removeEventListener('popstate',syncRoute)
})
</script>
<template>
<div class="site">
  <div class="progress" :style="{width:(progress*100)+'%'}"></div>
  <header><a class="logo" href="#home">SH<span>/</span>26</a><nav :class="{open:menu}"><a v-for="n in [['home','HOME'],['work','WORK'],['experience','NOW'],['quant','QUANT'],['systems','SYSTEMS'],['services','SERVICES'],['skills','SKILLS'],['security','SECURITY'],['credentials','CREDENTIALS']]" :key="n[0]" :href="'#'+n[0]" @click="menu=false">{{n[1]}}</a></nav><div class="right"><a class="status" href="#contact">● OPEN FOR WORK</a><button class="hamb" @click="menu=!menu">☰</button></div></header>
  <main v-if="!isDetail">
    <section id="home" class="hero"><div class="hero-copy"><small>NAIROBI · KENYA / REMOTE</small><h1>SALIM<br><em>HAMZA</em></h1><div class="role">FULL-STACK WEB DEVELOPER <b>·</b> RED TEAMER / CYBERSECURITY ANALYST</div><p>I design, build and break software. My work spans production web products, APIs, Linux systems, automation, offensive-security research and quantitative trading systems.</p><div class="actions"><a class="btn primary" href="#work">EXPLORE THE WORK ↗</a><a class="btn" href="#" @click.prevent="downloadCv">DOWNLOAD CV ↓</a></div></div><div class="hero-console"><div class="console-top">FIELD LOG / 2026 <span>SYS.01</span></div><div class="planet"></div><p><span>STATUS</span>OPEN_FOR_WORK</p><p><span>CURRENT</span>33 SOLUTIONS</p><p><span>MODE</span>BUILD / BREAK / LEARN</p><p><span>FOCUS</span>WEB + SECURITY + SYSTEMS</p><code>$ ship --something-real_</code></div><div class="hero-foot">SCROLL TO EXPLORE <span>01 / 10</span></div></section>

    <section class="statement"><small>01 — PROFILE</small><div class="split"><div><h2>Software is the medium.<br><em>Problem solving is the job.</em></h2></div><div><p>I graduated from Jomo Kenyatta University of Agriculture and Technology with a BSc in Information Technology.</p><p>I work across the stack rather than stopping at a framework boundary: frontend, backend, databases, Linux deployment, automation, networking and security.</p><div class="stats"><b>FULL-STACK</b><b>RED TEAM</b><b>AUTOMATION</b><b>OPEN SOURCE</b></div></div></div></section>

    <section id="work" class="pad"><div class="section-head"><div><small>02 — LIVE WORK</small><h2>Built in the real world.</h2></div><a href="https://github.com/hummzer" target="_blank">GITHUB ARCHIVE ↗</a></div><div class="featured"><article v-for="p in featured" :key="p.title"><div class="eyebrow">{{p.cat}} <span>{{p.status}}</span></div><div class="visual"><i></i><b>{{p.title.split(' ')[0]}}</b></div><h3>{{p.title}}</h3><p>{{p.desc}}</p><div class="tags"><i v-for="s in p.stack" :key="s">{{s}}</i></div><div class="links"><a v-if="p.live" :href="p.live" target="_blank">LIVE SITE ↗</a><a v-if="p.title==='BotForge'" :href="p.live+'/journal'" target="_blank">TRADING JOURNAL ↗</a><a v-if="p.repo" :href="p.repo" target="_blank">SOURCE / REPO ↗</a></div></article></div></section><section class="archive"><div class="section-head"><div><small>03 — PROJECT ARCHIVE</small><h2>The work archive.</h2></div><span>PERSONAL / PRIVATE / OPEN SOURCE</span></div><a v-for="p in archive" :key="p.title" class="row" :href="p.repo" target="_blank"><small>{{p.cat}}</small><div><h3>{{p.title}}</h3><p>{{p.desc}}</p></div><span>{{p.stack.slice(0,3).join(' · ')}}</span><b>↗</b></a></section>

    <section id="experience" class="pad dark"><small>04 — CURRENTLY</small><div class="split"><div><label>CURRENT ROLE</label><h2>Building at <em>33 Solutions.</em></h2><p>Startup product engineering, application development, implementation, debugging and delivery. The role sits close to real product decisions rather than isolated coding tasks.</p><span class="chip">● CURRENT · 2026</span></div><div class="timeline"><b>33 SOLUTIONS</b><p>Full-stack Web Developer · product engineering · application development</p><b>SECURITY PRACTICE</b><p>Red teaming, Linux, Python security tooling, web security research and offensive-security labs.</p><b>OPEN SOURCE EXPLORER</b><p>Building systems, studying tooling and documenting what can be made public.</p></div></div></section>

    <section id="quant" class="pad"><div class="section-head"><div><small>05 — EA / QUANT SYSTEMS</small><h2>Executable systems + custom strategy builds.</h2></div><span>EXECUTABLES · CUSTOM</span></div>
<div class="quant-tabs"><button :class="{active:quantFilter==='executables'}" @click="quantFilter='executables'">EXECUTABLES <small>08</small></button><button :class="{active:quantFilter==='custom'}" @click="quantFilter='custom'">CUSTOM <small>12</small></button></div>
<div v-if="quantFilter==='executables'" class="quant-scroller"><article v-for="(x,i) in quantExecutables" :key="x.slug" class="quant-card executable-card" @click="openQuant(x.slug)"><div class="quant-card-top"><small>EXECUTABLE · 0{{i+1}}</small><span>{{x.platform}}</span></div><div class="quant-art"><span>XAUUSD / EXECUTABLE</span><b>{{x.title}}</b></div><p class="executable-copy">Compiled trading executable. Delivery includes the executable and an activation key after order verification.</p><div class="tags"><i>XAUUSD</i><i>ACTIVATION KEY</i><i>PRIVATE</i></div><div class="quant-card-action">ORDER EXECUTABLE + KEY ↗</div></article></div>
<div v-else class="custom-archive"><article v-for="x in customQuant" :key="x.id" class="custom-item"><button class="custom-head" @click="toggleCustom(x.id)"><span><small>STRATEGY · {{String(x.id).padStart(2,'0')}}</small><strong>{{x.name}}</strong><em>{{x.description}}</em></span><b>{{customOpen===x.id?'−':'+'}}</b></button><div v-if="customOpen===x.id" class="custom-detail"><div class="custom-spec"><span><b>LOGIC</b>{{x.logic}}</span><span><b>EXIT / USE</b>{{x.exit}}</span><span><b>BUILD</b>Custom specification + implementation</span></div><div class="code"><div>MQL / PARTIAL SOURCE WINDOW</div><pre>{{x.source}}</pre></div><button class="order-text" @click="openCheckout(x.name)">ORDER CUSTOM BUILD ↗</button></div></article></div>
<div class="indicator-strip"><div class="indicator-head"><span>MQL5 INDICATORS</span><b>ARCHIVE TOOLING</b></div><div class="indicator-scroller"><article v-for="(x,i) in quantIndicators" :key="x[0]"><small>IND.0{{i+1}}</small><h3>{{x[0]}}</h3><p>{{x[1]}}</p><span>MQL5 · INDICATOR</span></article></div></div>
<div class="cta-line"><span>EXECUTABLE LICENSING · CUSTOM BUILDS · INDICATORS</span><button class="text-button" @click="openCheckout('EA / Quant Systems')">ORDER / ENQUIRE ↗</button></div></section><section id="systems" class="pad dark"><div class="section-head"><div><small>06 — OPEN SOURCE / SYSTEMS ENGINEERING</small><h2>The home-security build is a systems project.</h2></div><span>HAOS · LINUX · NETWORKING · AUTOMATION</span></div><div class="system-hero"><div><label>RESIDENTIAL SECURITY & AUTOMATION</label><h3>From bare infrastructure to a working security control plane.</h3><p>The documented build combines Home Assistant OS, Proxmox, VLAN segmentation, Frigate, Mosquitto, go2rtc, HACS, Tailscale, Reolink, Dahua and Hikvision. It covers gate control, ANPR, facial recognition, PTZ patrols, actionable notifications and a custom Fusion dashboard.</p></div><div class="metrics"><b>22</b><span>Frigate devices</span><b>30</b><span>HA automations</span><b>13+15+20</b><span>PTZ patrol preset flows</span><b>4</b><span>logical network zones</span></div></div><div class="system-grid"><article v-for="x in systems" :key="x[0]"><small>{{x[2]}}</small><h3>{{x[0]}}</h3><p>{{x[1]}}</p></article></div><div class="installation"><div><small>COMPLETE SECURITY INSTALLATION</small><h3>Custom residential security package</h3><p>End-to-end design, networking, HAOS/Proxmox build, CCTV integration, detection, access automation, remote access, dashboards and commissioning. Pricing is custom to property size, hardware count, network complexity and automation scope.</p></div><div><strong>CUSTOM QUOTE</strong><span>Site survey → architecture → installation → automation → handover</span><a href="mailto:zaeh888@gmail.com?subject=Home%20Security%20Installation%20Enquiry">REQUEST A QUOTE ↗</a></div></div><div class="os"><b>OS FLAVORS USED</b><i v-for="x in osFlavors" :key="x">{{x}}</i></div></section><section class="pad"><div class="section-head"><div><small>08 — YOUTUBE / MEDIA AUTOMATION</small><h2>Automation work beyond web apps.</h2></div><span>PYTHON · FFMPEG · N8N · LOCAL AI</span></div><p class="wide">This archive captures the YouTube automation work accumulated across the account: playlist control, Shorts generation, channel tooling, extraction, orchestration and publishing workflows. The progression runs from small CLI utilities to multi-stage media pipelines.</p><div class="media-list automation-list"><article v-for="(y,i) in youtube" :key="y[0]"><button class="automation-toggle" @click="toggleAutomation(i)"><small>0{{i+1}}</small><div><em>{{y[1]}}</em><h3>{{y[0]}}</h3><p>{{y[2]}}</p></div><b>⌄</b></button><div v-if="automationOpen===i" class="automation-detail"><p>Documentation and source window for this automation item. Repository access is provided on request rather than through a public repository link.</p><div class="code"><div>SOURCE / DOCUMENTATION WINDOW</div><pre>{{youtubeSourcePreview}}</pre></div><button class="access-button" @click="openCheckout('Repository access — '+y[0])">REQUEST REPOSITORY ACCESS ↗</button></div></article></div>
<div class="media-doc">
  <div class="media-doc-head"><div><small>DOCUMENTATION / SOURCE WINDOW</small><h3>YouTube Shorts Generator — core pipeline</h3></div><a href="https://github.com/hummzer/YoutubeShortsGenerator" target="_blank">OPEN REPOSITORY ↗</a></div>
  <p>The documented portion follows the real repository flow from URL ingestion through duration gating, Whisper transcription, segment selection and MP4 rendering. The portfolio intentionally publishes only a source window rather than the complete project.</p>
  <div class="media-architecture"><article v-for="x in youtubeArchitecture" :key="x[0]"><small>{{x[0]}} · {{x[1]}}</small><h4>{{x[2]}}</h4><span>{{x[3]}}</span></article></div>
  <div class="code media-code"><div>PYTHON / src/python_scripts/wales.py / DOCUMENTED SOURCE EXCERPT</div><pre>{{youtubeSourcePreview}}</pre></div>
  <div class="media-doc-foot"><span>DOCUMENTED SURFACE: CORE INGEST → TRANSCRIBE → CLIP GENERATION + APPLICATION ARCHITECTURE</span><a href="https://github.com/hummzer/YoutubeShortsGenerator/blob/main/src/python_scripts/wales.py" target="_blank">VIEW SOURCE ↗</a></div>
</div></section>

    <section id="skills" class="pad"><div class="section-head"><div><small>09 — SKILLSET</small><h2>Frameworks are only one layer.</h2></div></div><div class="skill-grid"><div v-for="g in skills" :key="g[0]"><small>{{g[0]}}</small><h3>{{g[0]}}</h3><p v-for="s in g.slice(1)" :key="s">{{s}}</p></div></div><div class="shell-terminal"><div class="shell-bar"><span>salim@ocus:~/.zshrc</span><b>LOCAL SYSTEM / ZSH</b></div><div class="shell-body"><div class="shell-code"><pre>setopt NO_NOTIFY
export ZSH="$HOME/.oh-my-zsh"
ZSH_THEME="awesomepanda"
DISABLE_AUTO_TITLE="true"
ENABLE_CORRECTION="true"
DISABLE_UNTRACKED_FILES_DIRTY="true"

plugins=(
  git
  zsh-wakatime
  zsh-autosuggestions
  zsh-syntax-highlighting
)
source $ZSH/oh-my-zsh.sh

# Laravel / PHP
alias pas="php artisan serve"
alias pam="php artisan migrate"
alias pamf="php artisan migrate:fresh"
alias pamfs="php artisan migrate:fresh --seed"
alias pafresh="pac && parc && pavc && pao && par"

# npm / Next.js
alias nrd="npm run dev"
alias nrb="npm run build"
alias nrs="npm run start"
alias npmi="npm install"

# Git
alias gits="git status"
alias gita="git add ."
alias gitcom="git commit -m"
alias gitp="git push"
alias gitch="git checkout"
alias gitlg="git log --oneline --graph --all"

export PATH="$HOME/bin:$PATH"
export PATH="$HOME/.npm-global/bin:$PATH"</pre></div><div class="shell-notes"><article><small>01 · SHELL BEHAVIOUR</small><h3>Fast, quiet terminal</h3><p>NO_NOTIFY, command correction and disabled untracked-file checks tune the interactive workflow.</p></article><article><small>02 · PLUGIN STACK</small><h3>Git + completion + tracking</h3><p>Oh My Zsh loads Git, WakaTime, autosuggestions and syntax highlighting.</p></article><article><small>03 · ALIAS SYSTEM</small><h3>Commands become workflows</h3><p>Laravel, npm, Composer and Git operations become short repeatable commands.</p></article><article><small>04 · TELEMETRY</small><h3>Silent WakaTime hooks</h3><p>preexec/precmd/zshexit track terminal, Vim/Neovim and Qwen CLI activity through background heartbeats.</p></article><article><small>05 · ENVIRONMENT</small><h3>Local tooling paths</h3><p>Conda, Go, npm-global, local CLI binaries and Deno are loaded into the environment.</p></article></div></div></div></section>

    <section id="security" class="pad dark"><div class="section-head"><div><small>10 — RED TEAM / CYBERSECURITY</small><h2>Build it.<br><em>Then try to break it.</em></h2></div><span>KALI · PYTHON · LINUX · HTB · CTF</span></div><div class="split"><div><p>Cybersecurity is part of how I engineer. I use Kali Linux and other Linux environments for reconnaissance, scripting, web-security research, lab work and automation.</p><p>I have completed hands-on Hack The Box challenges and participated in a picoCTF competition. My security work includes Python tooling, STRIX, Linux automation and web-security experimentation.</p><div class="sec-links"><a href="https://github.com/hummzer/Python-for-Security" target="_blank">PYTHON SECURITY ↗</a><a href="https://github.com/hummzer/strix" target="_blank">STRIX ↗</a><a href="https://www.hackthebox.com/" target="_blank">HACK THE BOX ↗</a></div></div><div class="terminal"><div>RED_TEAM / FIELD_NOTES <span>LIVE</span></div><p>01 · RECON</p><p>02 · ENUMERATION</p><p>03 · ATTACK SURFACE</p><p>04 · EXPLOIT / VALIDATE</p><p>05 · REPORT / REMEDIATE</p><code>root@salim:~# analyze --target web_</code><div class="htb-profile"><small>HACK THE BOX / PROFILE</small><h3>HTB PROFILE</h3><div class="htb-stats"><span>RANK<b>—</b></span><span>POINTS<b>—</b></span><span>OWNED<b>—</b></span><span>ROOTED<b>—</b></span></div><p>Live statistics will be inserted from the verified HTB profile.</p></div></div></div></section><section id="credentials" class="pad"><div class="section-head"><div><small>11 — CREDENTIALS / SIGNAL</small><h2>Evidence, not just a skill list.</h2></div><span>BADGES · CODE · LABS · EDUCATION</span></div><div class="cred-grid"><a class="cred-main" href="https://www.credly.com/users/salim-hamza.bea036d1" target="_blank"><div class="badge">CR</div><div><small>CREDENTIAL WALLET</small><h3>Credly badge wall</h3><p>Professional certification cards and verified credentials through the public Credly profile.</p></div><b>↗</b></a><a v-for="c in credLinks" :key="c[2]" :href="c[4]" target="_blank"><i>{{c[0]}}</i><div><small>{{c[1]}}</small><h3>{{c[2]}}</h3><p>{{c[3]}}</p></div><b>↗</b></a><div class="static"><i>CTF</i><div><small>COMPETITIONS</small><h3>picoCTF + HTB</h3><p>One picoCTF competition and hands-on Hack The Box challenge work.</p></div></div><div class="static"><i>EDU</i><div><small>EDUCATION</small><h3>BSc Information Technology</h3><p>Jomo Kenyatta University of Agriculture and Technology (JKUAT).</p></div></div><a class="cv" href="#" @click.prevent="downloadCv"><i>↓</i><div><small>EMPLOYER PACKET</small><h3>Download CV</h3><p>Current portfolio profile as a recruiter-ready document.</p></div><b>↓</b></a></div></section><section id="services" class="pad dark"><div class="section-head"><div><small>07 — ORDERABLE SERVICES</small><h2>Built as packages.</h2></div><span>WEB · SECURITY · AUTOMATION · QUANT · INSTALLATION</span></div><div class="package-grid"><div v-for="p in servicePackages" :key="p.title" class="installation package"><div><small>{{p.cat}}</small><h3>{{p.title}}</h3><p>{{p.desc}}</p></div><div><strong>{{p.price}}</strong><span>{{p.steps}}</span><a :href="'mailto:zaeh888@gmail.com?subject='+encodeURIComponent(p.subject)">ORDER PACKAGE ↗</a></div></div></div></section>

    <section id="contact" class="contact"><small>12 — CONTACT</small><h2>Looking for someone who can <em>build</em> and <em>think adversarially?</em></h2><p>Open to software engineering, cybersecurity, security engineering, quantitative tooling, automation and technically serious collaborations.</p><div class="actions"><a class="btn primary" href="mailto:zaeh888@gmail.com">zaeh888@gmail.com ↗</a><a class="btn" href="https://github.com/hummzer" target="_blank">GITHUB ↗</a></div></section>
  </main>
  <main v-else class="detail-page"><section class="detail-shell"><div class="detail-nav"><button class="btn" @click="closeQuant">← EA / QUANT SYSTEMS</button><span>EXECUTABLE CATALOG / PRIVATE</span></div><template v-if="activeQuant"><div class="detail-kicker">EXECUTABLE · {{activeQuant.platform}} · XAUUSD</div><h1>{{activeQuant.title}}</h1><p class="detail-lede">Private executable delivery. The order package contains the compiled EA and its activation key. No source code is exposed on executable listings.</p><div class="detail-grid"><div class="detail-panel"><small>DELIVERY</small><h2>EA + ACTIVATION KEY</h2><p><b>Market</b>XAUUSD</p><p><b>Platform</b>{{activeQuant.platform}}</p><p><b>Source</b>Private / not included</p><p><b>Activation</b>Key issued after order verification</p></div><div class="detail-panel"><small>ORDER</small><h2>READY TO LICENSE</h2><p>Choose payment after confirming the account/broker requirements and executable package.</p><div class="detail-order"><strong>{{activeQuant.title}}</strong><button class="order-text" @click="openCheckout(activeQuant.title)">ORDER EXECUTABLE ↗</button></div></div></div><div class="detail-note">The executable catalogue is intentionally separate from the Custom archive. Custom strategy work exposes documentation and partial source windows; executable products expose delivery and activation details only.</div></template><template v-else><div class="detail-kicker">EXECUTABLE CATALOG</div><h1>Executable not found.</h1><button class="btn primary" @click="closeQuant">BACK TO QUANT ↗</button></template></section></main>
