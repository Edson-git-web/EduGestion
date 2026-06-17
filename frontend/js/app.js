import { state, subscribe, toggleTheme, setUser } from './state.js';
import { router } from './router.js';
import { renderLogin } from './pages/login.js';
import { renderDashboard } from './pages/dashboard.js';
import { renderStudents } from './pages/students.js';
import { renderCourses } from './pages/courses.js';
import { renderGrades } from './pages/grades.js';

const appContainer = document.getElementById('app');

const navItems = [
    { path: '/', name: 'Panel Principal', icon: 'layout-dashboard' },
    { path: '/students', name: 'Gestión Alumnos', icon: 'users' },
    { path: '/courses', name: 'Oferta Académica', icon: 'book-open' },
    { path: '/grades', name: 'Calificaciones', icon: 'graduation-cap' },
];

let isSidebarOpen = false;

const renderLayout = () => {
    appContainer.innerHTML = `
        <div class="min-h-screen flex w-full bg-[#f8fafc] dark:bg-slate-950 transition-colors duration-300">
            <!-- Sidebar Overlay -->
            <div id="sidebar-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden ${isSidebarOpen ? 'block' : 'hidden'}"></div>

            <!-- Sidebar -->
            <aside id="sidebar" class="fixed inset-y-0 left-0 z-50 w-72 bg-white/95 backdrop-blur-2xl border-r border-slate-200/60 transform transition-transform duration-500 ease-in-out dark:bg-slate-950/90 dark:border-slate-800/60 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 lg:static lg:block">
                <div class="h-full flex flex-col p-6">
                    <div class="flex items-center justify-between mb-10">
                        <div class="flex items-center gap-3">
                            <div class="w-10 h-10 rounded-2xl bg-brand-600 flex items-center justify-center shadow-lg shadow-brand-500/30">
                                <i data-lucide="graduation-cap" class="text-white w-6 h-6"></i>
                            </div>
                            <span class="text-xl font-black tracking-tight dark:text-white">
                                Edu<span class="text-brand-600">Gestion</span>
                            </span>
                        </div>
                        <button id="close-sidebar" class="lg:hidden p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <i data-lucide="x" class="w-5 h-5 text-slate-500"></i>
                        </button>
                    </div>

                    <nav class="flex-1 space-y-2 overflow-y-auto" id="nav-menu">
                        <!-- Nav items injected here -->
                    </nav>

                    <div class="mt-auto pt-6 border-t border-slate-100 dark:border-slate-800">
                        <button id="theme-toggle" class="w-full flex items-center justify-between p-4 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors dark:bg-slate-900 dark:hover:bg-slate-800">
                            <div class="flex items-center gap-3">
                                ${state.theme === 'light' 
                                    ? '<i data-lucide="sun" class="text-amber-500 w-[18px] h-[18px]"></i><span class="text-sm font-bold text-slate-700 dark:text-slate-300">Modo Claro</span>' 
                                    : '<i data-lucide="moon" class="text-blue-400 w-[18px] h-[18px]"></i><span class="text-sm font-bold text-slate-700 dark:text-slate-300">Modo Oscuro</span>'}
                            </div>
                            <div class="w-10 h-6 rounded-full bg-slate-200 dark:bg-slate-700 relative flex items-center p-1">
                                <div class="w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${state.theme === 'dark' ? 'translate-x-4' : ''}"></div>
                            </div>
                        </button>
                    </div>
                </div>
            </aside>

            <!-- Main Content -->
            <div class="flex-1 flex flex-col min-w-0">
                <header class="h-20 lg:h-24 sticky top-0 z-30 bg-white/50 backdrop-blur-md dark:bg-slate-950/50 flex items-center justify-between px-4 sm:px-6 lg:px-12 border-b border-slate-200/40 dark:border-slate-800/40">
                    <div class="flex items-center gap-4">
                        <button id="open-sidebar" class="lg:hidden p-3 rounded-2xl bg-white shadow-sm dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all active:scale-95 ${isSidebarOpen ? 'hidden' : ''}">
                            <i data-lucide="menu" class="w-6 h-6 text-slate-600 dark:text-slate-400"></i>
                        </button>
                        <div class="hidden sm:block">
                            <h2 class="text-lg font-bold text-slate-900 dark:text-white">Admin Dashboard</h2>
                            <p class="text-xs text-slate-500 font-medium">${new Date().toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                        </div>
                    </div>

                    <div class="flex items-center gap-3 sm:gap-4">
                        <div class="flex-col items-end hidden sm:flex">
                            <span class="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[120px] capitalize">${state.user.username}</span>
                            <span class="text-[10px] font-black uppercase tracking-widest leading-none ${state.user.role === 'ADMIN' ? 'text-brand-600' : 'text-slate-500'}">${state.user.role || 'USUARIO'}</span>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="h-10 w-10 sm:h-12 sm:w-12 rounded-2xl bg-brand-100 text-brand-700 flex items-center justify-center font-black dark:bg-brand-500/20 dark:text-brand-400 ring-2 sm:ring-4 ring-white dark:ring-slate-900 shadow-sm shrink-0 uppercase">
                                ${state.user.username.substring(0, 2)}
                            </div>
                            <button id="logout-btn" class="p-2 sm:p-3 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-xl transition-colors dark:bg-rose-500/10 dark:text-rose-400 dark:hover:bg-rose-500/20">
                                <i data-lucide="log-out" class="w-4 h-4"></i>
                            </button>
                        </div>
                    </div>
                </header>

                <main class="flex-1 p-4 sm:p-6 lg:p-12 overflow-x-hidden relative" id="page-content">
                    <!-- Page content injected here -->
                </main>
            </div>
        </div>
    `;

    renderNavItems();
    attachLayoutEvents();
};

