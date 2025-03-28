import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map, of, catchError } from 'rxjs';

export interface Photo {
  id: number;
  title: string;
  description: string;
  thumbnailUrl: string;
  url: string;
  category: string;
}

@Injectable({
  providedIn: 'root'
})
export class PhotoService {
  private baseImagePath = 'assets/images/photography';
  private categories: { [key: string]: string } = {
    'landscape': 'Landscape',
    'urban': 'Urban',
    'macro': 'Macro',
    'portrait': 'Portrait'
  };

  constructor(private http: HttpClient) {}

  /**
   * Gets the list of photos by scanning the photography directory
   */
  getPhotos(): Observable<Photo[]> {
    return this.http.get<string[]>(`${this.baseImagePath}/index.json`).pipe(
      map(files => this.processPhotoFiles(files)),
      catchError(error => {
        console.error('Error loading photo data:', error);
        // Return fallback data
        return of(this.getFallbackPhotos());
      })
    );
  }

  /**
   * Process the file names to extract photo metadata
   */
  private processPhotoFiles(files: string[]): Photo[] {
    if (!files || !Array.isArray(files)) {
      console.warn('Invalid photo file list, using fallback data');
      return this.getFallbackPhotos();
    }

    const photos: Photo[] = [];
    let id = 1;

    // Group files by base name (without extension)
    const photoMap = new Map<string, { main: string, thumb: string }>();
    
    files.forEach(filename => {
      if (!filename.endsWith('.jpg')) return;
      
      const isThumb = filename.startsWith('thumb-');
      const baseName = isThumb ? filename.substring(6) : filename;
      const nameWithoutExt = baseName.replace('.jpg', '');
      
      if (!photoMap.has(nameWithoutExt)) {
        photoMap.set(nameWithoutExt, { main: '', thumb: '' });
      }
      
      const entry = photoMap.get(nameWithoutExt);
      if (isThumb) {
        entry!.thumb = filename;
      } else {
        entry!.main = filename;
      }
    });

    // Create photo objects for each valid pair
    photoMap.forEach((files, nameWithoutExt) => {
      if (!files.main || !files.thumb) return;
      
      // Extract category and number from the filename (e.g., "landscape1" -> "landscape")
      const matches = nameWithoutExt.match(/([a-z]+)(\d+)/i);
      if (!matches) return;
      
      const [, category, number] = matches;
      if (!category) return;
      
      const formattedCategory = this.categories[category.toLowerCase()] || this.capitalizeFirstLetter(category);
      
      photos.push({
        id: id++,
        title: this.generateTitle(formattedCategory, number),
        description: this.generateDescription(formattedCategory, number),
        category: formattedCategory,
        thumbnailUrl: `${this.baseImagePath}/${files.thumb}`,
        url: `${this.baseImagePath}/${files.main}`
      });
    });

    return photos;
  }

