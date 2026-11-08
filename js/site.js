/* =====================================================================
   ZETRA WEBSITE SETTINGS
   Add your real contact details and social links here. Anything left as
   "" is hidden automatically, so nothing fake ever appears on the site.
   - email:     e.g. "hello@yourdomain.com"
   - whatsapp:  digits only with country code, e.g. "2348012345678"
   - phone:     a normal phone number, e.g. "08012345678"
   - social:    full profile addresses, e.g. "https://x.com/yourhandle"
   ===================================================================== */
window.ZETRA = {
  contact: { email: "zetraorld0@gmail.com", whatsapp: "2348056604409", phone: "08065425732" },
  social: { instagram: "", x: "", linkedin: "", tiktok: "https://www.tiktok.com/@zetra_ecosystem", youtube: "https://www.youtube.com/@zetraworld", github: "" }
};

(function () {
  "use strict";
  var Z = window.ZETRA, $ = function (s, r) { return (r || document).querySelector(s); }, $$ = function (s, r) { return [].slice.call((r || document).querySelectorAll(s)); };

  /* header and mobile menu */
  var hd = $("#hd"), burger = $("#burger"), menu = $("#menu");
  function setMenu(o) { hd.classList.toggle("open", o); hd.classList.toggle("menu-open", o); burger.setAttribute("aria-expanded", o ? "true" : "false"); burger.setAttribute("aria-label", o ? "Close menu" : "Open menu"); document.body.style.overflow = o ? "hidden" : ""; }
  burger.addEventListener("click", function () { setMenu(!hd.classList.contains("open")); });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape" && hd.classList.contains("open")) { setMenu(false); burger.focus(); } });
  addEventListener("resize", function () { if (innerWidth > 1000 && hd.classList.contains("open")) setMenu(false); });
  function onScroll() { hd.classList.toggle("solid", scrollY > 24); } onScroll(); addEventListener("scroll", onScroll, { passive: true });

  /* reveal on scroll */
  if ("IntersectionObserver" in window) {
    var ro = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add("in"); ro.unobserve(e.target); } }); }, { threshold: .12 });
    $$(".reveal").forEach(function (el) { ro.observe(el); });
  } else { $$(".reveal").forEach(function (el) { el.classList.add("in"); }); }

  /* floating WhatsApp button */
  if (Z.contact.whatsapp) {
    var fab = document.createElement("a"); fab.className = "fab"; fab.href = "https://wa.me/" + Z.contact.whatsapp + "?text=" + encodeURIComponent("Hello Zetra, I would like to ask about "); fab.target = "_blank"; fab.rel = "noopener"; fab.setAttribute("aria-label", "Chat with Zetra on WhatsApp");
    fab.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 20.5l1.7-5.4A8.4 8.4 0 1 1 21 11.5z"/></svg><span>Chat on WhatsApp</span>';
    document.body.appendChild(fab);
  }

  /* footer year and social links */
  var yr = $("#yr"); if (yr) yr.textContent = new Date().getFullYear();
  var names = { instagram: "Instagram", x: "X", linkedin: "LinkedIn", tiktok: "TikTok", youtube: "YouTube", github: "GitHub" };
  var live = Object.keys(Z.social).filter(function (k) { return Z.social[k]; });
  if (live.length && $("#social")) {
    live.forEach(function (k) { var li = document.createElement("li"), a = document.createElement("a"); a.href = Z.social[k]; a.textContent = names[k] || k; a.target = "_blank"; a.rel = "noopener"; li.appendChild(a); $("#social").appendChild(li); });
    $("#social-col").hidden = false;
  }

  /* products: filter and details dialog */
  var pills = $$(".pills button"), cards = $$(".pc");
  pills.forEach(function (b) {
    b.addEventListener("click", function () {
      pills.forEach(function (x) { x.setAttribute("aria-pressed", "false"); }); b.setAttribute("aria-pressed", "true");
      var c = b.getAttribute("data-cat");
      cards.forEach(function (card) { card.hidden = !(c === "All" || card.getAttribute("data-cat") === c); });
    });
  });
  var dlg = $("#dlg");
  if (dlg && typeof dlg.showModal === "function") {
    $$("[data-open]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        var card = btn.closest("[data-name]"); var n = card.getAttribute("data-name"), c = card.getAttribute("data-cat"), s = card.getAttribute("data-status"), d = card.getAttribute("data-desc");
        $("#dn", dlg).textContent = n; $("#dc", dlg).textContent = c; $("#dd", dlg).textContent = d;
        var st = $("#ds", dlg); st.textContent = s === "live" ? "Live" : "Coming soon"; st.className = "st " + s;
        $("#da", dlg).href = "contact.html?product=" + encodeURIComponent(n);
        dlg.showModal();
      });
    });
    dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });
    $(".x", dlg).addEventListener("click", function () { dlg.close(); });
  }

  /* contact form: opens WhatsApp or email with the message prepared */
  var form = $("#cf");
  if (form) {
    var ch = Z.contact, st = $("#status"), list = $("#channels"), box = $("#cform");
    var hasW = !!ch.whatsapp, hasE = !!ch.email;
    if (!hasW && !hasE) { box.hidden = true; $("#nochan").hidden = false; }
    else {
      if (hasW) $("#bw").hidden = false; if (hasE) $("#be").hidden = false;
      if (hasW) { var l1 = document.createElement("li"); l1.innerHTML = "<small>WhatsApp</small>"; var a1 = document.createElement("a"); a1.href = "https://wa.me/" + ch.whatsapp; a1.target = "_blank"; a1.rel = "noopener"; a1.textContent = "+" + ch.whatsapp; l1.appendChild(a1); list.appendChild(l1); }
      if (ch.phone) { var l3 = document.createElement("li"); l3.innerHTML = "<small>Phone</small>"; var a3 = document.createElement("a"); a3.href = "tel:+234" + ch.phone.replace(/^0/, ""); a3.textContent = ch.phone; l3.appendChild(a3); list.appendChild(l3); }
      if (hasE) { var l2 = document.createElement("li"); l2.innerHTML = "<small>Email</small>"; var a2 = document.createElement("a"); a2.href = "mailto:" + ch.email; a2.textContent = ch.email; l2.appendChild(a2); list.appendChild(l2); }
    }
    var q = new URLSearchParams(location.search).get("product");
    if (q) { form.subject.value = "Enquiry about " + q; }
    function data() {
      var d = { name: form.name.value.trim(), email: form.email.value.trim(), subject: form.subject.value.trim(), message: form.message.value.trim() };
      if (!d.name || !d.email || !d.subject || !d.message) { st.className = "err"; st.textContent = "Please fill in every field."; return null; }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) { st.className = "err"; st.textContent = "Please enter a valid email address."; form.email.focus(); return null; }
      return d;
    }
    function text(d) { return "Hello Zetra,\n\nName: " + d.name + "\nEmail: " + d.email + "\nSubject: " + d.subject + "\n\n" + d.message; }
    $("#bw").addEventListener("click", function () { var d = data(); if (!d) return; window.open("https://wa.me/" + ch.whatsapp + "?text=" + encodeURIComponent(text(d)), "_blank"); st.className = "ok"; st.textContent = "WhatsApp is opening with your message ready to send."; });
    $("#be").addEventListener("click", function () { var d = data(); if (!d) return; location.href = "mailto:" + ch.email + "?subject=" + encodeURIComponent(d.subject) + "&body=" + encodeURIComponent(text(d)); st.className = "ok"; st.textContent = "Your email app is opening with your message ready to send."; });
    form.addEventListener("submit", function (e) { e.preventDefault(); });
  }
})();
