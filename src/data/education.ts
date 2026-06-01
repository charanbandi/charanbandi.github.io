export interface EducationItem {
  degree: string
  field: string
  institution: string
  location: string
  duration: string
  gpa: string
  gpaScale: string
  highlights: string[]
}

export const educationItems: EducationItem[] = [
  {
    degree: 'Master of Science',
    field: 'Computer Science',
    institution: 'George Mason University',
    location: 'Fairfax, Virginia',
    duration: '2019 — 2021',
    gpa: '3.70',
    gpaScale: '4.0',
    highlights: [
      'Published 2 peer-reviewed IEEE papers on IoT hardware vulnerability analysis',
      'Research focus: NLP, machine learning, and cybersecurity',
      'Graduate Teaching Assistant — IT Architecture Fundamentals',
    ],
  },
  {
    degree: 'Bachelor of Technology',
    field: 'Computer Science',
    institution: 'GITAM University',
    location: 'Hyderabad, India',
    duration: '2015 — 2019',
    gpa: '8.56',
    gpaScale: '10',
    highlights: [
      'Built cross-platform resource forecasting system (C# / Xamarin)',
      'Internship at Cyient Ltd — software engineering and data analytics',
    ],
  },
]