import { createContext, useContext, useReducer, useEffect } from 'react';
import { BASE_URL } from '../utils/BASE_URL';
import showToast from '../utils/ShowToast';

const AuthContext = createContext();

const initialState = { user: null, isAuthenticated: false };

function reducer(state, action) {
  switch (action.type) {
    case 'login':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'register':
      return { ...state, user: action.payload, isAuthenticated: true };
    case 'logout':
      return { ...state, user: null, isAuthenticated: false };
    default:
      throw new Error('Unknown Action');
  }
}

function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatch] = useReducer(
    reducer,
    initialState
  );

  useEffect(() => {
    const token = localStorage.getItem('token');
    const name = localStorage.getItem('name');
    const id = localStorage.getItem('id');
    if (token && name && id) {
      dispatch({ 
        type: 'login', 
        payload: { 
          id,
          name 
        } 
      });
    }
  }, []);

  async function login(email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Login Successfully');
        localStorage.setItem('token', data.token);
        localStorage.setItem('id', data.data.id);
        localStorage.setItem('name', data.data.name);
        dispatch({ type: 'login', payload: data.data });
        return true;
      } else {
        showToast('error', data.msg || 'Login failed');
        return false;
      }
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong');
      return false;
    }
  }

  function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('name');
    localStorage.removeItem('id');
    dispatch({ type: 'logout' });
    showToast('success', 'Logged out successfully');
  }

  async function register(name, email, password) {
    try {
      const res = await fetch(`${BASE_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Registration successful');
        localStorage.setItem('token', data.data.token);
        localStorage.setItem('name', data.data.user.name);
        localStorage.setItem('id', data.data.user.id);
        dispatch({ type: 'register', payload: data.data.user });
        return true;
      } else {
        showToast('error', data.msg || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.log(error);
      showToast('error', 'Something went wrong');
      return false;
    }
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, register, user, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
}

function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('AuthContext is used outside AuthProvider');
  }

  return context;
}
export { AuthProvider, useAuth };
