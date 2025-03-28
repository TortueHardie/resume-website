const fs = require('fs');
const path = require('path');

// Configuration
const photoDir = path.join(__dirname, '../src/assets/images/photography');
const outputFile = path.join(photoDir, 'index.json');

// Get all files from the directory
function getPhotoFiles() {
  try {
    const files = fs.readdirSync(photoDir);
    
    // Filter out directories and non-image files
    return files.filter(file => {
      const filePath = path.join(photoDir, file);
      const isDirectory = fs.statSync(filePath).isDirectory();
      const isImage = /\.(jpg|jpeg|png|gif)$/i.test(file);
      
      return !isDirectory && isImage;
    });
  } catch (error) {
    console.error('Error reading photography directory:', error);
    return [];
  }
}

// Generate and save the index file
function generateIndexFile() {
  const files = getPhotoFiles();
  
  if (files.length === 0) {
    console.warn('No photo files found in the directory.');
    return;
  }
  
  try {
    fs.writeFileSync(outputFile, JSON.stringify(files, null, 2));
    console.log(`Successfully generated index file with ${files.length} photos at: ${outputFile}`);
  } catch (error) {
    console.error('Error writing index file:', error);
  }
}

// Execute the script
generateIndexFile(); 