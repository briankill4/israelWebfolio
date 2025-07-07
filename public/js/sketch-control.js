document.addEventListener("DOMContentLoaded", () => {
  const sketchControl = document.getElementById("sketch-control");
  const toggle = document.getElementById("toggle-sketch");
  let lastScrollY = window.scrollY;
  

  // Toggle animación
  toggle.addEventListener("change", () => {
    if (!window.p5Instance) return;

    if (toggle.checked) {
      window.p5Instance.noLoop();
    } else {
      window.p5Instance.loop();
    }
    
  });

   // Mostrar/ocultar switch según scroll
      window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;

        if (currentScroll > lastScrollY + 10) {
          sketchControl.classList.add("hide");
        } else if (currentScroll < lastScrollY - 10 && currentScroll < 560) {
          sketchControl.classList.remove("hide");
        }

      lastScrollY = currentScroll;
    });
});
