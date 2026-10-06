(() => {
  "use strict";
  const $ = (s, c = document) => c.querySelector(s),
    $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const img = (id, w = 600) =>
    `https://images.unsplash.com/photo-${id}?w=${w}&q=70&auto=format&fit=crop`;

  const menu = [
    [
      "Espresso",
      "Coffee",
      20000,
      "Shot pekat dengan crema tebal.",
      "1510707577719-ae7c14805e3a",
    ],
    [
      "Americano",
      "Coffee",
      22000,
      "Espresso ringan dengan air panas.",
      "1495474472287-4d71bcdd2085",
    ],
    [
      "Cappuccino",
      "Coffee",
      28000,
      "Espresso, susu steam, foam lembut.",
      "1572442388796-11668a67e53d",
    ],
    [
      "Cafe Latte",
      "Coffee",
      28000,
      "Susu creamy dengan latte art.",
      "1461023058943-07fcbe16d735",
    ],
    [
      "Caramel Macchiato",
      "Coffee",
      32000,
      "Vanila, susu, espresso, saus karamel.",
      "1485808191679-5f86510681a2",
    ],
    [
      "Mocha",
      "Coffee",
      30000,
      "Espresso berpadu cokelat premium.",
      "1578314675249-a6910f80cc4e",
    ],
    [
      "Matcha Latte",
      "Non Coffee",
      28000,
      "Matcha Jepang dengan susu segar.",
      "1515823064-d6e0c04616a7",
    ],
    [
      "Chocolate",
      "Non Coffee",
      25000,
      "Cokelat pekat hangat atau dingin.",
      "1542990253-0d0f5be5f0ed",
    ],
    [
      "Croissant",
      "Pastry",
      25000,
      "Renyah berlapis, dipanggang pagi hari.",
      "1555507036-ab1f4038808a",
    ],
    [
      "Cinnamon Roll",
      "Pastry",
      27000,
      "Lembut dengan glaze kayu manis.",
      "1509365390695-33aae754e05f",
    ],
    [
      "Chicken Sandwich",
      "Food",
      38000,
      "Roti panggang, ayam, sayur segar.",
      "1528735602780-2552fd46c7af",
    ],
    [
      "Truffle Fries",
      "Food",
      35000,
      "Kentang renyah, parmesan, truffle.",
      "1573080496219-bb080dd4f877",
    ],
  ];
  const favs = [
    [
      "Signature Latte",
      "Latte gula aren rahasia kami.",
      "1461023058943-07fcbe16d735",
      30000,
    ],
    [
      "Caramel Macchiato",
      "Manis, creamy, wajib dicoba.",
      "1485808191679-5f86510681a2",
      32000,
    ],
    [
      "Iced Americano",
      "Segar dan bersih rasanya.",
      "1517701604599-bb29b565090c",
      24000,
    ],
    [
      "Chocolate Croissant",
      "Isi cokelat leleh di tiap gigitan.",
      "1555507036-ab1f4038808a",
      29000,
    ],
  ];
  const gal = [
    ["Coffee", "1495474472287-4d71bcdd2085"],
    ["Barista", "1511920170033-f8396924c348"],
    ["Interior", "1554118811-1e0d58224f24"],
    ["Pastry", "1509365390695-33aae754e05f"],
    ["Outdoor Area", "1559496417-e7f25cb247f3"],
    ["Coffee Brewing", "1447933601403-0c6688de566e"],
  ];
  const tes = [
    [
      "Coffee-nya enak banget dan tempatnya nyaman. Cocok untuk kerja maupun nongkrong.",
      "Andi",
      5,
    ],
    ["Interiornya aesthetic dan pelayanan sangat ramah.", "Sarah", 5],
    ["Caramel Macchiato-nya wajib dicoba!", "Daniel", 5],
  ];
  const rp = (n) => "Rp " + n.toLocaleString("id-ID");
  const stars = (n) => "★".repeat(n) + "☆".repeat(5 - n);

  // Render
  const card = (n, d, p, id, extra = "", cat = "") =>
    `<article class="card reveal" data-cat="${cat}">${extra}<div class="im"><img src="${img(id)}" alt="${n}" loading="lazy"></div><div class="bd"><h3>${n}</h3><p>${d}</p><div class="row"><span class="price">${rp(p)}</span><button class="btn" data-order="${n}">Order</button></div></div></article>`;
  $("#menuGrid").innerHTML = menu
    .map((m) => card(m[0], m[3], m[2], m[4], "", m[1]))
    .join("");
  $("#favGrid").innerHTML = favs
    .map((f) =>
      card(f[0], f[1], f[3], f[2], '<span class="badge">BEST SELLER</span>'),
    )
    .join("");
  $("#galGrid").innerHTML = gal
    .map(
      (g) =>
        `<figure tabindex="0" data-big="${img(g[1], 1200)}"><img src="${img(g[1], 700)}" alt="${g[0]}" loading="lazy"><figcaption>${g[0]}</figcaption></figure>`,
    )
    .join("");
  $("#tesGrid").innerHTML = tes
    .map(
      (t) =>
        `<article class="card reveal"><div class="stars" aria-label="Rating ${t[2]} dari 5">${stars(t[2])}</div><p>“${t[0]}”</p><p><b>— ${t[1]}</b></p></article>`,
    )
    .join("");
  $("#socGrid").innerHTML = gal
    .map(
      (g) =>
        `<a href="https://instagram.com/brewandbean" target="_blank" rel="noopener" aria-label="Instagram: ${g[0]}"><img src="${img(g[1], 300)}" alt="${g[0]}" loading="lazy"></a>`,
    )
    .join("");

  // Toast
  const toast = $("#toast");
  let tt;
  const notify = (msg) => {
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(tt);
    tt = setTimeout(() => toast.classList.remove("show"), 3200);
  };

  // Mobile menu
  const burger = $("#burger"),
    nav = $("#menuNav");
  const closeMenu = () => {
    nav.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  };
  burger.onclick = () =>
    burger.setAttribute("aria-expanded", nav.classList.toggle("open"));
  $$("a", nav).forEach((a) => a.addEventListener("click", closeMenu));

  // Scroll: sticky nav, back-to-top, active link
  const header = $("#nav"),
    top = $("#top"),
    links = $$("a", nav),
    secs = links.map((a) => $(a.hash));
  const onScroll = () => {
    const y = scrollY;
    header.classList.toggle("solid", y > 60);
    top.classList.toggle("show", y > 600);
    let cur = 0;
    secs.forEach((s, i) => {
      if (s && s.offsetTop - 140 <= y) cur = i;
    });
    links.forEach((a, i) => a.classList.toggle("active", i === cur));
  };
  addEventListener("scroll", onScroll, { passive: true });
  onScroll();
  top.onclick = () => scrollTo({ top: 0, behavior: "smooth" });

  // Menu filter
  $("#filters").onclick = (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("#filters button").forEach((x) => x.classList.toggle("on", x === b));
    $$("#menuGrid .card").forEach((c) =>
      c.classList.toggle(
        "hide",
        b.dataset.f !== "all" && c.dataset.cat !== b.dataset.f,
      ),
    );
  };
  $("#menuGrid").onclick = $("#favGrid").onclick = (e) => {
    const b = e.target.closest("[data-order]");
    if (b) notify(`${b.dataset.order} ditambahkan ke pesanan ☕`);
  };

  // Lightbox
  const lb = $("#lb"),
    lbImg = $("img", lb);
  const openLb = (f) => {
    lbImg.src = f.dataset.big;
    lbImg.alt = $("img", f).alt;
    lb.hidden = false;
    $("#lbX").focus();
  };
  $("#galGrid").onclick = (e) => {
    const f = e.target.closest("figure");
    if (f) openLb(f);
  };
  $("#galGrid").onkeydown = (e) => {
    if (e.key === "Enter") {
      const f = e.target.closest("figure");
      if (f) openLb(f);
    }
  };
  lb.onclick = (e) => {
    if (e.target !== lbImg) lb.hidden = true;
  };
  addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      lb.hidden = true;
      closeMenu();
    }
  });

  // Reservation validation
  const form = $("#resForm");
  const rules = {
    nama: (v) => v.trim().length >= 3 || "Nama minimal 3 karakter.",
    email: (v) =>
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v) || "Format email tidak valid.",
    telp: (v) =>
      /^(\+62|62|0)8\d{7,11}$/.test(v.replace(/[\s-]/g, "")) ||
      "Gunakan nomor Indonesia, contoh 0812xxxxxxxx.",
    jumlah: (v) => (v >= 1 && v <= 20) || "Jumlah orang 1–20.",
    tanggal: (v) =>
      (v && v >= new Date().toISOString().slice(0, 10)) ||
      "Pilih tanggal hari ini atau setelahnya.",
    waktu: (v) => !!v || "Pilih waktu kedatangan.",
  };
  form.tanggal.min = new Date().toISOString().slice(0, 10);
  form.onsubmit = (e) => {
    e.preventDefault();
    let ok = true;
    Object.keys(rules).forEach((k) => {
      const r = rules[k](form[k].value),
        l = form[k].parentElement;
      l.classList.toggle("err", r !== true);
      $("small", l).textContent = r === true ? "" : r;
      if (r !== true) ok = false;
    });
    if (!ok) return notify("Periksa kembali data reservasi Anda.");
    notify(
      `Terima kasih ${form.nama.value.trim()}, meja Anda berhasil dipesan!`,
    );
    form.reset();
  };

  // Reveal + counters
  const io = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        en.target.classList.add("in");
        io.unobserve(en.target);
      }),
    { threshold: 0.15 },
  );
  $$(".reveal").forEach((el) => io.observe(el));
  const co = new IntersectionObserver(
    (es) =>
      es.forEach((en) => {
        if (!en.isIntersecting) return;
        co.unobserve(en.target);
        const el = en.target,
          n = +el.dataset.n,
          t0 = performance.now();
        const step = (t) => {
          const p = Math.min((t - t0) / 1600, 1);
          el.textContent = Math.round(n * (1 - Math.pow(1 - p, 3)));
          if (p < 1) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }),
    { threshold: 0.6 },
  );
  $$("[data-n]").forEach((el) => co.observe(el));
})();
