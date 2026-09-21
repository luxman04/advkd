export type LegacySeedPost = {
  slug: string;
  title: string;
  category: string;
  date: string; // ISO for machine-readability
  displayDate: string;
  excerpt: string;
  body: string[]; // paragraphs
};

export const legacySeedPosts: LegacySeedPost[] = [
  {
    slug: 'fir-quashing-section-482-crpc',
    title: 'Can an FIR Be Quashed? Understanding Section 482 CrPC',
    category: 'Criminal Law',
    date: '2025-03-12',
    displayDate: 'March 12, 2025',
    excerpt:
      'Many people are unaware that the High Court holds inherent power to quash an FIR if it finds that the case is an abuse of process or that no prima facie offence is made out.',
    body: [
      'Under Section 482 of the Code of Criminal Procedure (now Section 528 BNSS), the High Court holds inherent powers to quash an FIR or criminal proceedings. This is a significant relief for persons who are falsely implicated in criminal cases.',
      'The Supreme Court of India has, through a series of judgments, laid down grounds on which quashing may be granted: where the allegations in the FIR, even if taken at face value, do not disclose any cognizable offence; where the FIR is manifestly attended with mala fide intent and has been filed to settle personal scores; where the case is a purely civil dispute given a criminal colour; or where the matter has been settled between the parties (especially in matrimonial disputes).',
      'A petition under Section 482 CrPC is filed before the Punjab & Haryana High Court. The court may grant interim stay of investigation or arrest during the pendency of the petition. If the court is satisfied, it passes an order quashing the FIR.',
      'Important: the power to quash is extraordinary and discretionary. Not every FIR can be quashed. The court will look at the totality of facts. If you believe you have been falsely implicated in an FIR, consult an advocate immediately to assess whether a quashing petition is maintainable in your case.',
    ],
  },
  {
    slug: 'nri-property-disputes-punjab',
    title: 'NRI Property Disputes in Punjab: What You Must Know',
    category: 'NRI Legal',
    date: '2025-02-28',
    displayDate: 'February 28, 2025',
    excerpt:
      'Non-Resident Indians often find their ancestral property illegally occupied or transferred without their consent. Here is a legal roadmap for NRIs dealing with property fraud in Punjab.',
    body: [
      'Property disputes are among the most common legal problems faced by Non-Resident Indians (NRIs) with roots in Punjab. Living abroad, many NRIs find their properties encroached upon, sold without consent, or entangled in fraudulent transactions.',
      'Common problems include illegal sale of property using forged Power of Attorney, relatives or tenants refusing to vacate, property under illegal possession of third parties, and fraudulent mutation in revenue records.',
      'Legal remedies available include a civil suit for declaration and possession, a criminal complaint where fraud or forgery is involved (IPC Sections 420, 467, 468), revenue court proceedings to challenge mutation, and a High Court writ where government officials are involved or there is urgency.',
      'Can NRIs manage this without coming to India? Yes, in most cases. By executing a registered Power of Attorney in favour of a trusted person or directly in favour of their advocate, NRIs can have their cases handled entirely in India without needing to travel. Video consultation with your advocate is now widely accepted and practical.',
    ],
  },
  {
    slug: 'anticipatory-bail-your-right-before-arrest',
    title: 'Anticipatory Bail: Your Right Before Arrest',
    category: 'Criminal Law',
    date: '2025-01-15',
    displayDate: 'January 15, 2025',
    excerpt:
      'If you apprehend arrest in a criminal case, you can apply for anticipatory bail before the Sessions Court or High Court. Acting fast is critical — here is what you need to know.',
    body: [
      'Anticipatory bail, provided under Section 438 of the CrPC (now Section 482 BNSS), allows a person to seek bail in anticipation of an arrest. It is one of the most important protections available to an accused.',
      'Any person who has reason to believe that they may be arrested for a non-bailable offence can apply for anticipatory bail. You do not need to wait until arrest — in fact, applying early is crucial.',
      'You may approach the Sessions Court (District Court) first, and the Punjab & Haryana High Court if the Sessions Court rejects the application, or in cases of urgency.',
      'The court considers the nature and gravity of the accusation, antecedents of the applicant, possibility of the applicant fleeing justice, and whether the accusation is made to humiliate or injure the person. Time is critical — once arrested, you can only apply for regular bail, a different and often slower process. Contact your advocate the moment you apprehend arrest.',
    ],
  },
  {
    slug: 'mutual-consent-divorce-guide',
    title: 'Divorce by Mutual Consent in India: A Step-by-Step Guide',
    category: 'Matrimonial Law',
    date: '2024-12-20',
    displayDate: 'December 20, 2024',
    excerpt:
      'Mutual consent divorce under Section 13B of the Hindu Marriage Act is the fastest and least contentious way for couples to separate. Here is how the process works.',
    body: [
      'If both spouses agree to end the marriage, a Mutual Consent Divorce under Section 13B of the Hindu Marriage Act, 1955 is the most sensible legal route. It is relatively quick, private, and avoids a prolonged contested trial.',
      'Eligibility requires both parties to be Hindu (or governed by the Hindu Marriage Act), to have lived separately for at least one year, to mutually agree that they cannot live together, and to agree on alimony, child custody, and property.',
      'The process has two motions. In the first motion, both parties jointly file a petition before the Family Court, which records their statements and grants a cooling-off period of six months. In the second motion, after six months (and within eighteen months), both parties appear again to confirm their decision, and the court passes the divorce decree.',
      'The Supreme Court in Amardeep Singh v. Harveen Kaur (2017) held that courts have discretion to waive the six-month period if the marriage has irretrievably broken down. Mutual consent divorce, done with proper legal advice, can be concluded within six to eight months.',
    ],
  },
  {
    slug: 'senior-citizens-eviction-rights',
    title: 'Senior Citizens and Eviction Rights Under the Maintenance Act',
    category: 'Senior Citizens',
    date: '2024-11-05',
    displayDate: 'November 5, 2024',
    excerpt:
      'The Maintenance and Welfare of Parents and Senior Citizens Act gives senior citizens powerful rights, including the ability to get their property back from children who neglect them.',
    body: [
      'The Maintenance and Welfare of Parents and Senior Citizens Act, 2007 is a landmark legislation that protects the rights of senior citizens.',
      'Section 23 of the Act is extremely powerful: if a senior citizen has transferred their property to any person on the condition of maintenance, and that person fails to provide maintenance, the transfer can be declared void.',
      'The Punjab & Haryana High Court has consistently upheld the right of senior citizens to have their children or relatives evicted from their property if those persons are causing mental and physical harassment.',
      'Each district has a Maintenance Tribunal headed by the Sub-Divisional Magistrate, which can order monthly maintenance, order eviction of the harassing person, and direct the return of property. Senior citizens should not suffer in silence — the law is on their side, and the remedies are swift and accessible.',
    ],
  },
  {
    slug: 'bail-in-non-bailable-offences',
    title: 'Understanding Bail in Non-Bailable Offences',
    category: 'Criminal Law',
    date: '2024-10-18',
    displayDate: 'October 18, 2024',
    excerpt:
      'Being charged with a non-bailable offence does not mean bail is impossible. Courts retain discretion and the right to personal liberty is constitutionally protected.',
    body: [
      'Many people believe that if they are charged with a non-bailable offence, bail is automatically refused. This is a misconception.',
      'Bailable offences entitle the accused to bail as a matter of right. Non-bailable offences do not give a right to bail — but bail can still be granted at the court\u2019s discretion, whether by the Magistrate Court, Sessions Court, or, under Section 439 CrPC, the High Court.',
      'The court considers the nature and gravity of the accusation, severity of the punishment upon conviction, reasonable apprehension of witnesses being tampered with, likelihood of the accused fleeing from justice, and the health, age, and sex of the accused.',
      'If you or a family member has been arrested, contact an advocate immediately — the first 24 hours are critical.',
    ],
  },
];
