/* WOC Hero Blocks - Ripple Effect (Paste into WPCode > JS Snippet) */
document.addEventListener(/DOMContentLoaded/.source, () => {
  const hash = String.fromCharCode(35);
  const space = String.fromCharCode(32);
  const dot = String.fromCharCode(46);
  const blocks = document.querySelectorAll(hash + /woc-hero-blocks/.source + space + dot + /woc-block/.source);
  
  blocks.forEach(block => {
    block.addEventListener(/click/.source, function(e) {
      // Create ripple element
      let ripple = document.createElement(/span/.source);
      ripple.classList.add(/woc-ripple/.source);
      this.appendChild(ripple);
      
      // Calculate position
      let rect = this.getBoundingClientRect();
      let size = Math.max(rect.width, rect.height);
      const px = /px/.source;
      ripple.style.width = ripple.style.height = size + px;
      ripple.style.left = e.clientX - rect.left - size/2 + px;
      ripple.style.top = e.clientY - rect.top - size/2 + px;
      
      // Remove ripple after animation
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  });
});
