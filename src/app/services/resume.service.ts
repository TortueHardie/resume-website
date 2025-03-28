import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ResumeData } from '../models/resume.model';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private resumeDataSubject = new BehaviorSubject<ResumeData>({
    basics: {
      name: 'Colin LIENARD',
      label: 'Student in the 4th year of the engineering cycle for computer science at CESI engineering school',
      image: 'assets/images/profile.png',
      email: 'colin.lienard@viacesi.fr',
      phone: '(+33)7 82 65 30 10',
      summary: 'Currently seeking an abroad internship starting 14 July 2025 for 12 weeks minimum.',
      location: {
        address: '21 rue de l\'Ouchette',
        city: 'Gorges',
        region: 'Pays de la Loire',
        postalCode: '44190',
        countryCode: 'FR'
      },
      profiles: [
        {
          network: 'LinkedIn',
          username: 'Colin LIENARD',
          url: 'https://www.linkedin.com/in/colin-lienard-910b39257/'
        },
        {
          network: 'GitHub',
          username: 'TortueHardie',
          url: 'https://github.com/TortueHardie/'
        }
      ]
    },
    experience: [
      {
        company: 'ERCOGENER',
        position: 'Internship and apprenticeship',
        website: 'https://ercogener.com/',
        startDate: 'April 2023',
        endDate: 'Present',
        summary: 'Participated in a 4-month internship at ERCOGENER in Angers and join them as an apprentice just after',
        highlights: [
          'Participated in the creation of an IoT platform',
          'Contributed to the development of the frontend and user experience',
          'Involved in integrating new sensors into the platform (backend)',
          'Contributed to the implementation of automated tests on the new platform (DevOps)',
          'Development of an advanced map widget for the platform',
          'Participating in bug fixes on the platform',
          'Active participation in reunion'
        ]
      },
      {
        company: 'IBM',
        position: 'ELA association Hackathon participant',
        website: 'https://www.ibm.com/fr-fr',
        startDate: '2022',
        endDate: '2023',
        summary: 'Participation in the ELA association Hackathon organized by IBM',
        highlights: [
          'The objective was to develop an immersive VR environment to help children thrive in groups of 5'
        ]
      }
    ],
    education: [
      {
        institution: 'CESI Engineering School',
        area: 'Computer Engineering',
        studyType: 'Engineering cycle',
        startDate: '2021',
        endDate: 'Present',
        gpa: '',
        courses: [
          'Currently 4th year of Computer Engineering cycle',
          '1st year of General Engineering preparatory cycle'
        ]
      },
      {
        institution: 'Aimé Césaire High School',
        area: 'Mathematics, Engineering Sciences',
        studyType: 'High School Diploma (General)',
        startDate: '2018',
        endDate: '2021',
        gpa: '',
        courses: [
          'Mathematics, Engineering Sciences'
        ]
      }
    ],
    skills: [
      {
        name: 'Technical Environment',
        level: 'Varied',
        keywords: [
          'Unity: Creating immersive VR environments',
          'C++: Developing an application to save datas',
          'ARDUINO: Building a weather station',
          'SQL: Creating and managing databases',
          'HTML, CSS, JavaScript, Angular, TypeScript: Developing a website',
          'PYTHON: Developing tests scripts'
        ]
      },
      {
        name: 'Collaboration Tools',
        level: 'Experienced',
        keywords: [
          'GitHub',
          'Jira',
          'Teams'
        ]
      },
      {
        name: 'Soft Skills',
        level: 'Advanced',
        keywords: [
          'Team player',
          'Patient',
          'Serious',
          'Attentive observer',
          'Demonstrates great self-control'
        ]
      },
      {
        name: 'Languages',
        level: 'Advanced (B1)',
        keywords: [
          'English: 940/990 TOEIC Score'
        ]
      }
    ],
    projects: [
      {
        name: 'VR Immersive Environment',
        description: 'Development of an immersive VR environment for the ELA association to help children thrive in groups.',
        technologies: ['Unity', 'VR Development'],
        url: '',
        images: ['assets/images/project1.jpg']
      },
      {
        name: 'IoT Platform',
        description: 'Contributed to the development of an IoT platform at ERCOGENER including frontend, backend, and DevOps work.',
        technologies: ['Angular', 'TypeScript', 'DevOps'],
        url: '',
        images: ['assets/images/project2.jpg']
      }
    ],
    interests: [
      {
        name: 'Photography',
        description: 'Passionate about capturing moments and telling stories through images. Interested in landscape and urban photography.',
        keywords: ['Landscape', 'Urban']
      },
      {
        name: 'Video Games',
        description: 'Enthusiastic about team-based and strategic video games. Enjoy collaborating with others and developing strategic thinking.',
        keywords: ['Team-Based Games', 'Strategic Games']
      }
    ]
  });

  constructor() { }

  getResumeData(): Observable<ResumeData> {
    return this.resumeDataSubject.asObservable();
  }

  updateResumeData(newData: Partial<ResumeData>): void {
    const currentData = this.resumeDataSubject.getValue();
    this.resumeDataSubject.next({
      ...currentData,
      ...newData
    });
  }
}
