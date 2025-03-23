
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');

// Get the path to the vite executable
const viteBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

// Spawn the vite process with explicit port and force flags
const viteProcess = spawn(viteBinPath, ['--port', '8080', '--force'], {
  stdio: 'inherit',
  shell: true
});

console.log('\n🚀 Starting development server at http://localhost:8080\n');

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  process.exit(1);
});

viteProcess.on('exit', (code) => {
  if (code !== 0) {
    console.error(`Vite process exited with code ${code}`);
    process.exit(code);
  }
});

// Handle termination signals
['SIGINT', 'SIGTERM'].forEach(signal => {
  process.on(signal, () => {
    console.log(`\n🛑 Received ${signal}, shutting down server...`);
    viteProcess.kill();
    process.exit(0);
  });
});
