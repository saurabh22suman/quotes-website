# GitHub Repository Setup Guide

Follow these steps to create a GitHub repository and push your quotes website code to it:

## 1. Create a New GitHub Repository

1. Go to [GitHub](https://github.com/) and sign in to your account
2. Click the "+" icon in the top-right corner and select "New repository"
3. Enter a repository name (e.g., "quotes-website")
4. Add a description (optional): "A simple website that displays random motivational and romantic quotes"
5. Choose visibility (Public or Private)
6. Do NOT initialize the repository with a README, .gitignore, or license (since we already have these files locally)
7. Click "Create repository"

## 2. Connect Your Local Repository to GitHub

After creating the repository, GitHub will show you commands to push an existing repository. Use the following commands:

```bash
# Replace YOUR_USERNAME with your GitHub username and REPO_NAME with your repository name
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git
git branch -M main
git push -u origin main
```

For example, if your GitHub username is "johndoe" and your repository name is "quotes-website", the commands would be:

```bash
git remote add origin https://github.com/johndoe/quotes-website.git
git branch -M main
git push -u origin main
```

## 3. Set Up GitHub Secrets for CI/CD

To enable the automatic deployment to your VPS, you need to add the following secrets to your GitHub repository:

1. Go to your repository on GitHub
2. Click on "Settings" > "Secrets and variables" > "Actions"
3. Click "New repository secret" and add the following secrets:
   - `DOCKER_USERNAME`: Your Docker Hub username
   - `DOCKER_PASSWORD`: Your Docker Hub password/token
   - `SSH_HOST`: Your VPS IP address
   - `SSH_USERNAME`: Your VPS username
   - `SSH_PRIVATE_KEY`: Your private SSH key for VPS access

## 4. Verify GitHub Actions Workflow

1. Go to the "Actions" tab in your GitHub repository
2. You should see the workflow "Deploy to VPS" listed
3. The workflow will run automatically when you push changes to the main branch

## 5. Making Future Changes

After the initial setup, you can make changes to your code locally and push them to GitHub:

```bash
# Make changes to your files
git add .
git commit -m "Description of your changes"
git push
```

The GitHub Actions workflow will automatically deploy the changes to your VPS.
