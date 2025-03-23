
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

  // Directly use node to run the vite CLI file
  // This bypasses npm/npx completely to avoid npm-prefix.js issues
  const vitePath = path.join(__dirname, 'node_modules', 'vite', 'bin', 'vite.js');
  
  execSync(`node "${vitePath}" --port 8080 --host`, { 
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
  console.log('   npx vite --port 8080');
  
  // Additional troubleshooting advice
  console.log('\n📋 If you keep seeing npm-prefix.js errors, try these alternatives:');
  console.log('   1. Edit package.json and run: npm run dev');
  console.log('   2. Run directly: node ./node_modules/vite/bin/vite.js');
  process.exit(1);
}
