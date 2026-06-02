/* WORLD OF CHAT - OLD LANDING PAGE HERO JS */
(function() {
  var initAttempts = 0;
  
  function init() {
    var container = document.getElementById('woc-general-messages');
    var typingIndicator = document.getElementById('woc-general-typing-indicator');
    var typingName = document.getElementById('woc-general-typing-name');
    
    if (!container || !typingIndicator || !typingName) {
      initAttempts++;
      if (initAttempts < 100) {
        setTimeout(init, 100);
      }
      return;
    }
    
    // Conversation data reflecting standard UK chat room topics (football, active chat, welcoming users)
    var messages = [
      { user: 'Dave88', text: 'Did anyone see the match?', color: '#ef4444', initials: 'D', emoji: '⚽' },
      { user: 'Sarah_J', text: 'Yeah was crazy! ⚽', color: '#3b82f6', initials: 'S', emoji: '👍' },
      { user: 'LondonLad', text: 'Hello everyone 👋', color: '#10b981', initials: 'L', emoji: '😊' },
      { user: 'Guest_22', text: 'Is this room active?', color: '#f59e0b', initials: 'G', emoji: '🤔' },
      { user: 'Mod_K', text: 'Yes, welcome! No sign up needed.', color: '#8b5cf6', initials: 'K', emoji: '👍' }
    ];
    
    var idx = 0;
    
    // Spawns floating emojis that rise out of the text bubble
    function spawnReaction(emoji, parentBubble) {
      if (!parentBubble) return;
      
      for (var i = 0; i < 2; i++) {
        (function(index) {
          setTimeout(function() {
            var reaction = document.createElement('div');
            reaction.className = 'woc-emoji-reaction';
            reaction.textContent = emoji;
            
            var offset = Math.floor(Math.random() * 50) + 15;
            reaction.style.left = offset + '%';
            reaction.style.bottom = '10px';
            
            parentBubble.appendChild(reaction);
            
            setTimeout(function() {
              if (reaction.parentNode) {
                reaction.parentNode.removeChild(reaction);
              }
            }, 1800);
          }, index * 300);
        })(i);
      }
    }
    
    function postMessage() {
      var msg = messages[idx];
      
      // 1. Show Typing State
      typingName.textContent = msg.user;
      typingIndicator.style.display = 'flex';
      container.scrollTop = container.scrollHeight;
      
      // 2. Delay message insertion to mimic human typing
      setTimeout(function() {
        // Hide typing indicator
        typingIndicator.style.display = 'none';
        
        // Assemble message elements
        var row = document.createElement('div');
        row.className = 'woc-chat-msg-row';
        
        var avatar = document.createElement('div');
        avatar.className = 'woc-chat-avatar';
        avatar.style.background = msg.color;
        avatar.textContent = msg.initials;
        
        var content = document.createElement('div');
        content.className = 'woc-chat-msg-content';
        
        var username = document.createElement('span');
        username.className = 'woc-chat-username';
        username.textContent = msg.user;
        
        var bubble = document.createElement('div');
        bubble.className = 'woc-chat-bubble';
        bubble.textContent = msg.text;
        
        content.appendChild(username);
        content.appendChild(bubble);
        row.appendChild(avatar);
        row.appendChild(content);
        
        container.appendChild(row);
        
        // Trigger floating emoji reaction
        spawnReaction(msg.emoji, bubble);
        
        // Dynamic trigger on football emoji matches
        if (msg.emoji === '⚽') {
          setTimeout(triggerJumpscare, 150);
        }
        
        // Keep screen scrolled to bottom
        container.scrollTop = container.scrollHeight;
        
        // Limit total messages inside container to avoid overflow/bloat
        if (container.children.length > 4) {
          var firstChild = container.children[0];
          if (firstChild) {
            container.removeChild(firstChild);
          }
        }
        
        // Progress sequence
        idx = (idx + 1) % messages.length;
        
        // Schedule next message typing cycle (4 seconds after post)
        setTimeout(postMessage, 3500);
        
      }, 1500); // Typing time duration
    }
    
    // 3. Jumpscare Flash & Shake Trigger
    function triggerJumpscare() {
      var phone = document.querySelector('#woc-hero-root .woc-phone-wrapper');
      var flash = document.getElementById('woc-phone-flash');
      if (!phone || !flash) return;
      
      if (phone.classList.contains('woc-phone-shake-active')) return;
      
      flash.classList.add('woc-flash-active');
      phone.classList.add('woc-phone-shake-active');
      
      setTimeout(function() {
        flash.classList.remove('woc-flash-active');
      }, 350);
      
      setTimeout(function() {
        phone.classList.remove('woc-phone-shake-active');
      }, 450);
    }
    
    // Bind click trigger on phone screen itself
    var phoneInner = document.querySelector('#woc-hero-root .woc-phone-inner');
    if (phoneInner) {
      phoneInner.addEventListener('click', function() {
        triggerJumpscare();
      });
    }
    
    // Start initial typing/posting sequence
    setTimeout(postMessage, 1000);
  }
  
  init();
})();
