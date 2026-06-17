export const router = {
    routes: {},
    currentRoute: null,
    onRouteChanged: null,

    init() {
        window.addEventListener('hashchange', () => this.handleHashChange());
        // Handle initial load
        setTimeout(() => this.handleHashChange(), 0);
    },

    addRoute(path, renderFn) {
        this.routes[path] = renderFn;
    },

    navigate(path) {
        window.location.hash = path;
    },

    handleHashChange() {
        let hash = window.location.hash.slice(1) || '/';
        
        // Match exact route or base route for details
        let routeMatch = this.routes[hash];
        let params = null;
        
        if (!routeMatch) {
            // Check dynamic routes (e.g. /students/:id)
            for (const path in this.routes) {
                if (path.includes(':')) {
                    const baseRoute = path.split('/:')[0];
                    if (hash.startsWith(baseRoute + '/')) {
                        routeMatch = this.routes[path];
                        params = { id: hash.replace(baseRoute + '/', '') };
                        break;
                    }
                }
            }
        }
        
        if (!routeMatch) {
            hash = '/';
            routeMatch = this.routes['/'];
        }

        this.currentRoute = hash;
        
        if (this.onRouteChanged) {
            this.onRouteChanged(routeMatch, params);
        }
    }
};
