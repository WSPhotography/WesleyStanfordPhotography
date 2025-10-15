document.addEventListener('DOMContentLoaded', function(){
  document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
      window.open(img.src, '_blank');
    });
  });
});
