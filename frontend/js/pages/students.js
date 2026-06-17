import { api } from '../api.js';
import { state, showToast } from '../state.js';

const isAdmin = () => state.user?.role === 'ADMIN';

// Render the modal for create/edit
const renderStudentModal = (student = null) => {
    const isEdit = student !== null;
    return `
        <div id="student-modal-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div class="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-black text-slate-900 dark:text-white">${isEdit ? 'Editar Estudiante' : 'Nuevo Estudiante'}</h2>
                        <button id="close-modal" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <i data-lucide="x" class="w-5 h-5 text-slate-500"></i>
                        </button>
                    </div>
                </div>
                <form id="student-form" class="p-6 sm:p-8 space-y-5">
                    <input type="hidden" id="student-id" value="${isEdit ? student.id : ''}">
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Código</label>
                        <input id="student-codigo" type="text" required value="${isEdit ? student.codigo : ''}"
                            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                            placeholder="Ej: EST001">
                    </div>
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Nombre</label>
                            <input id="student-nombre" type="text" required value="${isEdit ? student.nombre : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="Nombre">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Apellido</label>
                            <input id="student-apellido" type="text" required value="${isEdit ? student.apellido : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                                placeholder="Apellido">
                        </div>
                    </div>
                    <div class="space-y-1.5">
                        <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Email</label>
                        <input id="student-email" type="email" required value="${isEdit ? student.email : ''}"
                            class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white"
                            placeholder="correo@ejemplo.com">
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

export const renderStudents = async (container) => {
    try {
        const students = await api.get('/estudiantes/Listado');

        let studentsHtml = '';
        if (students.length === 0) {
            studentsHtml = `
                <div class="col-span-full py-16 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="users" class="w-10 h-10 text-slate-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">No hay estudiantes</h3>
                    <p class="text-sm text-slate-500">Aún no se han registrado estudiantes en el sistema.</p>
                </div>
            `;
        } else {
            studentsHtml = `
                <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    ${students.map(student => `
                        <div class="group bg-white dark:bg-slate-950 rounded-3xl p-6 border border-slate-200/60 dark:border-slate-800 shadow-sm hover:shadow-xl hover:shadow-brand-500/10 hover:-translate-y-1 transition-all duration-300 relative overflow-hidden">
                            <div class="absolute inset-0 bg-gradient-to-br from-brand-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div class="relative flex items-start justify-between mb-6">
                                <div class="flex items-center gap-4">
                                    <div class="w-14 h-14 rounded-2xl bg-brand-100 dark:bg-brand-500/20 text-brand-700 dark:text-brand-400 flex items-center justify-center font-black text-xl ring-4 ring-white dark:ring-slate-950 shadow-inner group-hover:scale-110 transition-transform duration-500 uppercase">
                                        ${student.nombre.charAt(0)}${student.apellido.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 class="font-bold text-lg text-slate-900 dark:text-white leading-tight mb-1 group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                                            ${student.nombre} ${student.apellido}
                                        </h3>
                                        <span class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-xs font-semibold text-slate-600 dark:text-slate-400">
                                            <i data-lucide="fingerprint" class="w-3.5 h-3.5"></i>
                                            ${student.codigo}
                                        </span>
                                    </div>
                                </div>
                                ${isAdmin() ? `
                                <div class="flex gap-1 relative z-10">
                                    <button class="edit-student-btn p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" data-id="${student.id}">
                                        <i data-lucide="pencil" class="w-4 h-4"></i>
                                    </button>
                                    <button class="delete-student-btn p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" data-id="${student.id}" data-name="${student.nombre} ${student.apellido}">
                                        <i data-lucide="trash-2" class="w-4 h-4"></i>
                                    </button>
                                </div>
                                ` : ''}
                            </div>
                            
                            <div class="space-y-3 relative">
                                <div class="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/50 group-hover:bg-white dark:group-hover:bg-slate-900 transition-colors">
                                    <div class="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center shrink-0">
                                        <i data-lucide="mail" class="w-4 h-4 text-blue-600 dark:text-blue-400"></i>
                                    </div>
                                    <div class="min-w-0 flex-1">
                                        <p class="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Correo</p>
                                        <p class="text-sm font-medium text-slate-700 dark:text-slate-300 truncate">${student.email}</p>
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
                        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Gestión de Alumnos</h1>
                        <p class="text-slate-500 font-medium">${isAdmin() ? 'Administra el listado de estudiantes matriculados' : 'Visualiza el listado de estudiantes matriculados'}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        <div class="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-sm font-bold text-slate-700 dark:text-slate-300">Total: <span class="text-brand-600">${students.length}</span></span>
                        </div>
                        ${isAdmin() ? `
                        <button id="add-student-btn" class="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all active:scale-95">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                            <span class="hidden sm:inline">Nuevo Alumno</span>
                        </button>
                        ` : ''}
                    </div>
                </div>
                ${studentsHtml}
            </div>
            <div id="modal-container"></div>
        `;

        if (window.lucide) window.lucide.createIcons();
        attachStudentEvents(container);
    } catch (e) {
        container.innerHTML = `<div class="text-center p-12 text-rose-500 font-medium">Error al cargar la lista de estudiantes. Verifica la conexión con el servidor.</div>`;
    }
};

const attachStudentEvents = (container) => {
    // Add student
    document.getElementById('add-student-btn')?.addEventListener('click', () => {
        document.getElementById('modal-container').innerHTML = renderStudentModal();
        if (window.lucide) window.lucide.createIcons();
        attachModalEvents(container);
    });

    // Edit student
    container.querySelectorAll('.edit-student-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            try {
                const student = await api.get(`/estudiantes/buscar/${id}`);
                document.getElementById('modal-container').innerHTML = renderStudentModal(student);
                if (window.lucide) window.lucide.createIcons();
                attachModalEvents(container);
            } catch (e) {
                showToast('Error al cargar los datos del estudiante', 'error');
            }
        });
    });

    // Delete student
    container.querySelectorAll('.delete-student-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            if (confirm(`¿Estás seguro de eliminar al estudiante "${name}"?`)) {
                try {
                    await api.delete(`/estudiantes/eliminar/${id}`);
                    showToast('Estudiante eliminado correctamente');
                    renderStudents(container);
                } catch (e) {
                    showToast('Error al eliminar el estudiante', 'error');
                }
            }
        });
    });
};

const attachModalEvents = (container) => {
    const closeModal = () => {
        document.getElementById('modal-container').innerHTML = '';
    };

    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-modal')?.addEventListener('click', closeModal);
    document.getElementById('student-modal-overlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'student-modal-overlay') closeModal();
    });

    document.getElementById('student-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('student-id').value;
        const data = {
            codigo: document.getElementById('student-codigo').value,
            nombre: document.getElementById('student-nombre').value,
            apellido: document.getElementById('student-apellido').value,
            email: document.getElementById('student-email').value,
        };

        try {
            if (id) {
                data.id = parseInt(id);
                await api.put('/estudiantes/actualizar', data);
                showToast('Estudiante actualizado correctamente');
            } else {
                await api.post('/estudiantes/crear', data);
                showToast('Estudiante registrado correctamente');
            }
            closeModal();
            renderStudents(container);
        } catch (e) {
            showToast('Error al guardar el estudiante. Verifica los datos.', 'error');
        }
    });
};
