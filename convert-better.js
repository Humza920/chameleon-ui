import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function convertTsToJs(content, filePath) {
  // Remove interface definitions (keep the content structure)
  content = content.replace(/^export\s+interface\s+\w+[^{]*{[^}]*}/gm, '');
  content = content.replace(/^interface\s+\w+[^{]*{[^}]*}/gm, '');
  
  // Remove type definitions
  content = content.replace(/^export\s+type\s+\w+\s*=\s*[^;]+;/gm, '');
  content = content.replace(/^type\s+\w+\s*=\s*[^;]+;/gm, '');
  
  // Remove 'type' keyword from imports but keep the names
  // import { type Something } from "module" => import { Something } from "module"
  // import type { Something } from "module" => import { Something } from "module"
  content = content.replace(/import\s+type\s+{\s*/g, 'import { ');
  content = content.replace(/import\s+{\s*type\s+/g, 'import { ');
  content = content.replace(/,\s*type\s+/g, ', ');
  
  // Remove React type annotations while preserving "React"
  // React.ReactNode => React.ReactNode (keep it, it's valid JS)
  content = content.replace(/:\s*React\.ReactNode/g, '');
  content = content.replace(/:\s*React\.FC/g, '');
  content = content.replace(/:\s*React\.FC<[^>]*>/g, '');
  content = content.replace(/:\s*React\.Component/g, '');
  
  // Remove type annotations from parameters
  // (param: Type) => (param)
  content = content.replace(/(\w+)\s*:\s*HTMLButtonElement/g, '$1');
  content = content.replace(/(\w+)\s*:\s*HTMLElement/g, '$1');
  content = content.replace(/(\w+)\s*:\s*HTML\w+Element/g, '$1');
  content = content.replace(/(\w+)\s*:\s*KeyboardEvent/g, '$1');
  content = content.replace(/(\w+)\s*:\s*MouseEvent/g, '$1');
  content = content.replace(/(\w+)\s*:\s*ChangeEvent<[^>]*>/g, '$1');
  content = content.replace(/:\s*VariantProps<[^>]*>/g, '');
  content = content.replace(/:\s*\w+Props\b/g, '');
  content = content.replace(/:\s*\w+\[\]/g, '');
  content = content.replace(/:\s*Record<string,\s*any>/g, '');
  content = content.replace(/:\s*Record<[^>]*>/g, '');
  content = content.replace(/:\s*Pick<[^>]*>/g, '');
  content = content.replace(/:\s*Omit<[^>]*>/g, '');
  content = content.replace(/:\s*string|number|boolean|any/g, '');
  content = content.replace(/:\s*typeof\s+\w+/g, '');
  content = content.replace(/:\s*\(.*?\)\s*=>\s*[\w<>[\]|&\s]*/g, '');
  
  // Remove generic type parameters from React methods
  // React.forwardRef<HTMLButtonElement, ButtonProps> => React.forwardRef
  content = content.replace(/React\.forwardRef<[^>]*>/g, 'React.forwardRef');
  content = content.replace(/useState<[^>]*>/g, 'useState');
  content = content.replace(/useRef<[^>]*>/g, 'useRef');
  content = content.replace(/useContext<[^>]*>/g, 'useContext');
  content = content.replace(/useCallback<[^>]*>/g, 'useCallback');
  content = content.replace(/useReducer<[^>]*>/g, 'useReducer');
  
  // Remove 'as' type casts: as SomeType => (remove the whole thing)
  content = content.replace(/\s+as\s+\w+[\w<>[\]|&\s]*/g, '');
  content = content.replace(/\s+as\s+const/g, '');
  
  // Remove `: ReturnType<...>`
  content = content.replace(/:\s*ReturnType<[^>]*>/g, '');
  
  // Remove generic brackets from JSX components where needed
  // Component<Type> => Component (but be careful not to break real generics in comments)
  content = content.replace(/extends\s+React\.Component<[^>]*>/g, 'extends React.Component');
  
  // Clean excessive blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');
  
  // Final cleanup: remove any remaining orphaned colons at end of lines
  content = content.replace(/:\s*$/gm, '');
  
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
      
      console.log(`✓ ${path.relative(srcDir, filePath)} → ${path.relative(srcDir, newPath)}`);
    } catch (error) {
      console.error(`✗ Error converting ${filePath}:`, error.message);
    }
  });
  
  console.log('\n✓ Conversion complete!');
}

const srcDir = path.join(__dirname, 'src');
convertProject(srcDir);
