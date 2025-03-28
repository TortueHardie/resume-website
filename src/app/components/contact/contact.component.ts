import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  resumeData: ResumeData | null = null;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    this.resumeService.getResumeData().subscribe(data => {
      this.resumeData = data;
    });
  }

  getLocation(): string {
    if (!this.resumeData?.basics?.location) {
      return 'Location not specified';
    }
    
    const location = this.resumeData.basics.location;
    const parts = [];
    
    if (location.address) parts.push(location.address);
    if (location.city) parts.push(location.city);
    if (location.region) parts.push(location.region);
    if (location.postalCode) parts.push(location.postalCode);
    if (location.countryCode) parts.push(location.countryCode);
    
    return parts.join(', ') || 'Location not specified';
  }
}
