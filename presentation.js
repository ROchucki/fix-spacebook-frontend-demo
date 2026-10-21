(() => {
const hero = document.querySelector('.hero');
if (!hero || document.querySelector('#demo-toolbar')) return;
const el = (tag, text, cls) => { const n = document.createElement(tag); if (text) n.textContent = text; if (cls) n.className = cls; return n; };
const btn = text => { const n = el('button', text); n.type = 'button'; return n; };
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const style = el('style');
style.textContent = `
html[data-demo-theme=dark]{color-scheme:dark;--background:#090909;--surface:#171717;--navy:#f5f5f5;--text:#f5f5f5;--muted:#c6c6c6;--blue:#2bbfc7;--blue-dark:#8edadd;--border:#369fa5}
.hero{padding:24px 0 32px}.hero h1{font-size:clamp(1.25rem,4.5vw,2rem);line-height:1.25}
#demo-toolbar,.demo-toolbar{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin:12px 0}
#demo-toolbar button,.demo-toolbar button,.demo-card button,.demo-dialog button{font:inherit;color:var(--text);background:var(--surface);border:1px solid var(--border);border-radius:10px;padding:10px;min-height:44px;cursor:pointer}
.demo-track{display:flex;gap:10px;overflow-x:auto;scroll-snap-type:x mandatory;padding:4px 0 16px}
.demo-card{flex:0 0 calc((100% - 20px)/3);min-width:0;scroll-snap-align:start;background:var(--surface);border:1px solid var(--border);border-radius:12px;overflow:hidden}
.demo-card button{width:100%;height:100%;text-align:left;border:0;border-radius:0;overflow-wrap:anywhere}
.demo-card h3{font-size:clamp(.75rem,2.7vw,1rem);line-height:1.3}.demo-card p{font-size:.75rem;margin:0 0 6px}
.demo-card img{width:100%;aspect-ratio:4/3;object-fit:cover;display:block;margin-bottom:8px}
.demo-note{font-size:.75rem;color:var(--muted)}.demo-track.expanded{flex-wrap:wrap;overflow:visible}
.demo-dialog{max-width:620px;width:92vw;max-height:85dvh;overflow:auto;background:var(--surface);color:var(--text);border:1px solid var(--border);border-radius:14px;padding:20px}.demo-dialog::backdrop{background:#000b}
html[data-demo-theme=dark] .service-search{background:#111}
html[data-demo-theme=dark] .form-field input,html[data-demo-theme=dark] .form-field select,html[data-demo-theme=dark] .form-field textarea{background:var(--surface);color:var(--text)}
html[data-demo-theme=dark] .button-secondary:hover,html[data-demo-theme=dark] .button-secondary:focus,html[data-demo-theme=dark] .service-option:hover,html[data-demo-theme=dark] .service-option:focus-visible{background:#173538}
.demo-help{display:inline-block;vertical-align:middle;margin:6px;font-size:.85rem}.demo-help summary{cursor:pointer;color:var(--blue-dark);padding:8px;min-width:44px;min-height:44px}.demo-help p{max-width:340px;padding:12px;background:var(--surface);border:1px solid var(--border);border-radius:8px}
[hidden]{display:none!important}#demo-toolbar button:focus-visible,.demo-toolbar button:focus-visible,.demo-card button:focus-visible,.demo-help summary:focus-visible{outline:3px solid var(--blue);outline-offset:2px}
@media(prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
`;
document.head.append(style);
let helpNumber = 0;
function help(text, name) {
 const box = el('details', '', 'demo-help');
 const summary = el('summary', 'ⓘ');
 summary.setAttribute('aria-label', 'Pomoc: ' + name);
 const p = el('p', text); p.id = 'demo-help-' + (++helpNumber);
 summary.setAttribute('aria-controls', p.id); box.append(summary, p); return box;
}
const toolbar = el('div'); toolbar.id = 'demo-toolbar';
const theme = btn('Demo 2 — ciemny'); theme.setAttribute('aria-pressed', 'false');
theme.addEventListener('click', () => {
 const dark = document.documentElement.dataset.demoTheme !== 'dark';
 document.documentElement.dataset.demoTheme = dark ? 'dark' : 'light';
 theme.textContent = dark ? 'Demo 1 — jasny' : 'Demo 2 — ciemny'; theme.setAttribute('aria-pressed', String(dark));
});
toolbar.append(theme, help('Przełącza wygląd całej strony. Nie zmienia danych ani działania formularzy.', 'motyw')); hero.prepend(toolbar);
const eyebrow = hero.querySelector('.eyebrow'); if (eyebrow) eyebrow.hidden = true;
const section = el('section'); section.setAttribute('aria-labelledby', 'demo-listing-title');
const title = el('h2', 'Ogólne ogłoszenia'); title.id = 'demo-listing-title';
const navigation = el('div', '', 'demo-toolbar');
const previous = btn('←'); previous.setAttribute('aria-label', 'Poprzednie ogłoszenia');
const next = btn('→'); next.setAttribute('aria-label', 'Następne ogłoszenia');
const all = btn('Zobacz wszystkie'); all.setAttribute('aria-expanded', 'false'); all.setAttribute('aria-controls', 'demo-track');
const pause = btn('');
const track = el('div', '', 'demo-track'); track.id = 'demo-track';
const dialog = el('dialog', '', 'demo-dialog'); dialog.setAttribute('aria-labelledby', 'demo-detail-title');
const heading = el('h2'); heading.id = 'demo-detail-title';
const detail = el('p'); const close = btn('Zamknij'); close.addEventListener('click', () => dialog.close()); dialog.append(heading, detail, close); document.body.append(dialog);
let playing = !reduced.matches;
function updatePause() { pause.textContent = playing ? 'Wstrzymaj przewijanie' : 'Włącz przewijanie'; }
function stop() { playing = false; updatePause(); }
updatePause();
const samples = [
 ['Naprawa pralki','Warszawa, Mokotów','Budżet: 150 zł','Diagnostyka pralki, która nie odprowadza wody.'],
 ['Pielęgnacja ogrodu','Warszawa, Wawer','Budżet: 250 zł','Koszenie trawy i porządkowanie ogrodu.'],
 ['Przewóz komody','Warszawa, Praga','Budżet: 200 zł','Przewóz mebla z pomocą przy wniesieniu.'],
 ['Spacer z psem','Warszawa, Ursynów','Budżet: 40 zł','Godzinny spacer z psem.'],
 ['Regulacja roweru','Warszawa, Wola','Budżet: 100 zł','Regulacja hamulców i przerzutek.'],
 ['Sprzątanie mieszkania','Warszawa, Ochota','Budżet: 180 zł','Przykładowe zlecenie sprzątania.']
];
const slots = [];
samples.forEach(([name, location, price, description]) => {
 const card = el('article', '', 'demo-card'); const open = btn(''); const image = el('img'); image.alt = 'Zdjęcie do przykładu: ' + name; image.hidden = true;
 const placeholder = el('p', 'Zdjęcie do dodania'); slots.push({image, placeholder});
 open.append(image, placeholder, el('h3', name), el('p', location), el('p', price), el('p', 'Przykład demo'));
 open.addEventListener('click', () => { stop(); heading.textContent = name; detail.textContent = location + '. ' + description + ' ' + price + '. Ogłoszenie demonstracyjne, bez publikacji i danych kontaktowych.'; dialog.showModal(); });
 card.append(open); track.append(card);
});
const move = direction => track.scrollBy({left:direction * (track.firstElementChild.getBoundingClientRect().width + 10), behavior:reduced.matches ? 'auto' : 'smooth'});
previous.addEventListener('click', () => { stop(); move(-1); }); next.addEventListener('click', () => { stop(); move(1); });
all.addEventListener('click', () => { stop(); const expanded = track.classList.toggle('expanded'); all.setAttribute('aria-expanded', String(expanded)); all.textContent = expanded ? 'Wróć do przewijania' : 'Zobacz wszystkie'; previous.hidden = expanded; next.hidden = expanded; pause.hidden = expanded; });
pause.addEventListener('click', () => { playing = !playing; updatePause(); });
track.addEventListener('pointerdown', stop); track.addEventListener('focusin', stop);
reduced.addEventListener('change', () => { if (reduced.matches) stop(); });
setInterval(() => {
 if (!playing || document.hidden || dialog.open || track.classList.contains('expanded') || track.matches(':hover') || track.contains(document.activeElement)) return;
 const bounds = track.getBoundingClientRect(); if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
 if (track.scrollLeft >= track.scrollWidth - track.clientWidth - 2) track.scrollTo({left:0, behavior:reduced.matches ? 'auto' : 'smooth'}); else move(1);
}, 5000);
navigation.append(previous, next, all, pause);
const label = el('label', 'Zdjęcia do lokalnego podglądu (maks. 6, do 10 MB każde): ');
const input = el('input'); input.type = 'file'; input.accept = 'image/jpeg,image/png,image/webp'; input.multiple = true; label.append(input);
const status = el('p', '', 'demo-note'); status.setAttribute('role', 'status'); let urls = [];
input.addEventListener('change', () => {
 stop(); slots.forEach(({image,placeholder}) => { image.hidden = true; image.removeAttribute('src'); placeholder.hidden = false; }); urls.forEach(url => URL.revokeObjectURL(url)); urls = [];
 const files = [...input.files].filter(file => ['image/jpeg','image/png','image/webp'].includes(file.type) && file.size <= 10485760).slice(0,6);
 files.forEach((file,index) => { const url = URL.createObjectURL(file); urls.push(url); const {image,placeholder} = slots[index]; image.onerror = () => { image.hidden = true; placeholder.hidden = false; status.textContent = 'Nie udało się wyświetlić jednego ze zdjęć. Wybierz inny plik.'; }; image.src = url; image.hidden = false; placeholder.hidden = true; });
 status.textContent = 'Zdjęcia w podglądzie: ' + files.length + '. Pominięte pliki: ' + (input.files.length - files.length) + '. Nic nie wysłano na serwer.';
});
const note = el('p','Prototyp do obejrzenia i przekazania uwag. Ogłoszenia i ceny są przykładowe. Nie wpisuj prawdziwych danych. Zdjęcia nie są publikowane i znikną po odświeżeniu. Konta i płatności nie są dostępne w tej wersji pokazowej.','demo-note');
section.append(title,navigation,track,label,help('Wybierz do sześciu zdjęć JPEG, PNG lub WebP. To podgląd tylko na Twoim urządzeniu, nie publikacja dla innych odwiedzających.','zdjęcia'),status,note);
const actions = hero.querySelector('.actions'); if (actions) actions.before(section); else hero.append(section);
const oldStatus = document.querySelector('.status-section'); if (oldStatus) oldStatus.hidden = true;
[['#request-form','Wpisz fikcyjne dane. Przycisk sprawdza formularz, ale nie zapisuje ani nie publikuje zlecenia.'],['#provider-form','Formularz tworzy testowy podgląd nazwy wykonawcy, bez zapisu na serwerze.']].forEach(([selector,text]) => { const form = document.querySelector(selector); if (form) form.prepend(help(text,'formularz demonstracyjny')); });
})();
