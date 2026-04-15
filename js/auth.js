const API_BASE_URL = 'http://localhost:8006/api/v1';

// Simple popup function (clean UI)
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
    getUsers: () => JSON.parse(localStorage.getItem('nexevent_users') || '[]'),

    getSession: () => {
        const session = JSON.parse(localStorage.getItem('nexevent_session') || 'null');
        return session && session.email ? session : null;
    },

    //  REGISTER
    register: async (firstName, lastName, email, password) => {
        const payload = {
            first_name: firstName,
            last_name: lastName,
            email,
            password
        };

        try {
            const response = await fetch(`${API_BASE_URL}/user/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (response.ok) {
                showPopup("Registration successful ✅", "success");
                return AuthHelper.login(email, password);
            }

            //  FIX: read JSON instead of text
            const errorData = await response.json();
            showPopup(errorData.message || "Registration failed");
            return { success: false };

        } catch (error) {
            console.warn('Backend register failed, using local storage.', error);

            const users = AuthHelper.getUsers();

            if (users.find(u => u.email === email)) {
                showPopup("Email already registered ❌");
                return { success: false };
            }

            const newUser = {
                id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
                name: `${firstName} ${lastName}`.trim(),
                firstName,
                lastName,
                email,
                password
            };

            users.push(newUser);
            localStorage.setItem('nexevent_users', JSON.stringify(users));
            localStorage.setItem('nexevent_session', JSON.stringify(newUser));

            showPopup("Registered (Offline Mode) ✅", "success");

            return { success: true, user: newUser };
        }
    },

    //  LOGIN
    login: async (email, password) => {
        try {
            const response = await fetch(`${API_BASE_URL}/user/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password })
            });

            if (response.ok) {
                const data = await response.json();

                const user = {
                    id: data.user.id,
                    firstName: data.user.first_name,
                    lastName: data.user.last_name,
                    email: data.user.email,
                    name: `${data.user.first_name} ${data.user.last_name}`.trim(),
                    role: data.user.role,
                    token: data.token
                };

                localStorage.setItem('nexevent_session', JSON.stringify(user));

                showPopup("Login successful ✅", "success");

                return { success: true, user };
            }

            //  FIX: JSON error
            const errorData = await response.json();
            showPopup(errorData.message || "Invalid email or password");

            return { success: false };

        } catch (error) {
            console.warn('Backend login failed, using local storage.', error);

            const users = AuthHelper.getUsers();
            const user = users.find(u => u.email === email && u.password === password);

            if (user) {
                localStorage.setItem('nexevent_session', JSON.stringify(user));
                showPopup("Login successful (Offline) ✅", "success");
                return { success: true, user };
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
        const loginBtn = document.getElementById('authButton');

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
document.addEventListener('DOMContentLoaded', () => {
    AuthHelper.updateAuthUI();
});
