const KEYCLOAK_URL = 'http://localhost:8180/realms/soutenancia/protocol/openid-connect/token';

export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem('refresh_token');
    if (!refreshToken) return null;

    const response = await fetch(KEYCLOAK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'refresh_token',
            client_id: 'soutenancia-frontend',
            refresh_token: refreshToken,
        })
    });

    if (!response.ok) {
        // Refresh token expiré → déconnecter l'utilisateur
        localStorage.clear();
        window.location.href = '/login';
        return null;
    }

    const data = await response.json();
    localStorage.setItem('access_token', data.access_token);
    localStorage.setItem('refresh_token', data.refresh_token);
    localStorage.setItem('token_expiry', Date.now() + (data.expires_in * 1000));
    return data.access_token;
};

export const getValidToken = async () => {
    const expiry = localStorage.getItem('token_expiry');
    const isExpired = Date.now() > parseInt(expiry);

    if (isExpired) {
        return await refreshAccessToken();
    }
    return localStorage.getItem('access_token');
};