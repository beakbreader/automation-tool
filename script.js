const questions = [
  // Section I: MCQs
  { type:'mcq', question:'Let f(x)=3(x–2)²+5. What is f⁻¹(14)?',
    options:['2±√3','2±3','2+√3 only','2–√3 only'], correctIndex:0 },
  { type:'mcq', question:'Solve cos x = −½ for 0≤x<2π.',
    options:['2π/3, 4π/3','π/3, 5π/3','π/2, 3π/2','π/6, 5π/6'], correctIndex:0 },
  { type:'mcq', question:'For y=x⁴, what is dy/dx at x=2?',
    options:['8','16','32','64'], correctIndex:2 },
  { type:'mcq', question:'The binomial coefficient C(8, 3) equals:',
    options:['56','84','336','120'], correctIndex:0 },
  { type:'mcq', question:'Arithmetic seq: a₁=7, d=−3. Find a₅.',
    options:['−5','−2','−3','−8'], correctIndex:0 },
  { type:'mcq', question:'Geometric seq: first term 8, ratio ½. Sum of first 4 terms:',
    options:['12','15','10','14'], correctIndex:0 },
  { type:'mcq', question:'Domain of f(x)=√(x−1) is:',
    options:['x≤1','x≥1','x>1','x<1'], correctIndex:1 },
  { type:'mcq', question:'P(odd) on fair die:',
    options:['½','⅓','⅔','1/6'], correctIndex:0 },
  { type:'mcq', question:'Let f(x)=1/x, g(x)=x²−1. Then f∘g and domain:',
    options:['1/(x²−1), x≠±1','(x²−1)/x, x≠0','1/(x−1), x≠1','1/(x+1), x≠−1'],
    correctIndex:0 },
  { type:'mcq', question:'limₓ→3 (x²−9)/(x−3) =',
    options:['0','3','6','does not exist'], correctIndex:2 },

  // Section II: Short Answer (auto-save; no auto-grade)
  { type:'short', question:'11a. f\'(x) for f(x)=x³−6x²+9x+1.' },
  { type:'short', question:'11b. Stationary points: find & classify.' },
  { type:'short', question:'11c. Sketch rough graph & mark stationary points.' },
  { type:'short', question:'12. Solve sin(2x)=√3 cos x, 0≤x<2π.' },
  { type:'short', question:'13a. 5th term of geo seq (8, ½).' },
  { type:'short', question:'13b. Sum to infinity of that seq.' },
  { type:'short', question:'13c. Smallest n so sum > 15.' },
  { type:'short', question:'14. Expand (x+2)⁵.' },
  { type:'short', question:'15a. P(both green) from 3R,2B,5G draw 2 w/o repl.' },
  { type:'short', question:'15b. P(one red, one blue).' },
  { type:'short', question:'15c. P(at least one red).' },

  // Section III: Extended Response
  { type:'extended', question:'16a. Compute f\'(x) for f(x)=x³−3x²−9x+27.' },
  { type:'extended', question:'16b. Find & classify stationary points.' },
  { type:'extended', question:'16c. Confirm via f\'\'.' },
  { type:'extended', question:'16d. Describe end-behaviour as x→±∞.' },
  { type:'extended', question:'16e. Sketch y=f(x); label intercepts & stationary.' },
  { type:'extended', question:'17a. Express R(x)=x p(x) with p(x)=50−2x.' },
  { type:'extended', question:'17b. Find R\'(x) & critical point(s).' },
  { type:'extended', question:'17c. Classify via second derivative.' },
  { type:'extended', question:'17d. Calculate max revenue & x.' },
  { type:'extended', question:'17e. Sketch R(x) on [0,25] with max point.' }
];

let current = 0;
const answers = Array(questions.length).fill(null);

document.addEventListener('DOMContentLoaded', () => {
  showQuestion();
  document.getElementById('next-btn').onclick = nextQuestion;
  document.getElementById('prev-btn').onclick = prevQuestion;
  document.getElementById('submit-btn').onclick = submitQuiz;
});

function showQuestion() {
  const q = questions[current];
  const container = document.getElementById('question-container');
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'question-card';
  card.innerHTML = `<h2>Question ${current+1} of ${questions.length}</h2>
                    <p>${q.question}</p>`;
  if (q.type === 'mcq') {
    q.options.forEach((opt,i) => {
      const label = document.createElement('label');
      label.className = 'option';
      label.innerHTML = `<input type="radio" name="opt" value="${i}">
                         <span>${String.fromCharCode(65+i)}. ${opt}</span>`;
      if (answers[current] === i) label.querySelector('input').checked = true;
      card.appendChild(label);
    });
  } else if (q.type === 'short') {
    const inp = document.createElement('input');
    inp.type = 'text';
    inp.name = 'short';
    inp.value = answers[current] || '';
    inp.placeholder = 'Your answer';
    card.appendChild(inp);
  } else {
    const ta = document.createElement('textarea');
    ta.name = 'extended';
    ta.rows = 4;
    ta.value = answers[current] || '';
    ta.placeholder = 'Your response';
    card.appendChild(ta);
  }
  container.appendChild(card);
  updateButtons();
  updateProgress();
}

function saveAnswer() {
  const q = questions[current];
  if (q.type === 'mcq') {
    const sel = document.querySelector('input[name="opt"]:checked');
    answers[current] = sel ? +sel.value : null;
  } else if (q.type === 'short') {
    answers[current] = document.querySelector('input[name="short"]').value.trim();
  } else {
    answers[current] = document.querySelector('textarea[name="extended"]').value.trim();
  }
}

function nextQuestion() {
  saveAnswer();
  if (current < questions.length-1) current++;
  showQuestion();
}
function prevQuestion() {
  saveAnswer();
  if (current > 0) current--;
  showQuestion();
}

function updateButtons() {
  document.getElementById('prev-btn').disabled = current === 0;
  if (current === questions.length-1) {
    document.getElementById('next-btn').classList.add('hidden');
    document.getElementById('submit-btn').classList.remove('hidden');
  } else {
    document.getElementById('next-btn').classList.remove('hidden');
    document.getElementById('submit-btn').classList.add('hidden');
  }
}

function updateProgress() {
  const pct = ((current+1)/questions.length)*100;
  document.querySelector('.progress-fill').style.width = pct + '%';
}

function submitQuiz() {
  saveAnswer();
  const totalMCQ = questions.filter(q => q.type==='mcq').length;
  let correct = 0;
  questions.forEach((q,i) => {
    if (q.type==='mcq' && answers[i] === q.correctIndex) correct++;
  });
  const out = document.getElementById('question-container');
  out.innerHTML = `<div class="result-card">
    <h2>Results</h2>
    <p><strong>MCQ Score:</strong> ${correct} / ${totalMCQ}</p>
    <h3>Your Answers</h3>
    <ul>${questions.map((q,i) => {
      let resp = '';
      if (q.type==='mcq') {
        resp = answers[i] != null ? String.fromCharCode(65+answers[i]) : '—';
      } else {
        resp = answers[i] || '—';
      }
      return `<li>Q${i+1}: ${resp}</li>`;
    }).join('')}</ul>
    <button onclick="location.reload()">Try Again</button>
  </div>`;
  document.getElementById('prev-btn').classList.add('hidden');
  document.getElementById('submit-btn').classList.add('hidden');
}
