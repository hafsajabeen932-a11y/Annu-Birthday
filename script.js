const passwordInput = document.getElementById("password");
const unlockBtn = document.getElementById("unlockBtn");
const wrongPassword = document.getElementById("wrongPassword");
const lockScreen = document.getElementById("lockScreen");
const birthdayScreen = document.getElementById("birthdayScreen");
const song = document.getElementById("song");

const continueBtn = document.getElementById("continueBtn");
const cakeScreen = document.getElementById("cakeScreen");
const wishBtn = document.getElementById("wishBtn");
const candles = document.querySelectorAll(".candle");

const transitionScreen = document.getElementById("transitionScreen");
const giftScreen = document.getElementById("giftScreen");
const finishBtn = document.getElementById("finishBtn");
const thankYouScreen = document.getElementById("thankYouScreen");

const gift1 = document.getElementById("gift1");
const gift2 = document.getElementById("gift2");
const gift3 = document.getElementById("gift3");

const giftModal = document.getElementById("giftModal");
const modalTitle = document.getElementById("modalTitle");
const modalText = document.getElementById("modalText");
const closeModal = document.getElementById("closeModal");

const keypadBtns = document.querySelectorAll(".keypadBtn[data-key]");
const keypadClear = document.getElementById("keypadClear");
const keypadBack = document.getElementById("keypadBack");

const CORRECT_PASSWORD = "1707";

/* ==========================================
   FLOATING HEARTS BACKGROUND
========================================== */
(function spawnHearts() {
    const heartsContainer = document.getElementById("hearts");
    if (!heartsContainer) return;

    const symbols = ["❤️", "💕", "💖", "🩷"];
    const HEART_COUNT = 22;

    for (let i = 0; i < HEART_COUNT; i++) {
        const heart = document.createElement("span");
        heart.className = "heart";
        heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const size = 18 + Math.random() * 34;
        const left = Math.random() * 100;
        const duration = 9 + Math.random() * 10;
        const delay = Math.random() * 15;

        heart.style.left = left + "vw";
        heart.style.fontSize = size + "px";
        heart.style.animationDuration = duration + "s";
        heart.style.animationDelay = delay + "s";

        heartsContainer.appendChild(heart);
    }
})();

/* ==========================================
   CUTE "DUDU BUBU" STYLE BUBBLES
========================================== */
(function spawnCuteBubbles() {
    const bubbleContainer = document.getElementById("cuteBubbles");
    if (!bubbleContainer) return;

    const symbols = ["🐻", "🐰", "🧸", "💗", "🐻‍❄️", "🩵"];
    const BUBBLE_COUNT = 10;

    for (let i = 0; i < BUBBLE_COUNT; i++) {
        const bubble = document.createElement("span");
        bubble.className = "cuteBubble";
        bubble.textContent = symbols[Math.floor(Math.random() * symbols.length)];

        const size = 30 + Math.random() * 26;
        const left = Math.random() * 100;
        const duration = 12 + Math.random() * 8;
        const delay = Math.random() * 18;

        bubble.style.left = left + "vw";
        bubble.style.fontSize = size + "px";
        bubble.style.animationDuration = duration + "s";
        bubble.style.animationDelay = delay + "s";

        bubbleContainer.appendChild(bubble);
    }
})();

/* ==========================================
   NUMERIC KEYPAD
========================================== */
keypadBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
        if (passwordInput.value.length < 4) {
            passwordInput.value += btn.dataset.key;
        }

        if (passwordInput.value.length === 4) {
            setTimeout(unlock, 150);
        }
    });
});

keypadBack.addEventListener("click", () => {
    passwordInput.value = passwordInput.value.slice(0, -1);
});

keypadClear.addEventListener("click", () => {
    passwordInput.value = "";
});

passwordInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") unlock();
});

unlockBtn.addEventListener("click", unlock);

function unlock() {
    if (passwordInput.value === CORRECT_PASSWORD) {

        lockScreen.classList.add("fadeOut");

        setTimeout(() => {
            lockScreen.style.display = "none";
            birthdayScreen.style.display = "flex";
            birthdayScreen.style.visibility = "visible";
            birthdayScreen.style.opacity = "1";
            birthdayScreen.classList.add("fadeIn");
            song.play().catch(()=>{});
        }, 1200);

    } else {
        wrongPassword.classList.add("showError");
        passwordInput.classList.add("shake");

        setTimeout(() => passwordInput.classList.remove("shake"), 500);
        setTimeout(() => wrongPassword.classList.remove("showError"), 2500);

        passwordInput.value = "";
    }
}

continueBtn.addEventListener("click", () => {
    birthdayScreen.classList.add("fadeOut");

    setTimeout(() => {
        birthdayScreen.style.display = "none";

        cakeScreen.classList.remove("hidden");
        cakeScreen.style.display = "flex";
        cakeScreen.style.visibility = "visible";
        cakeScreen.style.opacity = "1";
        cakeScreen.classList.add("fadeIn");
    }, 1200);
});

/* ==========================================
   MAKE A WISH
========================================== */
wishBtn.addEventListener("click", () => {

    candles.forEach((candle, i) => {
        setTimeout(() => {
            candle.classList.add("blown");
        }, i * 300);
    });

    setTimeout(() => {
        cakeScreen.style.display = "none";

        transitionScreen.classList.remove("hidden");
        transitionScreen.style.display = "flex";
        transitionScreen.style.visibility = "visible";
        transitionScreen.style.opacity = "1";
    }, 2600);

    setTimeout(() => {
        transitionScreen.style.display = "none";
        transitionScreen.classList.add("hidden");

        giftScreen.classList.remove("hidden");
        giftScreen.style.display = "flex";
        giftScreen.style.visibility = "visible";
        giftScreen.style.opacity = "1";
    }, 5600);
});

