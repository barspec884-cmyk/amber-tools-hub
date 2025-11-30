// back-to-index.js
document.addEventListener('DOMContentLoaded', () => {
  console.log("✅ back-to-index.js 読み込み完了");

  const back = document.createElement('a');

  // ページ名から現在地を取得
  const path = location.pathname.toLowerCase();

  // デフォルト（World Whisky Index に戻る）
  let target = 'world-whisky-index.html';
  let label = '← World Whisky Index に戻る';

  // Socatch系6ページはSocatch Indexへ戻る
  const socatch Pages = [
    'islay-distillery.html',
    'islands-distillery.html',
    'campbeltown-distillery.html',
    'speyside-distillery.html',
    'highland-distillery.html',
    'lowland-distillery.html'
  ];

  if (socatchPages.some(p => path.includes(p))) {
    target = 'socatch-index.html';
    label = '← Socatch Index に戻る';
  }

  back.href = target;
  back.textContent = label;

  back.style.cssText = `
    display:inline-block;
    text-decoration:none;
    color:var(--accent);
    border:1px solid rgba(199,169,122,.25);
    padding:6px 14px;
    border-radius:10px;
    background:#181614;
    margin:14px 0 18px;
    font-weight:700;
    transition:background .2s;
    position:fixed;
    top:16px;
    left:16px;
    z-index:9999;
  `;

  back.addEventListener('mouseenter', ()=> back.style.background='#1e1b17');
  back.addEventListener('mouseleave', ()=> back.style.background='#181614');

  const wrap = document.querySelector('.wrap') || document.body;
  wrap.insertBefore(back, wrap.firstChild);
});
