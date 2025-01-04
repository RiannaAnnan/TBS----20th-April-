import { useState } from "react";
import {Link} from "react-router-dom";
import axios from "axios";

export default function RegisterPage() {
    const[name,setName] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    async function newUser(ev) {
        // this prevents the page from reloading once the 'register' button has been clicked
        ev.preventDefault();
        try {
            await axios.post('/register', {
                name,
                email,
                password,
            });
            alert('You have registered successfully and can now log in!');
        } catch (e) {
            alert('Registration failed. This email has already been used to create an account.');
        }
    }
    return (
        <div className="mt-4 grow flex items-center justify-around">
            <div className="mb-64">
            <h1 className="text-4xl text-center mb-4">Register</h1>
            <form className="max-w-md mx-auto" onSubmit={newUser}>
                <input type="text" placeholder="Name"
                 value = {name}
                 onChange = {ev => setName(ev.target.value)}/>
                <input type="email" placeholder="Email"
                value = {email}
                onChange = {ev => setEmail(ev.target.value)}/>
                <input type="password" placeholder="Password"
                value = {password}
                onChange = {ev => setPassword(ev.target.value)}/>
                <button className="primary">Register</button>
                <div className="text-center py-2 text-gray-500">
                    Already a member? <Link className="underline text-black" to={'/login'}>Login</Link>
                    </div>
            </form>

            </div>


        </div>
    );
}