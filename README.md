
# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/2d4d50d3-1690-41cc-82e4-2535c7df87ec

## How to run this project in VS Code

Follow these step-by-step instructions to run the project locally:

1. **Open a terminal in VS Code** (Terminal > New Terminal)

2. **Install dependencies** (if you haven't already)
   ```bash
   npm install
   ```

3. **Start the development server** using one of these methods:

   **Option 1**: Using Vite directly (recommended)
   ```bash
   npx vite
   ```

   **Option 2**: Using the start-dev.js script
   ```bash
   # For Windows
   node start-dev.js

   # For Mac/Linux - make the file executable first
   chmod +x start-dev.js
   ./start-dev.js
   ```

   **Option 3**: If you encounter issues with line endings in Windows
   ```bash
   # This ensures proper line endings for the script
   npx cross-env-shell "vite"
   ```

4. **View your application** by opening the URL shown in the terminal (typically http://localhost:8080)

5. **Troubleshooting**:
   - If you see a "MODULE_NOT_FOUND" error, try running `npm install` again
   - If the script permissions are an issue on Mac/Linux, run `chmod +x start-dev.js`
   - If you encounter ENOENT errors, try running Vite directly with `npx vite`

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/2d4d50d3-1690-41cc-82e4-2535c7df87ec) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
node start-dev.js
# OR use npx vite
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/2d4d50d3-1690-41cc-82e4-2535c7df87ec) and click on Share -> Publish.

## I want to use a custom domain - is that possible?

We don't support custom domains (yet). If you want to deploy your project under your own domain then we recommend using Netlify. Visit our docs for more details: [Custom domains](https://docs.lovable.dev/tips-tricks/custom-domain/)
