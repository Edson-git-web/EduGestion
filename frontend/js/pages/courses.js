import { api } from '../api.js';
import { state, showToast } from '../state.js';

const isAdmin = () => state.user?.role === 'ADMIN';

const renderCourseModal = (course = null) => {
    const isEdit = course !== null;
    return `
        <div id="course-modal-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div class="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-black text-slate-900 dark:text-white">${isEdit ? 'Editar Curso' : 'Nuevo Curso'}</h2>
                        <button id="close-modal" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <i data-lucide="x" class="w-5 h-5 text-slate-500"></i>
                        </button>
                    </div>
                </div>
                <form id="course-form" class="p-6 sm:p-8 space-y-5">
                    <input type="hidden" id="course-id" value="${isEdit ? course.id : ''}">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Código</label>
                            <input id="course-codigo" type="text" required value="${isEdit ? course.codigo : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="Ej: MAT101">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Créditos</label>
                            <input id="course-creditos" type="number" min="1" max="10" required value="${isEdit ? course.creditos : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="3">
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nombre</label>
                        <input id="course-nombre" type="text" required value="${isEdit ? course.nombre : ''}"
                            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                            placeholder="Ej: Matemática I">
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Descripción</label>
                        <input id="course-descripcion" type="text" value="${isEdit ? (course.descripcion || '') : ''}"
                            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                            placeholder="Descripción breve del curso">
                    </div>
                    <div class="flex gap-3 pt-2">
                        <button type="button" id="cancel-modal" class="flex-1 py-3 px-4 rounded-2xl font-bold border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">Cancelar</button>
                        <button type="submit" class="flex-1 py-3 px-4 rounded-2xl font-bold text-white bg-brand-600 hover:bg-brand-700 hover:shadow-lg hover:shadow-brand-500/30 transition-all flex items-center justify-center gap-2">
                            <i data-lucide="${isEdit ? 'save' : 'plus'}" class="w-4 h-4"></i>
                            ${isEdit ? 'Guardar' : 'Registrar'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    `;
};

export const renderCourses = async (container) => {
    try {
        const courses = await api.get('/cursos/Listado');

        let coursesHtml = '';
        if (courses.length === 0) {
            coursesHtml = `
                <div class="col-span-full py-16 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="book-open" class="w-10 h-10 text-slate-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">No hay cursos</h3>
                    <p class="text-sm text-slate-500">Aún no se han registrado cursos en el sistema.</p>
                </div>
            `;
        } else {
            coursesHtml = `
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    ${courses.map(course => `
                        <div class="group bg-white dark:bg-slate-950 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden flex flex-col">
                            <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div class="flex items-start justify-between mb-4 relative">
                                <div class="w-12 h-12 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                                    <i data-lucide="book" class="w-6 h-6 text-brand-600 dark:text-brand-400"></i>
                                </div>
                                <div class="flex items-center gap-2">
                                    <span class="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 text-xs font-bold text-slate-600 dark:text-slate-300 font-mono">
                                        ${course.codigo}
                                    </span>
                                    ${isAdmin() ? `
                                    <button class="edit-course-btn p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors relative z-10" data-id="${course.id}">
                                        <i data-lucide="pencil" class="w-4 h-4"></i>
                                    </button>
                                    <button class="delete-course-btn p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors relative z-10" data-id="${course.id}" data-name="${course.nombre}">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                    ` : ''}
                                </div>
                            </div>

                            <div class="mb-4 flex-1 relative">
                                <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-2 leading-tight group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                    ${course.nombre}
                                </h3>
                                <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
                                    ${course.descripcion || 'Sin descripción'}
                                </p>
                            </div>

                            <div class="pt-4 border-t border-slate-100 dark:border-slate-800/60 flex items-center justify-between relative">
                                <div class="flex items-center gap-2">
                                    <div class="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
                                        <i data-lucide="award" class="w-4 h-4 text-amber-600 dark:text-amber-400"></i>
                                    </div>
                                    <div>
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider leading-none mb-1">Créditos</p>
                                        <p class="text-sm font-bold text-slate-900 dark:text-white leading-none">${course.creditos}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Oferta Académica</h1>
                        <p class="text-slate-500 font-medium">${isAdmin() ? 'Administra el catálogo de cursos' : 'Catálogo de cursos disponibles'}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Total: <span class="text-brand-600">${courses.length}</span></span>
                        </div>
                        ${isAdmin() ? `
                        <button id="add-course-btn" class="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all active:scale-95">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                            <span class="hidden sm:inline">Nuevo Curso</span>
                        </button>
                        ` : ''}
                    </div>
                </div>
                ${coursesHtml}
            </div>
            <div id="modal-container"></div>
        `;

        if (window.lucide) window.lucide.createIcons();
        attachCourseEvents(container);
    } catch (e) {
        container.innerHTML = `<div class="text-center p-12 text-rose-500 font-medium">Error al cargar la oferta académica. Verifica la conexión con el servidor.</div>`;
    }
};

const attachCourseEvents = (container) => {
    document.getElementById('add-course-btn')?.addEventListener('click', () => {
        document.getElementById('modal-container').innerHTML = renderCourseModal();
        if (window.lucide) window.lucide.createIcons();
        attachCourseModalEvents(container);
    });

    container.querySelectorAll('.edit-course-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            try {
                const course = await api.get(`/cursos/buscar/${id}`);
                document.getElementById('modal-container').innerHTML = renderCourseModal(course);
                if (window.lucide) window.lucide.createIcons();
                attachCourseModalEvents(container);
            } catch (e) {
                showToast('Error al cargar los datos del curso', 'error');
            }
        });
    });

    container.querySelectorAll('.delete-course-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            if (confirm(`¿Estás seguro de eliminar el curso "${name}"?`)) {
                try {
                    await api.delete(`/cursos/eliminar/${id}`);
                    showToast('Curso eliminado correctamente');
                    renderCourses(container);
                } catch (e) {
                    showToast('Error al eliminar el curso', 'error');
                }
            }
        });
    });
};

const attachCourseModalEvents = (container) => {
    const closeModal = () => {
        document.getElementById('modal-container').innerHTML = '';
    };

    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-modal')?.addEventListener('click', closeModal);
    document.getElementById('course-modal-overlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'course-modal-overlay') closeModal();
    });

    document.getElementById('course-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('course-id').value;
        const data = {
            codigo: document.getElementById('course-codigo').value,
            nombre: document.getElementById('course-nombre').value,
            descripcion: document.getElementById('course-descripcion').value,
            creditos: parseInt(document.getElementById('course-creditos').value),
        };

        try {
            if (id) {
                data.id = parseInt(id);
                await api.put('/cursos/actualizar', data);
                showToast('Curso actualizado correctamente');
            } else {
                await api.post('/cursos/crear', data);
                showToast('Curso registrado correctamente');
            }
            closeModal();
            renderCourses(container);
        } catch (e) {
            showToast('Error al guardar el curso. Verifica los datos.', 'error');
        }
    });
};