const renderNavItems = () => {
    const navMenu = document.getElementById('nav-menu');
    if (!navMenu) return;

    navMenu.innerHTML = navItems.map(item => {
        const currentPath = router.currentRoute || '/';
        const isActive = currentPath === item.path || (item.path !== '/' && currentPath.startsWith(item.path));
        return `
            <a href="#${item.path}" class="block">
                <div class="flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 ${isActive ? 'bg-brand-600 text-white shadow-xl shadow-brand-500/20 dark:shadow-brand-900/40 translate-x-1' : 'text-slate-500 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800/40 dark:hover:text-slate-100'}">
                    <div class="flex items-center">
                        <i data-lucide="${item.icon}" class="w-5 h-5 mr-3 ${isActive ? 'text-white' : 'text-slate-400 dark:text-slate-500'}"></i>
                        <span class="font-semibold text-sm">${item.name}</span>
                    </div>
                    ${isActive ? '<i data-lucide="chevron-right" class="w-4 h-4"></i>' : ''}
                </div>
            </a>
        `;
    }).join('');

    if (window.lucide) window.lucide.createIcons();
};

const attachLayoutEvents = () => {
    document.getElementById('theme-toggle')?.addEventListener('click', () => {
        toggleTheme();
    });

    document.getElementById('logout-btn')?.addEventListener('click', () => {
        setUser(null);
    });

    const toggleSidebar = (force) => {
        isSidebarOpen = force !== undefined ? force : !isSidebarOpen;
        const sidebar = document.getElementById('sidebar');
        const overlay = document.getElementById('sidebar-overlay');
        const openBtn = document.getElementById('open-sidebar');
        
        if (isSidebarOpen) {
            sidebar?.classList.remove('-translate-x-full');
            sidebar?.classList.add('translate-x-0');
            overlay?.classList.remove('hidden');
            overlay?.classList.add('block');
            openBtn?.classList.add('hidden');
        } else {
            sidebar?.classList.add('-translate-x-full');
            sidebar?.classList.remove('translate-x-0');
            overlay?.classList.add('hidden');
            overlay?.classList.remove('block');
            openBtn?.classList.remove('hidden');
        }
    };

    document.getElementById('open-sidebar')?.addEventListener('click', () => toggleSidebar(true));
    document.getElementById('close-sidebar')?.addEventListener('click', () => toggleSidebar(false));
    document.getElementById('sidebar-overlay')?.addEventListener('click', () => toggleSidebar(false));

    // Close sidebar on route change for mobile
    router.onRouteChanged = (renderFn, params) => {
        if (window.innerWidth < 1024) toggleSidebar(false);
        renderNavItems();
        
        const contentContainer = document.getElementById('page-content');
        if (contentContainer) {
            contentContainer.innerHTML = '<div class="flex justify-center p-12"><i data-lucide="loader-2" class="w-8 h-8 animate-spin text-brand-600"></i></div>';
            if (window.lucide) window.lucide.createIcons();
            
            setTimeout(() => {
                if (renderFn) renderFn(contentContainer, params);
            }, 50); // slight delay for smooth transition feel
        }
    };
};

// Register routes
router.addRoute('/', renderDashboard);
router.addRoute('/students', renderStudents);
router.addRoute('/courses', renderCourses);
router.addRoute('/grades', renderGrades);

// Main rendering logic
const renderApp = () => {
    if (!state.user) {
        renderLogin(appContainer);
    } else {
        renderLayout();
        // Trigger route render
        router.handleHashChange();
    }
};

// Subscribe to state changes (user login/out, theme)
subscribe(() => {
    renderApp();
});

// Initialize
router.init();
renderApp();
