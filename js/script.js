let noClickCount = 0;
let moveInterval = null;
let contractShown = false;

/* =========================
   CONTRACT LOGIC
========================= */

function showContract() {
    if (contractShown) return;
    contractShown = true;

    stopMovingNo();

    const modal = document.getElementById('contract-modal');
    modal.style.display = 'flex';

    // Set today's date
    const today = new Date().toISOString().split('T')[0];
    document.getElementById('contract-date').value = today;

    // Bind buttons
    document.getElementById('verify-witness-btn').onclick = verifyWitness;
    document.getElementById('agree-btn').onclick = handleAgree;
}

function verifyWitness() {
    const input = document.getElementById('witness-name').value.trim();
    const agreeBtn = document.getElementById('agree-btn');
    const statusEl = document.getElementById('witness-status');

    if (!input) {
        alert('Please enter a witness name.');
        agreeBtn.disabled = true;
        statusEl.style.display = 'none';
        return;
    }

    if (!/^[a-zA-Z\s]+$/.test(input)) {
        alert('Invalid witness name. Letters and spaces only.');
        statusEl.className = 'witness-status invalid';
        statusEl.style.display = 'inline-block';
        agreeBtn.disabled = true;
        return;
    }

    alert('Witness verified! 💖');
    statusEl.className = 'witness-status valid';
    statusEl.style.display = 'inline-block';
    agreeBtn.disabled = false;
}

function handleAgree() {
    const stampArea = document.getElementById('stamp-area');

    const stampImg = document.createElement('img');
    stampImg.src = 'assets/STAMP.png';
    stampImg.className = 'stamp';
    stampImg.alt = 'STAMP';
    stampArea.appendChild(stampImg);

    // Transition to final modal
    setTimeout(() => {
        document.getElementById('contract-modal').style.display = 'none';
        document.getElementById('final-modal').style.display = 'flex';
    }, 15000);
}

/* =========================
   NO BUTTON LOGIC
========================= */

function handleNoClick() {
    noClickCount++;

    stopMovingNo(); // Always stop old movement

    const img = document.getElementById('main-image');
    const container = document.getElementById('container');
    const buttonContainer = document.getElementById('button-container');

    if (noClickCount === 1) {
        img.src = 'assets/GAGI WAG 1.gif';
    }

    else if (noClickCount === 2) {
        img.src = 'assets/GAGI WAG 2.gif';
    }

    else if (noClickCount === 3) {
        img.src = 'assets/GAGI WAG 3.gif';

        // Replace buttons
        buttonContainer.innerHTML = `
            <button id="yes-btn" class="btn yes-btn">YES</button>
        `;

        // Create moving NO button
        const movingNo = document.createElement('button');
        movingNo.id = 'moving-no-btn';
        movingNo.className = 'btn no-btn';
        movingNo.textContent = 'NO';

        document.body.appendChild(movingNo);

        // Bind events
        movingNo.onclick = () => {
            stopMovingNo();
            movingNo.remove();
            handleNoClick();
        };

        document.getElementById('yes-btn').onclick = showContract;

        // Start movement
        startMovingNo(movingNo);
    }

    else if (noClickCount === 4) {
        // Final emotional stage
        document.body.style.backgroundImage = "url('assets/GAGI WAG 4.gif')";
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center';
        document.body.style.backgroundAttachment = 'fixed';

        container.style.display = 'none';

        const please = document.createElement('div');
        please.innerText = 'Please? 🥺';
        please.style.position = 'fixed';
        please.style.top = '50%';
        please.style.right = '10%';
        please.style.transform = 'translateY(-50%)';
        please.style.color = '#fff';
        please.style.fontSize = '2rem';
        please.style.fontWeight = 'bold';
        please.style.cursor = 'pointer';
        please.style.textShadow = '0 0 10px #ff0080';
        please.style.zIndex = '9999';

        please.onclick = showContract;
        document.body.appendChild(please);
    }
}

/* =========================
   MOVING BUTTON CONTROL
========================= */

function startMovingNo(button) {
    moveInterval = setInterval(() => {
        const x = Math.random() * (window.innerWidth - 120);
        const y = Math.random() * (window.innerHeight - 60);

        button.style.position = 'fixed';
        button.style.left = `${x}px`;
        button.style.top = `${y}px`;
    }, 1200);
}

function stopMovingNo() {
    if (moveInterval) {
        clearInterval(moveInterval);
        moveInterval = null;
    }

    const oldBtn = document.getElementById('moving-no-btn');
    if (oldBtn) oldBtn.remove();
}

/* =========================
   INIT
========================= */

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yes-btn').onclick = showContract;
    document.getElementById('no-btn').onclick = handleNoClick;
});
