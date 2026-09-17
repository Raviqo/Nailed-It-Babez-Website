const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');

if (menuToggle && nav) {
  menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
  });

  nav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
      menuToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

document.getElementById('year').textContent = new Date().getFullYear();

const dateInput = document.getElementById('bookingDate');
if (dateInput) {
  const today = new Date();
  const localISO = new Date(today.getTime() - today.getTimezoneOffset() * 60000).toISOString().split('T')[0];
  dateInput.min = localISO;
}

const form = document.getElementById('bookingForm');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const service = document.getElementById('service').value;
    const date = document.getElementById('bookingDate').value;
    const time = document.getElementById('bookingTime').value;
    const notes = document.getElementById('notes').value.trim();

    const selected = new Date(`${date}T12:00:00`);
    const day = selected.getDay();
    if (day !== 0 && day !== 6) {
      alert('Nailed It Babez is currently taking appointments on Saturdays and Sundays only. Please choose a weekend date.');
      return;
    }

    const prettyDate = selected.toLocaleDateString('en-ZA', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const lines = [
      'Hi Nailed It Babez 💅',
      '',
      'I would like to request a booking:',
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Service: ${service}`,
      `Preferred date: ${prettyDate}`,
      `Preferred time: ${time}`,
      notes ? `Notes / nail art: ${notes}` : '',
      '',
      'I understand that a R100 deposit is required to secure the appointment and that the booking is only confirmed once the time is accepted and the deposit is received.'
    ].filter(Boolean);

    const url = `https://wa.me/27611859347?text=${encodeURIComponent(lines.join('\n'))}`;
    window.open(url, '_blank', 'noopener');
  });
}
