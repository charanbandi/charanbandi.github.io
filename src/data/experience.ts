export interface ExperienceItem {
  company: string
  title: string
  duration: string
  location: string
  description: string[]
  technologies: string[]
}

export const experiences: ExperienceItem[] = [
  {
    company: 'Gen Digital',
    title: 'Senior Software Engineer',
    duration: 'May 2023 — Present',
    location: 'Mountain View, California',
    description: [
      'Led architectural design and mentoring within the VPN team, driving technical redesigns of IPsec/IKEv2 tunnel management, VPN gateway configuration (StrongSwan/Libreswan), and routing algorithm optimization for Freemium/Premium user segregation.',
      'Integrated backend systems across Norton, Avast, Avira, and SurfEasy VPN platforms, managing 5,000+ servers across 100+ global locations serving millions of users.',
      'Architected and deployed scalable backend services using Python/Go on AWS and Azure, building critical cloud security features including dynamic VPN server provisioning and automated failover systems.',
      'Led migration of all Linux VPN servers from AMD64 to ARM64 architecture, delivering $168K in annual savings. Orchestrated infrastructure provider migrations, reducing costs by $15K/year, improving VPN connection speeds by 7%, and lowering server error rates by 37%.',
      'Built AI-driven systems for production support and problem management, including automated incident triage (Goalie) and root-cause analysis tooling that reduced mean-time-to-resolution.',
      'Internal AI hackathon finalist for architecting a Private VPN layer for LLM interactions, enabling automatic PII/PCI detection and filtering at the network edge.',
      'Supported the Gen Payments team managing over $5 billion in yearly e-commerce revenue by designing Java/Spring Boot integrations with external Payment Service Providers.',
    ],
    technologies: [
      'Python', 'Go', 'Java', 'Spring Boot', 'AWS', 'Azure', 'Terraform',
      'Terragrunt', 'Kubernetes', 'Docker', 'IPsec/IKEv2', 'StrongSwan',
      'Ruby on Rails', 'PostgreSQL', 'Redis', 'CI/CD',
    ],
  },
  {
    company: 'NortonLifeLock',
    title: 'Software Engineer',
    duration: 'July 2021 — May 2023',
    location: 'Virginia, United States',
    description: [
      'Designed and built cloud-native distributed systems in Python and Go, powering security services deployed across AWS and Azure with high availability and multi-region resilience.',
      'Developed and maintained secure, scalable CI/CD pipelines using Jenkins, TeamCity, and GitHub Actions, improving system reliability and shortening release cycles.',
      'Built and maintained REST APIs, serverless components (AWS Lambda), and database models serving multi-region traffic for Norton Secure VPN and SurfEasy VPN.',
      'Led end-to-end delivery of high-impact features for identity and security products, architecting backend systems with efficient load distribution and security logic that significantly reduced system downtime.',
      'Collaborated with DevOps, SRE, and technical support teams to troubleshoot complex production issues while mentoring junior engineers through code reviews.',
    ],
    technologies: [
      'Python', 'Go', 'AWS', 'Azure', 'Jenkins', 'TeamCity',
      'GitHub Actions', 'PostgreSQL', 'Oracle SQL', 'Redis', 'AWS Lambda', 'REST APIs',
    ],
  },
  {
    company: 'George Mason University',
    title: 'Research Assistant',
    duration: 'January 2020 — June 2021',
    location: 'Fairfax, Virginia',
    description: [
      'Developed ML-driven applications using Python (NLTK, spaCy, Scikit-learn, Keras) for NLP analysis, processing and analyzing over 200,000 datasets for IoT security research.',
      'Contributed to 3+ major research projects and 2 peer-reviewed IEEE publications on hardware vulnerability analysis.',
      'Designed scalable data processing pipelines that analyzed large datasets using Python and BeautifulSoup/Selenium, enhancing research workflow efficiency.',
    ],
    technologies: [
      'Python', 'NLTK', 'spaCy', 'Scikit-learn', 'Keras',
      'Selenium', 'BeautifulSoup', 'Linux', 'NLP', 'Machine Learning',
    ],
  },
  {
    company: 'George Mason University',
    title: 'Graduate Teaching Assistant',
    duration: 'August 2020 — April 2021',
    location: 'Virginia, United States',
    description: [
      'Facilitated the "IT Architecture Fundamentals" course by grading 100+ assignments, hosting weekly office hours, and responding to student queries.',
      'Contributed to curriculum design for undergraduate IT courses, aligning materials with industry-relevant learning outcomes.',
    ],
    technologies: [],
  },
  {
    company: 'Cyient Ltd',
    title: 'Software Engineer Intern',
    duration: 'March 2018 — August 2018',
    location: 'Hyderabad, India',
    description: [
      'Built a Resource Forecasting System using C# and Xamarin for cross-platform deployment, streamlining resource allocation across 10+ internal projects.',
      'Processed and analyzed organizational datasets using RESTful APIs, enabling data-driven project customization and resource planning.',
    ],
    technologies: [
      'C#', 'Xamarin', 'RESTful APIs', 'Data Analytics',
    ],
  },
]
