import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function cleanupBrokenSyntax(content) {
  // Fix broken forwardRef patterns left behind after type removal
  // Pattern: React.forwardRef,\n  Type\n>(
  // Should be: React.forwardRef(
  
  // Match forwardRef followed by comma, newlines, type info, and then >
  content = content.replace(
    /React\.forwardRef,[\s\S]*?>/gm,
    'React.forwardRef('
  );
  
  // Fix any other function generics that got mangled
  content = content.replace(
    /(\w+)\.(\w+),[\s\S]*?>/gm,
    (match) => {
      const functionName = match.match(/(\w+)\.(\w+)/)[0];
      return functionName + '(';
    }
  );
  
  // Remove orphaned lines that only contain types
  content = content.replace(/^\s*React\.ComponentPropsWithoutRef.*$/gm, '');
  content = content.replace(/^\s*React\.ElementRef.*$/gm, '');
  
  // Clean up double opening parentheses
  content = content.replace(/\(\s*\(/g, '(');
  
  // Fix missing opening parentheses on forwardRef calls
  content = content.replace(/React\.forwardRef,\s*\(/g, 'React.forwardRef(');
  
  // Clean up any leftover angle brackets
  content = content.replace(/[\s\S]*?>/g, (match) => {
    if (match.includes('import') || match.includes('export')) return match;
    if (!match.includes('<')) return match;
    // Remove if it's just dangling type syntax
    if (match.trim().endsWith('>') && !match.includes('React')) {
      return '';
    }
    return match;
  });
  
  // Remove excess blank lines again
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  return content;
}

function processFiles(dir) {
  const items = fs.readdirSync(dir);
  let fixed = 0;
  
  items.forEach(item => {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      if (item !== 'node_modules' && item !== '.git' && item !== 'dist' && item !== 'build') {
        fixed += processFiles(fullPath);
      }
    } else if (item.endsWith('.jsx') || item.endsWith('.js')) {
      try {
        let content = fs.readFileSync(fullPath, 'utf-8');
        const originalContent = content;
        
        content = cleanupBrokenSyntax(content);
        
        if (content !== originalContent) {
          fs.writeFileSync(fullPath, content, 'utf-8');
          console.log(`✓ Cleaned ${path.relative(dir, fullPath)}`);
          fixed++;
        }
      } catch (error) {
        console.error(`✗ Error processing ${fullPath}:`, error.message);
      }
    }
  });
  
  return fixed;
}

const srcDir = path.join(__dirname, 'src');
console.log('Cleaning up broken syntax...\n');
const filesFixed = processFiles(srcDir);
console.log(`\n✓ Cleaned up ${filesFixed} files!`);
