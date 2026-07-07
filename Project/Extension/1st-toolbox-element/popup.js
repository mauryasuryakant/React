// document.addEventListener('DOMContentLoaded', async () => {
//   const copyBtn = document.getElementById('copyBtn');
//   const backBtn = document.getElementById('backBtn');
//   const preview = document.getElementById('preview');

//   let extractedMarkdown = '';

//   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
//   const showCannotCopyError = () => {
//     preview.innerHTML = `<div class="error-msg">cannot copy on this website because this website dosen't have copiable content</div>`;
//     extractedMarkdown = ''; 
//   };

//   chrome.scripting.executeScript({
//     target: { tabId: tab.id },
//     function: extractDOMtoMarkdown
//   }, (results) => {
//     if (chrome.runtime.lastError || !results || !results[0] || !results[0].result) {
//       showCannotCopyError();
//     } else {
//       extractedMarkdown = results[0].result;
//       preview.textContent = extractedMarkdown;
//     }
//   });

//   copyBtn.addEventListener('click', () => {
//     if (!extractedMarkdown) return; 
    
//     navigator.clipboard.writeText(extractedMarkdown).then(() => {
//       copyBtn.textContent = 'Copied!';
//       copyBtn.classList.add('copied');
      
//       setTimeout(() => {
//         copyBtn.textContent = 'Copy Markdown';
//         copyBtn.classList.remove('copied');
//       }, 2000);
//     });
//   });

//   backBtn.addEventListener('click', () => {
//     window.location.href = 'index.html'; 
//   });
// });

// // Advanced DOM parser injected into the page
// function extractDOMtoMarkdown() {
//   const title = document.title;
//   const url = window.location.href;
//   const hostname = window.location.hostname;
  
//   // Detect AI Chat Websites
//   const isChatGPT = hostname.includes('chatgpt.com');
//   const isGemini = hostname.includes('gemini.google.com');
//   const isClaude = hostname.includes('claude.ai');
//   const isAI = isChatGPT || isGemini || isClaude;

//   function parseNode(node) {
//     if (node.nodeType === Node.TEXT_NODE) {
//       return node.textContent.replace(/\s+/g, ' '); 
//     }
//     if (node.nodeType !== Node.ELEMENT_NODE) return "";
    
//     let md = "";
//     const tag = node.tagName.toLowerCase();
    
//     // 1. Handle Code Blocks Properly for Obsidian
//     if (tag === 'pre') {
//       const codeNode = node.querySelector('code') || node;
//       let lang = 'text'; // Default to text
//       if (codeNode.className) {
//         const match = codeNode.className.match(/language-(\w+)/);
//         if (match) lang = match[1];
//       }
//       // Use innerText to grab the raw code block without HTML span clutter
//       return `\n\n\`\`\`${lang}\n${codeNode.innerText.trim()}\n\`\`\`\n\n`;
//     }

//     // Handle inline code (only if not inside a pre block)
//     if (tag === 'code' && (!node.parentElement || node.parentElement.tagName.toLowerCase() !== 'pre')) {
//       return ` \`${node.innerText}\` `;
//     }
    
//     // 2. Handle Standard Elements
//     if (tag.match(/^h[1-6]$/)) {
//       const level = parseInt(tag[1]);
//       md += `\n\n${'#'.repeat(level)} ${Array.from(node.childNodes).map(parseNode).join('').trim()}\n\n`;
//     } else if (tag === 'p') {
//       md += `\n${Array.from(node.childNodes).map(parseNode).join('').trim()}\n`;
//     } else if (tag === 'strong' || tag === 'b') {
//       md += `**${Array.from(node.childNodes).map(parseNode).join('')}**`;
//     } else if (tag === 'em' || tag === 'i') {
//       md += `*${Array.from(node.childNodes).map(parseNode).join('')}*`;
//     } else if (tag === 'a') {
//       const linkText = Array.from(node.childNodes).map(parseNode).join('');
//       md += `[${linkText}](${node.href})`;
//     } else if (tag === 'ul' || tag === 'ol') {
//       md += `\n${Array.from(node.childNodes).map(parseNode).join('')}\n`;
//     } else if (tag === 'li') {
//       md += `- ${Array.from(node.childNodes).map(parseNode).join('').trim()}\n`;
//     } else if (tag === 'img' || tag === 'svg' || tag === 'script' || tag === 'style' || tag === 'nav' || tag === 'button') {
//       // Strip out images, buttons, SVGs, and scripts
//       return "";
//     } else {
//       // Fallback for divs, spans, etc.
//       md += Array.from(node.childNodes).map(parseNode).join('');
//     }
//     return md;
//   }

