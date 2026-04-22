import { useState } from 'react';
import { GraduationCap, Mail, Lock, ArrowRight, UserCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import keycloak from '../keycloak';
const Login = () => {
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    email: '',
    password: '',
    role: 'STUDENT' // Rôle par défaut
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
        // 1. Envoyer email/password à Keycloak
        const response = await fetch(
            'http://localhost:8180/realms/soutenancia/protocol/openid-connect/token',
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    grant_type: 'password',
                    client_id: 'soutenancia-frontend',
                    username: credentials.email,
                    password: credentials.password,
                })
            }
        );
        const data = await response.json();
        console.log('Keycloak response:', data); 

        if (!response.ok) {
            alert("Email ou mot de passe incorrect.");
            return;
        }

        // 2. Récupérer le token
        // const data = await response.json();
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refresh_token', data.refresh_token);
localStorage.setItem('token_expiry', Date.now() + (data.expires_in * 1000));

        // 3. Lire le rôle depuis le token
        const payload = JSON.parse(atob(data.access_token.split('.')[1]));
        const roles = payload.realm_access?.roles || [];

        // 4. Rediriger selon le rôle
        if (roles.includes('ADMIN')) navigate('/admin-dashboard');
        else if (roles.includes('TEACHER')) navigate('/teacher-dashboard');
        else navigate('/student-dashboard');

    } catch (error) {
        alert("Erreur de connexion.");
    } finally {
        setLoading(false);
    }
};

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white p-10 relative overflow-hidden">
        
        {/* Décoration */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        {/* Header */}
        <div className="text-center mb-10 flex flex-col items-center group">
          <div className="relative mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full border border-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-300 ease-out">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
            <GraduationCap className="w-10 h-10 text-blue-600 relative z-10" />
          </div>
          <h1 className="text-5xl font-extrabold tracking-tighter animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-300% animate-gradient-text">
              Soutenancia
            </span>
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Sélecteur de Rôle (Placé en haut pour définir le contexte) */}
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700 ml-1">Se connecter en tant que :</label>
            <div className="relative">
              <UserCircle className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
              <select
                className="w-full pl-12 pr-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm appearance-none font-medium text-slate-700"
                value={credentials.role}
                onChange={(e) => setCredentials({ ...credentials, role: e.target.value })}
              >
                <option value="STUDENT">Étudiant</option>
                <option value="TEACHER">Enseignant / Jury</option>
                <option value="ADMIN">Administrateur</option>
              </select>
            </div>
          </div>

          {/* Champ Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Adresse email"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              required
            />
          </div>

          {/* Champ Password */}
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group mt-4"
          >
            {loading ? "Vérification..." : "Accéder à mon espace"}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center mt-10 text-slate-500 text-sm">
          Pas encore de compte ? <button onClick={() => navigate('/register')} className="text-blue-600 font-bold hover:underline">Créer un profil</button>
        </p>
      </div>
    </div>
  );
};

export default Login;
