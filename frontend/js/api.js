const BASE_URL = 'http://127.0.0.1:8080/gestion-estudiantes/api';

/**
 * Helper to perform fetch requests
 */
async function fetchApi(endpoint, options = {}) {
    const url = `${BASE_URL}${endpoint}`;
    
    const defaultHeaders = {
        'Content-Type': 'application/json',
    };

    const config = {
        ...options,
        headers: {
            ...defaultHeaders,
            ...options.headers,
        },
    };

    try {
        const response = await fetch(url, config);
        
        if (!response.ok) {
            const errorText = await response.text();
            throw new Error(`Error ${response.status}: ${errorText || response.statusText}`);
        }
        
        // Some endpoints might return empty body
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return await response.text();
    } catch (error) {
        console.error(`[API Error] ${endpoint}:`, error);
        throw error;
    }
}

export const api = {
    get: (endpoint) => fetchApi(endpoint, { method: 'GET' }),
    post: (endpoint, data) => fetchApi(endpoint, { method: 'POST', body: JSON.stringify(data) }),
    put: (endpoint, data) => fetchApi(endpoint, { method: 'PUT', body: JSON.stringify(data) }),
    delete: (endpoint) => fetchApi(endpoint, { method: 'DELETE' }),
};
