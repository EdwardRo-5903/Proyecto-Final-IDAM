const AUTH_KEY = 'taskmaster.auth';
const USERS_KEY = 'taskmaster.users';

type StoredUser = { username: string; hash: string };

const loadUsers = (): StoredUser[] => {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    const data = raw ? JSON.parse(raw) as any[] : [];
    return data.map(u => ({
      username: u.username,
      hash: u.hash || u.password || '', // migrate old plain password if existed
    })).filter(u => u.username && u.hash);
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));

const hashPassword = async (pwd: string): Promise<string> => {
  const enc = new TextEncoder().encode(pwd);
  const buf = await crypto.subtle.digest('SHA-256', enc);
  return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
};

export const register = async (username: string, password: string) => {
  const u = username.trim();
  const p = password.trim();
  if (!u || !p) throw new Error('Usuario y contraseña requeridos');
  const users = loadUsers();
  if (users.some(x => x.username.toLowerCase() === u.toLowerCase())) {
    throw new Error('El usuario ya existe');
  }
  const hash = await hashPassword(p);
  users.push({ username: u, hash });
  saveUsers(users);
  localStorage.setItem(AUTH_KEY, u);
};

export const login = async (username: string, password: string) => {
  const u = username.trim();
  const p = password.trim();
  if (!u || !p) throw new Error('Usuario y contraseña requeridos');
  const users = loadUsers();
  const hash = await hashPassword(p);
  const found = users.find(x => x.username.toLowerCase() === u.toLowerCase() && x.hash === hash);
  if (!found) throw new Error('Credenciales inválidas');
  localStorage.setItem(AUTH_KEY, found.username);
};

export const isAuthenticated = () => {
  return !!localStorage.getItem(AUTH_KEY);
};

export const logout = () => {
  localStorage.removeItem(AUTH_KEY);
};

export const currentUser = () => localStorage.getItem(AUTH_KEY) || '';