//   let contentMd = "";

//   // Dedicated Extractor for AI Sites
//   if (isAI) {
//     let chatTurns = [];
    
//     if (isChatGPT) {
//       chatTurns = document.querySelectorAll('[data-message-author-role]');
//       chatTurns.forEach(turn => {
//         const role = turn.getAttribute('data-message-author-role');
//         const roleName = role === 'user' ? 'User' : 'ChatGPT';
//         contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
//       });
//     } 
//     else if (isGemini) {
//       // Gemini uses specific web components
//       chatTurns = document.querySelectorAll('user-query, message-content');
//       chatTurns.forEach(turn => {
//         const isUser = turn.tagName.toLowerCase() === 'user-query';
//         const roleName = isUser ? 'User' : 'Gemini';
//         contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
//       });
//     } 
//     else if (isClaude) {
//       // Claude splits by class name
//       chatTurns = document.querySelectorAll('.font-user-message, .font-claude-message');
//       chatTurns.forEach(turn => {
//         const isUser = turn.className.includes('user');
//         const roleName = isUser ? 'User' : 'Claude';
//         contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
//       });
//     }

//     if (!contentMd) return ""; // Failsafe if chat classes changed

//   } else {
//     // Standard Website Extractor
//     const mainContent = document.querySelector('article, main, [role="main"]') || document.body;
//     if (!mainContent) return "";
//     contentMd = parseNode(mainContent);
//   }
  
//   // Clean up excessive blank lines generated during node parsing
//   let cleanedMd = contentMd.replace(/\n{3,}/g, '\n\n').trim();

//   if (!cleanedMd) return "";

//   // Obsidian friendly top metadata layout
//   return `# ${title}\n[Source Link](${url})\n\n---\n\n${cleanedMd}`;
// }

document.addEventListener('DOMContentLoaded', async () => {
  const copyBtn = document.getElementById('copyBtn');
  const backBtn = document.getElementById('backBtn');
  const preview = document.getElementById('preview');

  let extractedMarkdown = '';

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  
  const showCannotCopyError = () => {
    preview.innerHTML = `<div class="error-msg">cannot copy on this website because this website dosen't have copiable content</div>`;
    extractedMarkdown = ''; 
  };

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: extractDOMtoMarkdown
  }, (results) => {
    if (chrome.runtime.lastError || !results || !results[0] || !results[0].result) {
      showCannotCopyError();
    } else {
      extractedMarkdown = results[0].result;
      preview.textContent = extractedMarkdown;
    }
  });

  copyBtn.addEventListener('click', () => {
    if (!extractedMarkdown) return; 
    
    navigator.clipboard.writeText(extractedMarkdown).then(() => {
      copyBtn.textContent = 'Copied!';
      copyBtn.classList.add('copied');
      
      setTimeout(() => {
        copyBtn.textContent = 'Copy Markdown';
        copyBtn.classList.remove('copied');
      }, 2000);
    });
  });

  backBtn.addEventListener('click', () => {
    window.location.href = 'index.html'; 
  });
});

