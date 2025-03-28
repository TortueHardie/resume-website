import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from '../../services/resume.service';
import { ResumeData } from '../../models/resume.model';
import { PhotoService, Photo } from '../../services/photo.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  resumeData: ResumeData | null = null;
  photos: Photo[] = [];
  filteredPhotos: Photo[] = [];
  selectedPhoto: Photo | null = null;
  isModalOpen = false;
  categories: string[] = [];
  activeCategory: string = 'All';
  
  // GitHub profile URL
  githubProfileUrl: string = 'https://github.com/TortueHardie/';
  
  // Track image loading state
  imageLoading: boolean = false;

  constructor(
    private resumeService: ResumeService,
    private photoService: PhotoService
  ) {}

  ngOnInit(): void {
    // Load resume data
    this.resumeService.getResumeData().subscribe(data => {
      this.resumeData = data;
    });
    
    // Load photos dynamically
    this.photoService.getPhotos().subscribe(photos => {
      this.photos = photos;
      // Extract unique categories
      this.categories = ['All', ...new Set(this.photos.map(photo => photo.category))];
      this.filteredPhotos = [...this.photos];
    });
  }

  openPhotoModal(photo: Photo): void {
    this.imageLoading = true;
    this.selectedPhoto = photo;
    
    // Prevent scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Save current scroll position to properly position the modal
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${scrollY}px`;
    
    // Preload image to ensure it's ready when displayed
    const img = new Image();
    
    img.onload = () => {
      // Short delay to ensure modal is ready before showing image
      setTimeout(() => {
        this.imageLoading = false;
        // Set modal to open after image is loaded to ensure proper positioning
        this.isModalOpen = true;
      }, 100);
    };
    
    img.onerror = () => {
      console.error('Failed to load image:', photo.url);
      this.imageLoading = false;
      this.isModalOpen = true;
      
      // Fallback to thumbnail if full image fails to load
      if (this.selectedPhoto && this.selectedPhoto.id === photo.id) {
        const fallbackImg = new Image();
        fallbackImg.onload = () => {
          // Update selected photo to use thumbnail as fallback
          if (this.selectedPhoto) {
            this.selectedPhoto = {
              ...this.selectedPhoto,
              url: this.selectedPhoto.thumbnailUrl
            };
          }
        };
        fallbackImg.src = photo.thumbnailUrl;
      }
    };
    
    // Start loading the image
    img.src = photo.url;
  }

  closePhotoModal(): void {
    this.isModalOpen = false;
    
    // Restore scrolling and position
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.width = '';
    document.body.style.top = '';
    document.body.style.overflow = 'auto';
    window.scrollTo(0, parseInt(scrollY || '0') * -1);
  }
  
  filterByCategory(category: string): void {
    this.activeCategory = category;
    this.filteredPhotos = category === 'All' 
      ? this.photos 
      : this.photos.filter(photo => photo.category === category);
  }
  
  // Navigate through photos in the modal
  nextPhoto(): void {
    if (!this.selectedPhoto) return;
    const currentIndex = this.filteredPhotos.findIndex(p => p.id === this.selectedPhoto!.id);
    const nextIndex = (currentIndex + 1) % this.filteredPhotos.length;
    this.openPhotoModal(this.filteredPhotos[nextIndex]);
  }
  
  prevPhoto(): void {
    if (!this.selectedPhoto) return;
    const currentIndex = this.filteredPhotos.findIndex(p => p.id === this.selectedPhoto!.id);
    const prevIndex = (currentIndex - 1 + this.filteredPhotos.length) % this.filteredPhotos.length;
    this.openPhotoModal(this.filteredPhotos[prevIndex]);
  }
}
