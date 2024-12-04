const zombieContainer = document.getElementById('zombie-container');
const zombieHead = document.getElementById('zombie-head');
const header = document.getElementById('header');
const body = document.body;

// Create custom crosshair
const crosshair = document.createElement('div');
crosshair.className = 'crosshair';
document.body.appendChild(crosshair);

// Update crosshair position
document.addEventListener('mousemove', (e) => {
  crosshair.style.left = `${e.pageX - 15}px`;
  crosshair.style.top = `${e.pageY - 15}px`;
});

let isExploding = false;
const activeDots = []; // Track active dots for removal later

function showSequentialText() {
  const texts = document.querySelectorAll('#sequential-text .fade-text');
  const video = document.querySelector('.rumble');

  let delay = 0;

  texts.forEach((text, index) => {
    setTimeout(() => {
      text.style.display = 'block'; // Add to layout
      text.style.opacity = 1; // Fade in

      if (text.classList.contains('rise-text')) {
        text.style.transform = 'translateY(-20px)';
      }

      if (index < texts.length - 2) {
        setTimeout(() => {
          text.style.opacity = 0; // Fade out
          text.style.display = 'none'; // Remove from layout
        }, 2000);
      }
    }, delay);

    delay += 3000; // Delay for each text
  });

  // Show video after the last text
  setTimeout(() => {
    video.style.display = 'block';
    video.style.opacity = 1;
  }, delay + 1000);
}


function fadeOutHeader() {
  const header = document.querySelector('.header');
  header.style.transition = 'opacity 2s ease';
  header.style.opacity = 0;

  // Start sequential text after the header fades out
  setTimeout(() => {
    header.style.display = 'none'; // Remove from layout
    showSequentialText();
  }, 2000); // Wait for fade-out to complete
}


function triggerConfettiRain() {
  const confettiInterval = setInterval(() => {
    createConfetti();a
  }, 50); // Generate confetti every 50ms

  // Stop confetti rain after 9 seconds and redirect
  setTimeout(() => {
    clearInterval(confettiInterval); // Stop generating confetti
    redirectToRumble(); // Redirect to the Rumble video
  }, 9000);
}

