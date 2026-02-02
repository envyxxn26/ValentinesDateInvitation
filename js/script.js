let noClickCount = 0;
let moveInterval; // To track the moving button interval
let contractShown = false; // Flag to prevent multiple contract modals

// YES button initial click - show contract
function showContract() {
    if (contractShown) return; // Prevent multiple triggers
    contractShown = true;
    
    // Stop the moving button if it's active
    if (moveInterval) {
        clearInterval(moveInterval);
    }
    document.getElementById('contract-modal').style.display = 'flex';
    
    // Pre-fill the date with today's date
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // YYYY-MM-DD format
    document.getElementById('contract-date').value = formattedDate;
    
    // Add event listener to witness input
    const witnessInput = document.getElementById('witness-name');
    witnessInput.addEventListener('input', validateWitness);
    
    // Add event listener to verify witness button
    document.getElementById('verify-witness-btn').addEventListener('click', verifyWitness);
    
    // Add event listener to agree button
    document.getElementById('agree-btn').addEventListener('click', handleAgree);
    
    // Disable agree button by default
    document.getElementById('agree-btn').disabled = true;
}

function validateWitness(e) {
    const input = e.target.value;
    const statusEl = document.getElementById('witness-status');
    const loadingEl = document.getElementById('loading-indicator');
    
    if (input.length > 0) {
        // Show loading indicator while typing
        if (!loadingEl) {
            const newLoadingEl = document.createElement('div');
            newLoadingEl.id = 'loading-indicator';
            newLoadingEl.className = 'loading-indicator';
            newLoadingEl.innerHTML = '<div class="loading-spinner"></div> Loading...';
            document.querySelector('.witness-section').appendChild(newLoadingEl);
        }
        statusEl.style.display = 'none'; // Hide check/cross until verification
    } else {
        // Hide loading if input is empty
        if (loadingEl) {
            loadingEl.remove();
        }
        statusEl.style.display = 'none';
    }
}

function verifyWitness() {
    const input = document.getElementById('witness-name').value;
    const agreeBtn = document.getElementById('agree-btn');
    const statusEl = document.getElementById('witness-status');
    const loadingEl = document.getElementById('loading-indicator');
    
    // Hide loading indicator
    if (loadingEl) {
        loadingEl.remove();
    }
    
    if (input.length === 0) {
        alert('Please enter a witness name first.');
        agreeBtn.disabled = true;
        statusEl.style.display = 'none';
        return;
    }
    
    // Check if input contains only letters (and spaces)
    const onlyLetters = /^[a-zA-Z\s]+$/.test(input);
    
    if (onlyLetters) {
        alert('Witness verified! You can now sign the contract.');
        agreeBtn.disabled = false;
        statusEl.className = 'witness-status valid';
        statusEl.style.display = 'inline-block';
    } else {
        alert('Invalid witness name. Only letters and spaces are allowed. Please try again.');
        agreeBtn.disabled = true;
        statusEl.className = 'witness-status invalid';
        statusEl.style.display = 'inline-block';
    }
}

function handleAgree() {
    const dateInput = document.getElementById('contract-date').value;
    if (!dateInput) {
        alert('Please select a date for the agreement.');
        return;
    }
    
    const stampArea = document.getElementById('stamp-area');
    const stampImg = document.createElement('img');
    stampImg.src = '../assets/STAMP.png';
    stampImg.className = 'stamp';
    stampImg.alt = 'STAMP';
    
    stampArea.appendChild(stampImg);
    
    // After 15 seconds, fade and show MWA.gif
    setTimeout(() => {
        document.getElementById('contract-modal').style.animation = 'fadeOut 1s ease forwards';
        setTimeout(() => {
            document.getElementById('contract-modal').style.display = 'none';
            document.getElementById('final-modal').style.display = 'flex';
        }, 1000);
    }, 15000);
}

function handleNoClick() {
    noClickCount++;
    
    if (noClickCount === 1) {
        // First NO click
        document.getElementById('main-image').src = '../assets/GAGI WAG 1.gif';
        document.getElementById('yes-btn').classList.add('size-level-1');
        document.getElementById('no-btn').classList.add('size-level-1');
    } 
    else if (noClickCount === 2) {
        // Second NO click
        document.getElementById('main-image').src = '../assets/GAGI WAG 2.gif';
        document.getElementById('yes-btn').classList.remove('size-level-1');
        document.getElementById('yes-btn').classList.add('size-level-2');
        document.getElementById('no-btn').classList.remove('size-level-1');
        document.getElementById('no-btn').classList.add('size-level-2');
    } 
    else if (noClickCount === 3) {
        // Third NO click - split screen
        const container = document.getElementById('container');
        container.classList.add('split-screen');
        
        document.getElementById('main-image').src = '../assets/GAGI WAG 3.gif';
        document.getElementById('button-container').innerHTML = '<button id="yes-btn" class="btn yes-btn size-level-3">YES</button>';
        
        const noBtnContainer = document.createElement('div');
        noBtnContainer.id = 'moving-no-btn-container';
        noBtnContainer.innerHTML = '<button id="no-btn" class="btn no-btn moving-no-btn">NO</button>';
        container.appendChild(noBtnContainer);
        
        // Add click listener to new NO button
        const newNoBtn = document.getElementById('no-btn');
        newNoBtn.addEventListener('click', handleNoClick);
        
        // Add click listener to new YES button
        const newYesBtn = document.getElementById('yes-btn');
        newYesBtn.addEventListener('click', function() {
            showContract();
        });
        
        // Start moving the NO button
        moveNoButton();
    }
    else if (noClickCount === 4) {
        // Fourth NO click - show empty page with background GIF
        const body = document.body;
        body.style.backgroundImage = "url('../assets/GAGI WAG 4.gif')";
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundAttachment = 'fixed';
        
        // Hide the container to show empty page
        document.getElementById('container').style.display = 'none';
        
        // Create and position the "Please?" text in the middle right
        const pleaseText = document.createElement('div');
        pleaseText.id = 'please-text';
        pleaseText.textContent = 'Please?';
        pleaseText.style.position = 'absolute';
        pleaseText.style.top = '50%';
        pleaseText.style.right = '10%';
        pleaseText.style.transform = 'translateY(-50%)';
        pleaseText.style.fontSize = '2rem';
        pleaseText.style.fontWeight = 'bold';
        pleaseText.style.color = '#fff';
        pleaseText.style.textShadow = '0 0 10px #ff0080';
        pleaseText.style.cursor = 'pointer';
        pleaseText.style.zIndex = '1000';
        pleaseText.addEventListener('click', function() {
            showContract();
            // Remove the text after clicking
            body.removeChild(pleaseText);
        });
        body.appendChild(pleaseText);
    }
}

// Use event delegation for initial buttons to handle DOM changes better
document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('yes-btn').addEventListener('click', function() {
        showContract();
    });
    document.getElementById('no-btn').addEventListener('click', handleNoClick);
});

function moveNoButton() {
    const noBtn = document.getElementById('no-btn');
    if (!noBtn) return;
    
    moveInterval = setInterval(() => {
        const randomX = Math.random() * (window.innerWidth - 100);
        const randomY = Math.random() * (window.innerHeight - 50);
        noBtn.style.position = 'fixed';
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }, 1500);
}