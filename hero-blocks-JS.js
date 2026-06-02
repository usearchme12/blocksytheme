/* WOC Hero Blocks - Paste into WPCode > JavaScript */
(function(){
  document.querySelectorAll(String.fromCharCode(46) + /woc-block/.source).forEach(function(btn){
    btn.addEventListener(/click/.source,function(e){
      var r=document.createElement(/span/.source);
      r.className=/woc-ripple/.source;
      var rect=btn.getBoundingClientRect();
      var size=Math.max(rect.width,rect.height);
      r.style.cssText=/width:/.source+size+/px;height:/.source+size+/px;left:/.source+(e.clientX-rect.left-size/2)+/px;top:/.source+(e.clientY-rect.top-size/2)+/px/.source;
      btn.appendChild(r);
      setTimeout(function(){r.remove()},600);
    });
  });
})();
