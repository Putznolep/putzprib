const settings = {
    namaGithub: "putznolepz",
    token_github: "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",
    fileRepo: "database.json",
    namaRepo: "Tes-Db",
    domain1: "https://putz.putznesia.com",
    apikey: "ptla_vfrFk36uUG0t3Kvyxt9cIxu5gJDnTcPSrh3MygA3qXi", //plta
    capikey: "ptlc_vCmxpYWxMHnVCYEcPgjC7zn3g0e5LY7fTMvaFyX0Qd3", //pltc
    egg: "15", // Isi id egg
    nestid: "5", // Isi id nest
    loc: "1" // Isi id location
};

const form = document.getElementById("loginForm");
const formPanel = document.getElementById("cpanelForm");
const statusText = document.getElementById("status");

document.getElementById("cpanelForm").style.display = "none";

//================= Function =================//

async function copyAllData(user, pw, email) {
    try {
        // Salin username
        await navigator.clipboard.writeText(`Username: ${user}`);
        await new Promise(resolve => setTimeout(resolve, 100));

        // Salin password
        await navigator.clipboard.writeText(`Password: ${pw}`);
        // Tunggu 500ms lagi
        await new Promise(resolve => setTimeout(resolve, 100));

        // Salin email
        await navigator.clipboard.writeText(`Email: ${email}`);
        alert("berhasil menyalin semua data!");
    } catch (err) {
        console.error("Gagal menyalin:", err);
        alert("Terjadi error saat menyalin data");
    }
}

function date(numer) {
    const myMonths = [
        "Januari",
        "Februari",
        "Maret",
        "April",
        "Mei",
        "Juni",
        "Juli",
        "Agustus",
        "September",
        "Oktober",
        "November",
        "Desember"
    ];
    const myDays = [
        "Minggu",
        "Senin",
        "Selasa",
        "Rabu",
        "Kamis",
        "Jum’at",
        "Sabtu"
    ];
    const tgl = new Date(numer);
    const day = tgl.getDate();
    const bulan = tgl.getMonth();
    const thisDay = myDays[tgl.getDay()];
    const yy = tgl.getYear();
    const year = yy < 1000 ? yy + 1900 : yy;
    return `${thisDay}, ${day}/${myMonths[bulan]}/${year}`;
}

function showCustomAlert(
    usernamePanel,
    passwordPanel,
    email,
    settings,
    tanggal,
    ram,
    disk,
    cpu
) {
    let alertCus = document.createElement("div");
    alertCus.classList.add("custom-alert");

    alertCus.innerHTML = `
<div class="custom-alert-header">
<h2>𓈃 𝗗𝗔𝗧𝗔 𝗣𝗔𝗡𝗘𝗟 𝗔𝗡𝗗𝗔</h2>
<button class="close-alert" onclick="this.parentElement.parentElement.remove()">×</button>
</div>
<div style="font-family: monospace;">✎ 𝗨𝘀𝗲𝗿𝗻𝗮𝗺𝗲: ${usernamePanel} 
✎ 𝗣𝗮𝘀𝘀𝘄𝗼𝗿𝗱: ${passwordPanel} 
✎ 𝗘𝗺𝗮𝗶𝗹: ${email}

✎ 𝗟𝗼𝗴𝗶𝗻: <a href="${settings}" target="_blank">${settings}</a>

💻 𝗦𝗽𝗲𝘀𝗶𝗳𝗶𝗸𝗮𝘀𝗶:
Ram: ${ram}MB
Disk: ${disk}MB
Cpu: ${cpu}%

‼️𝗡𝗢𝗧𝗘:
1. DILARANG PAKAI SC DDOS
2. DILARANG SPAM SC PAIRING
3. DILARANG MENJUAL PANEL

📆 𝗧𝗮𝗻𝗴𝗴𝗮𝗹 : ${tanggal}
</div>
<div class="buttonContent">
<button type="button" onclick="copyAllData('${usernamePanel}', '${passwordPanel}', '${email}')">📋 Data Panel Anda</button>
</div>
  `;
    document.body.appendChild(alertCus);
}

