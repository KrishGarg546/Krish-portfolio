const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      }

      entry.target.classList.add('in-view');
      observer.unobserve(entry.target);
    });
  },
  {
    threshold: 0.18,
    rootMargin: '0px 0px -8% 0px'
  }
);

revealElements.forEach((element, index) => {
  element.style.transitionDelay = `${index * 60}ms`;
  observer.observe(element);
});

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const copyEmailButton = document.getElementById('copy-email');

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const subject = contactForm.subject.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !subject || !message) {
      event.preventDefault();
      formStatus.textContent = 'Please fill all fields before sending.';
      return;
    }

    const submitButton = contactForm.querySelector('button[type="submit"]');
    if (submitButton) {
      submitButton.disabled = true;
      submitButton.textContent = 'Sending...';
    }

    formStatus.textContent = 'Submitting your message...';
  });
}

if (copyEmailButton && formStatus) {
  copyEmailButton.addEventListener('click', async () => {
    const targetEmail = 'krishgarg1711@gmail.com';

    try {
      await navigator.clipboard.writeText(targetEmail);
      formStatus.textContent = 'Email copied to clipboard.';
    } catch {
      formStatus.textContent = 'Unable to copy automatically. Use: krishgarg1711@gmail.com';
    }
  });
}
