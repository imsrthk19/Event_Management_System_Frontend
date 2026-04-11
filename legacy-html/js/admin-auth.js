s// Register Admin
function registerAdmin(){

const adminId =
document.getElementById("adminId").value;

const password =
document.getElementById("password").value;

let admins =
JSON.parse(
localStorage.getItem("nexevent_admins")
) || [];

if(
admins.find(
a => a.adminId === adminId
)
){

alert("Admin already exists");

return;

}

admins.push({

adminId,
password

});

localStorage.setItem("nexevent_admins", JSON.stringify(admins));

localStorage.setItem(
  "nexevent_admin_session",
  JSON.stringify({ adminId, password })
);

alert("Admin Registered Successfully!");
window.location.href = "admin_dashboard.html";
}



// Login Admin
function loginAdmin(){

const adminId =
document.getElementById("adminId").value;

const password =
document.getElementById("password").value;

let admins =
JSON.parse(
localStorage.getItem("nexevent_admins")
) || [];

const admin =
admins.find(

a =>
a.adminId === adminId &&
a.password === password

);

if(!admin){

alert("Invalid credentials");

return;

}

localStorage.setItem(

"nexevent_admin_session",

JSON.stringify(admin)

);

window.location.href = "admin_dashboard.html";

}



// Logout Admin
function logoutAdmin(){

localStorage.removeItem(
"nexevent_admin_session"
);

window.location.href = "admin_login.html";

}