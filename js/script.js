let noClickCount = 0;
let moveInterval;
let contractShown = false;

// Function to handle image loading errors
function handleImageError(img) {
    console.error('Image failed to load:', img.src);
    img.style.display = 'none';
    const fallback = document.createElement('p');
    fallback.textContent = 'Image not found. Check file paths!';
    fallback.style.color = '#ff0080';
    img.parentNode.appendChild(fallback);
}

// YES button - show contract
function showContract() {
    if (contractShown) return;
    contractShown = true;

    if (moveInterval) clearInterval(moveInterval);

    const noBtn = document.getElementById('no-btn');
    if (noBtn) noBtn.remove();

    const modal = document.getElementById('contract-modal');
    modal.style.animation = '';
    modal.style.display = 'flex';

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('contract-date').value = today;

    const witnessInput = document.getElementById('witness-name');
    witnessInput.addEventListener('input', validateWitness);

    document.getElementById('verify-witness-btn').addEventListener('click', verifyWitness);
    document.getElementById('agree-btn').addEventListener('click', handleAgree);
    document.getElementById('close-contract').addEventListener('click', closeContract);

    document.getElementById('agree-btn').disabled = true;
}

function closeContract() {
    document.getElementById('contract-modal').style.display = 'none';
    contractShown = false;
}

function validateWitness(e) {
    const input = e.target.value;
    const statusEl = document.getElementById('witness-status');
    const loadingEl = document.getElementById('loading-indicator');

    if (input.length > 0) {
        if (!loadingEl) {
            const newLoadingEl = document.createElement('div');
            newLoadingEl.id = 'loading-indicator';
            newLoadingEl.className = 'loading-indicator';
            newLoadingEl.innerHTML = '<div class="loading-spinner"></div> Loading...';
            document.querySelector('.witness-section').appendChild(newLoadingEl);
        }
        statusEl.style.display = 'none';
    } else {
        if (loadingEl) loadingEl.remove();
        statusEl.style.display = 'none';
    }
}

function verifyWitness() {
    const input = document.getElementById('witness-name').value;
    const agreeBtn = document.getElementById('agree-btn');
    const statusEl = document.getElementById('witness-status');
    const loadingEl = document.getElementById('loading-indicator');

    if (loadingEl) loadingEl.remove();

    if (input.length === 0) {
        alert('Please enter a witness name first.');
        agreeBtn.disabled = true;
        statusEl.style.display = 'none';
        return;
    }

    const onlyLetters = /^[a-zA-Z\s]+$/.test(input);

    if (onlyLetters) {
        alert('Witness verified! You can now sign the contract.');
        agreeBtn.disabled = false;
        statusEl.className = 'witness-status valid';
        statusEl.style.display = 'inline-block';
    } else {
        alert('Invalid witness name. Only letters and spaces are allowed.');
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
    stampArea.innerHTML = '';

    const stampImg = document.createElement('img');
    stampImg.src = 'assets/STAMP.png';
    stampImg.className = 'stamp';
    stampImg.alt = 'STAMP';
    stampImg.onerror = () => handleImageError(stampImg);
    stampArea.appendChild(stampImg);

    const progressBar = document.getElementById('progress-bar');
    progressBar.style.display = 'block';

    const progressFill = document.querySelector('.progress-fill');
    progressFill.style.width = '0%';
    setTimeout(() => {
        progressFill.style.width = '100%';
    }, 100);

    setTimeout(() => {
        const modal = document.getElementById('contract-modal');
        modal.style.animation = 'fadeOut 1s ease forwards';

        setTimeout(() => {
            modal.style.display = 'none';
            document.getElementById('final-modal').style.display = 'flex';
        }, 1000);
    }, 15000);
}

function handleNoClick() {
    noClickCount++;

    const mainImage = document.getElementById('main-image');
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');

    if (noClickCount === 1) {
        mainImage.src = 'assets/GAGI WAG 1.gif';
        yesBtn.classList.add('size-level-1');
        noBtn.classList.add('size-level-1');
    } 
    else if (noClickCount === 2) {
        mainImage.src = 'assets/GAGI WAG 2.gif';
        yesBtn.classList.remove('size-level-1');
        yesBtn.classList.add('size-level-2');
        noBtn.classList.remove('size-level-1');
        noBtn.classList.add('size-level-2');
    } 
    else if (noClickCount === 3) {
        const container = document.getElementById('container');
        container.classList.add('split-screen');

        mainImage.src = 'assets/GAGI WAG 3.gif';

        document.getElementById('button-container').innerHTML =
            '<button id="yes-btn" class="btn yes-btn size-level-3">YES</button>';

        const noBtnContainer = document.createElement('div');
        noBtnContainer.innerHTML =
            '<button class="btn no-btn moving-no-btn">NO</button>';
        container.appendChild(noBtnContainer);

        const newNoBtn = document.querySelector('.moving-no-btn');
        newNoBtn.addEventListener('click', handleNoClick);

        const newYesBtn = document.getElementById('yes-btn');
        newYesBtn.addEventListener('click', showContract);

        moveNoButton();
    } 
    else if (noClickCount === 4) {
        if (moveInterval) clearInterval(moveInterval);

        const movingNoBtn = document.querySelector('.moving-no-btn');
        if (movingNoBtn) movingNoBtn.remove();

        const body = document.body;
        body.style.backgroundImage = "url('assets/GAGI WAG 4.gif')";
        body.style.backgroundSize = 'cover';
        body.style.backgroundPosition = 'center center';
        body.style.backgroundAttachment = 'fixed';

        document.getElementById('container').style.display = 'none';

        const pleaseText = document.createElement('div');
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

        pleaseText.addEventListener('click', () => {
            showContract();
            body.removeChild(pleaseText);
        });

        body.appendChild(pleaseText);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yes-btn').addEventListener('click', showContract);
    document.getElementById('no-btn').addEventListener('click', handleNoClick);
});

function moveNoButton() {
    const noBtn = document.querySelector('.moving-no-btn');
    if (!noBtn) return;

    moveInterval = setInterval(() => {
        const randomX = Math.random() * (window.innerWidth - 100);
        const randomY = Math.random() * (window.innerHeight - 50);
        noBtn.style.left = randomX + 'px';
        noBtn.style.top = randomY + 'px';
    }, 1500);
}
