/* ===========================================================
   PROJECTS.JS — Filter Gallery
   =========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  if (!filterBtns.length || !projectCards.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      // Update active button
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Show/hide cards
      projectCards.forEach(card => {
        const category = card.dataset.category;
        if (filter === 'all' || category === filter) {
          card.style.display = '';
          setTimeout(() => card.classList.add('show'), 10);
        } else {
          card.classList.remove('show');
          setTimeout(() => card.style.display = 'none', 350);
        }
      });
    });
  });

  // Initialize all visible
  projectCards.forEach(card => card.classList.add('show'));
});
