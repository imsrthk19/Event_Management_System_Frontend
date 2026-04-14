# Event Management System - Frontend

This repository contains the pure frontend code (HTML, CSS, JavaScript) for the Event Management System (TicketArena).

## Overview
This is a purely vanilla HTML/CSS/JS frontend interface designed for event discovery, user authentication (mocked via local storage), and ticket booking. Backend integrations have been removed so you can focus strictly on the UI/UX aspects of the frontend assignment.

## How to run
1. Clone the repository.
2. Open `index.html` in your web browser.
3. No build tools or backend dependencies are required.


## complete routes for froentend
POST /api/v1/user/register — user registration
POST /api/v1/user/login — user login
GET /api/v1/event/showevents — list events
## pending routes for froentend
POST /api/v1/event/create — create a new event
PATCH /api/v1/user/update/:id — update user
DELETE /api/v1/user/delete/:id — delete user


-------------------------------------------------------


curl -X POST http://localhost:8006/api/v1/event/create \
  -H "Content-Type: application/json" \
  -d '{
    "Event_name":"Sunburn Music Night",
    "Category":"Music",
    "Location":"Goa",
    "Event_Date":"2026-12-28",
    "Starting_Time":"18:00",
    "Ending_Time":"22:00",
    "Price":2500
  }'

-------------------------------------------------

curl -X DELETE http://localhost:8006/api/v1/user/delete/645b1234c9f12a34b5678901

--------------------------------------
curl -X PATCH http://localhost:8006/api/v1/user/update/645b1234c9f12a34b5678901 \
  -H "Content-Type: application/json" \
  -d '{
    "first_name":"Aman",
    "last_name":"Kumar",
    "password":"newStrongPassword"
  }'


