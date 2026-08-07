const scrollButton = document.getElementById('scrollGames');
scrollButton?.addEventListener('click', () => {
  document.getElementById('games-list')?.scrollIntoView({ behavior: 'smooth' });
});

document.querySelectorAll('.faq-question').forEach((button) => {
  button.addEventListener('click', () => {
    const item = button.closest('.faq-item');
    const wasOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach((el) => el.classList.remove('open'));
    if (!wasOpen) item.classList.add('open');
  });
});
