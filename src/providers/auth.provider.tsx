import { createContext, useContext } from 'react';
import { useAuth } from '../hooks/useAuth';
import { AuthContext } from '../interfaces/auth-provider.interface';

const ToDoListAuthContext = createContext({} as AuthContext);

const useAuthContext = () => useContext(ToDoListAuthContext);

const AuthProvider = ({ children }: { children: any }) => {
	const auth = useAuth();

	return (
		<ToDoListAuthContext.Provider value={auth}>
			<>{children}</>
		</ToDoListAuthContext.Provider>
	);
};

export { useAuthContext, AuthProvider };
