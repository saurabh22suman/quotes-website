const http = require('http');
const fs = require('fs');
const path = require('path');

// Write to a log file
const timestamp = new Date().toISOString();
fs.appendFileSync('server.log', `\n\n${timestamp} - Server starting...\n`);

const PORT = 3000;

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

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);
  fs.appendFileSync('server.log', `${new Date().toISOString()} - ${req.method} ${req.url}\n`);
  
  // Handle paths
  let filePath;
  if (req.url === '/') {
    // Root path - serve index.html
    filePath = path.join(__dirname, 'src', 'index.html');
  } else if (req.url.startsWith('/src/')) {
    // Already includes src/ prefix
    filePath = path.join(__dirname, req.url);
  } else {
    // Add src/ prefix for relative paths
    filePath = path.join(__dirname, 'src', req.url);
  }
  
  // Get file extension
  const extname = path.extname(filePath);
  let contentType = MIME_TYPES[extname] || 'application/octet-stream';
  
  // Log file path
  fs.appendFileSync('server.log', `Attempting to serve file: ${filePath}\n`);
  
  // Read file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        // Page not found
        fs.appendFileSync('server.log', `File not found: ${filePath}\n`);
        fs.readFile(path.join(__dirname, 'src', '404.html'), (err, content) => {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end(content || '404 Not Found', 'utf-8');
        });
      } else {
        // Server error
        fs.appendFileSync('server.log', `Server error: ${err.code} - ${err.message}\n`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      // Success
      fs.appendFileSync('server.log', `Successfully served: ${filePath}\n`);
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  const message = `Server running at http://localhost:${PORT}/\nPress Ctrl+C to stop the server`;
  console.log(message);
  fs.appendFileSync('server.log', message + '\n');
});
