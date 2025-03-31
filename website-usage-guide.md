# Quotes Website Usage Guide

We've created multiple ways to run the quotes website to ensure it works regardless of any terminal or server issues. Here are the different methods you can use:

## Method 1: Using the Node.js Server

This is the original approach that uses a Node.js server to serve the website:

1. Open a terminal (Command Prompt or PowerShell)
2. Navigate to the project directory
3. Run the server using one of these commands:
   ```
   node serve.js
   ```
   or
   ```
   start-server.bat
   ```
4. Open your browser and go to http://localhost:3000

## Method 2: Using the Standalone HTML File

This approach doesn't require a server and can be opened directly in any browser:

1. Simply double-click the `standalone.html` file in File Explorer
2. Or right-click and select "Open with" your preferred browser

The standalone version has all the same features as the server version, including:
- Random quotes from romantic and motivational categories
- Favorites system using localStorage
- Falling petals animation for romantic quotes
- Responsive design

## Method 3: Using Docker

For a production-ready deployment:

1. Build the Docker image:
   ```
   docker build -t quotes-website .
   ```

2. Run the container:
   ```
   docker run -p 80:80 quotes-website
   ```

3. Access the website at http://localhost

## Method 4: GitHub CI/CD Pipeline

For automatic deployment to your VPS:

1. Push the code to GitHub
2. The GitHub Actions workflow will automatically:
   - Build the Docker image
   - Push it to Docker Hub
   - Deploy it to your VPS

## Troubleshooting

If you encounter issues with any method:

1. **Server not starting**: Try using the standalone HTML file instead
2. **Terminal issues**: Switch between PowerShell and Command Prompt using the provided scripts
3. **Browser not showing the website**: Check if the server is running and try a different browser

## Next Steps

Once you've verified the website is working correctly, you can:

1. Expand the quotes collection in `src/data/quotes.json`
2. Customize the design by modifying `src/css/style.css`
3. Deploy to your VPS using the Docker and GitHub CI/CD approach
