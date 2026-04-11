const API_URL = "http://localhost:8006/events";

async function loadEvents(){
try{
    const res = await fetch(API_URL);
    const events = await res.json();
    const container = document.getElementById("adminEvents");
    const today = new Date();
    const futureEvents = events.filter(e => {
        const start = new Date(e.Starting_Time);
        return start >= today;
    });

container.innerHTML = futureEvents.map(e => `<div class="event-card">
    <h3>${e.Event_name}</h3>
    <p>📍 ${e.Location}</p>
    <p>🕒 ${formatEventDateTime(e.Starting_Time)}</p>
    <button class="btn btn-danger" onclick="deleteEvent('${e._id}')">
        <i class="fa-solid fa-trash"></i> Delete
    </button>
</div>`).join("");
}

catch(err){
    console.error(err);
}
}


async function saveEvent(){
    const start = new Date(document.getElementById("Starting_Time").value);
    const end = new Date(document.getElementById("Ending_Time").value);

// Validate time
if(end <= start){
alert("Ending time must be after starting time");
return;
}


const eventData = {
    Event_name: document.getElementById("Event_name").value,
    Category: document.getElementById("Category").value,
    Location: document.getElementById("Location").value,
    Starting_Time: document.getElementById("Starting_Time").value,
    Ending_Time: document.getElementById("Ending_Time").value,
    Price: document.getElementById("Price").value
};

try{
const res = await fetch(API_URL,{
    method:"POST",
    headers:{"Content-Type":"application/json"},
    body:JSON.stringify(eventData)
});

const msg = await res.text();
alert(msg);
clearForm();
loadEvents();
}
catch(err){
    console.error(err);
}
}

async function deleteEvent(id){
if(!confirm("Delete Event?")) return;
await fetch(API_URL + "/" + id,{method:"DELETE"});
loadEvents();
}


function formatEventDateTime(dateString){
const date = new Date(dateString);
return date.toLocaleString('en-US',{
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
});
}

function clearForm(){
document.getElementById("Event_name").value="";
document.getElementById("Category").value="";
document.getElementById("Location").value="";
document.getElementById("Starting_Time").value="";
document.getElementById("Ending_Time").value="";
document.getElementById("Price").value="";
}
loadEvents();