document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector(".mini-cards");
  const thumb = document.querySelector(".fake-thumb");
  const scrollbar = document.querySelector(".fake-scrollbar");

  function updateThumb() {
    const ratio = container.clientWidth / container.scrollWidth;
    const thumbWidth = Math.max(ratio * scrollbar.clientWidth, 32);
    const maxX = scrollbar.clientWidth - thumbWidth;
    const scrollRatio = container.scrollLeft / (container.scrollWidth - container.clientWidth);

    thumb.style.width = thumbWidth + "px";
    thumb.style.transform = "translateX(" + maxX * scrollRatio + "px)";
  }

  container.addEventListener("scroll", updateThumb);
  window.addEventListener("resize", updateThumb);
  updateThumb();

  // Перетаскивание thumb
  let isDragging = false;
  let startX = 0;
  let startScroll = 0;

  thumb.addEventListener("mousedown", function(e) {
    isDragging = true;
    startX = e.clientX;
    startScroll = container.scrollLeft;
    e.preventDefault();
  });

  document.addEventListener("mousemove", function(e) {
    if (!isDragging) return;
    const dx = e.clientX - startX;
    const scrollRatio = dx / scrollbar.clientWidth;
    container.scrollLeft = startScroll + scrollRatio * container.scrollWidth;
  });

  document.addEventListener("mouseup", function() { isDragging = false; });

  // Touch support
  thumb.addEventListener("touchstart", function(e) {
    isDragging = true;
    startX = e.touches[0].clientX;
    startScroll = container.scrollLeft;
    e.preventDefault();
  }, {passive:false});

  document.addEventListener("touchmove", function(e) {
    if(!isDragging) return;
    const dx = e.touches[0].clientX - startX;
    const scrollRatio = dx / scrollbar.clientWidth;
    container.scrollLeft = startScroll + scrollRatio * container.scrollWidth;
  }, {passive:false});

  document.addEventListener("touchend", function() { isDragging = false; });
});
