let noClickCount = 0;
let moveInterval;
let contractShown = false;

function showContract() {
    if (contractShown) return;
    contractShown = true;

    if (moveInterval) clearInterval(moveInterval);

    document.getElementById('contract-modal').style.display = 'flex';

    const today = new Date().toISOString().split('T')[0];
    document.getElementById('contract-date').value = today;

    document.getElementById('verify-witness-btn').onclick = verifyWitness;
    document.getElementById('agree-btn').onclick = handleAgree;
}

function verifyWitness() {
    const input = document.getElementById('witness-name').value.trim();
    const agreeBtn = document.getElementById('agree-btn');
    const statusEl = document.getElementById('witness-status');

    if (!/^[a-zA-Z\s]+$/.test(input)) {
        alert('Invalid witness name.');
        statusEl.className = 'witness-status invalid';
        statusEl.style.display = 'inline-block';
        agreeBtn.disabled = true;
        return;
    }

    alert('Witness verified!');
    statusEl.className = 'witness-status valid';
    statusEl.style.display = 'inline-block';
    agreeBtn.disabled = false;
}

function handleAgree() {
    const stampArea = document.getElementById('stamp-area');
    const stampImg = document.createElement('img');
    stampImg.src = 'assets/STAMP.png';
    stampImg.className = 'stamp';
    stampArea.appendChild(stampImg);

    setTimeout(() => {
        document.getElementById('contract-modal').style.display = 'none';
        document.getElementById('final-modal').style.display = 'flex';
    }, 15000);
}

function handleNoClick() {
    noClickCount++;

    const img = document.getElementById('main-image');

    if (noClickCount === 1) img.src = 'assets/GAGI WAG 1.gif';
    if (noClickCount === 2) img.src = 'assets/GAGI WAG 2.gif';

    if (noClickCount === 3) {
        img.src = 'assets/GAGI WAG 3.gif';

        document.getElementById('button-container').innerHTML =
            '<button id="yes-btn" class="btn yes-btn">YES</button>';

        const movingNo = document.createElement('button');
        movingNo.id = 'no-btn';
        movingNo.className = 'btn no-btn';
        movingNo.textContent = 'NO';
        document.body.appendChild(movingNo);

        movingNo.onclick = handleNoClick;
        document.getElementById('yes-btn').onclick = showContract;

        moveInterval = setInterval(() => {
            movingNo.style.position = 'fixed';
            movingNo.style.left = Math.random() * (window.innerWidth - 100) + 'px';
            movingNo.style.top = Math.random() * (window.innerHeight - 50) + 'px';
        }, 1200);
    }

    if (noClickCount === 4) {
        document.body.style.backgroundImage = "url('assets/GAGI WAG 4.gif')";
        document.getElementById('container').style.display = 'none';

        const please = document.createElement('div');
        please.innerText = 'Please?';
        please.style.position = 'fixed';
        please.style.top = '50%';
        please.style.right = '10%';
        please.style.color = '#fff';
        please.style.fontSize = '2rem';
        please.style.cursor = 'pointer';

        please.onclick = showContract;
        document.body.appendChild(please);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('yes-btn').onclick = showContract;
    document.getElementById('no-btn').onclick = handleNoClick;
});
