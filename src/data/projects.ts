export interface Project {
  title: string
  subtitle: string
  description: string
  technologies: string[]
  impacts: string[]
  isInternal?: boolean
  isHackathonFinalist?: boolean
  image?: string
  links?: { label: string; url: string }[]
}

export const projects: Project[] = [
  {
    title: 'Private VPN Layer for LLM Interactions',
    subtitle: 'AI Hackathon Finalist · Gen Digital',
    isHackathonFinalist: true,
    description:
      'Designed and prototyped a Private VPN layer that sits between consumer applications and Large Language Model services, enabling automatic detection and filtration of PII and PCI data at the network edge before it reaches external AI providers. The system intercepts outbound LLM API requests, scans payloads for sensitive data patterns using regex and ML-based classifiers, redacts or masks detected fields, and forwards sanitized requests. Responses are similarly inspected before returning to the consumer.',
    technologies: [
      'Python', 'VPN Tunneling', 'LLM APIs', 'PII/PCI Detection', 'Network Security',
    ],
    impacts: [
      'AI Hackathon Finalist',
      'Automatic PII/PCI detection',
      'Zero app code changes required',
      'Network-edge privacy protection',
    ],
    isInternal: true,
    image: '/images/hackathon-flow.png',
  },
  {
    title: 'Goalie: AI-Driven Incident Triage',
    subtitle: 'Automated Problem Management for VPN Infrastructure',
    description:
      'Built an AI-driven system for production support and problem management across Gen Digital\'s VPN platform. Goalie automatically triages incoming incidents by analyzing alert patterns, historical resolution data, and system metrics to classify severity, identify probable root causes, and recommend resolution steps. Integrated with Sumo Logic, Datadog, and PagerDuty to create a unified incident response pipeline.',
    technologies: [
      'Python', 'AI/ML', 'Sumo Logic', 'Datadog', 'PagerDuty', 'Automation',
    ],
    impacts: [
      'Reduced mean-time-to-resolution',
      'Automated incident classification',
      'Unified monitoring pipeline',
      'Deployed across VPN platform',
    ],
    isInternal: true,
  },
  {
    title: 'NVD & CWE Vulnerability Security System',
    subtitle: 'IoT Hardware Vulnerability Analysis using NLP and ML',
    description:
      'Engineered a Natural Language Processing system using NLTK and spaCy, achieving 95% accuracy in POS tagging, with a PyQt5 GUI for IoT security that processed over 200,000 datasets. Developed ML models leveraging Time Series Prediction, Auto Regression, and LSTM RNNs to forecast features including vector magnitudes, impact levels, and potential future security threats. Selected for publication at two IEEE conferences.',
    technologies: [
      'Python', 'NLTK', 'spaCy', 'Scikit-learn', 'Keras', 'Selenium', 'BeautifulSoup', 'PyQt5',
    ],
    impacts: [
      '95% POS tagging accuracy',
      '200,000+ datasets processed',
      '2 IEEE publications',
      'LSTM RNN forecasting models',
    ],
  },
  {
    title: 'Housing Analytics Platform',
    subtitle: 'Data-Driven Real Estate Intelligence on Android',
    description:
      'Developed a data-driven Java application targeting U.S. real estate challenges, comprising over 20,000 lines of code and integrating 30+ third-party libraries. Improved housing data visualization and analytics for a dataset of 1.5 million properties. Designed robust MongoDB databases with advanced Mongoose schemas and integrated machine learning algorithms for accurate housing price predictions.',
    technologies: [
      'Java', 'Android', 'Node.js', 'MongoDB', 'REST APIs', 'Machine Learning',
    ],
    impacts: [
      '20,000+ lines of code',
      '1.5M property dataset',
      '30+ library integrations',
      'ML-powered predictions',
    ],
  },
]
