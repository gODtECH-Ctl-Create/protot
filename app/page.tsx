'use client';

import { useMemo, useState } from 'react';
import {
  Activity, BarChart3, Bell, BookOpen, Bot, Building2, CheckCircle2, ChevronRight,
  FileText, Gauge, Globe2, LayoutDashboard, Megaphone, Menu, Newspaper, Search,
  Send, Settings, ShieldCheck, Sparkles, Target, TrendingUp, Users, WandSparkles,
  X, Zap
} from 'lucide-react';

type View = 'overview' | 'workspace' | 'guidelines' | 'media' | 'campaigns' | 'monitoring' | 'reputation' | 'reports' | 'team' | 'settings';

const nav: Array<{ id: View; label: string; icon: any }> = [
  { id: 'overview', label: 'Overview', icon: LayoutDashboard },
  { id: 'workspace', label: 'AI Workspace', icon: Sparkles },
  { id: 'guidelines', label: 'Communication Guidelines', icon: BookOpen },
  { id: 'media', label: 'Media Database', icon: Newspaper },
  { id: 'campaigns', label: 'Campaigns', icon: Megaphone },
  { id: 'monitoring', label: 'Media Monitoring', icon: Activity },
  { id: 'reputation', label: 'Reputation', icon: Gauge },
  { id: 'reports', label: 'Reports', icon: BarChart3 },
  { id: 'team', label: 'Team', icon: Users },
  { id: 'settings', label: 'Settings', icon: Settings },
];

const media = [
  { name: 'Amaka Eze', outlet: 'TechCabal', beat: 'Technology, Startups', region: 'West Africa', reach: '2.4M' },
  { name: 'Tobi Akinola', outlet: 'BusinessDay', beat: 'Business, Finance', region: 'Nigeria', reach: '1.8M' },
  { name: 'Mariam Bello', outlet: 'The Guardian Nigeria', beat: 'Policy, Economy', region: 'Nigeria', reach: '3.1M' },
  { name: 'Kwame Mensah', outlet: 'Disrupt Africa', beat: 'Startups, Funding', region: 'Africa', reach: '980K' },
];

const campaigns = [
  { name: 'Q4 Product Launch', status: 'Active', sent: '842', opened: '61%', coverage: '18' },
  { name: 'Sustainability Report', status: 'Scheduled', sent: '—', opened: '—', coverage: '—' },
  { name: 'Series A Announcement', status: 'Completed', sent: '1,204', opened: '67%', coverage: '31' },
];

function Metric({ label, value, detail, icon: Icon }: any) {
  return <div className="metric-card"><div className="metric-icon"><Icon size={18}/></div><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></div>
}

function SectionTitle({ eyebrow, title, text, action }: any) {
  return <div className="section-title"><div><span className="eyebrow">{eyebrow}</span><h1>{title}</h1><p>{text}</p></div>{action}</div>
}

