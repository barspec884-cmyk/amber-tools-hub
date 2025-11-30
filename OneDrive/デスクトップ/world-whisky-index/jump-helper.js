
(function(){
  function norm(s){ return (s||'').toLowerCase(); }
  function byAnchor(){
    var hash = (location.hash||'').replace(/^#/, '');
    if(!hash) return null;
    return hash;
  }
  function byQuery(){
    var p = new URLSearchParams(location.search);
    return p.get('jump');
  }
  function findTarget(key){
    if(!key) return null;
    var sel1 = 'article.card[id="'+key+'"]';
    var sel2 = 'article.card[data-en="'+key+'"]';
    var sel3 = 'article.card[data-jp="'+key+'"]';
    var cand = document.querySelector(sel1) || document.querySelector(sel2) || document.querySelector(sel3);
    if(cand) return cand;
    var els = document.querySelectorAll('article.card');
    key = norm(key);
    for(var i=0;i<els.length;i++){
      var en = norm(els[i].getAttribute('data-en')||'');
      var jp = norm(els[i].getAttribute('data-jp')||'');
      if(en.replace(/\W+/g,'')===key.replace(/\W+/g,'') || jp===key) return els[i];
    }
    return null;
  }
  function scrollToCard(card){
    if(!card) return;
    card.setAttribute('tabindex','-1');
    card.style.outline='2px solid rgba(199,169,122,.55)';
    card.scrollIntoView({behavior:'smooth', block:'center'});
    setTimeout(function(){ card.style.outline=''; }, 1600);
  }
  function run(){
    var key = byAnchor() || byQuery();
    if(!key) return;
    var card = findTarget(key);
    if(card) scrollToCard(card);
  }
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded', run);
  } else {
    run();
  }
})();
