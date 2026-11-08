const questions = [
  // Quran & Texts
  {
    cat: "quran",
    q: "According to Sahih Bukhari 5134, Muhammad married Aisha at what age and consummated the marriage at what age?",
    options: ["6 and 9", "9 and 12", "15 and 18", "Ages not stated"],
    a: 0,
    exp: "Aisha narrated she was married at six and the marriage was consummated at nine."
  },
  {
    cat: "quran",
    q: "Quran 9:29 commands fighting which groups until they pay the <span class='term' data-def='Tax paid by non-Muslims (dhimmis) under Islamic rule in exchange for protection.'>jizya</span>?",
    options: ["Only polytheists", "People of the Book who do not accept Islam", "All non-Arabs", "No one; the verse is abrogated"],
    a: 1,
    exp: "Fight those who do not believe... from those who were given the Scripture until they give the jizya willingly while humbled."
  },
  {
    cat: "quran",
    q: "Quran 4:34 lists the final disciplinary step for a wife suspected of <span class='term' data-def='Rebellion or disobedience by a wife toward her husband.'>nushuz</span> as:",
    options: ["Immediate divorce", "Advise, separate in bed, then strike", "Public flogging", "Nothing physical"],
    a: 1,
    exp: "Admonish them, forsake them in bed, and strike them (wadribuhunna)."
  },
  // Women
  {
    cat: "women",
    q: "In classical rulings based on Quran 2:282, how does a woman’s testimony compare to a man’s in financial contracts?",
    options: ["Equal", "Two women equal one man", "Women cannot testify", "Judge decides case-by-case"],
    a: 1,
    exp: "Two female witnesses are required so that if one errs the other can remind her."
  },
  {
    cat: "women",
    q: "Classical inheritance rules (Quran 4:11) generally give a daughter what share relative to a son?",
    options: ["Equal share", "Half the share of a son", "Double the share of a son", "No inheritance"],
    a: 1,
    exp: "A male receives the share of two females."
  },
  // Homosexuality
  {
    cat: "homosexuality",
    q: "Hadith in Tirmidhi, Abu Dawud and others prescribe what penalty for male homosexual intercourse?",
    options: ["Flogging only", "Kill both partners", "Exile", "No penalty recorded"],
    a: 1,
    exp: "“Whoever you find doing the action of the people of Lut, kill the one who does it and the one to whom it is done.”"
  },
  // History
  {
    cat: "history",
    q: "The early Islamic expansions after Muhammad’s death brought which territories under Muslim rule within roughly a century?",
    options: ["Only the Arabian Peninsula", "Middle East, North Africa, Persia, and parts of Spain and Central Asia", "All of Europe", "None; expansion stopped"],
    a: 1,
    exp: "Conquests under the Rashidun and Umayyad caliphates established rule from Spain to the Indus."
  },
  // Politics / Countries
  {
    cat: "politics",
    q: "Iran’s Islamic Republic has maintained high execution numbers under Sharia-derived penalties. Approximate executions recorded 2008–2025 exceed:",
    options: ["1,000", "5,000", "11,000", "100"],
    a: 2,
    exp: "Iran Human Rights recorded at least 11,196 executions in that period, plus earlier massacres such as 1988."
  },
  // Demographics
  {
    cat: "demographics",
    q: "Pew 2013 found what level of support for making Sharia official law in countries such as Afghanistan and Pakistan?",
    options: ["Under 10%", "Around 50%", "Majorities to near-unanimity (84–99%)", "No data"],
    a: 2,
    exp: "99% Afghanistan, 84% Pakistan, with similarly high figures in several other majority-Muslim countries."
  },
  // Sects
  {
    cat: "sects",
    q: "The two largest branches of Islam are:",
    options: ["Sunni and Shia", "Sufi and Salafi only", "Ibadi and Ahmadiyya", "They have no divisions"],
    a: 0,
    exp: "Sunni (~85–90%) and Shia (~10–15%). They differ on succession, jurisprudence, and have a history of conflict."
  }
];

let filtered = [...questions];
let current = 0;
let score = 0;
let attempted = 0;
let userName = localStorage.getItem("quizName") || "";

function init() {
  if (userName) document.getElementById("userName").value = userName;
  renderFilters();
  updateScore();
}

function renderFilters() {
  const cats = ["all", "quran", "women", "homosexuality", "history", "politics", "demographics", "sects"];
  const labels = {all:"All", quran:"Quran & Texts", women:"Women", homosexuality:"Homosexuality", history:"History", politics:"Politics & Countries", demographics:"Demographics", sects:"Sects"};
  let html = "";
  cats.forEach(c => {
    html += `<button onclick="filter('${c}')">${labels[c]}</button> `;
  });
  document.getElementById("filters").innerHTML = html;
}

function filter(cat) {
  filtered = cat === "all" ? [...questions] : questions.filter(q => q.cat === cat);
  current = 0;
  score = 0;
  attempted = 0;
  updateScore();
  if (filtered.length) showQuestion();
  else document.getElementById("quiz").innerHTML = "<p>No questions in this category yet.</p>";
}

function startQuiz() {
  userName = document.getElementById("userName").value.trim() || "Guest";
  localStorage.setItem("quizName", userName);
  document.getElementById("name-entry").classList.add("hidden");
  document.getElementById("quiz-area").classList.remove("hidden");
  filter("all");
}

function showQuestion() {
  if (current >= filtered.length) {
    document.getElementById("quiz").innerHTML = `<div class="fact-card"><p>Category complete. Score: ${score}/${attempted}</p><button onclick="filter('all')">Restart All</button></div>`;
    return;
  }
  const q = filtered[current];
  let html = `<div class="fact-card"><p class="question">${q.q}</p>`;
  q.options.forEach((opt, i) => {
    html += `<button onclick="choose(${i})">${opt}</button><br><br>`;
  });
  html += `<div class="explanation hidden"></div></div>`;
  document.getElementById("quiz").innerHTML = html;
  addTooltips();
}

function choose(i) {
  const q = filtered[current];
  const correct = i === q.a;
  const exp = document.querySelector(".explanation");
  const buttons = document.querySelectorAll("#quiz button");

  if (correct) {
    score++;
    attempted++;
    exp.innerHTML = "Correct. " + q.exp;
    exp.classList.remove("hidden");
    buttons.forEach(b => b.disabled = true);
    // Add Next button
    const nextBtn = document.createElement("button");
    nextBtn.textContent = "Next";
    nextBtn.onclick = () => { current++; showQuestion(); };
    nextBtn.style.marginTop = "12px";
    document.querySelector(".fact-card").appendChild(nextBtn);
    updateScore();
  } else {
    exp.innerHTML = "Incorrect. Try again.";
    exp.classList.remove("hidden");
    // Optionally disable only the wrong button
    buttons[i].disabled = true;
  }
}

function updateScore() {
  document.getElementById("scoreboard").textContent = `Score: ${score} correct / ${attempted} attempted`;
}

function addTooltips() {
  document.querySelectorAll(".term").forEach(el => {
    el.title = el.dataset.def;
    el.style.borderBottom = "1px dotted #1d9bf0";
    el.style.cursor = "help";
  });
}

window.onload = init;