function redirectToRumble() {
  window.location.href = 'https://rumble.com/v5vupfe-erased-a-look-into-our-subverted-culture.html';
}


  
  function createConfetti() {
    const confettiPixel = document.createElement('div');
    confettiPixel.className = 'confetti-pixel';
  
    // Random starting position at the top of the screen
    const startX = Math.random() * window.innerWidth;
  
    confettiPixel.style.position = 'absolute';
    confettiPixel.style.left = `${startX}px`;
    confettiPixel.style.top = `-10px`; // Start just above the screen
    confettiPixel.style.width = '5px';
    confettiPixel.style.height = '5px';
    confettiPixel.style.backgroundColor = getRandomColor();
    confettiPixel.style.zIndex = '150';
    confettiPixel.style.opacity = 1;
  
    document.body.appendChild(confettiPixel);
  
    // Animate the confetti falling
    const fallDistance = window.innerHeight + 50; // Confetti falls beyond the screen height
    confettiPixel.style.transition = `transform 3s linear, opacity 3s linear`;
    confettiPixel.style.transform = `translateY(${fallDistance}px)`;
  
    // Fade and remove confetti after it falls
    setTimeout(() => {
      confettiPixel.style.opacity = 0;
      setTimeout(() => confettiPixel.remove(), 3000);
    }, 3000);
  }
  
  function getRandomColor() {
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  
  function createConfetti() {
    const confettiPixel = document.createElement('div');
    confettiPixel.className = 'confetti-pixel';
  
    // Random starting position at the top of the screen
    const startX = Math.random() * window.innerWidth;
  
    confettiPixel.style.position = 'absolute';
    confettiPixel.style.left = `${startX}px`;
    confettiPixel.style.top = `-10px`; // Start just above the screen
    confettiPixel.style.width = '5px';
    confettiPixel.style.height = '5px';
    confettiPixel.style.backgroundColor = getRandomColor();
    confettiPixel.style.zIndex = '150';
    confettiPixel.style.opacity = 1;
  
    document.body.appendChild(confettiPixel);
  
    // Animate the confetti falling
    const fallDistance = window.innerHeight + 50; // Confetti falls beyond the screen height
    confettiPixel.style.transition = `transform 3s linear, opacity 3s linear`;
    confettiPixel.style.transform = `translateY(${fallDistance}px)`;
  
    // Fade and remove confetti after it falls
    setTimeout(() => {
      confettiPixel.style.opacity = 0;
      setTimeout(() => confettiPixel.remove(), 3000);
    }, 3000);
  }
  
  function getRandomColor() {
    const colors = ['#FF0000', '#FFA500', '#FFFF00', '#008000', '#0000FF', '#4B0082', '#EE82EE'];
    return colors[Math.floor(Math.random() * colors.length)];
  }
  
  // Update the explosion logic to trigger confetti rain
  zombieHead.addEventListener('click', (event) => {
    if (isExploding) return;
  
    // Play gunshot sound at normal speed
    const gunshotSound = document.getElementById('gunshot-sound');
    const victorySound = document.getElementById('victory-sound');
  
    gunshotSound.playbackRate = 1; // Normal speed
    gunshotSound.currentTime = 0; // Rewind to the start
    gunshotSound.play();
  
    const rect = zombieHead.getBoundingClientRect();
    const clickX = event.clientX - rect.left;
    const clickY = event.clientY - rect.top;
  
    // Create blood stream effect and wound (red dot)
    createBlood(clickX, clickY);
    createCenterDot(clickX, clickY);
  
    // Trigger explosion after 5 seconds
    setTimeout(() => {
      if (!isExploding) {
        // Play gunshot sound slower for explosion
        gunshotSound.playbackRate = 0.5; // Half speed
        gunshotSound.currentTime = 0; // Rewind to the start
        gunshotSound.play();
  
        // After explosion sound finishes, play the victory sound
        gunshotSound.onended = () => {
            victorySound.currentTime = 0; // Rewind to the start
            victorySound.play();
          };
          
        explodeHead(rect.width, rect.height);
        removeAllDots(); // Remove all red dots
        isExploding = true;
  
        // Start confetti rain
        triggerConfettiRain();
  
        // Move the text down
        setTimeout(() => fadeOutHeader(), 9000); // Trigger header fade-out and sequential text
        // Fade everything out 3 seconds after the confetti ends
        setTimeout(() => fadeOut(), 12000);
      }
    }, 5000);
  });
  
  

function createBlood(x, y) {
  for (let i = 0; i < 10; i++) {
    const pixel = document.createElement('div');
    pixel.className = 'red-pixel';

    const angle = Math.random() * Math.PI * 2;
    const dx = Math.cos(angle) * 200;
    const dy = Math.sin(angle) * 200;

    pixel.style.setProperty('--x', `${dx}px`);
    pixel.style.setProperty('--y', `${dy}px`);
    pixel.style.left = `${x}px`;
    pixel.style.top = `${y}px`;

    zombieContainer.appendChild(pixel);

    // Remove pixel after animation
    setTimeout(() => pixel.remove(), 1000);
  }
}

function explodeHead(width, height) {
  // Remove zombie head
  zombieHead.style.display = 'none';

  // Fragment head into pixels
  const pixelSize = 5;
  for (let y = 0; y < height; y += pixelSize) {
    for (let x = 0; x < width; x += pixelSize) {
      if (Math.random() > 0.7) continue;

      const headPixel = document.createElement('div');
      headPixel.className = 'head-pixel';

      const angle = Math.random() * Math.PI * 2;
      const distance = Math.random() * 300;

      const dx = Math.cos(angle) * distance;
      const dy = Math.sin(angle) * distance;

      headPixel.style.setProperty('--x', `${dx}px`);
      headPixel.style.setProperty('--y', `${dy}px`);
      headPixel.style.left = `${x - width / 2}px`;
      headPixel.style.top = `${y - height / 2}px`;

      zombieContainer.appendChild(headPixel);

      // Remove pixel after animation
      setTimeout(() => headPixel.remove(), 1500);
    }
  }
}

function createCenterDot(x, y) {
  const dot = document.createElement('div');
  dot.className = 'center-dot';

  // Position the dot in the zombie-container
  dot.style.position = 'absolute';
  dot.style.left = `${x - 5}px`; // Center the dot horizontally (size adjusted for larger dot)
  dot.style.top = `${y - 5}px`;  // Center the dot vertically
  dot.style.width = '10px'; // Larger size for better visibility
  dot.style.height = '10px';
  dot.style.backgroundColor = 'red';
  dot.style.borderRadius = '50%';
  dot.style.zIndex = '100'; // Ensure it stays on top of other elements

  // Append the dot to the zombie-container
  zombieContainer.appendChild(dot);

  // Add the dot to the active dots array for removal later
  activeDots.push(dot);

  // Create a constant downward blood stream
  createDownwardStream(dot);

  // Debugging visibility (optional)
  console.log(`Red dot created immediately at: x=${x}, y=${y}`);
}

function createDownwardStream(dot) {
    const interval = setInterval(() => {
      if (isExploding) {
        clearInterval(interval); // Stop the stream when the explosion happens
        return;
      }
  
      const streamPixel = document.createElement('div');
      streamPixel.className = 'red-pixel';
  
      // Get the position of the dot
      const rect = dot.getBoundingClientRect();
  
      // Calculate position for the stream pixel
      const x = rect.left + rect.width / 2 - 2.5; // Center the pixel under the dot
      const y = rect.top + rect.height; // Start just below the dot
  
      streamPixel.style.position = 'absolute';
      streamPixel.style.left = `${x}px`;
      streamPixel.style.top = `${y}px`;
      streamPixel.style.width = '5px';
      streamPixel.style.height = '5px';
      streamPixel.style.backgroundColor = 'red';
      streamPixel.style.zIndex = '99';
  
      document.body.appendChild(streamPixel);
  
      // Move the pixel downward
      streamPixel.style.animation = 'fall 1s linear forwards';
  
      // Remove the stream pixel after it moves
      setTimeout(() => streamPixel.remove(), 1000);
    }, 100); // Create a new blood pixel every 100ms
  }
  

function removeAllDots() {
  // Remove all active red dots
  activeDots.forEach((dot) => dot.remove());
  activeDots.length = 0; // Clear the array
}

function moveText() {
  header.style.transform = 'translateY(50px)';
}

function fadeOut() {
  zombieContainer.style.transition = 'opacity 3s ease';
  zombieContainer.style.opacity = 0;

  header.style.transition = 'opacity 3s ease';
  header.style.opacity = 0;

  body.style.transition = 'background-color 3s ease';
  body.style.backgroundColor = 'black';
}

