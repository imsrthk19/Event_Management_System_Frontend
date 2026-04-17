// nexevent_users : Array of user objects { id, name, email, password }
// nexevent_session : Current logged in user object or null

// const API_BASE_URL = 'http://localhost:8006/api/v1';

// const AuthHelper = {
//     getUsers: () => JSON.parse(localStorage.getItem('nexevent_users') || '[]'),
//     getSession: () => {
//         const session = JSON.parse(localStorage.getItem('nexevent_session') || 'null');
//         return session && session.email ? session : null;
//     },
//     register: async (firstName, lastName, email, password) => {
//         const payload = {
//             first_name: firstName,
//             last_name: lastName,
//             email,
//             password
//         };
//         try {
//             const response = await fetch(`${API_BASE_URL}/user/register`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify(payload)
//             });
//             if (response.ok) {
//                 return AuthHelper.login(email, password);
//             }
//             const errorText = await response.text();
//             return { success: false, message: errorText || 'Registration failed' };
//         } catch (error) {
//             console.warn('Backend register failed, falling back to local storage.', error);
//             const users = AuthHelper.getUsers();
//             if (users.find(u => u.email === email)) {
//                 return { success: false, message: 'Email is already registered!' };
//             }
//             const newUser = {
//                 id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
//                 name: `${firstName} ${lastName}`.trim(),
//                 firstName,
//                 lastName,
//                 email,
//                 password
//             };
//             users.push(newUser);
//             localStorage.setItem('nexevent_users', JSON.stringify(users));
//             localStorage.setItem('nexevent_session', JSON.stringify(newUser));
//             localStorage.setItem('nexevent_loggedIn', JSON.stringify(newUser));
//             return { success: true, user: newUser };
//         }
//     },
//     login: async (email, password) => {
//         try {
//             const response = await fetch(`${API_BASE_URL}/user/login`, {
//                 method: 'POST',
//                 headers: {
//                     'Content-Type': 'application/json'
//                 },
//                 body: JSON.stringify({ email, password })
//             });
//             if (response.ok) {
//                 const data = await response.json();
//                 const user = {
//                     id: data.user.id,
//                     firstName: data.user.first_name,
//                     lastName: data.user.last_name,
//                     email: data.user.email,
//                     name: `${data.user.first_name} ${data.user.last_name}`.trim(),
//                     role: data.user.role,
//                     token: data.token
//                 };
//                 localStorage.setItem('nexevent_session', JSON.stringify(user));
//                 localStorage.setItem('nexevent_loggedIn', JSON.stringify(user));
//                 return { success: true, user };
//             }
//             const responseBody = await response.text();
//             return { success: false, message: responseBody || 'Invalid email or password' };
//         } catch (error) {
//             console.warn('Backend login failed, falling back to local storage.', error);
//             const users = AuthHelper.getUsers();
//             const user = users.find(u => u.email === email && u.password === password);
//             if (user) {
//                 localStorage.setItem('nexevent_session', JSON.stringify(user));
//                 localStorage.setItem('nexevent_loggedIn', JSON.stringify(user));
//                 return { success: true, user };
//             }
//             return { success: false, message: 'Invalid email or password' };
//         }
//     },
//     logout: () => {
//         localStorage.removeItem('nexevent_session');
//         localStorage.removeItem('nexevent_loggedIn');
//         window.location.href = 'login.html';
//     },
//     protectRoute: () => {
//         const session = AuthHelper.getSession();
//         if (!session) {
//             window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
//         }
//         return session;
//     },
//     updateAuthUI: () => {
//         const session = AuthHelper.getSession();
//         const loginBtn = document.getElementById('authButton') || document.querySelector('.nav-actions .btn');
//         const navLinks = document.getElementById('navLinks');
//         if (navLinks) {
//             navLinks.style.display = 'flex';
//         }
//         const isAuthPage = window.location.pathname.endsWith('login.html');
//         if (session && isAuthPage) {
//             const urlParams = new URLSearchParams(window.location.search);
//             const redirectUrl = urlParams.get('redirect') || 'home.html';
//             window.location.href = redirectUrl;
//             return;
//         }
//         if (loginBtn) {
//             if (session) {
//                 loginBtn.innerHTML = `Profile <i class="fa-solid fa-user" style="margin-left: 5px;"></i>`;
//                 loginBtn.href = 'home.html';
//                 loginBtn.classList.add('btn', 'btn-outline');
//                 loginBtn.id = 'authButton';
//                 // Also add a logout button if there isn't one
//                 if (!document.getElementById('logoutBtn')) {
//                     const logoutBtn = document.createElement('button');
//                     logoutBtn.id = 'logoutBtn';
//                     logoutBtn.className = 'btn btn-glass';
//                     logoutBtn.style.padding = '0.5rem 1.5rem';
//                     logoutBtn.style.marginLeft = '10px';
//                     logoutBtn.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i>';
//                     logoutBtn.onclick = AuthHelper.logout;
//                     loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
//                 }
//             } else {
//                 loginBtn.innerHTML = 'Log In';
//                 loginBtn.href = 'login.html';
//                 loginBtn.classList.add('btn', 'btn-outline');
//                 loginBtn.id = 'authButton';
//                 const logoutBtn = document.getElementById('logoutBtn');
//                 if (logoutBtn) logoutBtn.remove();
//             }
//         } else if (navLinks) {
//             const authLink = document.createElement('a');
//             authLink.id = 'authButton';
//             authLink.className = 'btn btn-outline';
//             authLink.href = session ? 'home.html' : 'login.html';
//             authLink.textContent = session ? 'Profile' : 'Log In';
//             authLink.style.padding = '0.5rem 1.5rem';
//             const navActions = navLinks.parentNode.querySelector('.nav-actions');
//             if (navActions) {
//                 navActions.appendChild(authLink);
//             }
//         }
//     }
// };