/* ==========================================
   GIFTS
========================================== */

const openedGifts = new Set();

// extraClass lets each gift give the shared modal its own look
// (bouquet card / handwritten letter / drive link card)
function openModal(title, htmlContent, giftId, extraClass) {

    modalTitle.innerText = title;
    modalText.innerHTML = htmlContent;

    // reset any look from a previous gift before applying this one
    giftModal.classList.remove("bouquetModal", "loveLetterModal", "driveModal");
    if (extraClass) giftModal.classList.add(extraClass);

    giftModal.classList.remove("hidden");

    if (giftId) {
        openedGifts.add(giftId);
        document.getElementById(giftId).classList.add("opened");

        if (openedGifts.size === 3) {
            finishBtn.classList.remove("hidden");
            finishBtn.classList.add("visible");
        }
    }
}

closeModal.addEventListener("click", () => {
    giftModal.classList.add("hidden");
});

giftModal.addEventListener("click", (e) => {
    if (e.target === giftModal) giftModal.classList.add("hidden");
});

// GIFT 1 — Bouquet photo
gift1.addEventListener("click", () => {
    openModal(
        "💐 A Bouquet",
        `<img class="bouquetPhoto" src="images/imagesBouquet.jpg" alt="A bouquet for you">
        <p class="bouquetCaption">For You My Love 🌹</p>
        `,
        "gift1",
        "bouquetModal"
    );
});

// GIFT 2 — Handwritten love letter
gift2.addEventListener("click", () => {
    openModal(
        "💌 A Letter For You",
        `
        <div class="loveLetter">
            Soo umm HI! balkeh nhii Assalam o Alaikum Warehmatullahi Wabrakatuhu, boldya pora happy happy?. hehehehehe!! 😅<br><br>

            Tu mai jab yeh likh rhi hun tu aap mere saamne hain video call pe, and now you know oss din why my fingers were typing so fast😚, and as usual you are playing your stupid game, and singing in your beautiful voice😍.<br><br>

            Mujhe tu gaane dete nhi hain or nahi interest lete hain mere concert mei, but chalo ajj birthday hai tu maaf krti hun.<br><br>

            Tuuuuu bhaee kya bolun😭😭😭😭 Meri Jaan meri zindagi mere jaan e jahan mera sukoon mera sab kch, MERA ANNU<br><br>

            Thank You soooooooooooooo much for coming into my life at the most perfect time. Yes, as we are long-distance, and I don't know hamare saath kya hoga agay, but I do believe that we will definitely end up together.<br><br>

            I LOVE YOU SOOOOO VERYYY MUCH, and you have no idea at all keh aapne meri life kitni brighten krdi hai kitni behtareen bana di hai and sexyyy bhiii 😜.<br><br>

            Kher, you are the best thing that has happened to me, Muhammad Anas Ansari. Never, ever doubt that. Although yeh joo aapki calls aati hain itne msgs aate hain naaa kisi din phone toor dungi aapka. Pagal, Gawar, Jahil!!! MERI JAAAN😘..<br><br>

            Achaaa ab ziyada lambiii nhi I know abhii hi keh jab tak aap yeh dekh rahe honge mai aapko miss kr rhiii hongi.<br><br>

            So meri jaaan yeh pehli aapki birthday aisi celebrate hui hai, and In Sha Allah future ki saari birthdays mai itni hi special banaongi aapkeliye. In Sha Allah hum hamesha saath rahenge isi tarah haste khelte roothte manate rahenge ek dosre ko (of course mai roothungi or aap manayenge).<br><br>

            okayyy so ab bsss jldi se baaqi pora gift dekhen or mere paas ajayen cuz I miss you🥹<br><br>

            One more thing Thank you for always being my biggest supporter, my shoulder to cry on, my sexyyy handsome hubby, my life partner and My soulmate.<br><br>

            Once again; HAPPY 23rd BIRTHDAY MERIII ZINDAGI!!! Enjoy yoour day Jaanu with ME😁. Seeee Youuuu Soon.<br>

            <span class="signature">Umaaahhh😘😘😘🩷❤️. </span> <br>
            P.S you also made me cry while I was making this for you. Somehow punctuality is more imp for you than me.<br>
            Pore Pore badle lungi betuuu! Ab samajh aya why it was important to start it beforehand. GAWAAR!!! 🙂‍↔️
        </div>
        `,
        "gift2",
        "loveLetterModal"
    );
});

// GIFT 3 — Final surprise (Google Drive link)
const DRIVE_LINK = "https://drive.google.com/drive/folders/1HQv0gr4_qC0ra2GPkA-AMcwiXjqkariW?usp=drive_link";

gift3.addEventListener("click", () => {
    openModal(
        "🎁 One Last Surprise",
        `
        <p>I made something extra special for you 💫</p>
        <br>
        <a class="driveLinkBtn" href="${DRIVE_LINK}" target="_blank" rel="noopener">Click here to see it 💖</a>
        `,
        "gift3",
        "driveModal"
    );
});

// After all 3 gifts are opened, move on to the final thank-you page
finishBtn.addEventListener("click", () => {
    giftScreen.classList.add("fadeOut");

    setTimeout(() => {
        giftScreen.style.display = "none";

        thankYouScreen.classList.remove("hidden");
        thankYouScreen.style.display = "flex";
        thankYouScreen.style.visibility = "visible";
        thankYouScreen.style.opacity = "1";
        thankYouScreen.classList.add("fadeIn");
    }, 1200);
});