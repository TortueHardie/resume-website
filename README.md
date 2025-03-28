# Resume Website

A modern, dynamic resume website built with Angular showcasing professional experience, skills, education, and personal interests.

## Features

- Responsive design for all devices
- Dynamic content management
- Interactive sections for experience, skills, education, and projects
- Photography portfolio gallery
- Personal interests showcase

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
# Clone the repository
git clone https://github.com/your-username/resume-website.git

# Navigate to project directory
cd resume-website

# Install dependencies
npm install

# Start the development server
npm start
```

The application will be available at `http://localhost:4200/`.

## Adding Your Photos

The website includes a photography portfolio section where you can showcase your work. To add your photos:

1. **Prepare your images**:
   - Create full-size images for the lightbox view
   - Create thumbnail versions (recommended size: 400x300px) for the gallery grid
   
2. **Add images to the project**:
   - Place full-size photos in the `src/assets/images/photography/` directory
   - Place thumbnails in the same directory with a `thumb-` prefix

3. **Update the photos array**:
   - Open `src/app/components/projects/projects.component.ts`
   - Update the `photos` array with your own photos:

```typescript
this.photos = [
  {
    id: 1,
    title: 'Your Photo Title',
    description: 'Description of your photo',
    thumbnailUrl: 'assets/images/photography/thumb-yourphoto.jpg',
    url: 'assets/images/photography/yourphoto.jpg',
    category: 'Your Category'
  },
  // Add more photos...
];
```

## Customizing Your Resume

To update your resume information:

1. Open `src/app/services/resume.service.ts`
2. Modify the `resumeDataSubject` object with your personal information

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment

The production build can be deployed to any static hosting service like GitHub Pages, Netlify, or Vercel.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
