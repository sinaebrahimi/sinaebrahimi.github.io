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
