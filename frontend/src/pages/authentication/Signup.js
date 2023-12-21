import { useState } from "react";
import axios from "axios";
import MySnackbar from "../../components/Snackbar/MySnackbar";
import MyInputField from "../../components/InputField/MyInputField";


const Signup = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirm] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);




    const handleFormSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);
        const data = {
            email: email,
            password: password,
            confirmPassword: confirmPassword
        };

        const response = await axios.post("http://localhost:5000/user/register", data).then(res => {
            localStorage.setItem('user', JSON.stringify(res.data));
            setTimeout(() => {
                window.location.href = "/user/login";
            }
                , 2000);


            setSuccess(true);
            setLoading(false);
        }).catch(err => {
            setError(err.response.data.message);
            setLoading(false);
        }
        );
    };

    return <section className="bg-gray-50 dark:bg-gray-900">
        {error && <MySnackbar severity="error" message={error} />}
        {success && <MySnackbar severity="success" message="Account created successfully" />}
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
                href="/"
                className="flex items-center justify-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
            >
                <img src="/images/logo.png" alt=""
                    className='w-[40px] h-[44px] '
                />
                <div className='mx-[10px] leading-none grid gap-2'>
                    <h1 className='text-[22px] font-normal'>Publication Division</h1>
                    <p className='text-[12px]'> Ministry of Information and Broadcasting <br />
                        Government of India
                    </p>
                </div>
            </a>
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                        Create and account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={handleFormSubmit}>
                        <div>
                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                            <MyInputField fieldType="email" value={email} valueState={setEmail} error={error} />
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                            <MyInputField value={password} valueState={setPassword} error={error} />
                        </div>
                        <div>
                            <label htmlFor="confirmPassword" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Confirm password</label>
                            <MyInputField value={confirmPassword} valueState={setConfirm} error={error} />
                        </div>

                        <button className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">{!loading ? 'Create an account' : 'Loading...'}</button>
                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Already have an account? <a href="/user/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    </section>;
};
export default Signup;
