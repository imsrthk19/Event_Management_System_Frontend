// nexevent_users : Array of user objects { id, name, email, password }
// nexevent_session : Current logged in user object or null

const AuthHelper = {
    getUsers: () => JSON.parse(localStorage.getItem('nexevent_users') || '[]'),
    
    getSession: () => JSON.parse(localStorage.getItem('nexevent_session') || 'null'),
    
    register: (name, email, password) => {
        const users = AuthHelper.getUsers();
        if (users.find(u => u.email === email)) {
            return { success: false, message: 'Email is already registered!' };
        }
        
        const newUser = {
            id: 'USR-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
            name,
            email,
            password // Mock plain text password for demo
        };
        
        users.push(newUser);
        localStorage.setItem('nexevent_users', JSON.stringify(users));
        
        // Auto login
        localStorage.setItem('nexevent_session', JSON.stringify(newUser));
        return { success: true, user: newUser };
    },
    
    login: (email, password) => {
        const users = AuthHelper.getUsers();
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            localStorage.setItem('nexevent_session', JSON.stringify(user));
            return { success: true, user };
        }
        return { success: false, message: 'Invalid email or password' };
    },
    
    logout: () => {
        localStorage.removeItem('nexevent_session');
        window.location.href = 'index.html';
    },

    protectRoute: () => {
        const session = AuthHelper.getSession();
        if (!session) {
            window.location.href = 'index.html?redirect=' + encodeURIComponent(window.location.pathname + window.location.search);
        }
        return session;
    },

    updateAuthUI: () => {
        const session = AuthHelper.getSession();
        const loginBtn = document.querySelector('.nav-actions .btn');
        const navLinks = document.getElementById('navLinks');
        
        if (navLinks) {
            navLinks.style.display = session ? 'flex' : 'none';
        }

        const isAuthPage = window.location.pathname.endsWith('index.html') || window.location.pathname === '/' || window.location.pathname.endsWith('/');

        if (session && isAuthPage) {
            const urlParams = new URLSearchParams(window.location.search);
            const redirectUrl = urlParams.get('redirect') || 'home.html';
            window.location.href = redirectUrl;
            return;
        }

        if (loginBtn) {
            if (session) {
                loginBtn.innerHTML = `Profile <i class="fa-solid fa-user" style="margin-left: 5px;"></i>`;
                loginBtn.href = 'home.html';
                
                // Also add a logout button if there isn't one
                if (!document.getElementById('logoutBtn')) {
                    const logoutBtn = document.createElement('button');
                    logoutBtn.id = 'logoutBtn';
                    logoutBtn.className = 'btn btn-glass';
                    logoutBtn.style.padding = '0.5rem 1.5rem';
                    logoutBtn.style.marginLeft = '10px';
                    logoutBtn.innerHTML = '<i class="fa-solid fa-arrow-right-from-bracket"></i>';
                    logoutBtn.onclick = AuthHelper.logout;
                    loginBtn.parentNode.insertBefore(logoutBtn, loginBtn.nextSibling);
                }
            } else {
                loginBtn.innerHTML = 'Log In';
                loginBtn.href = 'index.html';
                const logoutBtn = document.getElementById('logoutBtn');
                if(logoutBtn) logoutBtn.remove();
            }
        }
    }
};

// Auto-run UI update on load
document.addEventListener('DOMContentLoaded', () => {
    AuthHelper.updateAuthUI();
});