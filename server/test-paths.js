const fs = require('fs');
const path = require('path');

// Function to check if a file exists
function checkFileExists(filePath) {
  try {
    if (fs.existsSync(filePath)) {
      console.log(`✅ File exists: ${filePath}`);
      return true;
    } else {
      console.log(`❌ File MISSING: ${filePath}`);
      return false;
    }
  } catch (err) {
    console.error(`❌ Error checking file ${filePath}:`, err);
    return false;
  }
}

// Function to check if a module can be required
function checkModuleRequire(modulePath, name) {
  try {
    const module = require(modulePath);
    console.log(`✅ Module loaded successfully: ${name}`);
    return true;
  } catch (err) {
    console.error(`❌ Failed to load module ${name}:`, err.message);
    return false;
  }
}

// Files to check
const filesToCheck = [
  './routes/userRoutes.js',
  './routes/questionRoutes.js',
  './routes/interviewRoutes.js',
  './routes/forumRoutes.js',
  './models/userModel.js',
  './models/questionModel.js',
  './models/interviewModel.js',
  './models/forumModel.js',
  './controllers/userController.js',
  './controllers/questionController.js',
  './controllers/interviewController.js',
  './controllers/forumController.js'
];

// Modules to check
const modulesToCheck = [
  { path: './routes/userRoutes', name: 'userRoutes' },
  { path: './routes/questionRoutes', name: 'questionRoutes' },
  { path: './routes/interviewRoutes', name: 'interviewRoutes' },
  { path: './routes/forumRoutes', name: 'forumRoutes' },
  { path: './models/userModel', name: 'userModel' },
  { path: './models/questionModel', name: 'questionModel' },
  { path: './models/interviewModel', name: 'interviewModel' },
  { path: './models/forumModel', name: 'forumModel' }
];

console.log('=== Checking file existence ===');
let allFilesExist = true;
for (const file of filesToCheck) {
  const exists = checkFileExists(path.resolve(__dirname, file));
  allFilesExist = allFilesExist && exists;
}

console.log('\n=== Checking module loading ===');
let allModulesLoad = true;
for (const module of modulesToCheck) {
  const loads = checkModuleRequire(module.path, module.name);
  allModulesLoad = allModulesLoad && loads;
}

console.log('\n=== Summary ===');
console.log(`All files exist: ${allFilesExist ? '✅' : '❌'}`);
console.log(`All modules load: ${allModulesLoad ? '✅' : '❌'}`);

if (!allFilesExist || !allModulesLoad) {
  console.log('\n❌ Issues found that need to be fixed');
} else {
  console.log('\n✅ All checks passed!');
} 