  /**
   * Helper to capitalize first letter
   */
  private capitalizeFirstLetter(string: string): string {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  /**
   * Generate a title based on category and number
   */
  private generateTitle(category: string, number: string): string {
    // Map of titles by category
    const titles: { [key: string]: string[] } = {
      'Landscape': [
        'Golden Sunrise', 'Mountain Majesty', 'Coastal Breeze', 'Natural Harmony',
        'Forest Whispers', 'Reflective Waters', 'Vast Horizons', 'Serene Landscape'
      ],
      'Urban': [
        'City Geometry', 'Street Chronicles', 'Urban Framework', 'Glass Reflections',
        'City Lights', 'Urban Texture', 'Concrete Jungle', 'Metropolitan Life',
        'Modern Architecture', 'Downtown Perspective', 'Urban Patterns'
      ],
      'Macro': [
        'Petal Patterns', 'Morning Dew', 'Tiny World', 'Natural Textures',
        'Miniature Universe', 'Hidden Details', 'Close Encounter'
      ],
      'Portrait': [
        'Natural Light Study', 'Candid Moment', 'Expressive Portrait', 
        'Shadow Play', 'Environmental Portrait', 'Character Study'
      ]
    };

    const index = parseInt(number) - 1;
    const categoryTitles = titles[category] || [];
    
    if (index >= 0 && index < categoryTitles.length) {
      return categoryTitles[index];
    }
    
    // Fallback if no specific title is found
    return `${category} Study ${number}`;
  }

  /**
   * Generate a description based on category and number
   */
  private generateDescription(category: string, number: string): string {
    // Map of descriptions by category
    const descriptions: { [key: string]: string[] } = {
      'Landscape': [
        'A breathtaking sunrise captured in its golden glory, painting the sky with vibrant colors.',
        'Majestic mountains reaching into the clouds, displaying nature\'s grandeur and scale.',
        'Coastal view with crashing waves and dramatic rock formations against the horizon.',
        'A peaceful natural landscape showcasing the harmonious beauty of untouched wilderness.',
        'Mystical forest path covered in morning mist, inviting exploration and wonder.',
        'Calm waters perfectly reflecting the surrounding landscape like a natural mirror.',
        'Expansive panoramic view capturing the vastness and beauty of the natural world.',
        'Serene landscape showcasing the peaceful coexistence of natural elements.'
      ],
      'Urban': [
        'Geometric patterns found in modern architecture, highlighting urban design elements.',
        'Street scene capturing the essence and energy of city life in motion.',
        'Urban skyline showcasing the impressive structure of metropolitan buildings.',
        'Reflections in city buildings creating abstract patterns of glass and light.',
        'Nighttime cityscape illuminated by countless lights, revealing the city\'s nocturnal character.',
        'Textures and patterns found in urban surfaces, creating abstract compositions.',
        'Dense urban environment showing the layered complexity of city structures.',
        'The bustle and movement of metropolitan life captured in a single frame.',
        'Bold lines and shapes of contemporary architecture creating visual impact.',
        'A view from the heart of downtown showing the urban perspective.',
        'Repeating elements in city design creating mesmerizing patterns.'
      ],
      'Macro': [
        'Intricate patterns and textures revealed in a close-up study of flower petals.',
        'Morning dew drops on a leaf, each one containing tiny reflections of the surrounding world.',
        'The fascinating details of insect anatomy revealed through close-up macro photography.',
        'Natural textures examined at extremely close range, revealing hidden patterns and details.',
        'Exploring the miniature universe that exists just beyond normal vision.',
        'Details invisible to the naked eye revealed through extreme close-up photography.',
        'An intimate encounter with the microscopic world around us.'
      ],
      'Portrait': [
        'A portrait bathed in soft, natural light that highlights authentic expressions and features.',
        'Candid moment capturing genuine emotion and personality without posed artifice.',
        'Artistic portrait utilizing creative lighting and composition to convey mood and character.',
        'Dramatic silhouette portrait playing with light and shadow to create a striking profile.',
        'Environmental portrait placing the subject within a meaningful context that tells their story.',
        'A study of character and personality revealed through thoughtful portraiture.'
      ]
    };

    const index = parseInt(number) - 1;
    const categoryDescriptions = descriptions[category] || [];
    
    if (index >= 0 && index < categoryDescriptions.length) {
      return categoryDescriptions[index];
    }
    
    // Fallback if no specific description is found
    return `An artistic study in the ${category.toLowerCase()} photography genre.`;
  }

  /**
   * Fallback photos in case the dynamic loading fails
   */
  private getFallbackPhotos(): Photo[] {
    // Return the same hardcoded array that was in the component
    return [
      {
        id: 1,
        title: "Golden Sunrise",
        description: "A breathtaking sunrise captured in its golden glory, painting the sky with vibrant colors.",
        category: "Landscape",
        thumbnailUrl: "assets/images/photography/thumb-landscape1.jpg",
        url: "assets/images/photography/landscape1.jpg"
      },
      // More fallback photos can be added here if needed
      {
        id: 2,
        title: "Mountain Majesty",
        description: "Majestic mountains reaching into the clouds, displaying nature's grandeur and scale.",
        category: "Landscape",
        thumbnailUrl: "assets/images/photography/thumb-landscape2.jpg",
        url: "assets/images/photography/landscape2.jpg"
      }
    ];
  }
} 