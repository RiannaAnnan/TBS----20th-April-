import {Link, Navigate} from "react-router-dom";
import axios from "axios";
import {useContext, useState} from "react";
import {UserContext} from "../UserContext";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const {setUser} = useContext(UserContext);
    async function handleLoginButton(ev) {
        ev.preventDefault();
        try {
            const {data} = await axios.post('/login', {email, password}, {withCredentials:true});
            setUser(data);
            alert('Successfully logged in! This site uses cookies and by clicking "ok", you agree to our terms and conditions');
            setRedirect(true);
        } catch (e) {
            alert('Unable to login');
        }
    }

    if (redirect) {
     return <Navigate to={'/'} />
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Login</h1>
            <form className="max-w-md mx-auto" onSubmit={handleLoginButton}>
                <input type="email" placeholder="Email" 
                value={email} onChange={ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password"
                value={password} onChange={ev => setPassword(ev.target.value)} />
                <button className="primary">Login</button>
                <div className="text-center py-2 text-gray-500">
                    Don't have an account yet? <Link className="underline text-black" to={'/register'}>Register here</Link>
                    </div>
            </form>

            </div>


        </div>
    );
}