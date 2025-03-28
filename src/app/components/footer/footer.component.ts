import { Component, OnInit, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';
import { AnimationsService } from '../../services/animations.service';

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    AnimationsService.fadeInAnimation,
    AnimationsService.fadeAnimation
  ],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent implements OnInit {
  resumeData: ResumeData | null = null;
  currentYear = new Date().getFullYear();
  lastUpdated = new Date();
  showScrollTop = false;
  
  navItems: NavItem[] = [
    { path: '/about', label: 'About' },
    { path: '/experience', label: 'Experience' },
    { path: '/skills', label: 'Skills' },
    { path: '/education', label: 'Education' },
    { path: '/projects', label: 'Projects' },
    { path: '/contact', label: 'Contact' }
  ];

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe(data => {
      this.resumeData = data;
    });
  }
  
  @HostListener('window:scroll')
  checkScrollPosition() {
    this.showScrollTop = window.scrollY > 300;
  }
  
  scrollToTop(): void {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}
