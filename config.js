/* =============================================================================
   SOUTHWORTH LANDSCAPE — SITE CONFIG
   Edit everything here in one place. No need to touch index.html.
   ---------------------------------------------------------------------------
   • Contact info, social links, and copy live in SITE below.
   • The quote form (FORM) supports Web3Forms out of the box — see instructions
     at the FORM block. Until you add an access key, the form falls back to a
     pre-filled email / phone call so no lead is ever lost.
   ============================================================================= */

window.SITE = {
  brand: {
    name: "Southworth Landscape Design & Construction",
    short: "Southworth",
    wordmark: "SOUTHWORTH",
    sub: "Landscape Design & Construction",
    established: "", // e.g. "Est. 2015" — leave "" to hide
  },

  contact: {
    phone: "339-226-2897",
    phoneHref: "tel:+13392262897",
    // No public email was found. Add one to enable the email fallback + footer link.
    email: "",
    location: "Hingham, Massachusetts",
    serviceArea: "Serving Hingham & the South Shore of Massachusetts",
  },

  social: {
    instagram: "https://www.instagram.com/southworthlandscape/",
    facebook: "https://www.facebook.com/southworthlandscapedesignconstruction/",
  },

  // Services — the first four map to the quote-form dropdown values.
  services: [
    {
      key: "landscaping",
      title: "Landscape Design & Planting",
      blurb:
        "Full-service design and installation — grading, beds, lawns, and layered plantings that mature into the landscape you pictured.",
      img: "assets/img/ig02_outdoorliving.jpg",
      tags: ["Design", "Planting", "Grading"],
    },
    {
      key: "lighting",
      title: "Outdoor Lighting",
      blurb:
        "Low-voltage landscape lighting that carries a property past sunset — walkways, walls, and specimen trees, quietly lit.",
      img: "assets/img/ig08_craftsmanship.jpg",
      tags: ["Path", "Accent", "Low-voltage"],
    },
    {
      key: "stonework",
      title: "Stonework & Masonry",
      blurb:
        "New-England fieldstone walls, granite steps, and reclaimed-stone landings — dry-laid and mortared, built to outlast us.",
      img: "assets/img/ig01_updates.jpg",
      tags: ["Fieldstone", "Granite", "Patios"],
    },
    {
      key: "sitework",
      title: "Site Work & Drainage",
      blurb:
        "Excavation, grading, and drainage — the work you don't see that keeps everything above it standing straight for decades.",
      img: "assets/img/frame_28s.jpg",
      tags: ["Excavation", "Grading", "Drainage"],
    },
    {
      key: "outdoorliving",
      title: "Outdoor Living",
      blurb:
        "Patios, terraces, and gathering spaces engineered around how a family actually lives outdoors — and where the light falls.",
      img: "assets/img/ig10_fieldstone.jpg",
      tags: ["Patios", "Terraces", "Hardscape"],
    },
    {
      key: "construction",
      title: "Construction & Site Build",
      blurb:
        "Sport courts, foundations, and full site builds — one crew, one standard of craftsmanship, start to finish.",
      img: "assets/img/ig06_sportscourt.jpg",
      tags: ["Courts", "Concrete", "Full build"],
    },
  ],

  // Portfolio — real projects pulled from @southworthlandscape.
  // wide:true spans two columns in the masonry grid.
  work: [
    { img: "assets/img/ig10_fieldstone.jpg", title: "Hillside Stair & Terrace", meta: "Fieldstone · Drone", wide: true },
    { img: "assets/img/ig02_outdoorliving.jpg", title: "Natural Stone Steps", meta: "Outdoor Living" },
    { img: "assets/img/ig01_updates.jpg", title: "Fieldstone Wall & Granite", meta: "Stonework" },
    { img: "assets/img/fb_otis_hi.jpg", title: "Otis Street", meta: "Design + Build" },
    { img: "assets/img/ig03_hingham.jpg", title: "Hingham Residence", meta: "Landscape" },
    { img: "assets/img/ig05_westonrd.jpg", title: "Weston Road", meta: "Site Build" },
    { img: "assets/img/ig06_sportscourt.jpg", title: "Sport Court Pour", meta: "Construction", wide: true },
    { img: "assets/img/ig12_2026.jpg", title: "Finished Grounds", meta: "Full Property" },
    { img: "assets/img/ig11_spring.jpg", title: "Spring Installation", meta: "Planting" },
  ],

  // Quote form
  form: {
    /* ---------------------------------------------------------------------
       TO GO LIVE: create a free access key at https://web3forms.com
       (it emails leads straight to your inbox) and paste it below.
       Leave "" and the form gracefully falls back to phone / email.
    --------------------------------------------------------------------- */
    web3formsKey: "",
    successMessage:
      "Thank you — your request is in. We'll reach out within one business day to schedule your free on-site estimate.",
    services: [
      { value: "Landscaping", label: "Landscaping" },
      { value: "Lighting", label: "Lighting" },
      { value: "Stone Work", label: "Stone Work" },
      { value: "Other", label: "Other (please specify)" },
    ],
  },
};
