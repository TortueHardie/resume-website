import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { AnimationsService } from './services/animations.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet,
    HeaderComponent,
    FooterComponent
  ],
  animations: [
    AnimationsService.routeAnimations
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'resume-website';
  particlePositions: {left: string, top: string}[] = [];
  
  ngOnInit() {
    // Pre-generate random positions for particles
    for (let i = 0; i < 10; i++) {
      this.particlePositions.push({
        left: this.getRandomPosition() + '%',
        top: this.getRandomPosition() + '%'
      });
    }
  }
  
  // Prepare the animation based on the route data
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
  
  // Generate random position for particles
  private getRandomPosition(): number {
    return Math.floor(Math.random() * 100);
  }
}
