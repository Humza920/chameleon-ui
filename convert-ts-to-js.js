import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Function to convert TypeScript to JavaScript
function convertTsToJs(content, filePath) {
  // Remove interface and type definitions
  content = content.replace(/^(export\s+)?interface\s+\w+[^{]*{[^}]*}(\s*{[^}]*})*\s*/gm, '');
  content = content.replace(/^(export\s+)?type\s+\w+\s*=\s*[^;]+;/gm, '');
  
  // Remove type imports from 'type' keyword
  content = content.replace(/import\s*{\s*type\s+/g, 'import { ');
  content = content.replace(/,\s*type\s+/g, ', ');
  
  // Remove angle brackets for generic types in React components
  // React.forwardRef<HTMLButtonElement, ButtonProps> => React.forwardRef
  content = content.replace(/React\.forwardRef<[^>]*>/g, 'React.forwardRef');
  content = content.replace(/useState<[^>]*>/g, 'useState');
  content = content.replace(/useRef<[^>]*>/g, 'useRef');
  content = content.replace(/useContext<[^>]*>/g, 'useContext');
  content = content.replace(/useReducer<[^>]*>/g, 'useReducer');
  content = content.replace(/<[^>]*>(?=\s*\()/g, ''); // Remove generics from function calls
  
  // Remove type annotations from function parameters
  // (name: Type) => (name) 
  content = content.replace(/:\s*React\.ReactNode/g, '');
  content = content.replace(/:\s*React\.\w+/g, '');
  content = content.replace(/:\s*HTML\w+Element/g, '');
  content = content.replace(/:\s*\w+Props/g, '');
  content = content.replace(/:\s*typeof\s+\w+/g, '');
  content = content.replace(/:\s*\w+\[\]/g, '');
  content = content.replace(/:\s*Record<string,\s*any>/g, '');
  content = content.replace(/:\s*\(.*?\)\s*=>\s*\w+/g, (match) => {
    return match.substring(0, match.indexOf(':'));
  });
  
  // Remove remaining type annotations (word: Type)
  content = content.replace(/:\s*[\w<>[\]|&\s]+(?=[,)\]}\n;=])/g, '');
  
  // Remove as Type casts
  content = content.replace(/\s+as\s+\w+[\w<>[\]|&\s]*/g, '');
  
  // Clean up excessive whitespace/blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  return content.trim();
}

// Function to recursively find all .ts and .tsx files
function findTypeScriptFiles(dir) {
  let files = [];
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist' && item !== 'build') {
        files = files.concat(findTypeScriptFiles(fullPath));
      }
    } else if (item.endsWith('.ts') || item.endsWith('.tsx')) {
      // Skip .d.ts files
      if (!item.endsWith('.d.ts')) {
        files.push(fullPath);
      }
    }
  });
  
  return files;
}

// Main conversion logic
function convertProject(srcDir) {
  const files = findTypeScriptFiles(srcDir);
  
  console.log(`Found ${files.length} TypeScript files to convert\n`);
  
  files.forEach(filePath => {
    const ext = path.extname(filePath);
    const newExt = ext === '.tsx' ? '.jsx' : '.js';
    const newPath = filePath.replace(ext, newExt);
    
    try {
      // Read the file
      let content = fs.readFileSync(filePath, 'utf-8');
      
      // Convert
      content = convertTsToJs(content, filePath);
      
      // Write new file
      fs.writeFileSync(newPath, content, 'utf-8');
      
      // Delete original
      fs.unlinkSync(filePath);
      
      console.log(`✓ ${path.relative(srcDir, filePath)} → ${path.relative(srcDir, newPath)}`);
    } catch (error) {
      console.error(`✗ Error converting ${filePath}:`, error.message);
    }
  });
  
  console.log('\n✓ Conversion complete!');
}

// Run conversion
const srcDir = path.join(__dirname, 'src');
convertProject(srcDir);
