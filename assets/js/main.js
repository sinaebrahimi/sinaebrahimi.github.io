/* ===== Sidebar toggle (mobile) ===== */
const sidebar = document.getElementById('sidebar');
const toggle  = document.getElementById('sidebarToggle');

if (toggle) {
  toggle.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    const icon = toggle.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-times');
  });
}

// Close sidebar when a nav link is clicked (mobile)
document.querySelectorAll('.sidebar-nav a').forEach(link => {
  link.addEventListener('click', () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove('open');
      const icon = toggle.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-times');
    }
  });
});

/* ===== Active nav link on scroll ===== */
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.sidebar-nav a');

function updateActiveNav() {
  let current = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 120;
    if (window.scrollY >= top) {
      current = sec.getAttribute('id');
    }
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) {
      link.classList.add('active');
    }
  });
}

window.addEventListener('scroll', updateActiveNav);
window.addEventListener('load', updateActiveNav);

/* ===== Fade-in sections on scroll ===== */
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

sections.forEach(sec => observer.observe(sec));

/* ===== Skill bar animation ===== */
const skillObserver = new IntersectionObserver(
  entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.style.width; // trigger re-render
        });
      }
    });
  },
  { threshold: 0.3 }
);

const skillSection = document.getElementById('skills');
if (skillSection) skillObserver.observe(skillSection);

// Live GitHub star counts for project cards (cached for an hour per visitor)
document.querySelectorAll('.gh-stars[data-repo]').forEach(async badge => {
  const repo = badge.dataset.repo;
  const key = 'gh-stars:' + repo;
  const show = n => {
    badge.querySelector('.gh-stars-count').textContent = n;
    badge.title = n + (n === 1 ? ' GitHub star' : ' GitHub stars');
    badge.hidden = false;
  };
  try {
    const cached = JSON.parse(localStorage.getItem(key) || 'null');
    if (cached && Date.now() - cached.t < 3600000) return show(cached.n);
  } catch (e) {}
  try {
    const res = await fetch('https://api.github.com/repos/' + repo, { headers: { Accept: 'application/vnd.github+json' } });
    if (!res.ok) return;
    const n = (await res.json()).stargazers_count;
    if (typeof n !== 'number') return;
    show(n);
    try { localStorage.setItem(key, JSON.stringify({ n, t: Date.now() })); } catch (e) {}
  } catch (e) {}
});
