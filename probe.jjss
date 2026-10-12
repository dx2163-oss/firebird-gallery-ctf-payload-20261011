(() => {
  const run = () => {
    const form = document.getElementById('review-note');
    const note = form?.elements.namedItem('note');
    if (!form || !note) return;
    note.value = 'payload-ran';
    form.submit();
  };
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', run, { once: true });
  } else {
    run();
  }
})();