export default function Home() {
  const [view, setView] = useState<View>('overview');
  const [mobile, setMobile] = useState(false);
  const [prompt, setPrompt] = useState('Write a press release announcing our new AI-powered customer support platform for African SMEs.');
  const [generated, setGenerated] = useState('');
  const [tone, setTone] = useState('Professional');
  const [query, setQuery] = useState('');

  const filteredMedia = useMemo(() => media.filter(x => `${x.name} ${x.outlet} ${x.beat} ${x.region}`.toLowerCase().includes(query.toLowerCase())), [query]);

  function generate() {
    setGenerated(`FOR IMMEDIATE RELEASE\n\nNOVA AFRICA UNVEILS AI-POWERED CUSTOMER SUPPORT PLATFORM FOR AFRICAN SMEs\n\nLagos, Nigeria — Nova Africa today announced the launch of its new AI-powered customer support platform designed to help small and medium-sized businesses respond to customers faster, maintain consistent service quality, and scale support operations without adding unnecessary complexity.\n\nBuilt for the realities of growing African businesses, the platform combines intelligent response assistance, conversation insights, and simple team workflows in one workspace.\n\n“Strong customer relationships should not depend on the size of a company’s support team,” said Ada Okafor, Chief Executive Officer of Nova Africa. “Our goal is to give growing businesses practical tools that help them communicate clearly, respond faster, and serve customers with confidence.”\n\nThe platform is available to selected early-access customers from October 2026.`);
  }

  const content = (() => {
    if (view === 'workspace') return <>
      <SectionTitle eyebrow="AI Communications Workspace" title="Create communication that already sounds like your organisation." text="Generate, refine and adapt professional content using your saved communication standards." action={<button className="primary" onClick={generate}><WandSparkles size={16}/> Generate</button>}/>
      <div className="workspace-grid">
        <div className="panel composer"><label>What do you want to create?</label><textarea value={prompt} onChange={e=>setPrompt(e.target.value)} />
          <div className="chips"><button className="chip active">Press release</button><button className="chip">Statement</button><button className="chip">LinkedIn post</button><button className="chip">Media pitch</button></div>
          <div className="field-row"><label>Tone<select value={tone} onChange={e=>setTone(e.target.value)}><option>Professional</option><option>Reassuring</option><option>Confident</option><option>Conversational</option></select></label><label>Audience<select><option>General public</option><option>Media</option><option>Customers</option><option>Investors</option></select></label></div>
          <button className="primary wide" onClick={generate}><Sparkles size={17}/> Generate with Percepta</button>
        </div>
        <div className="panel output"><div className="panel-head"><div><span className="status-dot"></span> Percepta draft</div><div className="mini-actions"><button>Shorten</button><button>More formal</button></div></div>{generated ? <pre>{generated}</pre> : <div className="empty-state"><Bot size={42}/><h3>Your draft will appear here</h3><p>Percepta will use Nova Africa’s communication guidelines, preferred tone and terminology.</p></div>}</div>
      </div>
    </>;

    if (view === 'guidelines') return <>
      <SectionTitle eyebrow="Organisation Intelligence" title="Communication Guidelines" text="Give Percepta the rules, voice and context it should apply to every AI-assisted communication." action={<button className="primary"><CheckCircle2 size={16}/> Save changes</button>}/>
      <div className="settings-grid"><div className="panel form-panel"><h3>Brand voice</h3><label>Organisation name<input defaultValue="Nova Africa"/></label><label>Voice description<textarea defaultValue="Clear, credible, optimistic and practical. We communicate with confidence without exaggeration."/></label><div className="field-row"><label>English style<select><option>British English</option></select></label><label>Default tone<select><option>Professional</option></select></label></div><label>Preferred terminology<textarea defaultValue="Use ‘customers’ rather than ‘users’. Use ‘team members’ rather than ‘employees’."/></label></div><div className="panel rules"><h3>AI guardrails</h3><div className="rule"><ShieldCheck/><div><strong>Never invent facts</strong><p>Flag missing dates, figures and quotations instead of fabricating them.</p></div></div><div className="rule"><ShieldCheck/><div><strong>Avoid exaggerated claims</strong><p>No “revolutionary”, “world-leading” or unsupported superlatives.</p></div></div><div className="rule"><ShieldCheck/><div><strong>Human approval required</strong><p>External statements remain drafts until a communications manager approves them.</p></div></div><div className="guideline-score"><span>Guideline completeness</span><strong>86%</strong><div className="progress"><i style={{width:'86%'}}/></div></div></div></div>
    </>;

    if (view === 'media') return <>
      <SectionTitle eyebrow="Media Relations" title="Media Database" text="Find relevant journalists and media contacts by beat, outlet, geography and audience." action={<button className="primary"><Users size={16}/> Add contact</button>}/>
      <div className="panel"><div className="table-toolbar"><div className="search"><Search size={17}/><input placeholder="Search journalists, outlets or beats…" value={query} onChange={e=>setQuery(e.target.value)}/></div><button className="secondary">Filters</button></div><div className="table"><div className="tr th"><span>Journalist</span><span>Outlet</span><span>Beat</span><span>Region</span><span>Est. reach</span></div>{filteredMedia.map((m,i)=><div className="tr" key={i}><span><strong>{m.name}</strong><small>Verified profile</small></span><span>{m.outlet}</span><span>{m.beat}</span><span>{m.region}</span><span>{m.reach}</span></div>)}</div></div>
    </>;

    if (view === 'campaigns') return <>
      <SectionTitle eyebrow="PR Distribution" title="Campaigns" text="Plan press outreach, schedule distribution and track engagement from one workspace." action={<button className="primary"><Megaphone size={16}/> New campaign</button>}/>
      <div className="campaign-list">{campaigns.map((c,i)=><div className="panel campaign" key={i}><div><span className={`pill ${c.status.toLowerCase()}`}>{c.status}</span><h3>{c.name}</h3><p>Media outreach · Nigeria & West Africa</p></div><div className="campaign-stats"><span><small>Sent</small><strong>{c.sent}</strong></span><span><small>Open rate</small><strong>{c.opened}</strong></span><span><small>Coverage</small><strong>{c.coverage}</strong></span><ChevronRight/></div></div>)}</div>
    </>;

    if (view === 'monitoring') return <>
      <SectionTitle eyebrow="Communications Intelligence" title="Media Monitoring" text="See important mentions, narratives and emerging issues across your monitored topics." />
      <div className="split"><div className="panel"><h3>Live mentions</h3>{[['TechCabal','Nova Africa launches AI support platform for SMEs','Positive','12m'],['BusinessDay','AI adoption among Nigerian SMEs accelerates','Positive','48m'],['X / Social','Customers discuss onboarding speed','Neutral','1h'],['Nairametrics','New AI tools target customer-service costs','Neutral','2h']].map((x,i)=><div className="mention" key={i}><div className="source-icon"><Globe2 size={16}/></div><div><strong>{x[1]}</strong><p>{x[0]} · {x[3]}</p></div><span className={`sentiment ${x[2].toLowerCase()}`}>{x[2]}</span></div>)}</div><div className="panel alert-panel"><h3>Emerging issue</h3><div className="alert-icon"><TrendingUp/></div><strong>Conversation about onboarding speed is increasing</strong><p>Mentions containing “setup”, “onboarding” and “integration” increased 38% in the last 6 hours.</p><button className="secondary wide">Open analysis</button></div></div>
    </>;

    if (view === 'reputation') return <>
      <SectionTitle eyebrow="Reputation Intelligence" title="Reputation Overview" text="Understand how your organisation is being discussed and where attention is shifting." />
      <div className="metric-grid"><Metric label="Reputation index" value="78/100" detail="+4.8 this month" icon={Gauge}/><Metric label="Positive sentiment" value="68%" detail="+6% vs last month" icon={TrendingUp}/><Metric label="Share of voice" value="24%" detail="Across tracked peers" icon={Target}/><Metric label="Active mentions" value="1,482" detail="Last 30 days" icon={Activity}/></div>
      <div className="split"><div className="panel chart-card"><h3>Sentiment trend</h3><div className="fake-chart"><i style={{height:'42%'}}/><i style={{height:'55%'}}/><i style={{height:'50%'}}/><i style={{height:'64%'}}/><i style={{height:'61%'}}/><i style={{height:'72%'}}/><i style={{height:'78%'}}/></div><div className="legend"><span>Aug 18</span><span>Sep 27</span></div></div><div className="panel"><h3>Top narratives</h3><div className="narrative"><span>01</span><div><strong>AI for African SMEs</strong><p>412 mentions · 76% positive</p></div></div><div className="narrative"><span>02</span><div><strong>Customer support automation</strong><p>286 mentions · 68% positive</p></div></div><div className="narrative"><span>03</span><div><strong>Responsible AI adoption</strong><p>193 mentions · 62% positive</p></div></div></div></div>
    </>;

    if (view === 'reports') return <><SectionTitle eyebrow="Measurement" title="Reports & Analytics" text="Turn communication activity into clear, decision-ready reporting." action={<button className="primary"><FileText size={16}/> Generate report</button>}/><div className="metric-grid"><Metric label="Media mentions" value="1,482" detail="+18%" icon={Newspaper}/><Metric label="Estimated reach" value="12.8M" detail="Across all channels" icon={Globe2}/><Metric label="Campaign open rate" value="64%" detail="+9% benchmark" icon={Send}/><Metric label="AI drafts accepted" value="71%" detail="Within 2 iterations" icon={Sparkles}/></div><div className="panel report-preview"><div><span className="eyebrow">Executive report</span><h2>September Communication Performance</h2><p>Overall reputation improved during the period, driven by product-launch coverage and increased positive discussion around SME enablement.</p></div><button className="secondary">Preview report</button></div></>;

    if (view === 'team') return <><SectionTitle eyebrow="Collaboration" title="Team & Access" text="Manage workspace membership and role-based access." action={<button className="primary"><Users size={16}/> Invite member</button>}/><div className="panel"><div className="table"><div className="tr th"><span>Name</span><span>Role</span><span>Team</span><span>Status</span><span>Last active</span></div>{[['Ada Okafor','Organisation Admin','Leadership','Active','Now'],['Michael Obi','Communications Manager','Corporate Comms','Active','14m ago'],['Zainab Musa','Team Member','PR','Active','1h ago'],['Tolu James','Client','External','Invited','—']].map((x,i)=><div className="tr" key={i}>{x.map((v,j)=><span key={j}>{j===0?<strong>{v}</strong>:v}</span>)}</div>)}</div></div></>;

    if (view === 'settings') return <><SectionTitle eyebrow="Workspace" title="Settings" text="Manage organisation profile, notifications, integrations and security preferences."/><div className="settings-grid"><div className="panel form-panel"><h3>Organisation profile</h3><label>Workspace name<input defaultValue="Nova Africa"/></label><label>Industry<select><option>Technology</option></select></label><label>Primary market<select><option>Nigeria</option></select></label><button className="primary">Save profile</button></div><div className="panel rules"><h3>Workspace status</h3><div className="rule"><CheckCircle2/><div><strong>Data isolation enabled</strong><p>Your workspace data is logically separated from other organisations.</p></div></div><div className="rule"><CheckCircle2/><div><strong>Human approval enabled</strong><p>External AI drafts require approval before distribution.</p></div></div><div className="rule"><Bell/><div><strong>Daily intelligence digest</strong><p>Sent to communications managers at 8:00 AM.</p></div></div></div></div></>;

    return <>
      <div className="hero"><div><span className="eyebrow">Good afternoon, Ada</span><h1>Know what is being said.<br/><em>Shape what comes next.</em></h1><p>Your communications intelligence workspace is monitoring reputation, media activity and campaign performance across Nova Africa.</p><div className="hero-actions"><button className="primary" onClick={()=>setView('workspace')}><Sparkles size={17}/> Create with AI</button><button className="secondary" onClick={()=>setView('monitoring')}><Activity size={17}/> View live monitoring</button></div></div><div className="reputation-orb"><div><small>Reputation index</small><strong>78</strong><span>+4.8 this month</span></div></div></div>
      <div className="metric-grid"><Metric label="Media mentions" value="1,482" detail="+18% vs last month" icon={Newspaper}/><Metric label="Positive sentiment" value="68%" detail="+6% this month" icon={TrendingUp}/><Metric label="Active campaigns" value="3" detail="1 scheduled" icon={Megaphone}/><Metric label="AI content created" value="126" detail="71% accepted" icon={Sparkles}/></div>
      <div className="dashboard-grid"><div className="panel"><div className="panel-head"><h3>Intelligence feed</h3><button className="text-btn" onClick={()=>setView('monitoring')}>View all</button></div>{[['12m','Positive coverage','TechCabal published a story about Nova Africa’s new AI support platform.'],['48m','Narrative shift','Positive discussion around SME productivity increased 21%.'],['2h','Campaign milestone','Q4 Product Launch reached 18 media mentions.']].map((x,i)=><div className="feed" key={i}><span>{x[0]}</span><div><strong>{x[1]}</strong><p>{x[2]}</p></div></div>)}</div><div className="panel quick"><div className="panel-head"><h3>Quick create</h3><Zap size={18}/></div>{[['Press release','Announce company news'],['Media statement','Respond clearly and quickly'],['Executive post','Create thought leadership'],['Media pitch','Reach the right journalists']].map((x,i)=><button key={i} onClick={()=>setView('workspace')}><div><strong>{x[0]}</strong><span>{x[1]}</span></div><ChevronRight size={17}/></button>)}</div></div>
    </>;
  })();

  return <div className="app-shell">
    <aside className={mobile ? 'sidebar open' : 'sidebar'}><div className="brand"><div className="brand-mark">P</div><div><strong>Percepta</strong><span>Communications Intelligence</span></div><button className="close-mobile" onClick={()=>setMobile(false)}><X/></button></div><div className="org"><div className="avatar">NA</div><div><strong>Nova Africa</strong><span>Organisation workspace</span></div></div><nav>{nav.map(item=>{const Icon=item.icon;return <button key={item.id} className={view===item.id?'active':''} onClick={()=>{setView(item.id);setMobile(false)}}><Icon size={18}/><span>{item.label}</span>{item.id==='monitoring'&&<i>4</i>}</button>})}</nav><div className="sidebar-foot"><div className="avatar small">AO</div><div><strong>Ada Okafor</strong><span>Organisation Admin</span></div></div></aside>
    {mobile && <div className="overlay" onClick={()=>setMobile(false)}/>}<main><header><button className="menu-btn" onClick={()=>setMobile(true)}><Menu/></button><div className="global-search"><Search size={17}/><span>Search Percepta</span><kbd>⌘ K</kbd></div><div className="header-actions"><button><Bell size={19}/><i></i></button><div className="live"><span></span> Live monitoring</div></div></header><div className="content">{content}</div></main>
  </div>;
}
