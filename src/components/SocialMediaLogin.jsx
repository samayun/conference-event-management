import { useHistory, useLocation } from 'react-router';
import { useAuth } from '../context/AuthProvider';
import { githubProvider, googleProvider, signInWithPopup } from '../firebase';
import userObject from '../utils/userObject';

export default function SocialMediaLogin() {
    const { setCurrentUser, setError, error } = useAuth();
    let history = useHistory();
    let location = useLocation();
    let { from } = location.state || { from: { pathname: "/" } };

    const handleSocialLogin = async (provider) => {
        try {
            let result = await signInWithPopup(provider);
            setError("");
            let getUserData = userObject(result.user)
            setCurrentUser(getUserData)
            history.push(from)
        } catch (error) {
            setError(error.message)
            console.log(`handleSocialLogin =>   ${error.message}`);
        }
    }

    return (
        <div className="container py-2 text-center">

            <div>
                <button
                    onClick={() => handleSocialLogin(googleProvider)}
                    className="btn m-3 btn-outline-success">
                    <i className="fab fa-google" style={{
                        marginRight: '1rem',
                        fontSize: '1.5rem',
                        lineHeight: '1'
                    }}></i>
                    Continue With Google
            </button>
                <br />
                <button
                    onClick={() => handleSocialLogin(githubProvider)}
                    className="btn btn-outline-dark">
                    <i className="fab fa-github" style={{
                        marginRight: '1rem',
                        fontSize: '1.5rem',
                        lineHeight: '1'
                    }}></i>
                    Continue With GitHub
            </button>
            </div>
        </div>
    )
}
