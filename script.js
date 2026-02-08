const tabButtons = document.querySelectorAll('.banquet-tabs .tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    // Сбрасываем активность у всех кнопок и панелей
    tabButtons.forEach(b => b.classList.remove('active'));
    tabPanes.forEach(p => p.classList.remove('active'));

    // Делаем активной текущую кнопку и соответствующую панель
    btn.classList.add('active');
    document.getElementById(btn.dataset.target).classList.add('active');
  });
});
