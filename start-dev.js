
#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// Get the path to the vite executable
const viteBinPath = path.resolve(__dirname, 'node_modules', '.bin', 'vite');

// Check if vite executable exists
if (!fs.existsSync(viteBinPath)) {
  console.error(`\n❌ Could not find Vite at ${viteBinPath}`);
  console.log('Please make sure you have run "npm install" first.');
  process.exit(1);
}

console.log('\n🔍 Starting Vite development server...');

// Spawn the vite process directly using npx to avoid path resolution issues
const viteProcess = spawn(process.platform === 'win32' ? 'npx.cmd' : 'npx', ['vite', '--port', '8080', '--force'], {
  stdio: 'inherit',
  shell: true
});

console.log('\n🚀 Starting development server at http://localhost:8080\n');

viteProcess.on('error', (err) => {
  console.error('Failed to start Vite:', err);
  console.log('\n💡 Try running "npx vite --port 8080 --force" directly in your terminal');
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
