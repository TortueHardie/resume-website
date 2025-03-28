import { Injectable } from '@angular/core';
import { 
  trigger, 
  transition, 
  style, 
  query, 
  animateChild, 
  group, 
  animate, 
  keyframes,
  animation, 
  useAnimation, 
  stagger,
  state,
  AnimationMetadata
} from '@angular/animations';

export const fadeIn = animation([
  style({ opacity: 0 }),
  animate('{{duration}} {{delay}} ease-in-out', style({ opacity: 1 }))
], {
  params: { duration: '400ms', delay: '0ms' }
});

export const fadeOut = animation([
  style({ opacity: 1 }),
  animate('{{duration}} {{delay}} ease-in-out', style({ opacity: 0 }))
], {
  params: { duration: '300ms', delay: '0ms' }
});

export const slideIn = animation([
  style({ transform: 'translateY({{ start }})' }),
  animate('{{ duration }} {{ delay }} cubic-bezier(0.35, 0, 0.25, 1)', 
    style({ transform: 'translateY({{ end }})' }))
], {
  params: { start: '20px', end: '0', duration: '400ms', delay: '0ms' }
});

export const pulse = animation([
  animate('{{ duration }} ease-in-out', keyframes([
    style({ transform: 'scale(1)', offset: 0 }),
    style({ transform: 'scale({{ scale }})', offset: 0.5 }),
    style({ transform: 'scale(1)', offset: 1 })
  ]))
], {
  params: { scale: 1.05, duration: '500ms' }
});

@Injectable({
  providedIn: 'root'
})
export class AnimationsService {
  constructor() { }

  // Route change animations
  static routeAnimations = trigger('routeAnimations', [
    transition('* <=> *', [
      // Initial state of new page
      query(':enter', [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 0,
          transform: 'scale(0.95)'
        })
      ], { optional: true }),
      
      // Move out the old page
      query(':leave', [
        style({
          position: 'absolute',
          width: '100%',
          opacity: 1,
          transform: 'scale(1)'
        }),
        animate('0.3s ease-out', 
          style({
            opacity: 0,
            transform: 'scale(0.95)'
          }))
      ], { optional: true }),
      
      // Move in the new page
      query(':enter', [
        animate('0.4s ease-out', 
          style({
            opacity: 1,
            transform: 'scale(1)'
          }))
      ], { optional: true })
    ])
  ]);

  // List animations with staggered effect
  static listAnimation = trigger('listAnimation', [
    transition('* => *', [
      query(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        stagger('70ms', [
          animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
        ])
      ], { optional: true })
    ])
  ]);

  // Fade in animation
  static fadeInAnimation = trigger('fadeInAnimation', [
    transition(':enter', [
      useAnimation(fadeIn)
    ])
  ]);

  // Fade in/out animation for elements
  static fadeAnimation = trigger('fadeAnimation', [
    state('visible', style({ opacity: 1 })),
    state('hidden', style({ opacity: 0 })),
    transition('hidden => visible', [
      useAnimation(fadeIn)
    ]),
    transition('visible => hidden', [
      useAnimation(fadeOut)
    ])
  ]);

  // Slide in/out animation
  static slideAnimation = trigger('slideAnimation', [
    transition(':enter', [
      useAnimation(slideIn)
    ])
  ]);

  // Pulse animation for hover effects
  static pulseAnimation = trigger('pulseAnimation', [
    transition('* => pulse', [
      useAnimation(pulse),
      animate('0ms', style('*')), // Reset to default state
    ])
  ]);
}
