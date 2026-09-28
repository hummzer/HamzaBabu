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
const quantEas = [
  {slug:'gold-scalper-trading',title:'Gold Scalper Trading',market:'XAUUSD',platform:'MT4 / EX4',mode:'Gold scalping',timeframes:'M1–M15',artifact:'Compiled EA archive',stats:['Gold-focused scalper','MT4 executable','Archived preset/package data'],preview:'// Public archive preview\\n// executable artifact retained privately\\n// strategy implementation intentionally withheld',tags:['XAUUSD','SCALPING','MT4','PRIVATE']},
  {slug:'dark-gold-ea',title:'Dark Gold EA',market:'XAUUSD',platform:'MT4 / SET',mode:'Indicator-driven gold trading',timeframes:'M15',artifact:'EA + XAUUSD presets',stats:['XAUUSD M15 configuration','Spread controls','Dark support/resistance settings'],preview:'input int MaxSpread = 500;\\ninput int DistanceAtrPeriod = 9;\\n// remaining execution logic withheld',tags:['XAUUSD','M15','MT4','PRIVATE']},
  {slug:'ft-gold-robot',title:'FT Gold Robot v5.4',market:'XAUUSD',platform:'MT4 / package',mode:'Gold robot',timeframes:'Intraday',artifact:'Compiled/package archive',stats:['Gold robot archive','Broker/config package','Execution artifact'],preview:'// FT Gold Robot v5.4\\n// source is not stored as readable MQL in the public archive\\n// commercial source access is handled privately',tags:['XAUUSD','ROBOT','MT4','PRIVATE']},
  {slug:'gold-hunter-v9',title:'GOLD HUNTER V9 MT5 EA',market:'XAUUSD',platform:'MT5 / EA',mode:'Gold hunting / scalping',timeframes:'Intraday',artifact:'MT5 EA archive',stats:['MT5 EA package','Gold-focused execution','Private implementation'],preview:'// GOLD HUNTER V9 MT5 EA\\n// architecture preview only\\n// proprietary implementation withheld',tags:['XAUUSD','MT5','EA','PRIVATE']},
  {slug:'goldminer-ai',title:'Goldminer AI MT4',market:'XAUUSD',platform:'MT4 / package',mode:'Gold algorithm',timeframes:'Intraday',artifact:'Compiled/package archive',stats:['Gold algorithm package','MT4 artifact','Configuration bundle'],preview:'// Goldminer AI MT4\\n// compiled artifact in MQL5 archive\\n// source implementation withheld',tags:['XAUUSD','AI','MT4','PRIVATE']},
  {slug:'orion-gold-scalper',title:'ORION GOLD SCALPER V4.0',market:'XAUUSD',platform:'MT4 / package',mode:'Gold scalping',timeframes:'Intraday',artifact:'Scalper archive',stats:['ORION V4.0 archive','Gold scalping package','Private execution logic'],preview:'// ORION GOLD SCALPER V4.0\\n// source-level implementation is private\\n// public card exposes architecture only',tags:['XAUUSD','ORION','SCALPING','PRIVATE']},
  {slug:'super-gold-v2',title:'Super Gold V2.0',market:'XAUUSD',platform:'MT4 / EA',mode:'Gold strategy',timeframes:'Intraday',artifact:'EA archive',stats:['Super Gold V2.0','MT4 EA artifact','Preset/config package'],preview:'// Super Gold V2.0 EA\\n// implementation retained as compiled/private artifact\\n// source available by enquiry',tags:['XAUUSD','SUPERGOLD','MT4','PRIVATE']},
  {slug:'gold-reaper',title:'The Gold Reaper V1.5',market:'XAUUSD',platform:'MT4 / EA',mode:'Gold scalping',timeframes:'Intraday',artifact:'EA archive',stats:['Gold Reaper V1.5','MT4 EA artifact','Gold-focused package'],preview:'// The Gold Reaper V1.5\\n// proprietary execution logic withheld\\n// public technical preview only',tags:['XAUUSD','REAPER','MT4','PRIVATE']}
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

    <section id="work" class="pad"><div class="section-head"><div><small>02 — LIVE WORK</small><h2>Built in the real world.</h2></div><a href="https://github.com/hummzer" target="_blank">GITHUB ARCHIVE ↗</a></div><div class="featured"><article v-for="p in featured" :key="p.title"><div class="eyebrow">{{p.cat}} <span>{{p.status}}</span></div><div class="visual"><i></i><b>{{p.title.split(' ')[0]}}</b></div><h3>{{p.title}}</h3><p>{{p.desc}}</p><div class="tags"><i v-for="s in p.stack" :key="s">{{s}}</i></div><div class="links"><a v-if="p.live" :href="p.live" target="_blank">LIVE SITE ↗</a><a v-if="p.title==='BotForge'" :href="p.live+'/journal'" target="_blank">TRADING JOURNAL ↗</a><a v-if="p.repo" :href="p.repo" target="_blank">SOURCE / REPO ↗</a></div></article></div></section><section class="archive"><div class="section-head"><div><small>03 — PROJECT ARCHIVE</small><h2>The experiments count too.</h2></div><span>PERSONAL / PRIVATE / OPEN SOURCE</span></div><a v-for="p in archive" :key="p.title" class="row" :href="p.repo" target="_blank"><small>{{p.cat}}</small><div><h3>{{p.title}}</h3><p>{{p.desc}}</p></div><span>{{p.stack.slice(0,3).join(' · ')}}</span><b>↗</b></a></section>

    <section id="experience" class="pad dark"><small>04 — CURRENTLY</small><div class="split"><div><label>CURRENT ROLE</label><h2>Building at <em>33 Solutions.</em></h2><p>Startup product engineering, application development, implementation, debugging and delivery. The role sits close to real product decisions rather than isolated coding tasks.</p><span class="chip">● CURRENT · 2026</span></div><div class="timeline"><b>33 SOLUTIONS</b><p>Full-stack Web Developer · product engineering · application development</p><b>SECURITY PRACTICE</b><p>Red teaming, Linux, Python security tooling, web security research and offensive-security labs.</p><b>OPEN SOURCE EXPLORER</b><p>Building systems, studying tooling and documenting what can be made public.</p></div></div></section>

    <section id="quant" class="pad"><div class="section-head"><div><small>05 — EA / QUANT SYSTEMS</small><h2>EA systems I build for the market.</h2></div><span>PRIVATE SOURCE · COMMERCIAL ACCESS</span></div><div class="quant-intro"><p>Private MetaTrader and TradingView systems around XAUUSD research, mechanical structure and execution logic. Production source is intentionally withheld.</p><div><b>PRIVATE BY DESIGN</b><span>Partial implementation previews only.</span><span>Source available by private commercial enquiry.</span></div></div><div class="quant-scroller">
  <article v-for="(b,i) in quantEas" :key="b.slug" class="quant-card" @click="openQuant(b.slug)">
    <div class="quant-card-top"><small>0{{i+1}} · {{b.platform}}</small><span>{{b.market}}</span></div>
    <div class="quant-art"><span>EA / {{String(i+1).padStart(2,'0')}}</span><b>{{b.title}}</b></div>
    <small class="quant-mode">{{b.mode}} · {{b.timeframes}}</small>
    <div class="code"><div>PARTIAL SOURCE / PUBLIC PREVIEW</div><pre>{{b.preview}}</pre></div>
    <div class="tags"><i v-for="x in b.tags" :key="x">{{x}}</i></div>
    <div class="quant-card-action">OPEN SYSTEM PAGE ↗</div>
  </article>
</div>
<div class="indicator-strip">
  <div class="indicator-head"><span>MQL5 INDICATORS</span><b>ARCHIVE TOOLING</b></div>
  <div class="indicator-scroller">
    <article v-for="(x,i) in quantIndicators" :key="x[0]"><small>IND.0{{i+1}}</small><h3>{{x[0]}}</h3><p>{{x[1]}}</p><span>{{x[2]}}</span></article>
  </div>
</div>
<div class="cta-line"><span>EA LICENSING · INDICATORS · CUSTOM DEVELOPMENT · BACKTESTING</span><a href="mailto:zaeh888@gmail.com?subject=EA%20%2F%20Quant%20Systems%20Enquiry">ORDER / REQUEST ACCESS ↗</a></div></section><section id="systems" class="pad dark"><div class="section-head"><div><small>06 — OPEN SOURCE / SYSTEMS ENGINEERING</small><h2>The home-security build is a systems project.</h2></div><span>HAOS · LINUX · NETWORKING · AUTOMATION</span></div><div class="system-hero"><div><label>RESIDENTIAL SECURITY & AUTOMATION</label><h3>From bare infrastructure to a working security control plane.</h3><p>The documented build combines Home Assistant OS, Proxmox, VLAN segmentation, Frigate, Mosquitto, go2rtc, HACS, Tailscale, Reolink, Dahua and Hikvision. It covers gate control, ANPR, facial recognition, PTZ patrols, actionable notifications and a custom Fusion dashboard.</p></div><div class="metrics"><b>22</b><span>Frigate devices</span><b>30</b><span>HA automations</span><b>13+15+20</b><span>PTZ patrol preset flows</span><b>4</b><span>logical network zones</span></div></div><div class="system-grid"><article v-for="x in systems" :key="x[0]"><small>{{x[2]}}</small><h3>{{x[0]}}</h3><p>{{x[1]}}</p></article></div><div class="installation"><div><small>COMPLETE SECURITY INSTALLATION</small><h3>Custom residential security package</h3><p>End-to-end design, networking, HAOS/Proxmox build, CCTV integration, detection, access automation, remote access, dashboards and commissioning. Pricing is custom to property size, hardware count, network complexity and automation scope.</p></div><div><strong>CUSTOM QUOTE</strong><span>Site survey → architecture → installation → automation → handover</span><a href="mailto:zaeh888@gmail.com?subject=Home%20Security%20Installation%20Enquiry">REQUEST A QUOTE ↗</a></div></div><div class="os"><b>OS FLAVORS USED</b><i v-for="x in osFlavors" :key="x">{{x}}</i></div></section><section class="pad"><div class="section-head"><div><small>08 — YOUTUBE / MEDIA AUTOMATION</small><h2>Automation work beyond web apps.</h2></div><span>PYTHON · FFMPEG · N8N · LOCAL AI</span></div><p class="wide">This archive captures the YouTube automation work accumulated across the account: playlist control, Shorts generation, channel tooling, extraction, orchestration and publishing workflows. The progression runs from small CLI utilities to multi-stage media pipelines.</p><div class="media-list"><article v-for="(y,i) in youtube" :key="y[0]"><small>0{{i+1}}</small><div><em>{{y[1]}}</em><h3>{{y[0]}}</h3><p>{{y[2]}}</p></div><b>↗</b></article></div>
<div class="media-doc">
  <div class="media-doc-head"><div><small>DOCUMENTATION / SOURCE WINDOW</small><h3>YouTube Shorts Generator — core pipeline</h3></div><a href="https://github.com/hummzer/YoutubeShortsGenerator" target="_blank">OPEN REPOSITORY ↗</a></div>
  <p>The documented portion follows the real repository flow from URL ingestion through duration gating, Whisper transcription, segment selection and MP4 rendering. The portfolio intentionally publishes only a source window rather than the complete project.</p>
  <div class="media-architecture"><article v-for="x in youtubeArchitecture" :key="x[0]"><small>{{x[0]}} · {{x[1]}}</small><h4>{{x[2]}}</h4><span>{{x[3]}}</span></article></div>
  <div class="code media-code"><div>PYTHON / src/python_scripts/wales.py / DOCUMENTED SOURCE EXCERPT</div><pre>{{youtubeSourcePreview}}</pre></div>
  <div class="media-doc-foot"><span>DOCUMENTED SURFACE: CORE INGEST → TRANSCRIBE → CLIP GENERATION + APPLICATION ARCHITECTURE</span><a href="https://github.com/hummzer/YoutubeShortsGenerator/blob/main/src/python_scripts/wales.py" target="_blank">VIEW SOURCE ↗</a></div>
</div></section>

    <section id="skills" class="pad"><div class="section-head"><div><small>09 — SKILLSET</small><h2>Frameworks are only one layer.</h2></div></div><div class="skill-grid"><div v-for="g in skills" :key="g[0]"><small>{{g[0]}}</small><h3>{{g[0]}}</h3><p v-for="s in g.slice(1)" :key="s">{{s}}</p></div></div><div class="shell-note"><span>SHELL / LOCAL SYSTEMS</span><p>Bash scripts · zsh · .bashrc · Oh My Zsh configuration · Python CLI tooling · Linux administration · Git workflows · local AI tooling.</p></div></section>

    <section id="security" class="pad dark"><div class="section-head"><div><small>10 — RED TEAM / CYBERSECURITY</small><h2>Build it.<br><em>Then try to break it.</em></h2></div><span>KALI · PYTHON · LINUX · HTB · CTF</span></div><div class="split"><div><p>Cybersecurity is part of how I engineer. I use Kali Linux and other Linux environments for reconnaissance, scripting, web-security research, lab work and automation.</p><p>I have completed hands-on Hack The Box challenges and participated in a picoCTF competition. My security work includes Python tooling, STRIX, Linux automation and web-security experimentation.</p><div class="sec-links"><a href="https://github.com/hummzer/Python-for-Security" target="_blank">PYTHON SECURITY ↗</a><a href="https://github.com/hummzer/strix" target="_blank">STRIX ↗</a><a href="https://www.hackthebox.com/" target="_blank">HACK THE BOX ↗</a></div></div><div class="terminal"><div>RED_TEAM / FIELD_NOTES <span>LIVE</span></div><p>01 · RECON</p><p>02 · ENUMERATION</p><p>03 · ATTACK SURFACE</p><p>04 · EXPLOIT / VALIDATE</p><p>05 · REPORT / REMEDIATE</p><code>root@salim:~# analyze --target web_</code></div></div></section><section id="credentials" class="pad"><div class="section-head"><div><small>11 — CREDENTIALS / SIGNAL</small><h2>Evidence, not just a skill list.</h2></div><span>BADGES · CODE · LABS · EDUCATION</span></div><div class="cred-grid"><a class="cred-main" href="https://www.credly.com/users/salim-hamza.bea036d1" target="_blank"><div class="badge">CR</div><div><small>CREDENTIAL WALLET</small><h3>Credly badge wall</h3><p>Professional certification cards and verified credentials through the public Credly profile.</p></div><b>↗</b></a><a v-for="c in credLinks" :key="c[2]" :href="c[4]" target="_blank"><i>{{c[0]}}</i><div><small>{{c[1]}}</small><h3>{{c[2]}}</h3><p>{{c[3]}}</p></div><b>↗</b></a><div class="static"><i>CTF</i><div><small>COMPETITIONS</small><h3>picoCTF + HTB</h3><p>One picoCTF competition and hands-on Hack The Box challenge work.</p></div></div><div class="static"><i>EDU</i><div><small>EDUCATION</small><h3>BSc Information Technology</h3><p>Jomo Kenyatta University of Agriculture and Technology (JKUAT).</p></div></div><a class="cv" href="#" @click.prevent="downloadCv"><i>↓</i><div><small>EMPLOYER PACKET</small><h3>Download CV</h3><p>Current portfolio profile as a recruiter-ready document.</p></div><b>↓</b></a></div></section><section id="services" class="pad dark"><div class="section-head"><div><small>07 — ORDERABLE SERVICES</small><h2>Built as packages.</h2></div><span>WEB · SECURITY · AUTOMATION · QUANT · INSTALLATION</span></div><div class="package-grid"><div v-for="p in servicePackages" :key="p.title" class="installation package"><div><small>{{p.cat}}</small><h3>{{p.title}}</h3><p>{{p.desc}}</p></div><div><strong>{{p.price}}</strong><span>{{p.steps}}</span><a :href="'mailto:zaeh888@gmail.com?subject='+encodeURIComponent(p.subject)">ORDER PACKAGE ↗</a></div></div></div></section>

    <section id="contact" class="contact"><small>12 — CONTACT</small><h2>Looking for someone who can <em>build</em> and <em>think adversarially?</em></h2><p>Open to software engineering, cybersecurity, security engineering, quantitative tooling, automation and technically serious collaborations.</p><div class="actions"><a class="btn primary" href="mailto:zaeh888@gmail.com">zaeh888@gmail.com ↗</a><a class="btn" href="https://github.com/hummzer" target="_blank">GITHUB ↗</a></div></section>
  </main>
  <main v-else class="detail-page">
    <section class="detail-shell">
      <div class="detail-nav"><button class="btn" @click="closeQuant">← QUANT SYSTEMS</button><span>PRIVATE EA CATALOG / MQL5</span></div>
      <template v-if="activeQuant">
        <div class="detail-kicker">EA  ·  {{activeQuant.platform}}  ·  {{activeQuant.market}}</div>
        <h1>{{activeQuant.title}}</h1>
        <p class="detail-lede">Technical profile for a private trading-system artifact. This page exposes architecture, configuration context and a deliberately incomplete source preview; proprietary execution code is not published here.</p>
        <div class="detail-grid">
          <div class="detail-panel">
            <small>SYSTEM PROFILE</small>
            <h2>{{activeQuant.mode}}</h2>
            <p><b>Market</b>{{activeQuant.market}}</p>
            <p><b>Platform</b>{{activeQuant.platform}}</p>
            <p><b>Timeframes</b>{{activeQuant.timeframes}}</p>
            <p><b>Artifact</b>{{activeQuant.artifact}}</p>
          </div>
          <div class="detail-panel">
            <small>VERIFIED ARCHIVE SIGNALS</small>
            <ul><li v-for="x in activeQuant.stats" :key="x">{{x}}</li></ul>
            <div class="detail-order"><strong>ORDER THIS SYSTEM</strong><a :href="'mailto:zaeh888@gmail.com?subject='+encodeURIComponent(activeQuant.title+' Enquiry')">REQUEST LICENCE / BUILD ↗</a></div>
          </div>
        </div>
        <div class="detail-code">
          <div><span>PUBLIC SOURCE WINDOW</span><b>PARTIAL ONLY</b></div>
          <pre>{{activeQuant.preview}}</pre>
        </div>
        <div class="detail-note">The MQL5 archive currently exposes compiled/package artifacts for this system rather than a readable source implementation. Uploading the private source will let this page show a real 40–60% excerpt instead of an architecture placeholder.</div>
      </template>
      <template v-else>
        <div class="detail-kicker">QUANT CATALOG</div>
        <h1>EA not found.</h1>
        <p class="detail-lede">Return to the quant systems index and choose an available EA.</p>
        <button class="btn primary" @click="closeQuant">BACK TO QUANT ↗</button>
      </template>
    </section>
  </main>
  <footer><span>© {{new Date().getFullYear()}} SALIM HAMZA</span><span>VUE · VITE · TYPESCRIPT</span><span>NAIROBI / REMOTE</span></footer>
</div>
</template>
<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@400;500&family=Manrope:wght@400;600;700;800&display=swap');
*{box-sizing:border-box}html{scroll-behavior:smooth}body{margin:0;background:#080908;color:#e7e0d0;font-family:Manrope,system-ui,sans-serif}.site{--sand:#cdbb8e;--line:#2b2e29;--muted:#85887f;min-height:100vh;background:radial-gradient(circle at 80% 8%,#343127,#10110f 30%,#080908 68%);overflow:hidden}.progress{position:fixed;z-index:99;top:0;left:0;height:2px;background:var(--sand)}a{color:inherit;text-decoration:none}header{position:fixed;z-index:50;top:0;left:0;right:0;height:70px;padding:0 5vw;display:flex;align-items:center;justify-content:space-between;background:#080908d9;border-bottom:1px solid #ffffff0b;backdrop-filter:blur(18px)}.logo{font:500 13px 'DM Mono';letter-spacing:.08em}.logo span{color:var(--sand)}nav{display:flex;gap:25px}nav a,.status{font:500 8px 'DM Mono';letter-spacing:.1em;color:#777970}nav a:hover,.status:hover{color:#eee8dc}.status{color:#b7cb7b}.hamb{display:none;background:#151713;border:1px solid #353830;color:#ddd8cb;border-radius:10px;padding:8px}.hero{min-height:100vh;padding:145px 7vw 70px;display:grid;grid-template-columns:1.1fr .9fr;gap:7vw;align-items:center;position:relative;border-bottom:1px solid var(--line)}.hero:before{content:'';position:absolute;width:40vw;height:40vw;right:7vw;top:12vh;border-radius:50%;background:radial-gradient(circle,#b8a273,#625b4c 28%,transparent 68%);opacity:.45}.hero-copy{position:relative;z-index:2}.hero small,.section-head small,label,.eyebrow,.console-top,.hero-foot,.stats,.tags,.links,.chip,.q-head,.cta-line,.os,.media-list em,.shell-note span{font:500 8px 'DM Mono';letter-spacing:.1em}.hero h1{font:800 clamp(78px,12vw,170px)/.78 Manrope;letter-spacing:-.09em;margin:18px 0}.hero h1 em,.split h2 em,.contact h2 em{font-style:normal;color:var(--sand)}.role{font:600 10px 'DM Mono';letter-spacing:.06em}.role b{color:var(--sand)}.hero p{max-width:680px;color:#92958b;line-height:1.85;font-size:15px}.actions{display:flex;gap:10px;margin-top:26px}.btn{display:inline-flex;align-items:center;padding:13px 16px;border:1px solid #3a3d35;border-radius:11px;background:#131511;font:600 9px 'DM Mono'}.btn.primary{background:var(--sand);color:#181710;border-color:var(--sand)}.hero-console{position:relative;z-index:2;background:#0d0f0dcc;border:1px solid #383b34;padding:26px;box-shadow:0 35px 100px #0008}.console-top{color:#656960;border-bottom:1px solid var(--line);padding-bottom:12px}.console-top span{float:right}.hero-console p{display:flex;justify-content:space-between;border-bottom:1px solid #252821;padding:12px 0;margin:0;font:500 9px 'DM Mono'}.hero-console p span{color:#61655c}.hero-console p:nth-of-type(2){color:#c4d28f}.hero-console code{display:block;margin-top:28px;color:#aeb89a;font:500 10px 'DM Mono'}.planet{position:absolute;right:-70px;top:-70px;width:190px;height:190px;border:1px solid #cdbb8e44;border-radius:50%}.hero-foot{position:absolute;bottom:22px;left:7vw;right:7vw;display:flex;justify-content:space-between;color:#555951}.statement,.pad,.archive{padding:120px 7vw;border-bottom:1px solid var(--line)}.statement{padding-left:12vw;padding-right:12vw}.split{display:grid;grid-template-columns:1.15fr .85fr;gap:8vw;margin-top:45px}.split h2,.section-head h2{font:700 clamp(42px,5vw,76px)/1 Manrope;letter-spacing:-.07em;margin:0}.split p,.wide,.installation p,.system-hero p,.media-list p,.static p{color:#898c82;line-height:1.85;font-size:13px}.stats{display:grid;grid-template-columns:1fr 1fr;margin-top:30px}.stats b{padding:13px 0;border-top:1px solid var(--line);color:#767970}.section-head{display:flex;justify-content:space-between;align-items:end;margin-bottom:45px}.section-head h2{margin-top:10px}.section-head>a,.section-head>span{font:500 8px 'DM Mono';color:#74786e}.featured{display:grid;grid-template-columns:repeat(3,1fr);gap:13px}.featured article{background:#10120f;border:1px solid #2a2d27;padding:17px;transition:.3s}.featured article:hover{transform:translateY(-6px);border-color:#56584f}.eyebrow{color:#6e7269}.eyebrow span{float:right;color:var(--sand)}.visual{height:220px;margin-top:15px;background:radial-gradient(circle at 60% 45%,#8b8062,#32352d 38%,#0d0f0d 72%);position:relative;overflow:hidden}.visual:before{content:'';position:absolute;inset:0;background:linear-gradient(#fff1 1px,transparent 1px),linear-gradient(90deg,#fff1 1px,transparent 1px);background-size:35px 35px;transform:perspective(260px) rotateX(55deg) scale(1.5);transform-origin:center bottom}.visual i{position:absolute;width:150px;height:150px;border:1px solid #d4c28d66;border-radius:50%;left:50%;top:50%;transform:translate(-50%,-50%)}.visual b{position:absolute;left:15px;bottom:15px;font:800 34px Manrope;color:#e5ddceaa}.featured h3{font:700 25px Manrope;margin:20px 0 8px}.featured article>p{font-size:11px;color:#83867d;line-height:1.7}.tags{display:flex;flex-wrap:wrap;gap:5px;margin-top:15px}.tags i,.os i{font-style:normal;border:1px solid #30332d;padding:6px 8px;color:#74786e}.links{display:flex;gap:18px;margin-top:20px}.links a,.sec-links a,.cta-line a,.installation a{color:#cdbb8e}.archive{background:#0b0d0b}.archive .section-head{margin-bottom:30px}.row{display:grid;grid-template-columns:1.1fr 2fr .9fr 20px;gap:20px;align-items:center;border-top:1px solid var(--line);padding:19px 0}.row:last-child{border-bottom:1px solid var(--line)}.row>small{color:#62665d}.row h3{font:600 18px Manrope;margin:0 0 5px}.row p{margin:0;color:#777b72;font-size:11px;line-height:1.5}.row>span{font:500 8px 'DM Mono';color:#767a70}.row>b{color:var(--sand)}.dark{background:linear-gradient(#10120f,#090a09)}label{color:#6f736a}.chip{display:inline-block;border:1px solid #393c34;padding:9px 12px;color:#a3a69c}.timeline{border-top:1px solid var(--line)}.timeline b{display:block;margin:20px 0 6px;font:600 17px Manrope}.timeline p{margin:0}.quant-intro,.system-hero,.installation{display:grid;grid-template-columns:1.5fr .5fr;gap:7vw;border-top:1px solid var(--line);border-bottom:1px solid var(--line);padding:28px 0}.quant-intro>div:last-child,.installation>div:last-child{display:flex;flex-direction:column;gap:10px}.quant-intro b{color:var(--sand);font:600 10px 'DM Mono'}.quant-intro span,.installation span{font:500 8px 'DM Mono';color:#6d7168}.quant-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:25px}.quant-grid article{background:#0c0e0c;border:1px solid #2a2d27;padding:24px}.q-head{color:#6c7067}.quant-grid h3{font:600 25px Manrope;margin:15px 0 8px}.quant-grid p{color:#81857b;font-size:11px;line-height:1.7}.code{border:1px solid #30332d;background:#080908;margin-top:18px}.code div{padding:9px;border-bottom:1px solid #292c27;color:#64685f;font:500 8px 'DM Mono'}.code pre{padding:14px;margin:0;overflow:auto;color:#bdc78f;font:500 10px/1.7 'DM Mono';white-space:pre-wrap}.cta-line{display:flex;justify-content:space-between;border-top:1px solid var(--line);padding-top:18px;margin-top:18px;color:#666a61}.system-hero h3{font:600 33px Manrope;margin:13px 0}.metrics{display:grid;grid-template-columns:auto 1fr;gap:5px 12px}.metrics b{font:700 25px Manrope;color:var(--sand)}.metrics span{font:500 8px 'DM Mono';color:#70746b;align-self:center}.system-grid{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--line);margin-top:25px}.system-grid article{padding:18px;border-right:1px solid var(--line);min-height:205px}.system-grid article:nth-child(5n){border-right:0}.package-grid{display:grid;gap:14px}.package{margin-top:0}.package h3{margin-top:12px}.package strong{display:block}.package-grid .package:nth-child(2){transition-delay:.08s}.package-grid .package:nth-child(3){transition-delay:.16s}.package-grid .package:nth-child(4){transition-delay:.24s}.package-grid .package:nth-child(5){transition-delay:.32s}.system-grid h3{font:600 17px Manrope;margin:25px 0 8px}.system-grid p{color:#7e8278;font-size:10px;line-height:1.6}.installation{margin-top:25px;padding:25px;background:#11130f}.installation h3{font:600 26px Manrope;margin:12px 0}.installation strong{font:700 28px Manrope;color:var(--sand)}.installation a{font:500 9px 'DM Mono';margin-top:8px}.os{display:flex;flex-wrap:wrap;gap:6px;align-items:center;margin-top:22px}.os b{margin-right:10px;color:#666a61}.os i{font-style:normal}.media-list{border-top:1px solid var(--line);margin-top:25px}.media-list article{display:grid;grid-template-columns:40px 1fr 20px;gap:20px;padding:18px 0;border-bottom:1px solid var(--line)}.media-list article>small{color:#5e6259}.media-list em{color:#676b62;font-style:normal}.media-list h3{font:600 18px Manrope;margin:6px 0}.media-list b{color:var(--sand)}.skill-grid{display:grid;grid-template-columns:repeat(5,1fr);border:1px solid var(--line)}.skill-grid>div{padding:20px;border-right:1px solid var(--line);min-height:290px}.skill-grid>div:last-child{border-right:0}.skill-grid h3{font:600 18px Manrope;margin:25px 0}.skill-grid p{color:#85887f;font-size:11px;border-top:1px solid #22251f;padding:8px 0;margin:0}.shell-note{margin-top:25px;padding:20px;border:1px solid var(--line);background:#0d0f0d}.shell-note p{margin:10px 0 0;color:#8b8e84;font-size:12px;line-height:1.7}.sec-links{display:flex;gap:25px;margin-top:30px;padding-top:18px;border-top:1px solid var(--line);font:500 9px 'DM Mono'}.terminal{border:1px solid #34372f;background:#0c0e0c;padding:20px}.terminal>div{font:500 8px 'DM Mono';color:#666a61;border-bottom:1px solid var(--line);padding-bottom:10px}.terminal>div span{float:right;color:#b9ca87}.terminal p{border-bottom:1px solid #252821;padding:10px;margin:0;font:500 9px 'DM Mono';color:#80847a}.terminal code{display:block;margin-top:20px;color:#bdc792;font:500 9px 'DM Mono'}.cred-grid{display:grid;grid-template-columns:1fr 1fr;border:1px solid #30332d;gap:1px;background:#30332d}.cred-grid>a,.static{min-height:135px;padding:20px;background:#11130f;display:grid;grid-template-columns:42px 1fr 20px;gap:15px;align-items:center}.cred-grid>a:hover{background:#171a15}.cred-grid i,.badge{width:42px;height:42px;border:1px solid #3a3d35;border-radius:12px;display:grid;place-items:center;color:var(--sand);font:600 10px 'DM Mono';font-style:normal}.badge{border-radius:50%;box-shadow:0 0 0 8px #cdbb8e12}.cred-grid h3,.static h3{font:600 19px Manrope;margin:5px 0}.cred-grid p,.static p{margin:0;font-size:10px;color:#777b72}.cred-grid small,.static small{font:500 8px 'DM Mono';color:#696d64}.cred-main{grid-column:span 2}.cv{background:var(--sand)!important;color:#181710}.cv p,.cv small{color:#595546!important}.contact{min-height:70vh;padding:130px 12vw;display:grid;place-items:center;text-align:center;background:radial-gradient(circle at 50% 100%,#7d704f,#15170f 55%,#0a0b09)}.contact h2{font:700 clamp(45px,7vw,92px)/.95 Manrope;letter-spacing:-.07em;max-width:1000px}.contact p{max-width:600px;color:#85897e;line-height:1.8}.contact .actions{justify-content:center}footer{display:flex;justify-content:space-between;padding:22px 7vw;border-top:1px solid var(--line);color:#5d6158;font:500 8px 'DM Mono'}
@media(max-width:1050px){.hero,.split{grid-template-columns:1fr}.featured{grid-template-columns:1fr 1fr}.system-grid{grid-template-columns:1fr 1fr}.skill-grid{grid-template-columns:1fr 1fr}.skill-grid>div:nth-child(2n){border-right:0}}
@media(max-width:720px){header{padding:0 18px}.status{display:none}.hamb{display:block}nav{display:none;position:absolute;top:70px;left:0;right:0;padding:12px 18px;background:#0b0c0bf7;flex-direction:column}nav.open{display:flex}nav a{padding:12px 0}.hero{padding:115px 18px 70px}.hero h1{font-size:20vw}.statement,.pad,.archive{padding:85px 18px}.featured,.quant-grid,.system-grid,.skill-grid,.cred-grid{grid-template-columns:1fr}.cred-main{grid-column:auto}.quant-intro,.system-hero,.installation{grid-template-columns:1fr}.row{grid-template-columns:1fr 20px}.row>span,.row>small{display:none}.media-list article{grid-template-columns:25px 1fr 15px}.contact{padding:100px 18px}.contact .actions{flex-direction:column}.contact .btn{justify-content:center}footer{padding:20px 18px;flex-direction:column;gap:8px;align-items:flex-start}}
main > section, .featured article, .archive .row, .quant-grid article, .system-grid article, .media-list article, .skill-grid > div, .cred-grid > *{will-change:transform,opacity}
.reveal{opacity:0;transform:translateY(34px);transition:opacity .8s ease,transform .8s cubic-bezier(.2,.65,.2,1)}
.reveal.is-visible{opacity:1;transform:none}
.featured article:nth-child(2),.quant-grid article:nth-child(2),.system-grid article:nth-child(2n),.skill-grid > div:nth-child(2n){transition-delay:.08s}
.featured article:nth-child(3),.quant-grid article:nth-child(3),.system-grid article:nth-child(3n),.skill-grid > div:nth-child(3n){transition-delay:.16s}
@media(prefers-reduced-motion:reduce){
  *,html{scroll-behavior:auto!important;transition:none!important;animation:none!important}
  .reveal{opacity:1!important;transform:none!important}
}

.quant-scroller,.indicator-scroller{display:flex;gap:14px;overflow-x:auto;scroll-snap-type:x mandatory;overscroll-behavior-x:contain;padding:4px 0 18px;scrollbar-width:thin}
.quant-scroller::-webkit-scrollbar,.indicator-scroller::-webkit-scrollbar{height:5px}.quant-scroller::-webkit-scrollbar-thumb,.indicator-scroller::-webkit-scrollbar-thumb{background:#4b4d45}
.quant-card{flex:0 0 min(390px,82vw);scroll-snap-align:start;background:#0c0e0c;border:1px solid #2a2d27;padding:18px;cursor:pointer;transition:transform .25s,border-color .25s,background .25s}.quant-card:hover{transform:translateY(-5px);border-color:#6b664f;background:#10120f}
.quant-card-top{display:flex;justify-content:space-between;color:#666a61;font:500 8px 'DM Mono';letter-spacing:.08em}.quant-card-top span{color:var(--sand)}
.quant-art{height:150px;margin:14px 0;background:radial-gradient(circle at 50% 50%,#887b5b,#292c26 42%,#090a09 75%);position:relative;overflow:hidden;display:flex;flex-direction:column;justify-content:end;padding:15px}.quant-art:before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,transparent 49%,#cdbb8e22 50%,transparent 51%);background-size:24px 24px}.quant-art span{position:relative;font:500 8px 'DM Mono';color:#767a70}.quant-art b{position:relative;font:800 26px Manrope;letter-spacing:-.05em;max-width:90%}.quant-mode{color:#8d9087;font:500 8px 'DM Mono';letter-spacing:.06em}
.quant-card .code{height:150px}.quant-card .code pre{max-height:110px}.quant-card-action{margin-top:15px;color:var(--sand);font:600 8px 'DM Mono';letter-spacing:.08em}
.indicator-strip{margin-top:28px;border-top:1px solid var(--line);padding-top:20px}.indicator-head{display:flex;justify-content:space-between;margin-bottom:12px;font:500 8px 'DM Mono';color:#70746b}.indicator-head b{color:var(--sand)}
.indicator-scroller{padding-bottom:8px}.indicator-scroller article{flex:0 0 230px;scroll-snap-align:start;border:1px solid #2a2d27;background:#0d0f0d;padding:18px}.indicator-scroller small,.indicator-scroller span{font:500 8px 'DM Mono';color:#666a61}.indicator-scroller h3{font:600 17px Manrope;margin:22px 0 7px}.indicator-scroller p{font-size:10px;color:#7d8178;line-height:1.6;min-height:32px}
.detail-page{min-height:100vh;background:radial-gradient(circle at 75% 10%,#383326,#10110f 30%,#080908 70%);padding:120px 7vw 80px}.detail-shell{max-width:1200px;margin:auto}.detail-nav{display:flex;justify-content:space-between;align-items:center;border-bottom:1px solid var(--line);padding-bottom:20px;margin-bottom:70px}.detail-nav span,.detail-kicker,.detail-panel small,.detail-code div{font:500 8px 'DM Mono';letter-spacing:.1em;color:#70746b}.detail-shell h1{font:800 clamp(56px,9vw,120px)/.9 Manrope;letter-spacing:-.08em;max-width:1000px;margin:18px 0 25px}.detail-lede{max-width:760px;color:#8b8f85;line-height:1.9;font-size:14px}.detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;margin-top:55px}.detail-panel{border:1px solid #2d302a;background:#0c0e0c;padding:26px}.detail-panel h2{font:600 27px Manrope;margin:22px 0}.detail-panel p{border-top:1px solid #242720;padding:11px 0;margin:0;color:#85897f;font-size:11px}.detail-panel p b{display:inline-block;width:100px;color:#cdbb8e;font:500 8px 'DM Mono'}.detail-panel ul{list-style:none;padding:0;margin:22px 0}.detail-panel li{padding:10px 0;border-top:1px solid #242720;color:#85897f;font-size:11px}.detail-order{border-top:1px solid #242720;padding-top:18px;display:flex;justify-content:space-between;gap:15px;align-items:center}.detail-order strong{font:600 10px 'DM Mono';color:var(--sand)}.detail-order a{font:600 8px 'DM Mono';color:var(--sand)}.detail-code{margin-top:14px;border:1px solid #30332d;background:#080908}.detail-code div{display:flex;justify-content:space-between;padding:12px;border-bottom:1px solid #292c27}.detail-code div b{color:#b9c98a}.detail-code pre{margin:0;padding:22px;overflow:auto;color:#bdc792;font:500 11px/1.8 'DM Mono';white-space:pre-wrap}.detail-note{margin-top:14px;border-left:2px solid var(--sand);padding:14px 18px;background:#11130f;color:#777b72;font-size:11px;line-height:1.7}
@media(max-width:720px){.detail-page{padding:95px 18px 60px}.detail-nav{align-items:flex-start;gap:15px;flex-direction:column}.detail-shell h1{font-size:18vw}.detail-grid{grid-template-columns:1fr}.detail-order{align-items:flex-start;flex-direction:column}}


.media-doc{margin-top:30px;border:1px solid #30332d;background:#0c0e0c;padding:24px}.media-doc-head{display:flex;justify-content:space-between;align-items:end;gap:20px;border-bottom:1px solid var(--line);padding-bottom:18px}.media-doc-head h3{font:600 28px Manrope;margin:10px 0 0}.media-doc-head a,.media-doc-foot a{font:600 8px 'DM Mono';color:var(--sand)}.media-doc>p{max-width:850px;color:#85897f;font-size:11px;line-height:1.8}.media-architecture{display:grid;grid-template-columns:repeat(3,1fr);border:1px solid var(--line);margin-top:22px}.media-architecture article{padding:16px;border-right:1px solid var(--line);border-bottom:1px solid var(--line);min-height:125px}.media-architecture article:nth-child(3n){border-right:0}.media-architecture small,.media-architecture span{font:500 8px 'DM Mono';color:#686c63}.media-architecture h4{font:600 15px Manrope;margin:18px 0 7px}.media-code{margin-top:22px}.media-code pre{max-height:620px}.media-doc-foot{display:flex;justify-content:space-between;gap:15px;border-top:1px solid var(--line);padding-top:15px;margin-top:15px;font:500 8px 'DM Mono';color:#686c63}.media-doc-foot a{white-space:nowrap}
@media(max-width:720px){.media-doc{padding:16px}.media-doc-head{align-items:flex-start;flex-direction:column}.media-architecture{grid-template-columns:1fr}.media-architecture article{border-right:0}.media-doc-foot{flex-direction:column}}

</style>