// // Auto-run UI update on load
// document.addEventListener('DOMContentLoaded', () => {
//     AuthHelper.updateAuthUI();
// });
















const API_BASE_URL = 'http://localhost:8006/api/v1';

// ✅ Popup
const showPopup = (msg, type = "error") => {
    const div = document.createElement("div");
    div.innerText = msg;
    div.style.position = "fixed";
    div.style.top = "20px";
    div.style.right = "20px";
    div.style.background = type === "success" ? "#28a745" : "#ff4d4f";
    div.style.color = "white";
    div.style.padding = "12px 20px";
    div.style.borderRadius = "8px";
    div.style.zIndex = "9999";
    div.style.boxShadow = "0 4px 10px rgba(0,0,0,0.2)";
    document.body.appendChild(div);

    setTimeout(() => div.remove(), 3000);
};

const AuthHelper = {
    getUsers: () =>
        JSON.parse(localStorage.getItem('nexevent_users') || '[]'),

    getSession: () => {
        const session = JSON.parse(
            localStorage.getItem('nexevent_session') || 'null'
        );
        return session && session.email ? session : null;
    },

    // ✅ REGISTER
    register: async (firstName, lastName, email, password) => {

        firstName = firstName.trim();
        lastName = lastName.trim();
        email = email.trim().toLowerCase();
        password = password.trim();

        // LIMIT VALIDATION
        if (firstName.length > 25 || lastName.length > 25) {
            showPopup("Name must be ≤ 25 characters ❌");
            return { success: false };
        }

        if (email.length > 25) {
            showPopup("Email must be ≤ 25 characters ❌");
            return { success: false };
        }

        if (password.length > 25) {
            showPopup("Password must be ≤ 25 characters ❌");
            return { success: false };
        }

        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };

        try {
            // ✅ FIXED BACKTICKS
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showPopup("Registration successful ✅", "success");
                return AuthHelper.login(email, password);
            }

            const errorData = await response.json();
            showPopup(errorData.message || "Registration failed ❌");

            return { success: false };

        } catch (error) {

            console.warn(
                'Backend register failed, using local storage.',
                error
            );

            const users = AuthHelper.getUsers();

            if (users.find(u => u.email === email)) {
                showPopup("Email already registered ❌");
                return { success: false };
            }

            // ✅ FIXED NAME TEMPLATE
            const newUser = {
                id: 'USR-' +
                    Math.random()
                        .toString(36)
                        .substr(2, 9)
                        .toUpperCase(),

                name: `${firstName} ${lastName}`.trim(),

                firstName,
                lastName,
                email,
                password
            };

            users.push(newUser);

            localStorage.setItem(
                'nexevent_users',
                JSON.stringify(users)
            );

            localStorage.setItem(
                'nexevent_session',
                JSON.stringify(newUser)
            );

            showPopup("Registered (Offline) ✅", "success");

            return {
                success: true,
                user: newUser
            };
        }
    },

    // ✅ LOGIN
    login: async (email, password) => {

        email = email.trim().toLowerCase();
        password = password.trim();

        if (email.length > 25 || password.length > 25) {
            showPopup("Email/Password must be ≤ 25 characters ❌");
            return { success: false };
        }

        try {

            // ✅ FIXED BACKTICKS
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {

                const data = await response.json();

                // ✅ FIXED NAME TEMPLATE
                const user = {

                    id: data.user.id,

                    firstName: data.user.first_name,
                    lastName: data.user.last_name,

                    email: data.user.email,

                    name: `${data.user.first_name} ${data.user.last_name}`.trim(),

                    role: data.user.role,
                    token: data.token
                };

                localStorage.setItem(
                    'nexevent_session',
                    JSON.stringify(user)
                );

                showPopup("Login successful ✅", "success");

                return {
                    success: true,
                    user
                };
            }

            const errorData = await response.json();

            showPopup(
                errorData.message ||
                "Invalid email or password ❌"
            );

            return { success: false };

        } catch (error) {

            console.warn(
                'Backend login failed, using local storage.',
                error
            );

            const users = AuthHelper.getUsers();

            const user = users.find(
                u =>
                    u.email === email &&
                    u.password === password
            );

            if (user) {

                localStorage.setItem(
                    'nexevent_session',
                    JSON.stringify(user)
                );

                showPopup(
                    "Login successful (Offline) ✅",
                    "success"
                );

                return {
                    success: true,
                    user
                };
            }

            showPopup("Invalid email or password ❌");

            return { success: false };
        }
    },

    logout: () => {

        localStorage.removeItem('nexevent_session');

        showPopup("Logged out successfully");

        window.location.href = 'login.html';
    },

    protectRoute: () => {

        const session = AuthHelper.getSession();

        if (!session) {

            window.location.href = 'login.html';
        }

        return session;
    },

    updateAuthUI: () => {

        const session = AuthHelper.getSession();

        const loginBtn =
            document.getElementById('authButton');

        if (!loginBtn) return;

        if (session) {

            loginBtn.innerHTML = "Profile";
            loginBtn.href = "home.html";

        } else {

            loginBtn.innerHTML = "Log In";
            loginBtn.href = "login.html";
        }
    }
};

// Auto run
document.addEventListener(
    'DOMContentLoaded',
    () => {
        AuthHelper.updateAuthUI();
    }
);