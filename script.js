const $ = s => document.querySelector(s);
const root = document.documentElement;

/* ---------- Menu mobile ---------- */
const burger = $('#burger'), menu = $('#menu');
function toggleMenu(open) {
    menu.classList.toggle('open', open);
    burger.classList.toggle('on', open);
    burger.setAttribute('aria-expanded', open);
    document.body.style.overflow = open ? 'hidden' : '';
}
burger.onclick = () => toggleMenu(!menu.classList.contains('open'));
menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => toggleMenu(false)));

/* ---------- "Isto é para mim?" ---------- */
const para = $('#para-quem');
function abrirPara(open) {
    para.classList.toggle('open', open);
    para.setAttribute('aria-hidden', !open);
}
$('#paraMim').addEventListener('click', e => {
    e.preventDefault();
    abrirPara(true);
    setTimeout(() => para.scrollIntoView({ behavior: 'smooth', block: 'start' }), 120);
});
$('#fechar').onclick = () => {
    abrirPara(false);
    $('#servicos').scrollIntoView({ behavior: 'smooth', block: 'end' });
};

/* ---------- Slides carregados dinamicamente ---------- */
const slides = [
    { t: 'Sensor + LED', p: 'Um LED ligado a um sensor sinaliza quando há um veículo no ponto cego.' },
    { t: 'Quanto mais perto, mais forte', p: 'A intensidade do LED aumenta conforme o veículo se aproxima: atrás, nas laterais e na frente.' },
    { t: 'Alerta sonoro', p: 'Com o caminhão parado, um som avisa as pessoas ao redor de que ele vai sair.' }
];
const body = $('#slideBody'), dots = $('#dots'), DUR = 6000;
let cur = 0, timer;

slides.forEach((_, i) => {
    const b = document.createElement('button');
    b.innerHTML = '<i></i>';
    b.setAttribute('aria-label', 'Slide ' + (i + 1));
    b.onclick = () => go(i);
    dots.appendChild(b);
});
dots.style.setProperty('--t', DUR / 1000 + 's');

function go(i) {
    cur = (i + slides.length) % slides.length;
    body.style.animation = 'none'; body.offsetHeight; body.style.animation = '';
    body.innerHTML = `<span class="tag">0${cur + 1} / 0${slides.length}</span><h3>${slides[cur].t}</h3><p>${slides[cur].p}</p>`;
    [...dots.children].forEach((d, k) => {
        d.className = k < cur ? 'done' : '';
        if (k === cur) { d.offsetWidth; d.className = 'on'; }
    });
    clearTimeout(timer);
    timer = setTimeout(() => go(cur + 1), DUR);
}
$('#prev').onclick = () => go(cur - 1);
$('#next').onclick = () => go(cur + 1);
go(0);

/* ---------- Demo do LED ---------- */
const dist = $('#dist'), car = $('#car'), ledB = $('#ledB'), state = $('#state');
function upd() {
    const i = 1 - dist.value / 100;
    ledB.style.opacity = i < 0.05 ? 0 : (0.15 + i * 0.85).toFixed(2);
    car.setAttribute('y', 300 + dist.value * 0.66);
    state.textContent = i < 0.05 ? 'Sem alerta' : i < 0.4 ? 'LED fraco' : i < 0.75 ? 'LED médio' : 'LED forte';
}
dist.oninput = upd; upd();

/* ---------- Revelar ao rolar ---------- */
const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
}), { threshold: .15 });
document.querySelectorAll('.rv').forEach(el => io.observe(el));

const foto = document.getElementById('foto_1');
const img = document.getElementById('figura_1');

const figura_1 = 'figura_1.png';
const figura_2 = 'figura_2.png';

new Image().src = figura_2;

foto.addEventListener('mouseenter', () => img.src = figura_2);
foto.addEventListener('mouseleave', () => img.src = figura_1);