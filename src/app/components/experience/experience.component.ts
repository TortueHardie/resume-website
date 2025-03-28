import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';
import { AnimationsService } from '../../services/animations.service';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [CommonModule],
  animations: [
    AnimationsService.fadeInAnimation,
    AnimationsService.listAnimation
  ],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss'
})
export class ExperienceComponent implements OnInit {
  resumeData: ResumeData | null = null;
  animationState = true;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe(data => {
      this.resumeData = data;
      
      // Refresh animation state to trigger staggered animations
      setTimeout(() => {
        this.refreshAnimationState();
      }, 100);
    });
  }
  
  refreshAnimationState(): void {
    this.animationState = false;
    setTimeout(() => {
      this.animationState = true;
    }, 50);
  }
}
