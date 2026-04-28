import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function fixAllForwardRefPatterns(content) {
  // Pattern: const SomeName = React.forwardRef,\n  Type\n>(
  // Replace with: const SomeName = React.forwardRef(
  
  content = content.replace(
    /(\s*const\s+\w+\s*=\s*React\.forwardRef),\s*\n\s*React\.ComponentPropsWithoutRef[^\n]*\n\s*>(\()/g,
    '$1$2'
  );
  
  content = content.replace(
    /(\s*const\s+\w+\s*=\s*React\.forwardRef),\s*\n\s*React\.ElementRef[^\n]*\n\s*React\.ComponentPropsWithoutRef[^\n]*\n\s*>(\()/g,
    '$1$2'
  );
  
  // Clean up remaining orphaned type lines
  content = content.replace(/^\s*React\.ComponentPropsWithoutRef.*$/gm, '');
  content = content.replace(/^\s*React\.ElementRef.*$/gm, '');
  content = content.replace(/^\s*typeof.*$/gm, '');
  
  // Remove stray angle brackets
  content = content.replace(/^>\s*$/gm, '');
  
  // Fix double parentheses
  content = content.replace(/\(\s*\(/g, '(');
  
  // Remove excess blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  return content;
}

function processAllJsFiles(dir) {
  const items = fs.readdirSync(dir);
  let filesFixed = 0;
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist' && item !== 'build') {
        filesFixed += processAllJsFiles(fullPath);
      }
    } else if ((item.endsWith('.jsx') || item.endsWith('.js')) && !item.startsWith('convert') && !item.startsWith('cleanup') && !item.startsWith('fix')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const originalContent = content;
        
        content = fixAllForwardRefPatterns(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`✓ Fixed ${path.relative(dir, fullPath)}`);
          filesFixed++;
        }
      } catch (error) {
        console.error(`✗ Error fixing ${fullPath}:`, error.message);
      }
    }
  });
  
  return filesFixed;
}

const srcDir = path.join(__dirname, 'src');
console.log('Fixing forwardRef patterns across all files...\n');
const filesFixed = processAllJsFiles(srcDir);
console.log(`\n✓ Fixed ${filesFixed} files!`);
