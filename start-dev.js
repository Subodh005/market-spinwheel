
#!/usr/bin/env node

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

try {
  // Check if node_modules directory exists
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.error('\n❌ node_modules directory not found');
    console.log('Please run "npm install" first and try again.');
    process.exit(1);
  }

  console.log('\n🔍 Starting Vite development server...');
  console.log('\n🚀 Server will be available at http://localhost:8080\n');

  // Use execSync to directly run the command
  // This simplifies the process and eliminates some potential error sources
  execSync('npx vite --port 8080 --force', { 
    stdio: 'inherit',
    shell: true 
  });
} catch (error) {
  console.error('\n❌ Failed to start the development server:', error.message);
  console.log('\n💡 Try running these commands directly in your terminal:');
  console.log('   npm install');
  console.log('   npx vite --port 8080 --force');
  process.exit(1);
}
