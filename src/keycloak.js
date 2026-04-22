import Keycloak from 'keycloak-js';
const keycloack = new Keycloak({
    url: 'http://localhost:8180/auth',
    realm: 'soutenancia',
    clientId: 'soutenancia-client'
});
export default keycloack;