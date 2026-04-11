// Global DOM Elements
const header = document.getElementById('header');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

// Scroll Effect for Header
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        const icon = mobileMenuBtn.querySelector('i');
        if (navLinks.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-xmark');
        } else {
            icon.classList.remove('fa-xmark');
            icon.classList.add('fa-bars');
        }
    });
}

// Utility: Format Date
const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    const date = new Date(dateString);
    return {
        month: date.toLocaleDateString('en-US', { month: 'short' }),
        day: date.toLocaleDateString('en-US', { day: '2-digit' })
    };
};

// Component: Create Event Card HTML
const createEventCard = (event) => {
    const { month, day } = formatDate(event.date);
    return `
        <div class="event-card" onclick="window.location.href='event-details.html?id=${event.id}'" style="cursor: pointer;">
            <div class="event-img">
                <img src="${event.image}" alt="${event.title}">
                <div class="event-date-badge">
                    <span class="month">${month}</span>
                    <span class="day">${day}</span>
                </div>
            </div>
            <div class="event-content">
                <span class="event-category">${event.category}</span>
                <h3 class="event-title">${event.title}</h3>
                <div class="event-details">
                    <div class="event-detail-item">
                        <i class="fa-solid fa-location-dot"></i>
                        <span>${event.location}</span>
                    </div>
                </div>
                <div class="event-footer">
                    <span class="event-price">${event.price > 0 ? '$' + event.price.toFixed(2) : 'Free'}</span>
                    <button class="btn btn-outline" style="padding: 0.5rem 1rem; font-size: 0.9rem;">Tickets</button>
                </div>
            </div>
        </div>
    `;
};

// Initialize Home Page
const initHomePage = () => {
    const featuredContainer = document.getElementById('featuredEventsList');
    const upcomingContainer = document.getElementById('upcomingEventsList');

    if (featuredContainer && typeof eventsData !== 'undefined') {
        const featuredEvents = eventsData.filter(e => e.featured).slice(0, 3);
        featuredContainer.innerHTML = featuredEvents.map(createEventCard).join('');
    }

    if (upcomingContainer && typeof eventsData !== 'undefined') {
        const upcomingEvents = eventsData.filter(e => e.upcoming).slice(0, 3);
        upcomingContainer.innerHTML = upcomingEvents.map(createEventCard).join('');
    }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    initHomePage();

    // Check path for specific initializations
    const path = window.location.pathname;
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if(target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});