import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixImports(dir) {
  const items = fs.readdirSync(dir);
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist' && item !== 'build') {
        fixImports(fullPath);
      }
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const originalContent = content;
        
        // Fix import * from pattern
        content = content.replace(/import \*"([^"]+)";/g, 'import * as $1 from "$1";');
        content = content.replace(/import \*'([^']+)';/g, "import * as $1 from '$1';");
        
        // Fix other malformed imports like: import cva, from "class-variance-authority";
        content = content.replace(/import ([^"'\n]+), from/g, 'import $1 from');
        
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`✓ Fixed imports in ${path.relative(dir, fullPath)}`);
        }
      } catch (error) {
        console.error(`✗ Error fixing ${fullPath}:`, error.message);
      }
    }
  });
}

const srcDir = path.join(__dirname, 'src');
console.log('Fixing import statements...\n');
fixImports(srcDir);
console.log('\n✓ Import fixes complete!');
