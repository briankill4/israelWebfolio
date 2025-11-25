document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.accordion');

  panels.forEach(panel => {
    panel.addEventListener('click', () => {
      const isExpanded = panel.classList.contains('expanded');

      // Si ya estaba expandido → volver a contraer
      if (isExpanded) {
        panel.classList.remove('expanded');
        panel.classList.remove('flex-12');
        panel.classList.add('flex-1');
      } else {12
        // Contraer todos primero
        panels.forEach(p => {
          p.classList.remove('expanded', 'flex-12');
          p.classList.add('flex-1');
        });

        // Expandir el actual
        panel.classList.add('expanded');
        panel.classList.remove('flex-1');
        panel.classList.add('flex-12');
      }
    });
  });
});