form.addEventListener("submit", async e => {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const branch = "main"; //sesuain, tapi biasanya default yaitu main
    const url = `https://api.github.com/repos/${settings.namaGithub}/${settings.namaRepo}/contents/${settings.fileRepo}?ref=${branch}`;

    const res = await fetch(url, {
        headers: {
            Authorization: `Bearer ${settings.token_github}`,
            Accept: "application/vnd.github.v3.raw"
        }
    });

    const data = await res.json();
    const user = data.find(
        u => u.username === username && u.password === password
    );

    if (user) {
        statusText.textContent = "Login berhasil!";
        document.getElementById("loginForm").style.display = "none";
        document.getElementById("cpanelForm").style.display = "block";
    } else {
        statusText.textContent = "Login gagal: username atau password salah";
    }
});

formPanel.addEventListener("submit", async e => {
    e.preventDefault();
    let containerStatus = document.getElementById("statusCpanel");
    let usernamePanel = document.getElementById("usernamePanel").value.trim();
    let email = usernamePanel + "@gmail.com";
    let passwordPanel = document.getElementById("passwordPanel").value.trim();

    const command = document.getElementById("paket").value;
    const paketConfig = {
        "1GB": { ram: "1000", disknya: "1000", cpu: "40" },
        "2GB": { ram: "2000", disknya: "1000", cpu: "60" },
        "3GB": { ram: "3000", disknya: "2000", cpu: "80" },
        "4GB": { ram: "4000", disknya: "2000", cpu: "100" },
        "5GB": { ram: "5000", disknya: "3000", cpu: "120" },
        "6GB": { ram: "6000", disknya: "3000", cpu: "140" },
        "7GB": { ram: "7000", disknya: "4000", cpu: "160" },
        "8GB": { ram: "8000", disknya: "4000", cpu: "180" },
        "9GB": { ram: "9000", disknya: "5000", cpu: "200" },
        "10GB": { ram: "10000", disknya: "5000", cpu: "220" },
        unlimited: { ram: "0", disknya: "0", cpu: "0" }
    };

    let docker = `ghcr.io/parkervcp/yolks:nodejs_20`;
    let config = paketConfig[command];
    try {
        containerStatus.innerHTML = `<div style="background:#cff4fc;color:#055160;padding:10px;border-radius:5px;">⏳ Membuat panel...</div>`;
        let yap = await fetch(
            `/api/createpanel?domain=${settings.domain1}&apikey=${settings.apikey}&capikey=${settings.capikey}&egg=${settings.egg}&nestid=${settings.nestid}&loc=${settings.loc}&username=${usernamePanel}&password=${passwordPanel}&email=${email}&docker_image=${docker}&ram=${config.ram}&disk=${config.disknya}&cpu=${config.cpu}`
        );
        let tanggall = await date(Date.now());
        let cihuy = await yap.json();
        if (cihuy.message === "Berhasil membuat user dan panel") {
            showCustomAlert(
                usernamePanel,
                passwordPanel,
                email,
                settings.domain1,
                tanggall,
                config.ram,
                config.disknya,
                config.cpu
            );
        }
        if (cihuy.error) {
            containerStatus.innerHTML = `
        <div style="background:#f8d7da;color:#842029;padding:10px;border-radius:5px;">
            ❌ ${cihuy.error} 
            </div>
        `;
        }
    } catch (err) {
        containerStatus.innerHTML = `<div style="background:#f8d7da;color:#842029;padding:10px;border-radius:5px;">❌ ${err.message}</div>`;
    }
});

// loader
window.addEventListener("load", () => {
    setTimeout(() => {
        const loader = document.getElementById("load");
        const content = document.getElementById("content");

        loader.style.display = "none";
        content.style.display = "block";
    }, 100);
});
