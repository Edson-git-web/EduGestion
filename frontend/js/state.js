// Global state management

// Listeners for reactivity
const listeners = [];

export const state = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    theme: localStorage.getItem('theme') || 'light',
};

// Initialize theme
if (state.theme === 'dark') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

export const subscribe = (listener) => {
    listeners.push(listener);
    return () => {
        const index = listeners.indexOf(listener);
        if (index > -1) listeners.splice(index, 1);
    };
};

const notify = () => {
    for (const listener of listeners) {
        listener(state);
    }
};

export const setUser = (user) => {
    state.user = user;
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        localStorage.removeItem('user');
    }
    notify();
};

export const toggleTheme = () => {
    state.theme = state.theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', state.theme);
    
    if (state.theme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
    
    notify();
};

export const showToast = (message, type = 'success') => {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    const isError = type === 'error';
    
    toast.className = `toast-enter flex items-center p-4 mb-4 text-sm rounded-xl shadow-lg border ${
        isError 
            ? 'text-red-800 border-red-300 bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800' 
            : 'text-green-800 border-green-300 bg-green-50 dark:bg-gray-800 dark:text-green-400 dark:border-green-800'
    }`;
    
    toast.innerHTML = `
        <i data-lucide="${isError ? 'alert-circle' : 'check-circle'}" class="w-5 h-5 mr-3"></i>
        <span class="font-medium">${message}</span>
    `;

    container.appendChild(toast);
    if (window.lucide) window.lucide.createIcons();

    setTimeout(() => {
        toast.classList.replace('toast-enter', 'toast-exit');
        setTimeout(() => toast.remove(), 200); // Wait for exit animation
    }, 3000);
};
