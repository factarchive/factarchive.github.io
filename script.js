function answer(btn, userChoice) {
  // Collapse all other explanations and reset their buttons
  document.querySelectorAll('.quiz-card').forEach(card => {
    if (card !== btn.closest('.quiz-card')) {
      const exp = card.querySelector('.explanation');
      if (exp) exp.classList.add('hidden');
      card.classList.remove('correct', 'incorrect');
      card.querySelectorAll('button').forEach(b => b.disabled = false);
    }
  });

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