
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the path to the vite executable
const viteBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

// Spawn the vite process with --port 8080 to ensure consistent port usage
const viteProcess = spawn(viteBinPath, ['--port', '8080'], {
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
});
