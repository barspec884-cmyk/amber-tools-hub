let amberData = [];

fetch("distilleries.json")
  .then(r => r.json())
  .then(data => (amberData = data));

function amberDoSearch(){
  const q = document.getElementById("amberSearchInput").value.trim().toLowerCase();
  if(!q) return;

  const result = amberData.filter(x =>
    x.name_en?.toLowerCase().includes(q) ||
    x.name_jp?.includes(q) ||
    x.area?.toLowerCase().includes(q) ||
    x.country?.toLowerCase().includes(q)
  );

  // 結果ページへジャンプ
  sessionStorage.setItem("amberSearchResult", JSON.stringify(result));
  window.location.href = "search-result.html";
}
