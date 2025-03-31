# Inspirational Quotes Website

A simple, elegant website that displays random motivational and romantic quotes. Features include a favorites system, beautiful animations, and a responsive design.

## Features

- Random quote display on page load/refresh
- Toggle between romantic and motivational categories
- Favorites system using localStorage
- Falling petals animation for romantic quotes
- Responsive design for all devices
- Docker containerization for easy deployment
- GitHub Actions CI/CD pipeline

## Local Development

### Prerequisites

- Node.js (for local development server)
- Docker and Docker Compose (for containerized deployment)
- Git (for version control and CI/CD)

### Running Locally

1. Clone the repository:
   ```
   git clone <your-repository-url>
   cd quotes-website
   ```

2. Start the local development server:
   ```
   node serve.js
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Building with Docker

1. Build the Docker image:
   ```
   docker build -t quotes-website .
   ```

2. Run the container:
   ```
   docker run -p 80:80 quotes-website
   ```

3. Access the website at `http://localhost`

### Using Docker Compose

1. Start the service:
   ```
   docker-compose up -d
   ```

2. Access the website at `http://localhost`

3. Stop the service:
   ```
   docker-compose down
   ```

## Deployment

### Setting up GitHub CI/CD

1. Create a GitHub repository and push your code:
   ```
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repository-url>
   git push -u origin main
   ```

2. Add the following secrets to your GitHub repository:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
   - `SSH_HOST`: Your VPS IP address
   - `SSH_USERNAME`: Your VPS username
   - `SSH_PRIVATE_KEY`: Your private SSH key for VPS access

3. Push changes to the `main` branch to trigger automatic deployment.

### Manual Deployment to VPS

1. SSH into your VPS:
   ```
   ssh user@your-vps-ip
   ```

2. Clone the repository:
   ```
   git clone <your-repository-url>
   cd quotes-website
   ```

3. Build and run with Docker Compose:
   ```
   docker-compose up -d
   ```

## Customization

### Adding More Quotes

Edit the `src/data/quotes.json` file to add more quotes to either category:

```json
{
  "romantic": [
    {
      "text": "Your quote here",
      "author": "Author Name"
    },
    // More quotes...
  ],
  "motivational": [
    // Quotes...
  ]
}
```

### Changing the Theme

Modify the CSS variables in `src/css/style.css` to change the color scheme:

```css
:root {
    --primary-color: #ff6b6b;
    --secondary-color: #f9f7f7;
    --text-color: #333;
    --accent-color: #ffd8d8;
}
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
