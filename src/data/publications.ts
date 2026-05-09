export interface Publication {
  title: string
  authors: string
  conference: string
  year: number
  doi: string
  doiUrl: string
  citations: number
  isFirstAuthor?: boolean
}

export const publications: Publication[] = [
  {
    title: 'Ontology-Driven Framework for Trend Analysis of Vulnerabilities and Impacts in IoT Hardware',
    authors: 'C. Bandi, S. Salehi, R. Hassan, S. Manoj P. D., H. Homayoun, S. Rafatirad',
    conference: '2021 IEEE 15th International Conference on Semantic Computing (ICSC)',
    year: 2021,
    doi: '10.1109/ICSC50631.2021.00045',
    doiUrl: 'https://doi.org/10.1109/ICSC50631.2021.00045',
    citations: 16,
    isFirstAuthor: true,
  },
  {
    title: 'Automated Supervised Topic Modeling Framework for Hardware Weaknesses',
    authors: 'R. Hassan, C. Bandi, M.-T. Tsai, S. Golchin, S. Manoj P. D., S. Rafatirad, S. Salehi',
    conference: '2023 24th International Symposium on Quality Electronic Design (ISQED)',
    year: 2023,
    doi: '10.1109/ISQED57927.2023.10129378',
    doiUrl: 'https://doi.org/10.1109/ISQED57927.2023.10129378',
    citations: 13,
  },
]
