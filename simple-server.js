const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 3000;

// MIME types for different file extensions
const MIME_TYPES = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
};

// Create HTTP server
const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  // Handle favicon.ico request
  if (req.url === '/favicon.ico') {
    res.writeHead(204); // No content
    res.end();
    return;
  }
  
  // Determine file path
  let filePath;
  if (req.url === '/' || req.url === '/index.html') {
    // Serve index.html for root path
    filePath = path.join(__dirname, 'src', 'index.html');
  } else {
    // Remove leading slash and determine if path starts with 'src/'
    const urlPath = req.url.startsWith('/') ? req.url.slice(1) : req.url;
    
    if (urlPath.startsWith('src/')) {
      // Path already includes src/ prefix
      filePath = path.join(__dirname, urlPath);
    } else {
      // Add src/ prefix to path
      filePath = path.join(__dirname, 'src', urlPath);
    }
  }
  
  // Get file extension and content type
  const extname = path.extname(filePath);
  const contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      console.error(`Error serving ${filePath}:`, err.message);
      
      if (err.code === 'ENOENT') {
        // File not found
        res.writeHead(404);
        res.end(`File not found: ${req.url}`);
      } else {
        // Server error
        res.writeHead(500);
        res.end(`Server error: ${err.code}`);
      }
    } else {
      // Success - serve the file
      console.log(`Successfully served: ${filePath}`);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content);
    }
  });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('Press Ctrl+C to stop the server');
});