// Advanced DOM parser injected into the page
function extractDOMtoMarkdown() {
  const title = document.title;
  const url = window.location.href;
  const hostname = window.location.hostname;
  
  const isChatGPT = hostname.includes('chatgpt.com');
  const isGemini = hostname.includes('gemini.google.com');
  const isClaude = hostname.includes('claude.ai');
  const isAI = isChatGPT || isGemini || isClaude;

  function parseNode(node) {
    if (node.nodeType === Node.TEXT_NODE) {
      return node.textContent.replace(/\s+/g, ' '); 
    }
    if (node.nodeType !== Node.ELEMENT_NODE) return "";
    
    let md = "";
    const tag = node.tagName.toLowerCase();
    
    // 1. Code Blocks
    if (tag === 'pre') {
      const codeNode = node.querySelector('code') || node;
      let lang = 'text'; 
      if (codeNode.className) {
        const match = codeNode.className.match(/language-(\w+)/);
        if (match) lang = match[1];
      }
      return `\n\n\`\`\`${lang}\n${codeNode.innerText.trim()}\n\`\`\`\n\n`;
    }
    if (tag === 'code' && (!node.parentElement || node.parentElement.tagName.toLowerCase() !== 'pre')) {
      return ` \`${node.innerText}\` `;
    }

    // 2. Tables (Obsidian/Notion Standard)
    if (tag === 'table') {
      let tableMd = '\n\n';
      const rows = Array.from(node.querySelectorAll('tr'));
      rows.forEach((row, index) => {
        const cells = Array.from(row.querySelectorAll('th, td'));
        const rowText = cells.map(cell => {
          // Parse cell content and escape pipe characters to avoid breaking the table
          return parseNode(cell).trim().replace(/\|/g, '\\|');
        }).join(' | ');
        
        tableMd += `| ${rowText} |\n`;
        
        // Add table divider after the header row
        if (index === 0) {
          tableMd += `| ${cells.map(() => '---').join(' | ')} |\n`;
        }
      });
      return tableMd + '\n';
    }

    // 3. Blockquotes
    if (tag === 'blockquote') {
      const bqText = Array.from(node.childNodes).map(parseNode).join('').trim();
      // Prepend '> ' to every line in the blockquote
      const formattedBq = bqText.split('\n').map(line => `> ${line}`).join('\n');
      return `\n\n${formattedBq}\n\n`;
    }

    // 4. Checkboxes (GitHub Flavored Markdown style task lists)
    if (tag === 'input' && node.type === 'checkbox') {
      return node.checked ? '[x] ' : '[ ] ';
    }

    // 5. Images
    if (tag === 'img') {
      const altText = node.alt || node.title || 'Image';
      const src = node.src;
      if (!src || src.startsWith('data:image')) return ""; // Skip massive base64 image strings
      return `![${altText}](${src})`;
    }

    // 6. Links (Exactly as they appear)
    if (tag === 'a') {
      const linkText = Array.from(node.childNodes).map(parseNode).join('').trim();
      return `[${linkText}](${node.href})`;
    }

    // 7. Standard Typography & Layout
    if (tag.match(/^h[1-6]$/)) {
      const level = parseInt(tag[1]);
      md += `\n\n${'#'.repeat(level)} ${Array.from(node.childNodes).map(parseNode).join('').trim()}\n\n`;
    } else if (tag === 'p') {
      md += `\n${Array.from(node.childNodes).map(parseNode).join('').trim()}\n`;
    } else if (tag === 'strong' || tag === 'b') {
      md += `**${Array.from(node.childNodes).map(parseNode).join('')}**`;
    } else if (tag === 'em' || tag === 'i') {
      md += `*${Array.from(node.childNodes).map(parseNode).join('')}*`;
    } else if (tag === 'ul' || tag === 'ol') {
      md += `\n${Array.from(node.childNodes).map(parseNode).join('')}\n`;
    } else if (tag === 'li') {
      // If the list item already starts with a checkbox bracket, don't double up on formatting
      const liContent = Array.from(node.childNodes).map(parseNode).join('').trim();
      if (liContent.startsWith('[ ]') || liContent.startsWith('[x]')) {
        md += `- ${liContent}\n`;
      } else {
        md += `- ${liContent}\n`;
      }
    } else if (tag === 'svg' || tag === 'script' || tag === 'style' || tag === 'nav' || tag === 'button' || tag === 'iframe') {
      return "";
    } else {
      md += Array.from(node.childNodes).map(parseNode).join('');
    }
    
    return md;
  }

  let contentMd = "";

  // Dedicated AI Site Extraction (Unchanged, relies on updated parser)
  if (isAI) {
    let chatTurns = [];
    if (isChatGPT) {
      chatTurns = document.querySelectorAll('[data-message-author-role]');
      chatTurns.forEach(turn => {
        const role = turn.getAttribute('data-message-author-role');
        const roleName = role === 'user' ? 'User' : 'ChatGPT';
        contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
      });
    } else if (isGemini) {
      chatTurns = document.querySelectorAll('user-query, message-content');
      chatTurns.forEach(turn => {
        const isUser = turn.tagName.toLowerCase() === 'user-query';
        const roleName = isUser ? 'User' : 'Gemini';
        contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
      });
    } else if (isClaude) {
      chatTurns = document.querySelectorAll('.font-user-message, .font-claude-message');
      chatTurns.forEach(turn => {
        const isUser = turn.className.includes('user');
        const roleName = isUser ? 'User' : 'Claude';
        contentMd += `\n\n### **${roleName}**\n${parseNode(turn).trim()}\n\n---`;
      });
    }
    if (!contentMd) return ""; 

  } else {
    // Standard Website Extraction
    const mainContent = document.querySelector('article, main, [role="main"]') || document.body;
    if (!mainContent) return "";
    contentMd = parseNode(mainContent);
  }
  
  // Strip excessive whitespace without ruining codeblocks or tables
  let cleanedMd = contentMd.replace(/\n{3,}/g, '\n\n').trim();

  if (!cleanedMd) return "";

  return `# ${title}\n[Source Link](${url})\n\n---\n\n${cleanedMd}`;
}