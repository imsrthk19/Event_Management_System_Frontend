let editId = null;

// Protect admin route
if(localStorage.getItem("nexevent_admin") !== "true"){

window.location.href =
"admin-login.html";

}

// Load events
async function loadEvents(){

try{

const res =
await fetch(
"http://localhost:8006/events"
);

const events =
await res.json();

const container =
document.getElementById("adminEvents");

// Show only upcoming events
const today =
new Date().toISOString().split("T")[0];

const futureEvents =
events.filter(
e => e.date >= today
);

container.innerHTML =
futureEvents.map(e => `

<div
style="
border:1px solid white;
padding:10px;
margin:10px 0;
">

<h3>${e.title}</h3>

<p>${e.date}</p>

<button onclick="editEvent('${e._id}')">
Edit
</button>

<button onclick="deleteEvent('${e._id}')">
Delete
</button>

</div>

`).join("");

}catch(err){

console.error(err);

}

}

// Save event
async function saveEvent(){

const eventData = {

title:
document.getElementById("title").value,

date:
document.getElementById("date").value,

time:
document.getElementById("time").value,

location:
document.getElementById("location").value,

price:
Number(
document.getElementById("price").value
),

image:
document.getElementById("image").value,

description:
document.getElementById("description").value

};

if(editId){

await fetch(

"http://localhost:8006/events/" +
editId,

{

method: "PUT",

headers: {

"Content-Type":
"application/json"

},

body:
JSON.stringify(eventData)

}

);

editId = null;

}else{

await fetch(

"http://localhost:8006/events",

{

method: "POST",

headers: {

"Content-Type":
"application/json"

},

body:
JSON.stringify(eventData)

}

);

}

clearForm();

loadEvents();

}

// Edit event
async function editEvent(id){

const res =
await fetch(
"http://localhost:8006/events/" + id
);

const event =
await res.json();

document.getElementById("title").value =
event.title;

document.getElementById("date").value =
event.date;

document.getElementById("time").value =
event.time;

document.getElementById("location").value =
event.location;

document.getElementById("price").value =
event.price;

document.getElementById("image").value =
event.image;

document.getElementById("description").value =
event.description;

editId = id;

}

// Delete event
async function deleteEvent(id){

if(!confirm("Delete Event?"))
return;

await fetch(

"http://localhost:8006/events/" + id,

{

method: "DELETE"

}

);

loadEvents();

}

// Clear form
function clearForm(){

document.getElementById("title").value = "";

document.getElementById("date").value = "";

document.getElementById("time").value = "";

document.getElementById("location").value = "";

document.getElementById("price").value = "";

document.getElementById("image").value = "";

document.getElementById("description").value = "";

}

// Logout
function logoutAdmin(){

localStorage.removeItem(
"nexevent_admin"
);

window.location.href =
"admin-login.html";

}

loadEvents();