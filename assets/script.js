(function(){
  const $ = s => document.querySelector(s);
  const y = new Date().getFullYear(); const el = document.getElementById('year'); if(el) el.textContent = y;
})();