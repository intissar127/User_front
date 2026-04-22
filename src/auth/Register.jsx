import  { useState } from 'react';
import { BookOpenCheck,User, Mail, GraduationCap, Briefcase, Lock, ArrowRight } from 'lucide-react';
import { registerUser } from '../api/api'; // Chemin vers ton api.js

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    passwd: '',
    role: 'STUDENT',
    filiere: '',
    specialite: ''
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await registerUser(formData);
      alert("Bienvenue sur Soutenancia ! Compte créé avec succès.");
      console.log(response.data);
    } catch (error) {
      alert("Erreur lors de l'inscription. Vérifiez votre backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-lg rounded-3xl shadow-2xl border border-white p-10 relative overflow-hidden">
        
        {/* Décoration subtile */}
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="text-center mb-12 flex flex-col items-center group">
          
          {/* Icône Premium avec effet de halo au survol */}
          <div className="relative mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-full border border-blue-100 shadow-inner group-hover:scale-110 transition-transform duration-300 ease-out">
            <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl group-hover:blur-2xl transition-all"></div>
            <GraduationCap className="w-10 h-10 text-blue-600 relative z-10" />
          </div>

          {/* Titre avec Dégradé Animé */}
          <h1 className="text-5xl font-extrabold tracking-tighter animate-in fade-in slide-in-from-bottom-3 duration-1000">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-600 bg-300% animate-gradient-text">
              Soutenancia
            </span>
          </h1>

          {/* Sous-titre */}
          <p className="text-slate-600 mt-3 font-medium text-lg max-w-sm animate-in fade-in duration-1000 delay-300">
            Votre plateforme intelligente de gestion des soutenances.
          </p>
          
          {/* Séparateur élégant */}
          <div className="w-16 h-1 py-1 mt-6 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full animate-in zoom-in duration-700 delay-500"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Champ Nom */}
          <div className="relative">
            <User className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Nom complet"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          {/* Champ Email */}
          <div className="relative">
            <Mail className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="email"
              placeholder="Adresse email"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-sm"
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>
          <div className="relative">
            <Lock className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
            <input
              type="password"
              placeholder="Mot de passe"
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all shadow-sm"
              onChange={(e) => setFormData({ ...formData, passwd: e.target.value })}
              required
            />
          </div>

          {/* Sélecteur de Rôle */}
          <div className="grid grid-cols-1 gap-4">
            <label className="text-sm font-semibold text-slate-700 ml-1">Vous êtes :</label>
            <select
              className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none cursor-pointer shadow-sm appearance-none"
              value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}
            >
              <option value="STUDENT">Étudiant</option>
              <option value="TEACHER">Enseignant / Jury</option>
              <option value="ADMIN">Administrateur</option>
            </select>
          </div>

          {/* Champs Conditionnels (Animation fluide simulée par Tailwind) */}
          {(formData.role === "STUDENT" || formData.role === "TEACHER") && (
            <div className="space-y-4 animate-in fade-in slide-in-from-top-2 duration-300">
              
              <div className="relative">
                <Briefcase className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Spécialité (ex: Génie Logiciel)"
                  className="w-full pl-12 pr-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                  onChange={(e) => setFormData({ ...formData, specialite: e.target.value })}
                  required
                />
              </div>

              {formData.role === "STUDENT" && (
                <div className="relative">
                  <GraduationCap className="absolute left-4 top-3.5 text-slate-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Filière (ex: 2ème année Cycle Ingénieur)"
                    className="w-full pl-12 pr-4 py-3 bg-blue-50/50 border border-blue-100 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none shadow-sm"
                    onChange={(e) => setFormData({ ...formData, filiere: e.target.value })}
                    required
                  />
                </div>
              )}
            </div>
          )}

          {/* Bouton de validation */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-bold rounded-xl shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center justify-center gap-2 group"
          >
            {loading ? "Création en cours..." : "S'inscrire"}
            {!loading && <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-500 text-sm">
          Vous avez déjà un compte ? <a href="/login" className="text-blue-600 font-bold hover:underline">Se connecter</a>
        </p>
      </div>
    </div>
  );
};

export default Register;