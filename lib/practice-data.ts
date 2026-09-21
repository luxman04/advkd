export type PracticeArea = {
  id: string;
  num: string;
  label: string;
  title: string;
  navLabel: string;
  intro: string[];
  services: string[];
  ctaLabel: string;
  infoTitle: string;
  infoPoints: { heading: string; body: string }[];
  faqs: { q: string; a: string }[];
  reverse?: boolean;
};

export const practiceAreas: PracticeArea[] = [
  {
    id: 'criminal',
    num: '01',
    label: '01 / Criminal Law',
    title: 'Criminal Litigation',
    navLabel: 'Criminal',
    intro: [
      'Criminal cases demand speed, strategy, and a deep understanding of both the law and the courts. Adv. KaranDeep brings hands-on criminal courtroom experience at the Sessions Court and Punjab & Haryana High Court.',
      'Whether you need urgent bail relief, FIR quashing, or a comprehensive trial defence, every matter is handled with the seriousness and urgency it deserves.',
    ],
    services: [
      'Bail applications before Magistrate & Sessions Court',
      'Anticipatory Bail under Section 438 CrPC / Section 482 BNSS',
      'FIR Quashing under Section 482 CrPC at High Court',
      'Trial defence in all criminal matters',
      'Criminal appeals before Sessions Court & High Court',
      'NDPS Act, POCSO, IPC 498-A, SC/ST Act matters',
      'Revision petitions and criminal miscellaneous petitions',
      'Cheque bounce (NI Act Section 138) cases',
    ],
    ctaLabel: 'Discuss Your Case →',
    infoTitle: 'Key Legal Provisions',
    infoPoints: [
      { heading: 'Anticipatory Bail (S.438 CrPC)', body: 'Applied before arrest when you apprehend being implicated. Can be filed at Sessions or High Court. Time is critical — act immediately.' },
      { heading: 'FIR Quashing (S.482 CrPC)', body: 'High Court can quash FIRs in cases of false implication, purely civil disputes disguised as criminal, or where compromise has been reached.' },
      { heading: 'Regular Bail (S.437/439 CrPC)', body: 'After arrest. Magistrate, Sessions Court or High Court can grant bail based on nature of offence, antecedents, and flight risk.' },
    ],
    faqs: [
      { q: 'What should I do if an FIR is filed against me?', a: 'Contact an advocate immediately. Do not make any statement to police without legal counsel. Anticipatory bail must be applied for urgently if arrest is imminent.' },
      { q: 'Can I get bail in a non-bailable offence?', a: 'Yes. Non-bailable does not mean bail is impossible. Courts retain discretion and personal liberty is a fundamental right.' },
    ],
  },
    {
    id: 'writs',
    num: '02',
    label: '02 / Constitutional Law',
    title: 'High Court Writs',
    navLabel: 'High Court Writs',
    reverse: true,
    intro: [
      'When fundamental rights are violated or government bodies act without authority, the High Court\u2019s writ jurisdiction provides one of the most powerful and swift remedies in Indian law. Adv. KD has extensive experience filing and arguing writ petitions.',
    ],
    services: [
      'Habeas Corpus — for illegal detention / custody',
      'Mandamus — directing government bodies to perform their duty',
      'Certiorari — quashing illegal orders of lower courts / tribunals',
      'Prohibition — preventing lower courts from exceeding jurisdiction',
      'Quo Warranto — challenging illegal usurpation of public office',
      'Fundamental rights enforcement (Articles 14, 19, 21)',
      'Service matters, transfer orders, departmental inquiries',
    ],
    ctaLabel: 'Discuss Your Case →',
    infoTitle: 'When to File a Writ',
    infoPoints: [
      { heading: 'Urgency', body: 'Habeas corpus petitions for illegal detention can be taken up by the High Court the same day.' },
      { heading: 'Government Accountability', body: 'When government departments fail to act or act with malice — mandamus compels them.' },
      { heading: 'Interim Stay', body: 'Courts routinely grant stay orders on illegal government orders pending final hearing.' },
    ],
    faqs: [
      { q: 'Can I challenge my transfer order via writ?', a: 'Yes. Transfer orders made mala fide or in violation of service rules can be challenged before the High Court.' },
    ],
  },
  {
    id: 'nri',
    num: '03',
    label: '03 / NRI Services',
    title: 'NRI Legal Services',
    navLabel: 'NRI Services',
    intro: [
      'For Non-Resident Indians, managing legal matters in India from abroad can feel overwhelming. Adv. KD has extensive experience remotely managing NRI legal disputes — from property fraud to criminal matters — without requiring clients to travel to India for every hearing.',
      'Consultations available via video call. Documentation handled by Power of Attorney. Regular updates via WhatsApp and email.',
    ],
    services: [
      'Ancestral and self-acquired property disputes',
      'Illegal sale / forged Power of Attorney cases',
      'Property possession and eviction suits',
      'Fraudulent mutation in revenue records',
      'Drafting and registration of Power of Attorney',
      'Criminal complaints related to property fraud (IPC 420, 467, 468)',
      'NRI matrimonial matters and overseas divorce recognition',
      'FEMA / foreign investment property compliance',
    ],
    ctaLabel: 'Schedule a Video Consultation →',
    infoTitle: 'How We Serve NRIs Remotely',
    infoPoints: [
      { heading: 'Step 1 – Video Consultation', body: 'Initial case discussion via Google Meet, WhatsApp, or Zoom.' },
      { heading: 'Step 2 – Power of Attorney', body: 'You execute a PoA in your country of residence (Indian Embassy / Consulate), couriered to India for registration.' },
      { heading: 'Step 3 – We Handle Everything', body: 'Court appearances, filings, Revenue Court visits — all handled on your behalf, with updates after every hearing.' },
    ],
    faqs: [
      { q: 'Do I need to come to India for my property case?', a: 'In most cases, no. With a valid Power of Attorney, your advocate can represent you entirely.' },
    ],
  },
  {
    id: 'civil',
    num: '04',
    label: '04 / Civil Law',
    title: 'Civil & Property',
    navLabel: 'Civil & Property',
    reverse: true,
    intro: [
      'Property disputes and civil matters form the backbone of litigation in Punjab and Haryana. Whether it\u2019s ancestral land, a contested will, or a possession dispute, Adv. KD brings strategic litigation experience to protect your property rights.',
    ],
    services: [
      'Declaration suits for title and ownership',
      'Possession and permanent injunction suits',
      'Partition suits (ancestral / joint family property)',
      'Will and inheritance disputes (Succession Act)',
      'Cancellation of fraudulent sale deeds',
      'Revenue Court matters (mutation, jamabandi, patwari records)',
      'Tenant eviction and rent disputes',
      'Recovery suits and money decrees',
    ],
    ctaLabel: 'Discuss Your Case →',
    infoTitle: 'Why Civil Cases Need Expert Counsel',
    infoPoints: [
      { heading: 'Multiple Forums', body: 'Civil property litigation in Punjab involves Civil Courts, Revenue Courts, and the High Court. A misstep in forum or prayer can cost years.' },
      { heading: 'Interim Injunctions', body: 'Urgent relief to freeze the status quo — prevent sale, transfer or dispossession of property pending final decision.' },
    ],
    faqs: [
      { q: 'Can a fraudulent sale deed be cancelled?', a: 'Yes. A civil suit for cancellation of a sale deed executed by forgery or fraud can be filed, and an FIR can also be filed simultaneously.' },
    ],
  },
  {
    id: 'consumer',
    num: '05',
    label: '05 / Consumer Law',
    title: 'Consumer & Service Matters',
    navLabel: 'Consumer',
    intro: [
      'The Consumer Protection Act, 2019 and related service laws provide powerful remedies for individuals wronged by businesses, government departments, and service providers. Adv. KD helps clients navigate consumer forums efficiently.',
    ],
    services: [
      'Consumer forum complaints (District, State, National levels)',
      'Banking and insurance disputes',
      'Builder / real estate developer complaints (RERA)',
      'Medical negligence complaints',
      'Government service disputes (pension, promotions, transfers)',
      'Wrongful termination of government employees',
      'Senior citizens\u2019 maintenance tribunal proceedings',
    ],
    ctaLabel: 'Discuss Your Case →',
    infoTitle: 'Consumer Rights at a Glance',
    infoPoints: [
      { heading: 'Limitation Period', body: 'Consumer complaints must generally be filed within 2 years of the cause of action. Act promptly to preserve your rights.' },
      { heading: 'Compensation Available', body: 'In addition to refunds, forums can award compensation for mental agony, physical inconvenience, and cost of litigation.' },
      { heading: 'RERA (Real Estate)', body: 'Builders delaying possession can be taken to the Real Estate Regulatory Authority, which has strong enforcement powers.' },
    ],
    faqs: [
      { q: 'Can I file a consumer complaint without a lawyer?', a: 'Yes, but legal representation significantly improves the quality of the complaint and the chances of adequate compensation.' },
    ],
  },
  {
    id: 'environmental',
    num: '06',
    label: '06 / Environmental Compliance',
    title: 'Environmental Law',
    navLabel: 'Environmental',
    reverse: true,
    intro: [
      'Environmental disputes increasingly involve regulatory scrutiny, industrial compliance, and community rights. Adv. KD represents clients before environmental tribunals and pollution control authorities.',
      'From industrial clearances to pollution liability, every matter is handled with technical rigour and a clear grasp of both environmental statutes and enforcement realities.',
    ],
    services: [
      'National Green Tribunal (NGT) litigation',
      'Environmental Clearance (EC) applications and appeals',
      'Pollution Control Board (PPCB) compliance and notices',
      'Water & Air (Prevention of Pollution) Act matters',
      'Industrial waste and hazardous substance disputes',
      'Environmental Impact Assessment (EIA) challenges',
      'Land use and zoning violations',
      'Public Interest Litigation on environmental grounds',
    ],
    ctaLabel: 'Discuss Your Case →',
    infoTitle: 'Important to Know',
    infoPoints: [
      { heading: 'National Green Tribunal', body: 'Specialised forum for environmental disputes. Applications must typically be filed within 6 months of the cause of action.' },
      { heading: 'Environmental Clearance', body: 'Mandatory for specified categories of industrial and infrastructure projects under the EIA Notification 2006.' },
      { heading: 'Polluter Pays Principle', body: 'Courts and tribunals can hold industries liable for environmental remediation costs and compensation.' },
    ],
    faqs: [
      { q: 'Can an industry be shut down for pollution violations?', a: 'Yes — the PPCB or NGT can order closure, suspension of consent, or directions for remediation.' },
    ],
  },
];