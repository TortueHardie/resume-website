import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterLinkActive],
  animations: [
    AnimationsService.fadeInAnimation,
    AnimationsService.slideAnimation,
    AnimationsService.pulseAnimation
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {
  resumeData: ResumeData | null = null;
  topSkills: string[] = ['Angular', 'TypeScript', 'JavaScript', 'HTML/CSS', 'Web Development'];
  displayName: string = '';
  nameTypingComplete: boolean = false;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe(data => {
      this.resumeData = data;
      
      // Populate top skills if available in resume data
      if (data?.skills?.length) {
        const mainSkills = data.skills
          .filter(skill => skill.level === 'Advanced' || skill.level === 'Expert')
          .map(skill => skill.name)
          .slice(0, 5);
          
        if (mainSkills.length > 0) {
          this.topSkills = mainSkills;
        }
      }
      
      // Trigger animations after data is loaded
      setTimeout(() => {
        this.triggerPulseAnimation();
        this.startTypingAnimation();
      }, 500);
    });
  }

  getLocation(): string {
    if (!this.resumeData?.basics?.location) {
      return 'Location not specified';
    }
    
    const location = this.resumeData.basics.location;
    const parts = [];
    
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);
    if (location.countryCode) parts.push(location.countryCode);
    
    return parts.join(', ') || 'Location not specified';
  }
  
  triggerPulseAnimation(): void {
    if (typeof document !== 'undefined') {
      const element = document.querySelector('.availability-highlight');
      if (element) {
        element.classList.add('pulse-animation');
        setTimeout(() => {
          element.classList.remove('pulse-animation');
        }, 500);
      }
    }
  }
  
  startTypingAnimation(): void {
    if (this.resumeData?.basics?.name) {
      const name = this.resumeData.basics.name;
      this.displayName = '';
      
      let i = 0;
      const typeInterval = setInterval(() => {
        if (i < name.length) {
          this.displayName += name.charAt(i);
          i++;
        } else {
          this.nameTypingComplete = true;
          clearInterval(typeInterval);
        }
      }, 100);
    }
  }
}
