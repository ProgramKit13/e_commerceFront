// ResizeHandler.ts
const updateDisplayPageContainerClass = () => {
    const displayPageContainer = document.getElementById("displayPageContainer");
    const navBarSlideArea = document.querySelector(".navBarSlideArea");
    const navBarRow = document.querySelector(".navBarRow");
  
    if (displayPageContainer && navBarSlideArea && navBarRow) {
      if (window.innerWidth <= 758) {
        displayPageContainer.classList.remove("upContentPage");
        displayPageContainer.classList.remove("downContentPage");
      } else {
        displayPageContainer.classList.add("upContentPage");
        navBarSlideArea.classList.remove("visible");
        navBarSlideArea.classList.add("hidden");
        navBarRow.classList.remove("visible");
        navBarRow.classList.add("hidden");
      }
    }
  };
  
  export const setupResizeHandler = () => {
    // Atualiza a classe ao carregar a página
    updateDisplayPageContainerClass();
  
    // Atualiza a classe ao redimensionar a janela
    window.addEventListener("resize", updateDisplayPageContainerClass);
  };
  