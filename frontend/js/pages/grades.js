import { api } from '../api.js';
import { state, showToast } from '../state.js';

const isAdmin = () => state.user?.role === 'ADMIN';

const renderGradeModal = (grade = null, students = [], courses = []) => {
    const isEdit = grade !== null;
    return `
        <div id="grade-modal-overlay" class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
            <div class="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl w-full max-w-lg border border-slate-200 dark:border-slate-800 overflow-hidden">
                <div class="p-6 sm:p-8 border-b border-slate-100 dark:border-slate-800">
                    <div class="flex items-center justify-between">
                        <h2 class="text-xl font-black text-slate-900 dark:text-white">${isEdit ? 'Editar Calificación' : 'Nueva Calificación'}</h2>
                        <button id="close-modal" class="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors">
                            <i data-lucide="x" class="w-5 h-5 text-slate-500"></i>
                        </button>
                    </div>
                </div>
                <form id="grade-form" class="p-6 sm:p-8 space-y-5">
                    <input type="hidden" id="grade-id" value="${isEdit ? grade.id : ''}">
                    <div class="grid grid-cols-2 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Estudiante</label>
                            <select id="grade-estudiante" required
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white">
                                <option value="">Seleccionar...</option>
                                ${students.map(s => `<option value="${s.id}" ${isEdit && grade.estudianteId === s.id ? 'selected' : ''}>${s.nombre} ${s.apellido}</option>`).join('')}
                            </select>
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">Curso</label>
                            <select id="grade-curso" required
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white">
                                <option value="">Seleccionar...</option>
                                ${courses.map(c => `<option value="${c.id}" ${isEdit && grade.cursoId === c.id ? 'selected' : ''}>${c.nombre}</option>`).join('')}
                            </select>
                        </div>
                    </div>
                    <div class="grid grid-cols-3 gap-4">
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">N. Práctica</label>
                            <input id="grade-practica" type="number" step="0.01" min="0" max="20" required value="${isEdit ? (grade.notaPractica ?? '') : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white text-center"
                                placeholder="0.00">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">N. Parcial</label>
                            <input id="grade-parcial" type="number" step="0.01" min="0" max="20" required value="${isEdit ? (grade.notaParcial ?? '') : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white text-center"
                                placeholder="0.00">
                        </div>
                        <div class="space-y-1.5">
                            <label class="text-xs font-bold text-slate-600 dark:text-slate-400 uppercase tracking-wider">N. Final</label>
                            <input id="grade-final" type="number" step="0.01" min="0" max="20" required value="${isEdit ? (grade.notaFinal ?? '') : ''}"
                                class="w-full px-4 py-3 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-4 focus:ring-brand-500/10 focus:border-brand-500 outline-none transition-all font-medium text-slate-900 dark:text-white text-center"
                                placeholder="0.00">
                        </div>
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

// Cache for students and courses lists
let cachedStudents = [];
let cachedCourses = [];

export const renderGrades = async (container) => {
    try {
        const [grades, students, courses] = await Promise.all([
            api.get('/notas/Listado'),
            api.get('/estudiantes/Listado'),
            api.get('/cursos/Listado')
        ]);

        cachedStudents = students;
        cachedCourses = courses;

        // Create lookups
        const studentMap = students.reduce((acc, s) => ({ ...acc, [s.id]: s }), {});
        const courseMap = courses.reduce((acc, c) => ({ ...acc, [c.id]: c }), {});

        // Enhance grades with student and course info
        const enhancedGrades = grades.map(g => ({
            ...g,
            studentName: studentMap[g.estudianteId] ? `${studentMap[g.estudianteId].nombre} ${studentMap[g.estudianteId].apellido}` : 'Desconocido',
            courseName: courseMap[g.cursoId] ? courseMap[g.cursoId].nombre : 'Desconocido'
        }));

        const getScoreBadge = (score) => {
            if (score >= 14) return 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400';
            if (score >= 10.5) return 'bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400';
            return 'bg-rose-100 text-rose-700 dark:bg-rose-500/20 dark:text-rose-400';
        };

        let gradesHtml = '';
        if (enhancedGrades.length === 0) {
            gradesHtml = `
                <div class="col-span-full py-16 flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-900/50 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800">
                    <div class="w-20 h-20 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                        <i data-lucide="graduation-cap" class="w-10 h-10 text-slate-400"></i>
                    </div>
                    <h3 class="text-lg font-bold text-slate-900 dark:text-white mb-1">No hay calificaciones</h3>
                    <p class="text-sm text-slate-500">Aún no se han registrado notas en el sistema.</p>
                </div>
            `;
        } else {
            gradesHtml = `
                <div class="bg-white dark:bg-slate-950 rounded-3xl border border-slate-200/60 dark:border-slate-800 shadow-sm overflow-hidden">
                    <div class="overflow-x-auto">
                        <table class="w-full text-left border-collapse">
                            <thead>
                                <tr class="bg-slate-50/80 dark:bg-slate-900/80 border-b border-slate-200/60 dark:border-slate-800">
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Estudiante</th>
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider">Curso</th>
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-center">N. Práctica</th>
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-center">N. Parcial</th>
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-center">N. Final</th>
                                    <th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-center">Promedio</th>
                                    ${isAdmin() ? '<th class="p-4 sm:p-5 text-xs font-black text-slate-400 uppercase tracking-wider text-center">Acciones</th>' : ''}
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 dark:divide-slate-800/60">
                                ${enhancedGrades.map(grade => `
                                    <tr class="hover:bg-slate-50/50 dark:hover:bg-slate-900/30 transition-colors group">
                                        <td class="p-4 sm:p-5">
                                            <div class="font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">${grade.studentName}</div>
                                        </td>
                                        <td class="p-4 sm:p-5 text-sm font-medium text-slate-600 dark:text-slate-300">
                                            ${grade.courseName}
                                        </td>
                                        <td class="p-4 sm:p-5 text-center">
                                            <span class="inline-flex items-center justify-center w-10 h-8 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                ${grade.notaPractica ?? '-'}
                                            </span>
                                        </td>
                                        <td class="p-4 sm:p-5 text-center">
                                            <span class="inline-flex items-center justify-center w-10 h-8 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                ${grade.notaParcial ?? '-'}
                                            </span>
                                        </td>
                                        <td class="p-4 sm:p-5 text-center">
                                            <span class="inline-flex items-center justify-center w-10 h-8 rounded-lg font-bold text-sm bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                                                ${grade.notaFinal ?? '-'}
                                            </span>
                                        </td>
                                        <td class="p-4 sm:p-5 text-center">
                                            <span class="inline-flex items-center justify-center px-3 py-1.5 rounded-xl font-bold text-sm ${getScoreBadge(grade.promedio)} shadow-sm">
                                                ${grade.promedio ?? '-'}
                                            </span>
                                        </td>
                                        ${isAdmin() ? `
                                        <td class="p-4 sm:p-5 text-center">
                                            <div class="flex items-center justify-center gap-1">
                                                <button class="edit-grade-btn p-2 rounded-xl hover:bg-amber-50 dark:hover:bg-amber-500/10 text-slate-400 hover:text-amber-600 dark:hover:text-amber-400 transition-colors" data-id="${grade.id}">
                                                    <i data-lucide="pencil" class="w-4 h-4"></i>
                                                </button>
                                                <button class="delete-grade-btn p-2 rounded-xl hover:bg-rose-50 dark:hover:bg-rose-500/10 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 transition-colors" data-id="${grade.id}" data-name="${grade.studentName} - ${grade.courseName}">
                                                    <i data-lucide="trash-2" class="w-4 h-4"></i>
                                                </button>
                                            </div>
                                        </td>
                                        ` : ''}
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                </div>
            `;
        }

        container.innerHTML = `
            <div class="animate-fade-in">
                <div class="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <h1 class="text-3xl font-black text-slate-900 dark:text-white tracking-tight mb-2">Calificaciones</h1>
                        <p class="text-slate-500 font-medium">${isAdmin() ? 'Administra el registro de notas' : 'Registro de notas y promedios'}</p>
                    </div>
                    <div class="flex items-center gap-3">
                        ${isAdmin() ? `
                        <button id="add-grade-btn" class="flex items-center gap-2 px-5 py-2.5 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl font-bold shadow-lg shadow-brand-500/20 hover:shadow-brand-500/40 transition-all active:scale-95">
                            <i data-lucide="plus" class="w-5 h-5"></i>
                            <span class="hidden sm:inline">Nueva Nota</span>
                        </button>
                        ` : ''}
                    </div>
                </div>
                ${gradesHtml}
            </div>
            <div id="modal-container"></div>
        `;

        if (window.lucide) window.lucide.createIcons();
        attachGradeEvents(container);
    } catch (e) {
        container.innerHTML = `<div class="text-center p-12 text-rose-500 font-medium">Error al cargar las calificaciones. Verifica la conexión con el servidor.</div>`;
    }
};

