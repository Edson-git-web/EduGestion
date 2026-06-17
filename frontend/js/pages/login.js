import { state, setUser, showToast } from '../state.js';
import { api } from '../api.js';

export const renderLogin = (container) => {
    container.innerHTML = `
        <div class="min-h-screen flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-slate-50 dark:bg-slate-950 relative overflow-hidden">
            <!-- Background Elements -->
            <div class="absolute inset-0 w-full h-full">
                <div class="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-brand-500/20 blur-[100px] animate-pulse"></div>
                <div class="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/20 blur-[100px] animate-pulse" style="animation-delay: 2s"></div>
            </div>

            <div class="w-full max-w-md animate-fade-in relative z-10">
                <div class="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-[2.5rem] shadow-2xl shadow-brand-500/10 border border-white/20 dark:border-slate-800 p-8 sm:p-12">
                    
                    <div class="text-center mb-10">
                        <div class="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-brand-600 shadow-lg shadow-brand-500/30 mb-6">
                            <i data-lucide="graduation-cap" class="w-8 h-8 text-white"></i>
                        </div>
                        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Bienvenido</h1>
                        <p class="text-sm font-medium text-slate-500 dark:text-slate-400">Ingresa tus credenciales para continuar</p>
                    </div>

                    <form id="login-form" class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Usuario</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                    <i data-lucide="user" class="w-5 h-5"></i>
                                </div>
                                <input id="username" type="text" required
                                    class="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                                    placeholder="Ej: admin">
                            </div>
                        </div>

                        <div class="space-y-2">
                            <label class="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider ml-1">Contraseña</label>
                            <div class="relative group">
                                <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-brand-500 transition-colors">
                                    <i data-lucide="lock" class="w-5 h-5"></i>
                                </div>
                                <input id="password" type="password" required
                                    class="w-full pl-11 pr-4 py-3.5 bg-slate-50/50 dark:bg-slate-950/50 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 dark:focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white placeholder:text-slate-400"
                                    placeholder="••••••••">
                            </div>
                        </div>

                        <button type="submit" id="submit-btn" class="w-full flex items-center justify-center gap-2 py-4 px-6 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30 active:scale-[0.98] transition-all">
                            <span>Iniciar Sesión</span>
                            <i data-lucide="arrow-right" class="w-5 h-5"></i>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    `;

    if (window.lucide) window.lucide.createIcons();

    document.getElementById('login-form').addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const btn = document.getElementById('submit-btn');

        btn.disabled = true;
        btn.innerHTML = `<i data-lucide="loader-2" class="w-5 h-5 animate-spin"></i><span>Ingresando...</span>`;
        if (window.lucide) window.lucide.createIcons();

        try {
            // In the original React app, we did:
            // const response = await api.post('/login', { username, password });
            // Since this is a test, let's mock it if the backend is down, or do the real call.
            // Let's do the real call. If it fails due to CORS, show a nice toast.
            // Assuming the backend has AuthController mapped to /auth/login
            const response = await api.post('/auth/login', { username, password });

            // Assuming response returns { role, username }
            setUser(response);
            showToast('Sesión iniciada correctamente', 'success');
        } catch (error) {
            console.error(error);
            showToast('Error de autenticación. Verifica tus credenciales y si el servidor está activo.', 'error');
            // For demo purposes if backend is unavailable:
            // setUser({ username, role: 'ADMIN' });
        } finally {
            btn.disabled = false;
            btn.innerHTML = `<span>Iniciar Sesión</span><i data-lucide="arrow-right" class="w-5 h-5"></i>`;
            if (window.lucide) window.lucide.createIcons();
        }
    });
};
