export type ServiceData = {
  color: string;
  title: string;
  tagline: string;
  hero: string;
  intro: string;
  sections: { title: string; body: string }[];
  bullets: string[];
  faq: { q: string; a: string }[];
};

export const serviceData: Record<string, ServiceData> = {
  "managed-it": {
    color: "#0078d4",
    title: "Managed IT Services",
    tagline: "Your IT. Fully managed. Zero surprises.",
    hero: "One partner. Every layer. All day, every day.",
    intro: "Running a business is hard enough without worrying about servers crashing, computers freezing or ransomware emails. RUB takes complete ownership of your IT infrastructure — we monitor it, maintain it, secure it and fix it. You get a predictable monthly cost and a team that acts like your in-house IT department, without the overhead.",
    sections: [
      { title: "What does 'managed' actually mean?", body: "It means we don't wait for you to call us. Our monitoring agents run on every device in your environment 24/7, alerting us the moment something looks wrong — a failing hard drive, a spike in CPU, a suspicious login attempt. We open the ticket, investigate, and fix it. Most issues are resolved before your team even notices." },
      { title: "Remote & On-Site Support", body: "For software issues, configuration changes or user problems, our technicians connect remotely in minutes. For hardware replacements, physical installs or anything that needs hands on keyboards, we're on-site in Israel. No subcontractors — the same engineer you call is the one who shows up." },
      { title: "What's included every month?", body: "Endpoint monitoring and management, patch management (OS and third-party apps), antivirus and EDR, helpdesk access, monthly reporting, and quarterly IT reviews. Everything scoped clearly in your service agreement — no surprise invoices." },
      { title: "Who is this for?", body: "Businesses of 5 to 500 employees that don't have a full-time IT manager, or companies that have an internal IT person who needs expert backup. We work with law firms, clinics, retail chains, logistics companies, real estate agencies and technology startups across Israel." },
    ],
    bullets: ["24/7 monitoring of all endpoints, servers and network devices", "Patch management — OS and third-party apps, automatically applied", "Antivirus & EDR included on every device", "Remote helpdesk — average first response under 15 minutes", "On-site support anywhere in Israel", "Monthly performance and security reports", "Dedicated account manager, one phone number", "Flat monthly pricing — no per-ticket billing"],
    faq: [
      { q: "Do we need to sign a long contract?", a: "Minimum commitment is 3 months. Most clients stay for years because the service works, not because they're locked in." },
      { q: "Can you take over from our current IT provider?", a: "Yes. We handle the transition — migrating documentation, taking over monitoring tools, and ensuring zero downtime during handover." },
      { q: "Do you work with both Windows and Mac?", a: "Yes. We support Windows, macOS, iOS and Android devices. Most of our clients run mixed environments." },
      { q: "What happens if something breaks at 2am?", a: "Our monitoring system alerts the on-call engineer. Critical incidents are responded to around the clock." },
    ],
  },
  "microsoft-365": {
    color: "#0078d4",
    title: "Microsoft 365",
    tagline: "Deployed right. Secured properly. Managed daily.",
    hero: "The world's most-used productivity suite — configured for your business, not just turned on.",
    intro: "Most companies using Microsoft 365 are using 20% of what they're paying for. Worse, many have security misconfigured, leaving them exposed to phishing, data leaks and account takeovers. RUB deploys, hardens and manages your entire Microsoft 365 environment — from Exchange and Teams to SharePoint, Intune and Defender — so you actually get the value you're paying for.",
    sections: [
      { title: "Deployment & Migration", body: "Moving from Google Workspace, an old Exchange server, or a local mail system? We handle the full migration — emails, contacts, calendars, shared mailboxes, archives — with zero data loss and minimal downtime. We configure your DNS, set up SPF/DKIM/DMARC for email authentication, and train your team on day one." },
      { title: "Security & Compliance", body: "Out-of-the-box Microsoft 365 is not secure. We enable and configure Conditional Access, Multi-Factor Authentication, Microsoft Defender for Office 365, Data Loss Prevention policies, email encryption and audit logging. If your industry requires compliance (HIPAA, ISO 27001, GDPR), we align your tenant configuration to those requirements." },
      { title: "User & License Management", body: "Adding a new employee or offboarding someone who left? We manage the full user lifecycle — creating accounts, assigning licenses and permissions, setting up groups, configuring shared mailboxes and Teams channels. When someone leaves, we ensure their access is revoked immediately and their data is archived." },
      { title: "Ongoing Management", body: "Microsoft releases updates constantly. We track changes, apply configurations, manage license assignments to keep your cost optimal, and handle support requests from your users. Monthly reporting gives you visibility into your tenant's security posture and usage." },
    ],
    bullets: ["Full tenant setup and DNS configuration", "Email migration from any platform with zero data loss", "MFA enforcement and Conditional Access policies", "Microsoft Defender for Office 365 — anti-phishing, anti-malware", "SharePoint and OneDrive permissions and structure", "Teams setup — channels, policies, external access controls", "Intune MDM for mobile and laptop management", "License optimization — you only pay for what you use"],
    faq: [
      { q: "How long does a migration take?", a: "For a company of 20–50 users, typically 1–2 weeks including testing and cutover. Larger migrations are planned per phase to avoid disruption." },
      { q: "Do you offer Microsoft 365 licenses?", a: "Yes. We're a Microsoft partner and can supply licenses directly, often at the same or better price than buying direct." },
      { q: "Can you fix a tenant that was set up badly?", a: "Absolutely. Security hardening of an existing tenant is one of our most common requests — we audit what's in place and fix it systematically." },
      { q: "What about Teams Phone?", a: "We configure Microsoft Teams Phone System with direct routing or Calling Plans for companies replacing their traditional PBX." },
    ],
  },
  "cloud-infrastructure": {
    color: "#00d4ff",
    title: "Cloud Infrastructure",
    tagline: "Azure. AWS. Hybrid. Built to scale, built to last.",
    hero: "Stop paying for servers you don't need. Start scaling infrastructure you can trust.",
    intro: "Cloud infrastructure done wrong costs more than on-premise and performs worse. Done right, it gives you unlimited scale, automatic redundancy, and costs that track your actual usage. RUB designs, migrates and manages cloud environments on Microsoft Azure and Amazon AWS — from simple VM lifts-and-shifts to complex hybrid architectures with SD-WAN, private networking and containerised workloads.",
    sections: [
      { title: "Migration Strategy", body: "We start with a full assessment of your current environment — what's running, what it costs, what the dependencies are. Then we build a migration plan that minimises risk and downtime. Some workloads move as-is (lift-and-shift), others are re-platformed to take advantage of cloud-native services. We document everything and test recovery before cutting over." },
      { title: "Architecture & Design", body: "Good cloud architecture isn't just 'put it in Azure'. We design for high availability (multi-zone, multi-region where needed), security (private endpoints, NSGs, Azure Firewall/WAF), identity (Azure AD, RBAC, PIM), and cost efficiency (reserved instances, auto-scaling, right-sizing). Every environment comes with Infrastructure-as-Code so it can be rebuilt in hours if needed." },
      { title: "Hybrid Cloud", body: "Not everything belongs in the cloud. We design hybrid environments where on-premise systems connect securely to cloud resources via ExpressRoute or site-to-site VPN. Your users get seamless access whether they're in the office, at home or on mobile — without compromising security." },
      { title: "Cost Optimisation", body: "Cloud bills surprise a lot of companies. We review your consumption monthly, identify waste (oversized VMs, orphaned disks, forgotten resources), apply reserved instance pricing where it makes sense, and set up budget alerts. Most clients save 20–40% on cloud costs within 90 days of us taking over." },
    ],
    bullets: ["Azure and AWS architecture design and deployment", "Full cloud migration — lift-and-shift or re-platform", "Hybrid cloud with ExpressRoute or site-to-site VPN", "High availability — multi-zone, auto-scaling, load balancing", "Security — private networking, WAF, Azure Firewall, RBAC", "Infrastructure-as-Code (Terraform / Bicep)", "24/7 monitoring, alerts and incident response", "Monthly cost optimisation and reporting"],
    faq: [
      { q: "Azure or AWS — which should we choose?", a: "For Microsoft-heavy environments (Active Directory, Office 365, SQL Server), Azure is usually the better fit. AWS has broader services for custom applications. We'll recommend based on your workloads." },
      { q: "Can you migrate our physical servers to the cloud?", a: "Yes. We use Azure Migrate and AWS Migration Hub to assess, replicate and cut over physical and virtual servers with minimal downtime." },
      { q: "Do you manage the cloud after migration?", a: "Yes. Ongoing management, monitoring, patching and cost optimisation is included in our managed cloud service." },
      { q: "What about disaster recovery?", a: "We configure Azure Site Recovery or AWS Backup with defined RTO/RPO targets, and we test recovery quarterly." },
    ],
  },
  "cybersecurity": {
    color: "#00d4ff",
    title: "Cybersecurity",
    tagline: "Detect. Contain. Eliminate. Before damage is done.",
    hero: "The question isn't if you'll be targeted. It's whether you'll be ready.",
    intro: "Cyber attacks on Israeli businesses are increasing every year — ransomware, business email compromise, phishing, supply chain attacks. RUB implements a layered security strategy across your endpoints, email, network and identity — then monitors it all 24/7. When a threat is detected, we don't send you an email. We act.",
    sections: [
      { title: "Endpoint Detection & Response (EDR)", body: "Traditional antivirus is dead. Modern attacks bypass signature-based detection in seconds. We deploy EDR solutions (CrowdStrike, Microsoft Defender for Endpoint, or SentinelOne depending on your environment) that use behavioural analysis, AI and threat intelligence to detect and isolate threats in real time — even zero-day attacks." },
      { title: "Email Security", body: "Over 90% of cyber attacks start with an email. We deploy advanced email filtering beyond what Microsoft 365 provides by default — sandboxing attachments, rewriting URLs, blocking impersonation attacks, and quarantining suspicious messages before they reach your inbox. We also configure SPF, DKIM and DMARC to prevent your domain from being spoofed." },
      { title: "Network Security", body: "We configure and manage Next-Generation Firewalls with IPS/IDS, web content filtering and application control. Remote workers connect via encrypted VPN or Zero Trust Network Access (ZTNA) — never directly to corporate systems. Network traffic is segmented so a compromised device cannot spread laterally." },
      { title: "Security Awareness Training", body: "Your employees are the biggest attack surface. We run simulated phishing campaigns and security awareness training — teaching your team to recognise suspicious emails, social engineering attempts and unsafe behaviour. Companies that train regularly see phishing click rates drop by over 80%." },
    ],
    bullets: ["EDR deployment — CrowdStrike, Microsoft Defender, SentinelOne", "Advanced email filtering and anti-phishing", "Next-Gen Firewall with IPS/IDS and web filtering", "MFA enforcement across all systems and applications", "Zero Trust architecture and network segmentation", "Dark web monitoring — we alert you if your credentials appear", "Security awareness training and phishing simulations", "Security audits and vulnerability assessments"],
    faq: [
      { q: "We already have antivirus — do we need more?", a: "Traditional antivirus stops less than 50% of modern attacks. EDR detects behavioural anomalies and stops threats that signature-based tools miss entirely." },
      { q: "What happens if we get hit by ransomware?", a: "We contain the infected devices immediately, assess the blast radius, restore from backup, and conduct a root-cause investigation. Response starts within minutes." },
      { q: "Do you offer ISO 27001 support?", a: "Yes. We help businesses prepare for and maintain ISO 27001 certification — policy writing, risk assessments, controls implementation and audit support." },
      { q: "How often do you test our security?", a: "Vulnerability scans run continuously. Full penetration tests are available quarterly or annually depending on your risk profile." },
    ],
  },
  "cctv": {
    color: "#00b4d8",
    title: "CCTV Installation",
    tagline: "See everything. Record everything. Miss nothing.",
    hero: "Professional security cameras for offices, retail, warehouses and multi-site businesses.",
    intro: "A cheap camera from a hardware store is not a security system. RUB designs and installs professional IP camera systems — HD and 4K, indoor and outdoor, wired and wireless — with centralised management, remote access from your phone, and AI-powered detection. We handle everything from cable routing and camera placement to NVR configuration and mobile app setup.",
    sections: [
      { title: "System Design & Camera Placement", body: "Good camera placement is a science. We survey your site, identify blind spots, and design a layout that gives you full coverage with the minimum number of cameras. We account for lighting conditions, entry/exit points, high-value areas, and Israeli legal requirements for camera placement in workplaces." },
      { title: "HD & 4K IP Camera Systems", body: "We work with enterprise-grade IP cameras from Hikvision, Dahua and Axis. Full HD (1080p) for general coverage, 4K for areas where you need to read licence plates or identify faces clearly. Varifocal lenses, wide-angle fisheye cameras, PTZ (pan-tilt-zoom) cameras for large open areas — we spec the right camera for each location." },
      { title: "Remote Access & Mobile Monitoring", body: "View your cameras live from anywhere in the world using the mobile app on your phone or tablet. Receive push notifications when motion is detected. Review recordings by date, time or triggered event. Multi-site businesses can view all locations from a single interface — one login, all your sites." },
      { title: "AI Motion Detection & Alerts", body: "Modern cameras can distinguish between a person, a vehicle and an animal — reducing false alarms dramatically. We configure detection zones so you're only alerted for what matters. After-hours intrusion detection, perimeter breach alerts, and loitering detection are all configurable per camera." },
    ],
    bullets: ["Full site survey and camera layout design", "HD 1080p and 4K IP cameras — indoor and outdoor", "NVR/DVR setup with local and cloud recording", "Remote live view on iOS and Android", "AI motion detection — person, vehicle, zone-based alerts", "Night vision and low-light cameras", "Cable routing, conduit and professional installation", "Multi-site management from one dashboard"],
    faq: [
      { q: "How long is footage stored?", a: "Depends on the number of cameras and storage capacity. We typically configure 30 days of continuous recording on a local NVR, with cloud backup available for critical cameras." },
      { q: "Can you expand an existing system?", a: "Yes. We can integrate with most existing IP camera systems, add cameras to existing NVRs, or migrate you to a new platform if the old one is obsolete." },
      { q: "Do cameras work at night?", a: "Yes. We install cameras with IR night vision or white-light illumination depending on requirements. Some locations get supplementary lighting for better image quality." },
      { q: "Is the installation disruptive?", a: "We plan cable routing to minimise disruption. Most office and retail installs are completed in one day, outside business hours if needed." },
    ],
  },
  "access-control": {
    color: "#00d4ff",
    title: "Access Control",
    tagline: "Who gets in. When. Where. You decide.",
    hero: "Replace keys with smart, auditable, remote-managed access for your entire business.",
    intro: "A key gives access to anyone who holds it, and you'll never know who entered or when. RUB installs and manages electronic access control systems that give you total control over who enters every door, at what times, with a full audit trail of every access event. Manage everything from a web dashboard or your phone — add users, revoke access, set schedules, get alerts.",
    sections: [
      { title: "Keycard & Fob Systems", body: "The most widely deployed access control technology. Employees carry an RFID card or key fob that's programmed with their access rights. Lost a card? Deactivate it in seconds from the management portal — no locksmith needed, no rekeying the building. Works with standard door frames and electric strikes." },
      { title: "Biometric Access", body: "For high-security areas — server rooms, labs, cash handling areas, medication storage — fingerprint or face recognition readers ensure only verified individuals can enter. No cards to forget or lend to a colleague. All biometric data is stored locally on the reader for privacy compliance." },
      { title: "Multi-Site Management", body: "One platform, all your sites. Whether you have 2 offices or 20 warehouses, we connect all your access control readers to a centralised cloud platform. Add a new employee in Tel Aviv and they have access to all permitted sites instantly. Revoke access when they leave — everywhere at once." },
      { title: "Integration with CCTV", body: "Access control and CCTV are most powerful together. We integrate both systems so every door event is automatically linked to the corresponding camera footage. Investigating an incident? Pull up the event log, click the entry, and the footage from that exact moment plays. No manual searching." },
    ],
    bullets: ["RFID keycard and key fob readers", "Fingerprint and face recognition for high-security zones", "Web and mobile management portal", "Time-based access — set who can enter and when", "Full audit trail — every entry and exit logged", "Instant remote lockout — revoke access in seconds", "Multi-site management from one dashboard", "Integration with CCTV for event-linked footage"],
    faq: [
      { q: "Can it integrate with our existing door locks?", a: "Depends on the lock type. We survey your doors and recommend the most cost-effective path — often electric strikes or magnetic locks that work with existing frames." },
      { q: "What happens during a power outage?", a: "Readers have battery backup. Fail-secure or fail-open behaviour is configurable per door depending on your safety and security requirements." },
      { q: "Can we use mobile phones instead of cards?", a: "Yes. NFC-enabled smartphones can be used as credentials with compatible readers — no physical card needed." },
      { q: "How is visitor access managed?", a: "We configure temporary credentials with expiry times. Visitors receive a code or temporary card valid only for their visit window." },
    ],
  },
  "backup-dr": {
    color: "#0078d4",
    title: "Backup & Disaster Recovery",
    tagline: "When things go wrong — back up in minutes, not days.",
    hero: "Ransomware, hardware failure, accidental deletion — your business survives it all.",
    intro: "Backup is not DR. Having a copy of your data is worthless if you can't restore it fast enough to keep your business running. RUB designs and manages complete Backup and Disaster Recovery solutions — tested, documented, and with defined RTO and RPO targets backed by SLA. When disaster strikes, you know exactly how long recovery takes, because we've practiced it.",
    sections: [
      { title: "Backup Architecture", body: "We follow the 3-2-1 rule: 3 copies of your data, on 2 different media types, with 1 copy off-site. In practice this means local NAS or server backup for fast recovery, replicated to cloud storage (Azure Blob, Veeam Cloud Connect or AWS S3) for off-site protection. Backup jobs run automatically, and we verify them daily." },
      { title: "Ransomware-Proof Backups", body: "Modern ransomware specifically targets backup systems. We configure immutable backups — snapshots that cannot be encrypted, deleted or modified by ransomware, even if the attacker gains admin access to your network. Air-gapped cloud backups provide a last line of defence that ransomware cannot reach." },
      { title: "Recovery Time & Point Objectives", body: "RTO (Recovery Time Objective) is how long you can afford to be down. RPO (Recovery Point Objective) is how much data you can afford to lose. We work with you to define these numbers based on your business, then build a solution that meets them. Critical systems can be recovered in minutes using VM snapshots and instant boot." },
      { title: "DR Testing", body: "A backup that's never been tested is not a backup. We perform quarterly DR tests — restoring systems to an isolated environment, verifying data integrity, measuring actual recovery times, and documenting results. You receive a test report after each exercise. No surprises when it matters." },
    ],
    bullets: ["3-2-1 backup architecture — local + cloud", "Immutable backups — ransomware-proof snapshots", "Veeam, Azure Backup and AWS Backup solutions", "Microsoft 365 backup — email, Teams, SharePoint", "Defined RTO/RPO with SLA guarantees", "Instant VM recovery — systems back up in minutes", "Quarterly DR tests with written test reports", "24/7 backup monitoring and failure alerts"],
    faq: [
      { q: "Does Microsoft 365 back up our emails automatically?", a: "No. Microsoft retains deleted items for a limited period but does not provide full backup. We deploy dedicated M365 backup to protect your email, Teams chats and SharePoint." },
      { q: "How quickly can you restore everything after ransomware?", a: "For most SMB environments, critical systems are back online within 2–4 hours using instant VM recovery. Full environment restoration depends on scale." },
      { q: "How much does cloud backup storage cost?", a: "Depends on your data volume. We optimise storage costs with deduplication and compression — typically 60–80% reduction in raw storage size." },
      { q: "What backup software do you use?", a: "Primarily Veeam Backup & Replication, Acronis and Azure Backup depending on the environment. All enterprise-grade solutions with proven track records." },
    ],
  },
  "network": {
    color: "#00b4d8",
    title: "Network Infrastructure",
    tagline: "Fast. Reliable. Secure. The network you deserve.",
    hero: "A bad network costs you more in lost productivity than any IT investment.",
    intro: "Slow WiFi, dropped calls, VPN that barely works, switches that haven't been updated in 5 years — bad network infrastructure is invisible until it becomes your biggest problem. RUB designs, installs and manages enterprise-grade networks for offices, warehouses, retail sites and multi-site businesses across Israel. Fast enough for 4K video conferencing. Secure enough for financial data. Reliable enough to forget we're there.",
    sections: [
      { title: "Structured Cabling", body: "Everything starts with a solid physical layer. We install Cat6a structured cabling with proper cable management, labelling and documentation. Patch panels, server rack organisation, containment trays — done right, your cabling infrastructure supports the business for 15+ years without being touched. Done wrong, it's a nightmare to troubleshoot." },
      { title: "Enterprise WiFi", body: "Consumer routers and consumer access points belong at home. We deploy enterprise WiFi from Cisco Meraki, Ubiquiti or HPE Aruba — properly surveyed, with access points placed to eliminate dead spots, interference managed, and separate SSIDs for staff, guests and IoT devices. Roaming works seamlessly. Video calls don't drop." },
      { title: "Firewall & Security", body: "We deploy and manage Next-Generation Firewalls — Fortinet, Palo Alto or Cisco — configured with proper security zones, intrusion prevention, application control and web filtering. Remote workers connect via encrypted site-to-site VPN or ZTNA. Guest WiFi is isolated from your internal network. Traffic is logged and monitored." },
      { title: "Network Monitoring", body: "We monitor every switch, access point, firewall and router 24/7. Bandwidth utilisation, device health, interface errors, latency — all visible in our NOC. When a switch port fails or a link goes down, we know before you do. Monthly reports show you exactly how your network is performing." },
    ],
    bullets: ["Cat6a structured cabling — fully documented and labelled", "Enterprise WiFi — Meraki, Ubiquiti, Aruba", "Site WiFi survey — zero dead spots guaranteed", "Next-Gen Firewall — Fortinet, Palo Alto, Cisco", "VLAN segmentation — staff, guest, IoT, servers", "Site-to-site VPN and remote access VPN", "SD-WAN for multi-site connectivity", "24/7 network monitoring and NOC alerting"],
    faq: [
      { q: "Our WiFi is slow — can you fix it without rewiring everything?", a: "Often yes. Most WiFi problems are caused by bad AP placement, wrong channels or congested spectrum. We survey first, then recommend whether new APs or repositioning solves the problem." },
      { q: "We have 3 offices — can they all share resources?", a: "Yes. We connect your sites with site-to-site VPN or SD-WAN so staff at all locations access the same file servers, printers and applications securely." },
      { q: "Do you handle ISP connections?", a: "We work with all major Israeli ISPs and can manage your connectivity as part of the service — including failover connections if uptime is critical." },
      { q: "What is SD-WAN and do we need it?", a: "SD-WAN intelligently routes traffic across multiple WAN connections for best performance and cost. Useful for multi-site businesses or companies with high bandwidth needs." },
    ],
  },
  "server-virtualization": {
    color: "#00d4ff",
    title: "Server Virtualization",
    tagline: "Do more with less. Hyper-V & VMware, architected right.",
    hero: "Run more workloads, on less hardware, with better redundancy than you've ever had.",
    intro: "If your servers are running at 10% CPU utilisation and you have 8 of them, you're wasting money and creating unnecessary complexity. Server virtualisation consolidates those workloads onto fewer, more powerful hosts — with automatic failover, live migration, and the ability to spin up a new server in minutes instead of weeks. RUB designs, deploys and manages VMware vSphere and Microsoft Hyper-V environments from single-site SMBs to multi-site enterprise clusters.",
    sections: [
      { title: "What is Virtualisation?", body: "A hypervisor (Hyper-V or VMware ESXi) runs on physical hardware and allows multiple virtual machines to share that hardware independently. Each VM thinks it has its own dedicated server — it has its own OS, its own resources, its own network interfaces. You get isolation between workloads, and the ability to move, snapshot, clone or back up VMs in seconds." },
      { title: "High Availability Clustering", body: "In a clustered environment, if one physical host fails, its VMs automatically restart on another host in the cluster — typically within 30–60 seconds. No manual intervention, no calling anyone at 3am. We design clusters with enough headroom that the loss of one node doesn't degrade performance for running workloads." },
      { title: "Live Migration", body: "Maintenance shouldn't mean downtime. With live migration (vMotion in VMware, Live Migration in Hyper-V), we move a running VM from one physical host to another without interrupting it. Patching the hypervisor, replacing a faulty host, upgrading hardware — all without a single service disruption." },
      { title: "Backup Integration", body: "Virtualisation and backup are tightly integrated. Veeam Backup & Replication is the gold standard — it takes VSS-consistent snapshots of running VMs without downtime, stores them locally and in the cloud, and allows instant recovery (boot the VM directly from the backup in seconds while restoring in the background)." },
    ],
    bullets: ["VMware vSphere / ESXi design and deployment", "Microsoft Hyper-V cluster deployment", "HA clustering — automatic failover in under 60 seconds", "Live migration — maintenance without downtime", "VM provisioning, cloning and template management", "Storage design — SAN, NAS, vSAN", "Veeam Backup integration with instant recovery", "Performance monitoring and capacity planning"],
    faq: [
      { q: "VMware or Hyper-V — which is better?", a: "Both are enterprise-grade. VMware has more features and broader third-party support. Hyper-V is more cost-effective in Windows-only environments (it's included in Windows Server). We recommend based on your workloads and budget." },
      { q: "We have old physical servers — should we virtualise?", a: "It depends on their age and specs. We assess whether consolidation makes sense, and whether physical-to-virtual migration is cost-effective vs. new hardware." },
      { q: "How many VMs can run on one host?", a: "Depends entirely on the host's specs and what each VM needs. A modern dual-socket server with 512GB RAM can comfortably host 30–50 VMs. We size appropriately." },
      { q: "What's the cost saving?", a: "Consolidating 8 physical servers onto 2 or 3 hosts cuts hardware, power, cooling and licensing costs significantly. Most clients see ROI within 12–18 months." },
    ],
  },
  "helpdesk": {
    color: "#0078d4",
    title: "Helpdesk Support",
    tagline: "Real humans. Real answers. Issues resolved — fast.",
    hero: "Your team's IT problems solved — before they become your problems.",
    intro: "When your accountant can't open QuickBooks or your sales director's laptop won't connect to the VPN before a big presentation, they need help now — not in 4 hours when a ticket is assigned. RUB provides direct-access helpdesk support with senior technicians, sub-15-minute first response, and actual resolution — not just acknowledgement. Available by phone, WhatsApp and remote session.",
    sections: [
      { title: "How Our Helpdesk Works", body: "Your employees call or WhatsApp our helpdesk number. A senior technician answers, understands the problem, and connects remotely to their computer within minutes. No first-level scripts, no tier-1 gatekeeping. If the problem needs an on-site visit, we schedule it the same day or next morning depending on urgency." },
      { title: "What We Support", body: "Windows and macOS computers, Microsoft 365, email, printers, VPN, mobile devices, business applications (accounting software, ERP systems, CRM), connectivity issues, password resets, new user setup, hardware failures, virus removal, performance problems — anything your team runs into day-to-day." },
      { title: "Priority Ticketing", body: "Not all problems are equal. A director who can't access email before a board meeting is higher priority than a printer that's offline. Our ticketing system categorises issues by impact and urgency, and SLA response times are tiered accordingly. Critical issues get immediate response. Minor issues are queued and resolved same-day." },
      { title: "Reporting & Visibility", body: "Every ticket is logged, categorised, timed and closed. Monthly reports show you ticket volumes, response times, resolution times, most common issue types and repeat problems. Repeat issues point to systemic problems — we proactively address root causes rather than closing the same ticket every week." },
    ],
    bullets: ["Direct access to senior technicians — no bots, no scripts", "Sub-15 minute first response on business hours tickets", "Remote support via TeamViewer / AnyDesk", "On-site support anywhere in Israel", "Phone, WhatsApp and email support channels", "Priority queuing — critical issues jump the queue", "SLA guarantees with monthly performance reporting", "User onboarding and offboarding handled end-to-end"],
    faq: [
      { q: "What are your support hours?", a: "Standard helpdesk runs Sunday–Thursday 8am–7pm, Friday 8am–2pm. 24/7 on-call is available for critical incidents on managed service plans." },
      { q: "How do employees contact you?", a: "By phone, WhatsApp or email. Most clients use WhatsApp as the default because it's fast and familiar. We also deploy a self-service portal if you prefer tickets." },
      { q: "Can you support employees at home?", a: "Yes. Remote support works from anywhere. For home office setups, network issues or hardware problems we can visit." },
      { q: "Do you replace hardware?", a: "We procure and configure replacement hardware as needed. Laptops, desktops, monitors, peripherals — we supply, set up and deliver." },
    ],
  },
};
