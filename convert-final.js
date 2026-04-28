import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function removeGenericParameters(content) {
  // Remove multiline generics like:
  // React.forwardRef<
  //   SomeType,
  //   AnotherType
  // >(
  // This regex handles nested angle brackets across multiple lines
  
  let result = content;
  let changed = true;
  let iterations = 0;
  
  while (changed && iterations < 10) {
    iterations++;
    const oldResult = result;
    
    // Remove generics for React.forwardRef and similar functions
    // Match: FunctionName< ... any content including newlines ... >
    result = result.replace(/(\w+)\.forwardRef<[\s\S]*?>/g, '$1.forwardRef');
    result = result.replace(/(\w+)\.useState<[\s\S]*?>/g, '$1.useState');
    result = result.replace(/(\w+)\.useRef<[\s\S]*?>/g, '$1.useRef');
    result = result.replace(/(\w+)\.useCallback<[\s\S]*?>/g, '$1.useCallback');
    result = result.replace(/(\w+)\.useContext<[\s\S]*?>/g, '$1.useContext');
    result = result.replace(/(\w+)\.useReducer<[\s\S]*?>/g, '$1.useReducer');
    
    // Remove React generic types inline
    result = result.replace(/React\.<[\s\S]*?>/g, 'React.');
    
    // Remove generic parameters from other functions like styled components
    // ComponentName<Type> but be careful with nested brackets
    result = result.replace(/extends\s+[\w.]+<[\s\S]*?>/g, (match) => {
      return match.substring(0, match.indexOf('<'));
    });
    
    if (oldResult === result) changed = false;
  }
  
  return result;
}

function convertTsToJs(content, filePath) {
  // First, remove generic type parameters
  content = removeGenericParameters(content);
  
  // Remove interface definitions
  content = content.replace(/^export\s+interface\s+\w+[^{]*{[^}]*}(?:\s*{[^}]*})*/gm, '');
  content = content.replace(/^interface\s+\w+[^{]*{[^}]*}(?:\s*{[^}]*})*/gm, '');
  
  // Remove type definitions
  content = content.replace(/^export\s+type\s+\w+\s*=\s*[^;]+;/gm, '');
  content = content.replace(/^type\s+\w+\s*=\s*[^;]+;/gm, '');
  
  // Clean up 'type' keyword from imports
  content = content.replace(/import\s+type\s+{\s*/g, 'import { ');
  content = content.replace(/import\s+{\s*type\s+/g, 'import { ');
  content = content.replace(/,\s*type\s+/g, ', ');
  content = content.replace(/\s+as\s+type/g, '');
  
  // Remove type annotations from function parameters
  // Remove React type annotations like React.ReactNode, React.FC, etc
  content = content.replace(/:\s*React\.[\w<>.[\]]+/g, '');
  content = content.replace(/:\s*HTML\w*Element/g, '');
  content = content.replace(/:\s*Event[\w<>]*/g, '');
  content = content.replace(/:\s*\w+Props\b/g, '');
  
  // Remove remaining type annotations - general pattern
  // This handles: name: Type, name: Type | Type, etc
  // But be careful not to remove colons in objects
  content = content.replace(/(\w+)\s*:\s*(string|number|boolean|any|void)(?=[,)\]}\n;=])/g, '$1');
  content = content.replace(/(\w+)\s*:\s*[\w<>[\].|&]+(?=[,)\]}\n;=])/g, '$1');
  
  // Remove 'as' type casts
  content = content.replace(/\s+as\s+[\w<>[\].|&\s]+(?=[\n;,)\]}])/g, '');
  
  // Remove export from type-only exports
  content = content.replace(/^export\s*\n/gm, '');
  
  // Clean up excessive blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  // Fix import statements that have import *"module" 
  content = content.replace(/import\s+\*"([^"]+)"/g, 'import * as React from "$1"');
  content = content.replace(/import\s+\*'([^']+)'/g, "import * as React from '$1'");
  
  // Handle import * as patterns that got corrupted
  content = content.replace(/import\s+(\w+)\s*"\s*\n/g, 'import * as React from \n');
  
  // Make sure we don't have leftover orphaned type syntax
  content = content.replace(/,\s*\n\s*[\w<>.[\]]+\n\s*\)/g, '\n)');
  
  return content.trim();
}

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
      if (!item.endsWith('.d.ts')) {
        files.push(fullPath);
      }
    }
  });
  
  return files;
}

function convertProject(srcDir) {
  const files = findTypeScriptFiles(srcDir);
  
  console.log(`Found ${files.length} TypeScript files to convert\n`);
  
  files.forEach(filePath => {
    const ext = path.extname(filePath);
    const newExt = ext === '.tsx' ? '.jsx' : '.js';
    const newPath = filePath.replace(ext, newExt);
    
    try {
      let content = fs.readFileSync(filePath, 'utf-8');
      content = convertTsToJs(content, filePath);
      fs.writeFileSync(newPath, content, 'utf-8');
      fs.unlinkSync(filePath);
      
      console.log(`✓ Converted ${path.relative(srcDir, filePath)}`);
    } catch (error) {
      console.error(`✗ Error converting ${filePath}:`, error.message);
    }
  });
  
  console.log(`\n✓ Successfully converted ${files.length} files to JavaScript!`);
}

const srcDir = path.join(__dirname, 'src');
convertProject(srcDir);
