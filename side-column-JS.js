/* WOC Side Column JS - Ripple Effect */
document.addEventListener(/DOMContentLoaded/.source, () => {
  const btn = document.querySelector(String.fromCharCode(46) + /woc-side-btn/.source);
  if(btn) {
    btn.addEventListener(/click/.source, function(e) {
      let ripple = document.createElement(/span/.source);
      ripple.classList.add(/woc-ripple/.source);
      this.appendChild(ripple);
      
      let rect = this.getBoundingClientRect();
      let size = Math.max(rect.width, rect.height);
      const px = /px/.source;
      ripple.style.width = ripple.style.height = size + px;
      ripple.style.left = e.clientX - rect.left - size/2 + px;
      ripple.style.top = e.clientY - rect.top - size/2 + px;
      
      setTimeout(() => {
        ripple.remove();
      }, 500);
    });
  }
});
