/* ===============================
DEFAULT EVENTS
=============================== */

const defaultEvents = [

    {
        id: 1,
        title: "Sunburn Music Festival 2026",
        date: "2026-12-28",
        time: "16:00",
        location: "Vagator Beach, Goa",
        price: 2500,
        category: "Music",
        image: "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&q=80&w=800",
        featured: true,
        upcoming: true,
        description:
            "Experience Asia's biggest electronic dance music festival."
    },

    {
        id: 2,
        title: "India Tech Conclave",
        date: "2026-06-15",
        time: "09:30",
        location: "BIEC, Bengaluru",
        price: 1500,
        category: "Tech",
        image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800",
        featured: true,
        upcoming: true,
        description:
            "Join India's top industry leaders and innovators."
    }

];


/* ===============================
LOAD ADMIN EVENTS
=============================== */

const API_BASE_URL = 'http://localhost:8006/api/v1';

let storedEvents = JSON.parse(localStorage.getItem("nexevent_events")) || [];

const getDefaultEventImage = (category) => {
    const categoryImages = {
        Music: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&q=80&w=800",
        Tech: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800",
        Sports: "https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=800",
        Arts: "https://images.unsplash.com/photo-1515165562835-c0fda88f30eb?auto=format&fit=crop&q=80&w=800"
    };
    return categoryImages[category] || "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800";
};

const normalizeBackendEvent = (event) => {
    const dateValue = event.Event_Date || event.date || '';
    const timeValue = event.Starting_Time || event.time || '';
    return {
        id: event._id || event.id,
        title: event.Event_name || event.title || 'Untitled Event',
        date: dateValue,
        time: timeValue,
        Starting_Time: timeValue,
        Ending_Time: event.Ending_Time || event.endingTime || '',
        location: event.Location || event.location || 'Unknown location',
        price: Number(event.Price ?? event.price ?? 0),
        category: event.Category || event.category || 'General',
        image: event.image || getDefaultEventImage(event.Category || event.category),
        featured: false,
        upcoming: new Date(dateValue) >= new Date(),
        description: event.description || `${event.Category || event.category || 'Event'} event at ${event.Location || event.location || 'our venue'}`
    };
};

const eventsData = [
    ...defaultEvents,
    ...storedEvents
];

window.loadBackendEvents = async () => {
    try {
        const response = await fetch(`${API_BASE_URL}/event/showevents`);
        if (!response.ok) {
            console.warn('Could not load backend events', response.status);
            return;
        }
        const backendEvents = await response.json();
        const existingIds = new Set(eventsData.map(e => String(e.id)));
        const mappedEvents = backendEvents
            .map(normalizeBackendEvent)
            .filter(event => !existingIds.has(String(event.id)));
        eventsData.push(...mappedEvents);
    } catch (error) {
        console.warn('Failed to fetch backend events.', error);
    }
};