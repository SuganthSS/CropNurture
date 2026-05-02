
export interface User {
  id: string;
  fullName: string;
  email: string;
}

export interface StoredUser extends User {
  password: string;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => { success: boolean; error?: string };
  register: (fullName: string, email: string, password: string) => { success: boolean; error?: string };
  logout: () => void;
}
