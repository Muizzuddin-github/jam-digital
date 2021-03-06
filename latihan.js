// hari tanggal bulan tahun
function tanggal(){
    const sekarang = {
        hari : new Date().getDay(),
        tanggal : new Date().getDate(),
        bulan : new Date().getMonth(),
        tahun  : new Date().getFullYear()
    }

    let hari = ['Minggu','Senin','Selasa',"Rabu","Kamis","Jum\'at","Sabtu"]
    let bulan = ['January','Februari','Maret','April','Mei','Juni',"Juli",'Agustus','September','Oktober','November','Desember']

    const date = document.querySelector('.tanggal p');
    date.innerHTML = `${hari[sekarang.hari]}  ${sekarang.tanggal}  ${bulan[sekarang.bulan]} ${sekarang.tahun}`
};

// jam
setInterval(function(){
    const pwaktu = document.querySelector('.waktu p')
    const sekarng = [new Date().getHours(), new Date().getMinutes(), new Date().getSeconds()]

    if(sekarng[0] < 10 && sekarng[1] < 10){
        pwaktu.innerHTML = '0'+ sekarng[0] +':0'+ sekarng[1] +':'+ sekarng[2]
    }else if(sekarng[0] < 10){
        pwaktu.innerHTML = '0'+ sekarng[0] +':'+ sekarng[1] +':'+ sekarng[2]
    }else if(sekarng[1] < 10){
        pwaktu.innerHTML = sekarng[0] +':0'+ sekarng[1] +':'+ sekarng[2]
    }else if(sekarng[2] < 10){
        pwaktu.innerHTML = sekarng[0] +':'+ sekarng[1] +':0'+ sekarng[2]
    }else{
        pwaktu.innerHTML = sekarng[0] +':'+ sekarng[1] +':'+ sekarng[2]
    }
    tanggal()
},1000);



// jadwal waktu solat subuh
function waktuSolat(jam, menit, solat){
    const thn = new Date().getFullYear()
    let bln = new Date().getMonth()
    if(bln === 12){
        bln = 0 
    }else{
        bln += 1
    }

    let tanggal = new Date().getDate() 
    let waktu = new Date(`${thn}, ${bln}, ${tanggal}, ${jam}:${menit}:00`).getTime();
    if(solat === 'subuh'){
        // waktu += 21600 * 1000 dulu
        waktu += 18000 * 1000
    }
    setInterval(function(){
        const sekarang = new Date().getTime();
        const selisih = waktu - sekarang;
    
        const jam = Math.floor(selisih % (60 * 60 * 24 * 1000) / (60 * 60 * 1000))
        const menit = Math.floor(selisih % (60 * 60  * 1000) / (60 * 1000))
        const detik = Math.floor(selisih % (60 * 1000) / 1000)
    
        const jadwal = document.querySelector(`.${solat} p`)
        jadwal.innerHTML = `${jam}:${menit}:${detik}`
        if(selisih <= 1){
            clearInterval;
            jadwal.innerHTML = '0:0:0'
            return
        }
    
    }, 1000);
};


// logika penghitung waktu mundur dijalankan
setInterval(function(){
    penandaJam = new Date().getHours();
    penadaMenit = new Date().getMinutes();
    // if((penandaJam === 18 && penadaMenit > 33) || (penandaJam > 18 && penandaJam <= 23) || (penandaJam < 4 || penandaJam === 4 && penadaMenit <= 16)){
    //     waktuSolat(23, 16, 'subuh')

    // }else if((penandaJam === 4 && penadaMenit > 16) || (penandaJam > 4 && penandaJam < 11) || (penandaJam === 11 && penadaMenit <= 30)){
    //     waktuSolat(11, 30, 'dzuhur');

    // }else if((penandaJam === 11 && penadaMenit > 30) || (penandaJam > 11 && penandaJam < 14) || (penandaJam === 14 && penadaMenit <= 49)){
    //     waktuSolat(14, 49, 'asar');

    // }else if((penandaJam === 14 && penadaMenit > 49) || (penandaJam > 14 && penandaJam < 17) || (penandaJam === 17 && penadaMenit <= 19)){
    //     waktuSolat(17, 19, 'magrib');

    // }else if((penandaJam === 17 && penadaMenit > 19) || (penandaJam === 18 && penadaMenit <= 33)){
    //     waktuSolat(18, 33, 'isya');
    // } dulu


    // refactoring code 

    if(penandaJam === 4){
        if(penadaMenit <= 16){
            waktuSolat(23, 16, 'subuh')
        }else{
            waktuSolat(11, 30, 'dzuhur');
        }
    }else if(penandaJam === 11){
        if(penadaMenit > 30){
            waktuSolat(14, 49, 'asar');
        }else{
            waktuSolat(11, 30, 'dzuhur');
        }
    }else if(penandaJam === 14){
        if(penadaMenit > 49){
            waktuSolat(17, 19, 'magrib');
        }else{
            waktuSolat(14, 49, 'asar');
        }
    }else if(penandaJam === 17){
        if(penadaMenit > 19){
            waktuSolat(18, 33, 'isya');
        }else{
            waktuSolat(17, 19, 'magrib');
        }
    }else if(penandaJam === 18){
        if(penadaMenit > 33){
            waktuSolat(23, 16, 'subuh')
        }else{
            waktuSolat(18, 33, 'isya');
        }
    }else{
        if(penandaJam > 4){
            if(penandaJam < 11){
                waktuSolat(11, 30, 'dzuhur');
            }else if(penandaJam < 14){
                waktuSolat(14, 49, 'asar');
            }else if(penandaJam < 17){
                waktuSolat(17, 19, 'magrib');
            }else{
                waktuSolat(23, 16, 'subuh')
            }
        }
    }




}, 1000);

// ketika menu toggle diklik
const menu = document.getElementsByClassName('menu')[0]
const span = [menu.querySelector('span:first-child'), menu.querySelector('span:nth-child(2)'), menu.querySelector('span:last-child')]
const container = document.querySelector('.container');
const jadwal = document.querySelector('.jadwalSolat')
container.addEventListener('click', function(e){
    if(e.target.className === 'menu' || e.target.className === 's'){
        jadwal.classList.toggle('kembali')
        span[0].classList.toggle('first')
        span[1].classList.toggle('second')
        span[2].classList.toggle('last')
    }else if(e.target.className != 'menu' && e.target.className != 's'){
        jadwal.classList.remove('kembali')
        span[0].classList.remove('first')
        span[1].classList.remove('second')
        span[2].classList.remove('last')
    }
});