// Small JS: year, lightbox
document.getElementById('year').textContent = new Date().getFullYear();

const images = document.querySelectorAll('.masonry figure img');
const lightbox = document.getElementById('lightbox');
const lbImg = document.querySelector('.lb-img');
const lbCaption = document.querySelector('.lb-caption');
const lbClose = document.querySelector('.lb-close');

images.forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbCaption.textContent = img.nextElementSibling ? img.nextElementSibling.textContent : img.alt;
    lightbox.classList.add('show');
    lightbox.setAttribute('aria-hidden','false');
  });
});

lbClose.addEventListener('click', () => {
  lightbox.classList.remove('show');
  lightbox.setAttribute('aria-hidden','true');
  lbImg.src = '';
});

lightbox.addEventListener('click', (e) => {
  if(e.target === lightbox) {
    lbClose.click();
  }
});
