
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the path to the vite executable
const viteBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

// Spawn the vite process with --force flag to ensure it uses the configured port
const viteProcess = spawn(viteBinPath, ['--port', '8080', '--force'], {
  stdio: 'inherit',
  shell: true
});

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
});
