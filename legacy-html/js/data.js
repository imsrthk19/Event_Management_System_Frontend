/* ===============================
DEFAULT EVENTS
=============================== */

const defaultEvents = [

{
id: 1,
title: "Neon Nights Music Festival 2026",
date: "2026-04-15",
time: "18:00",
location: "Metropolis Arena, NY",
price: 149.99,
category: "Music",
image: "https://images.unsplash.com/photo-1540039155732-684735035727?auto=format&fit=crop&q=80&w=800",
featured: true,
upcoming: true,
description:
"Experience the ultimate electronic dance music festival."
},

{
id: 2,
title: "Global Tech Summit",
date: "2026-05-10",
time: "09:00",
location: "Convention Center, SF",
price: 299.99,
category: "Tech",
image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
featured: true,
upcoming: true,
description:
"Join industry leaders."
}

];


/* ===============================
LOAD ADMIN EVENTS
=============================== */

let storedEvents =
JSON.parse(
localStorage.getItem(
"nexevent_events"
)
) || [];


/* ===============================
MERGE EVENTS (IMPORTANT)
=============================== */

const eventsData = [

...defaultEvents,

...storedEvents

];