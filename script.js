// Enhanced JS: viewer with keyboard navigation, smooth scrolling for anchors, and basic accessibility
document.getElementById('year').textContent = new Date().getFullYear();

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){ e.preventDefault(); target.scrollIntoView({behavior:'smooth', block:'start'}); }
  });
});

// Build gallery items array
const tiles = Array.from(document.querySelectorAll('.grid .tile'));
const viewer = document.getElementById('viewer');
const vImg = document.querySelector('.v-img');
const vCaption = document.querySelector('.v-caption');
const vClose = document.querySelector('.v-close');
const vPrev = document.querySelector('.v-prev');
const vNext = document.querySelector('.v-next');
let currentIndex = -1;

function openViewer(index){
  const tile = tiles[index];
  if(!tile) return;
  const full = tile.dataset.full || tile.querySelector('img').src;
  const caption = tile.dataset.caption || tile.querySelector('.tile-caption').textContent || '';
  vImg.src = full;
  vCaption.textContent = caption;
  viewer.classList.add('show');
  viewer.setAttribute('aria-hidden','false');
  currentIndex = index;
  // prevent background scroll
  document.body.style.overflow = 'hidden';
}

function closeViewer(){
  viewer.classList.remove('show');
  viewer.setAttribute('aria-hidden','true');
  vImg.src = '';
  currentIndex = -1;
  document.body.style.overflow = '';
}

function showPrev(){ if(currentIndex > 0) openViewer(currentIndex - 1); }
function showNext(){ if(currentIndex < tiles.length - 1) openViewer(currentIndex + 1); }

tiles.forEach((tile, i) => {
  tile.addEventListener('click', (e) =>{
    e.preventDefault();
    openViewer(i);
  });
});

vClose.addEventListener('click', closeViewer);
vPrev.addEventListener('click', (e)=>{ e.stopPropagation(); showPrev(); });
vNext.addEventListener('click', (e)=>{ e.stopPropagation(); showNext(); });

// click backdrop to close
viewer.addEventListener('click', (e)=>{
  if(e.target === viewer) closeViewer();
});

// Keyboard navigation
document.addEventListener('keydown', (e)=>{
  if(viewer.classList.contains('show')){
    if(e.key === 'Escape') closeViewer();
    if(e.key === 'ArrowLeft') showPrev();
    if(e.key === 'ArrowRight') showNext();
  }
});

// small progressive enhancement: lazyload images (modern browsers)
document.querySelectorAll('.grid img').forEach(img => {
  if('loading' in HTMLImageElement.prototype){
    img.setAttribute('loading','lazy');
  }
});
