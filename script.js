// Winterfield Intelligence — interactions
const yearEl = document.getElementById('year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

// Scroll progress + reveal
const progress = document.getElementById('progress');
const revealEls = document.querySelectorAll('.reveal');

const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const pct = (h.scrollTop) / (h.scrollHeight - h.clientHeight) * 100;
  if (progress) progress.style.width = pct + '%';
}, { passive: true });

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn && mobileMenu) {
  menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('open'));
  mobileMenu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));
}

// Product filter
const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('#productGrid .card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    cards.forEach(c => {
      const types = (c.dataset.type || 'all').split(' ');
      const show = f === 'all' || types.includes(f);
      c.style.display = show ? '' : 'none';
      if (show) {
        c.classList.remove('visible');
        requestAnimationFrame(() => requestAnimationFrame(() => c.classList.add('visible')));
      }
    });
  });
});

// Contact form -> mailto
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', () => {
    const name = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg = document.getElementById('cMsg').value.trim();
    const note = document.getElementById('formNote');
    if (!name || !email || !msg) {
      note.textContent = 'Please fill all fields.';
      return;
    }
    const subject = encodeURIComponent(`Website inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${msg}`);
    window.location.href = `mailto:hello@winterfieldintelligence.com?subject=${subject}&body=${body}`;
    note.textContent = 'Opening your email app… Thanks for reaching out!';
    form.reset();
  });
}

// Legal modals
const modal = document.getElementById('legalModal');
const modalTitle = document.getElementById('modalTitle');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

const legal = {
  privacy: {
    title: 'Privacy Policy — Winterfield Intelligence',
    body: `<p><strong>Last updated:</strong> September 2026</p>
    <p>Winterfield Intelligence builds apps and games that respect your privacy. We collect minimal data required to operate our apps, improve performance, and provide support.</p>
    <p><strong>What we collect:</strong> Device info, crash logs, and usage analytics (if enabled). We do not sell personal data. Contact emails are used only to respond to inquiries.</p>
    <p><strong>Third parties:</strong> Google Play Services and analytics / crash reporting may process data per their own policies.</p>
    <p><strong>Children:</strong> Our apps are general-audience; parents should supervise use by children where appropriate.</p>
    <p><strong>Contact:</strong> hello@winterfieldintelligence.com for privacy requests or deletion.</p>`
  },
  terms: {
    title: 'Terms of Service — Winterfield Intelligence',
    body: `<p><strong>Last updated:</strong> September 2026</p>
    <p>By using our apps, games, or website you agree to use them lawfully and not misuse, reverse-engineer, or disrupt our services.</p>
    <p><strong>IP:</strong> All content, branding, and code remain property of Winterfield Intelligence.</p>
    <p><strong>Availability:</strong> Services are provided “as is” without warranties. We may update or discontinue features at any time.</p>
    <p><strong>Liability:</strong> To the maximum extent permitted by law, we are not liable for indirect or consequential damages.</p>
    <p><strong>Contact:</strong> hello@winterfieldintelligence.com</p>`
  }
};

function openModal(kind) {
  modalTitle.textContent = legal[kind].title;
  modalBody.innerHTML = legal[kind].body;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
}
function closeModal() {
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
}
document.getElementById('privacyLink')?.addEventListener('click', e => { e.preventDefault(); openModal('privacy'); });
document.getElementById('termsLink')?.addEventListener('click', e => { e.preventDefault(); openModal('terms'); });
modalClose?.addEventListener('click', closeModal);
modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeModal(); });
