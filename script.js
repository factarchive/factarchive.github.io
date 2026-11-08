function answer(btn, userChoice) {
  const card = btn.closest('.quiz-card');
  const correct = card.dataset.answer === 'true';
  const explanation = card.querySelector('.explanation');
  explanation.classList.remove('hidden');
  card.classList.remove('correct', 'incorrect');
  if (userChoice === correct) {
    card.classList.add('correct');
  } else {
    card.classList.add('incorrect');
  }
  card.querySelectorAll('button').forEach(b => b.disabled = true);
}