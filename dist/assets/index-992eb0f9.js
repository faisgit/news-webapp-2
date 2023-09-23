(function () {
  const n = document.createElement("link").relList;
  if (n && n.supports && n.supports("modulepreload")) return;
  for (const e of document.querySelectorAll('link[rel="modulepreload"]')) a(e);
  new MutationObserver((e) => {
    for (const r of e)
      if (r.type === "childList")
        for (const c of r.addedNodes)
          c.tagName === "LINK" && c.rel === "modulepreload" && a(c);
  }).observe(document, { childList: !0, subtree: !0 });
  function o(e) {
    const r = {};
    return (
      e.integrity && (r.integrity = e.integrity),
      e.referrerPolicy && (r.referrerPolicy = e.referrerPolicy),
      e.crossOrigin === "use-credentials"
        ? (r.credentials = "include")
        : e.crossOrigin === "anonymous"
        ? (r.credentials = "omit")
        : (r.credentials = "same-origin"),
      r
    );
  }
  function a(e) {
    if (e.ep) return;
    e.ep = !0;
    const r = o(e);
    fetch(e.href, r);
  }
})();
let u = "1be14230ed5b4618bf8494c7accbbf75";
const p = document.querySelector("#search-box");
let m = [],
  f = document.querySelector("#news-container"),
  y = document.querySelectorAll(".news-category"),
  s = "general",
  h = "in";
const d = async (t) => {
  try {
    let n = t
      ? `https://newsapi.org/v2/top-headlines?q=${t}&country=in&apiKey=${u}`
      : ` https://newsapi.org/v2/top-headlines?category=${s}&country=${h}&apiKey=${u}`;
    (m = (await (await fetch(n)).json()).articles), w(), g();
  } catch (n) {
    console.log(n);
  }
};
function g() {
  (f.innerHTML = ""),
    m.forEach((t) => {
      let n = document.createElement("div");
      n.className = "card  w-96 bg-primary-content text-black  shadow-xl mb-5";
      let o = document.createElement("figure"),
        a = document.createElement("img");
      (a.className = " h-[236px] "),
        a.setAttribute(
          "src",
          t.urlToImage
            ? t.urlToImage
            : "https://images.unsplash.com/photo-1692611901268-8e24ed37ee15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1436&q=80"
        ),
        o.appendChild(a);
      let e = document.createElement("div");
      e.className = "card-body";
      let r = document.createElement("h2");
      (r.className = "card-title"),
        (r.innerHTML = JSON.stringify(t.title).slice(1, 10)),
        e.appendChild(r);
      let c = document.createElement("p");
      (c.innerHTML = JSON.stringify(t.description).slice(1, 45)),
        e.appendChild(c);
      let l = document.createElement("div");
      l.className = "card-actions justify-end";
      let i = document.createElement("a");
      (i.className = "btn btn-primary"),
        i.setAttribute("href", t.url),
        (i.innerHTML = "ReadMore"),
        l.appendChild(i),
        e.appendChild(l),
        n.appendChild(o),
        n.appendChild(e),
        f.appendChild(n);
    });
}
p.addEventListener("keypress", async (t) => {
  t.key === "Enter" && (await d(p.value));
});
function b(t) {
  (s = t), d();
}
function w() {
  y.forEach((t) => {
    t.addEventListener("click", (n) => {
      (s = n.currentTarget.dataset.id), b(s);
    });
  });
}
d();
