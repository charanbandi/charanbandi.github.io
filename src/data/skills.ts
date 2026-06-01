export interface SkillCategory {
  title: string
  icon: string
  skills: string[]
}

export const skillCategories: SkillCategory[] = [
  {
    title: 'Languages & Frameworks',
    icon: 'code-2',
    skills: [
      'Python', 'Go', 'Java', 'Spring Boot', 'C/C++',
      'Ruby on Rails', 'Node.js', 'React', 'TypeScript',
    ],
  },
  {
    title: 'Cloud & DevOps',
    icon: 'cloud',
    skills: [
      'AWS', 'Azure', 'Docker', 'Kubernetes',
      'Terraform', 'Terragrunt', 'Ansible',
      'Jenkins', 'GitHub Actions', 'Linux',
    ],
  },
  {
    title: 'AI & Machine Learning',
    icon: 'brain',
    skills: [
      'AI Systems', 'LLM Integration', 'RAG Pipelines',
      'NLP', 'PII/PCI Detection', 'TensorFlow',
      'Scikit-learn', 'AI-Driven Automation',
    ],
  },
  {
    title: 'Networking & Security',
    icon: 'shield',
    skills: [
      'IPsec/IKEv2', 'StrongSwan', 'Libreswan', 'OpenVPN',
      'WireGuard', 'TLS/SSL', 'TCP/IP', 'DNS',
      'Zero Trust', 'PKI/Certificates',
    ],
  },
  {
    title: 'Databases',
    icon: 'database',
    skills: [
      'PostgreSQL', 'Redis', 'DynamoDB',
      'MySQL', 'MongoDB', 'Oracle SQL', 'Databricks',
    ],
  },
  {
    title: 'API & Integration',
    icon: 'webhook',
    skills: [
      'REST APIs', 'GraphQL', 'Webhooks',
      'JWT/OAuth2', 'OpenAPI', 'gRPC',
    ],
  },
  {
    title: 'Observability',
    icon: 'activity',
    skills: [
      'Sumo Logic', 'Datadog', 'Zabbix',
      'Nagios', 'Grafana', 'Prometheus', 'PagerDuty',
    ],
  },
  {
    title: 'Tools & Practices',
    icon: 'wrench',
    skills: [
      'Git', 'Jira', 'Confluence', 'Agile',
      'Microservices', 'CI/CD', 'Selenium', 'JUnit',
    ],
  },
]