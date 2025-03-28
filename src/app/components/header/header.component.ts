import { Component, OnInit, HostListener, Pipe, PipeTransform } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';
import { AnimationsService } from '../../services/animations.service';

// Create a truncate pipe for the subtitle
@Pipe({
  name: 'truncate',
  standalone: true
})
export class TruncatePipe implements PipeTransform {
  transform(value: string, maxLength: number = 30): string {
    if (!value) return '';
    if (value.length <= maxLength) return value;
    return `${value.slice(0, maxLength)}...`;
  }
}

interface NavItem {
  path: string;
  label: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  animations: [
    AnimationsService.fadeInAnimation,
    AnimationsService.slideAnimation,
    AnimationsService.pulseAnimation
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {
  resumeData: ResumeData | null = null;
  isMobileMenuOpen = false;
  isScrolled = false;
  hoverState = '';
  
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
    
    this.checkScrollPosition();
  }

  @HostListener('window:scroll')
  checkScrollPosition() {
    // Check if window exists (for SSR compatibility)
    if (typeof window !== 'undefined') {
      this.isScrolled = window.scrollY > 20;
    } else {
      this.isScrolled = false;
    }
  }

  toggleMobileMenu(): void {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
    // Prevent scrolling when menu is open
    if (typeof document !== 'undefined') {
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : 'auto';
    }
  }

  closeMobileMenu(): void {
    this.isMobileMenuOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'auto';
    }
  }
  
  onNavHover(itemLabel: string): void {
    this.hoverState = itemLabel;
  }
}
