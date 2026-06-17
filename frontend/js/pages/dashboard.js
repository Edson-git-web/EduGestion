import { api } from '../api.js';

export const renderDashboard = async (container) => {
    try {
        // Fetch stats
        const [students, courses, grades] = await Promise.all([
            api.get('/estudiantes/Listado').catch(() => []),
            api.get('/cursos/Listado').catch(() => []),
            api.get('/notas/Listado').catch(() => [])
        ]);

        const avgGrade = grades.length ? (grades.reduce((a, b) => a + (b.promedio || 0), 0) / grades.length).toFixed(1) : '0.0';

        container.innerHTML = `
            <div class="space-y-8 lg:space-y-12 animate-fade-in">
                <div class="relative overflow-hidden group">
                    <div class="absolute inset-0 bg-brand-600 rounded-[2rem] sm:rounded-[2.5rem] opacity-5 sm:opacity-10 dark:opacity-20 translate-x-1 sm:translate-x-3 translate-y-1 sm:translate-y-3 -z-10"></div>
                    <div class="bg-white dark:bg-slate-950 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 lg:p-14 border border-slate-200/60 dark:border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-10 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
                        <div class="max-w-2xl text-center lg:text-left">
                            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-100 text-brand-800 dark:bg-brand-900 dark:text-brand-300 mb-4 sm:mb-6">SISTEMA ACADÉMICO NATIVO</span>
                            <h1 class="text-3xl sm:text-4xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight sm:leading-[1.1] mb-4 sm:mb-6">
                                Impulsando la <span class="text-brand-600">Excelencia</span> Educativa
                            </h1>
                            <p class="text-base sm:text-lg text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-lg mx-auto lg:mx-0">
                                Interfaz de usuario Vanilla JS conectada a una arquitectura Java EE Clásica.
                            </p>
                        </div>
                        <div class="relative shrink-0">
                            <div class="w-40 h-40 sm:w-48 sm:h-48 lg:w-64 lg:h-64 rounded-[2.5rem] sm:rounded-[3rem] bg-brand-600/5 dark:bg-brand-500/10 flex items-center justify-center animate-subtle-bob">
                                <i data-lucide="graduation-cap" class="text-brand-600 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24"></i>
                            </div>
                            <div class="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white dark:bg-slate-800 shadow-xl flex items-center justify-center border border-slate-100 dark:border-slate-700">
                                <div class="w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-green-500 animate-pulse"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    <!-- Stats Card 1 -->
                    <div class="bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                        <div class="flex items-center justify-between mb-8 sm:mb-10">
                            <div class="bg-blue-50/50 text-blue-600 p-4 sm:p-5 rounded-[1.5rem] dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                <i data-lucide="users" class="w-7 h-7 sm:w-8 sm:h-8"></i>
                            </div>
                        </div>
                        <p class="text-[11px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Estudiantes Totales</p>
                        <p class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter tabular-nums">${students.length}</p>
                    </div>

                    <!-- Stats Card 2 -->
                    <div class="bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                        <div class="flex items-center justify-between mb-8 sm:mb-10">
                            <div class="bg-brand-50/50 text-brand-600 p-4 sm:p-5 rounded-[1.5rem] dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                <i data-lucide="book-open" class="w-7 h-7 sm:w-8 sm:h-8"></i>
                            </div>
                        </div>
                        <p class="text-[11px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Oferta Académica</p>
                        <p class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter tabular-nums">${courses.length}</p>
                    </div>

                    <!-- Stats Card 3 -->
                    <div class="bg-white/80 dark:bg-slate-950/40 backdrop-blur-xl rounded-[2.5rem] p-8 sm:p-10 border border-slate-200/50 dark:border-slate-800/50 shadow-sm flex flex-col group transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_-12px_rgba(0,0,0,0.15)]">
                        <div class="flex items-center justify-between mb-8 sm:mb-10">
                            <div class="bg-rose-50/50 text-rose-600 p-4 sm:p-5 rounded-[1.5rem] dark:bg-slate-800/80 group-hover:scale-110 transition-transform duration-500 shadow-sm">
                                <i data-lucide="graduation-cap" class="w-7 h-7 sm:w-8 sm:h-8"></i>
                            </div>
                        </div>
                        <p class="text-[11px] font-black text-slate-400 dark:text-slate-500 mb-2 uppercase tracking-[0.2em]">Promedio General</p>
                        <div class="flex items-baseline gap-2">
                            <p class="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white leading-none tracking-tighter tabular-nums">${avgGrade}</p>
                            <span class="text-xs font-bold text-slate-400">pts</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } catch (e) {
        container.innerHTML = `<div class="text-center p-12 text-rose-500 font-medium">Error al cargar los datos del dashboard. Verifica la conexión con el servidor.</div>`;
    } finally {
        if (window.lucide) window.lucide.createIcons();
    }
};
