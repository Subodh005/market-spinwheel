
#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

try {
  // Check if node_modules directory exists
  if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
    console.error('\n❌ node_modules directory not found');
    console.log('Please run "npm install" first and try again.');
    process.exit(1);
  }

  console.log('\n🔍 Starting Vite development server...');
  console.log('\n🚀 Server will be available at http://localhost:8080\n');

  // Use directly npm run rather than npx to avoid npm-prefix.js issues
  execSync('npm run dev', { 
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      PORT: 8080
    }
  });
} catch (error) {
  console.error('\n❌ Failed to start the development server:', error.message);
  console.log('\n💡 Try running these commands directly in your terminal:');
  console.log('   npm install');
  console.log('   npm run dev');
  process.exit(1);
}
