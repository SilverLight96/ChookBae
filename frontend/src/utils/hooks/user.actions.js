import { useSetRecoilState } from 'recoil';
import { createBrowserHistory } from 'history';
import { fetchData } from '../apis/api';
import { authAtom } from '../../atoms';
import { usersAtom } from '../../atoms';

export { useUserActions };

function useUserActions () {
    const baseUrl = `${process.env.REACT_APP_API_URL}/users`;
    const setAuth = useSetRecoilState(authAtom);
    const setUsers = useSetRecoilState(usersAtom);

    const history = createBrowserHistory();
    return {
        login,
        logout,
        getAll
    }

    function login(email, password) {
        return fetchData.post(`${baseUrl}/authenticate`, { email, password })
            .then(user => {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                localStorage.setItem('user', JSON.stringify(user));
                setAuth(user);

                // get return url from location state or default to home page
                const { from } = history.location.state || { from: { pathname: '/' } };
                history.push(from);
            });
    }

    function logout() {
        // remove user from local storage, set auth state to null and redirect to login page
        localStorage.removeItem('user');
        setAuth(null);
        history.push('/login');
    }

    function getAll() {
        return fetchData.get(baseUrl).then(setUsers);
    }    
}