(function () {
  const $ = (s) => document.querySelector(s);
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} },
  };
  const lahoreToday = () => new Intl.DateTimeFormat("en-CA", { timeZone: "Asia/Karachi" }).format(new Date());
  const fmtDate = (d) => new Date(d + "T12:00:00").toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });

  /* Clocks and greeting */
  function tick() {
    const f = (tz) => new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: tz }).format(new Date());
    $("#t-lhr").textContent = f("Asia/Karachi");
    $("#t-ldn").textContent = f("Europe/London");
    const g = $("#greet");
    if (g) {
      const h = +f("Asia/Karachi").slice(0, 2);
      g.textContent = h < 5 ? "Still awake in Lahore," : h < 12 ? "Good morning from Lahore," : h < 17 ? "Afternoon in Lahore," : h < 21 ? "Evening in Lahore," : "Night falls on Lahore,";
    }
  }
  tick(); setInterval(tick, 15000);
  const yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();

  /* Home page */
  if (window.DIARY) {
    const entries = window.DIARY;
    const cards = [...document.querySelectorAll(".card")];
    const today = lahoreToday(), year = +today.slice(0, 4);

    $("#yr-label").textContent = year;
    $("#s-count").textContent = entries.length;
    $("#s-words").textContent = entries.reduce((n, e) => n + e.words, 0).toLocaleString();
    $("#s-streak").textContent = entries[0] ? Math.max(0, Math.round((new Date(today + "T12:00:00") - new Date(entries[0].date + "T12:00:00")) / 864e5)) : 0;

    const byDate = {}; entries.forEach((e) => { if (!byDate[e.date]) byDate[e.date] = e; });
    const box = $("#days"), start = new Date(Date.UTC(year, 0, 1));
    for (let i = 0; i < start.getUTCDay(); i++) { const s = document.createElement("span"); s.style.visibility = "hidden"; box.appendChild(s); }
    for (let d = new Date(start); d.getUTCFullYear() === year; d.setUTCDate(d.getUTCDate() + 1)) {
      const iso = d.toISOString().slice(0, 10), e = byDate[iso];
      const el = document.createElement(e ? "a" : "span");
      el.className = "day" + (iso > today ? " future" : "") + (e ? " on" : "") + (iso === today ? " today" : "");
      el.title = e ? fmtDate(iso) + ": " + e.title : iso;
      if (e) { el.href = e.url; el.setAttribute("aria-label", el.title); }
      box.appendChild(el);
    }

    let mood = "all", query = "";
    const used = new Set(entries.map((e) => e.mood));
    const chips = $("#chips");
    ["all", ...(window.MOODS || []).filter((m) => used.has(m))].forEach((m) => {
      const b = document.createElement("button");
      b.className = "chip"; b.type = "button"; b.textContent = m === "all" ? "Every mood" : m;
      b.setAttribute("aria-pressed", m === mood);
      b.onclick = () => { mood = m; chips.querySelectorAll(".chip").forEach((c) => c.setAttribute("aria-pressed", c === b)); apply(); };
      chips.appendChild(b);
    });
    if (used.size < 2) chips.hidden = true;

    function apply() {
      let shown = 0;
      cards.forEach((c, i) => {
        const e = entries[i];
        const ok = (mood === "all" || e.mood === mood) && (!query || e.text.includes(query));
        c.hidden = !ok; if (ok) shown++;
      });
      $("#no-match").hidden = shown > 0 || !cards.length;
    }
    $("#q").addEventListener("input", (ev) => { query = ev.target.value.toLowerCase().trim(); apply(); });
    $("#random").onclick = () => {
      const pool = cards.filter((c) => !c.hidden);
      if (pool.length) location.href = pool[Math.floor(Math.random() * pool.length)].querySelector("a").href;
    };
    if (!cards.length) $(".controls").hidden = true;
  }

  /* Entry page */
  const entry = $("#entry");
  if (entry) {
    const id = entry.dataset.id, liked = store.get("btc-liked", {}), h = $("#heart");
    const paint = () => { h.setAttribute("aria-pressed", !!liked[id]); h.textContent = liked[id] ? "You felt this" : "Felt this"; };
    paint();
    h.onclick = () => { liked[id] = !liked[id]; store.set("btc-liked", liked); paint(); };
    $("#copy").onclick = async () => {
      try { await navigator.clipboard.writeText(location.href); $("#copy").textContent = "Link copied"; }
      catch (e) { $("#copy").textContent = "Copy from the address bar"; }
    };
  }

  /* Fireflies across the whole site */
  const c = $("#sky"), x = c.getContext("2d"), still = matchMedia("(prefers-reduced-motion: reduce)").matches;
  let W, H, dpr, flies = [], mouse = { x: -999, y: -999 };
  function size() { dpr = Math.min(2, window.devicePixelRatio || 1); W = c.clientWidth; H = c.clientHeight; c.width = W * dpr; c.height = H * dpr; x.setTransform(dpr, 0, 0, dpr, 0, 0); }
  function seed() { const n = Math.round(Math.min(110, (W * H) / 9000)); flies = Array.from({ length: n }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, r: 1 + Math.random() * 2.2, p: Math.random() * 6.28, s: 0.4 + Math.random() * 0.8 })); }
  window.addEventListener("pointermove", (e) => { mouse.x = e.clientX; mouse.y = e.clientY; });
  document.addEventListener("pointerleave", () => { mouse.x = mouse.y = -999; });
  function draw(t) {
    x.clearRect(0, 0, W, H);
    for (const f of flies) {
      if (!still) {
        f.vx += Math.cos(t / 1800 + f.p) * 0.012 * f.s; f.vy += Math.sin(t / 2200 + f.p * 1.3) * 0.012 * f.s;
        const dx = mouse.x - f.x, dy = mouse.y - f.y, d = Math.hypot(dx, dy);
        if (d < 180 && d > 1) { f.vx += (dx / d) * 0.035; f.vy += (dy / d) * 0.035; }
        f.vx *= 0.97; f.vy *= 0.97; f.x += f.vx; f.y += f.vy;
        if (f.x < -10) f.x = W + 10; if (f.x > W + 10) f.x = -10; if (f.y < -10) f.y = H + 10; if (f.y > H + 10) f.y = -10;
      }
      const glow = still ? 0.7 : 0.45 + 0.55 * Math.abs(Math.sin((t / 900) * f.s + f.p));
      const g = x.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 7);
      g.addColorStop(0, `rgba(255,210,63,${0.9 * glow})`); g.addColorStop(0.3, `rgba(255,210,63,${0.25 * glow})`); g.addColorStop(1, "rgba(255,210,63,0)");
      x.fillStyle = g; x.beginPath(); x.arc(f.x, f.y, f.r * 7, 0, 6.283); x.fill();
    }
    if (!still) requestAnimationFrame(draw);
  }
  size(); seed();
  new ResizeObserver(() => { size(); seed(); if (still) draw(0); }).observe(c);
  still ? draw(0) : requestAnimationFrame(draw);
})();