const attachGradeEvents = (container) => {
    document.getElementById('add-grade-btn')?.addEventListener('click', () => {
        document.getElementById('modal-container').innerHTML = renderGradeModal(null, cachedStudents, cachedCourses);
        if (window.lucide) window.lucide.createIcons();
        attachGradeModalEvents(container);
    });

    container.querySelectorAll('.edit-grade-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            try {
                const grade = await api.get(`/notas/buscar/${id}`);
                document.getElementById('modal-container').innerHTML = renderGradeModal(grade, cachedStudents, cachedCourses);
                if (window.lucide) window.lucide.createIcons();
                attachGradeModalEvents(container);
            } catch (e) {
                showToast('Error al cargar los datos de la nota', 'error');
            }
        });
    });

    container.querySelectorAll('.delete-grade-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
            const id = btn.dataset.id;
            const name = btn.dataset.name;
            if (confirm(`¿Estás seguro de eliminar la nota de "${name}"?`)) {
                try {
                    await api.delete(`/notas/eliminar/${id}`);
                    showToast('Calificación eliminada correctamente');
                    renderGrades(container);
                } catch (e) {
                    showToast('Error al eliminar la calificación', 'error');
                }
            }
        });
    });
};

const attachGradeModalEvents = (container) => {
    const closeModal = () => {
        document.getElementById('modal-container').innerHTML = '';
    };

    document.getElementById('close-modal')?.addEventListener('click', closeModal);
    document.getElementById('cancel-modal')?.addEventListener('click', closeModal);
    document.getElementById('grade-modal-overlay')?.addEventListener('click', (e) => {
        if (e.target.id === 'grade-modal-overlay') closeModal();
    });

    document.getElementById('grade-form')?.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = document.getElementById('grade-id').value;
        const data = {
            estudianteId: parseInt(document.getElementById('grade-estudiante').value),
            cursoId: parseInt(document.getElementById('grade-curso').value),
            notaPractica: parseFloat(document.getElementById('grade-practica').value),
            notaParcial: parseFloat(document.getElementById('grade-parcial').value),
            notaFinal: parseFloat(document.getElementById('grade-final').value),
        };

        // Calculate promedio client-side (backend also does it)
        data.promedio = parseFloat(((data.notaPractica * 0.20) + (data.notaParcial * 0.30) + (data.notaFinal * 0.50)).toFixed(2));

        try {
            if (id) {
                data.id = parseInt(id);
                await api.put('/notas/actualizar', data);
                showToast('Calificación actualizada correctamente');
            } else {
                await api.post('/notas/crear', data);
                showToast('Calificación registrada correctamente');
            }
            closeModal();
            renderGrades(container);
        } catch (e) {
            showToast('Error al guardar la calificación. Verifica los datos.', 'error');
        }
    });
};
