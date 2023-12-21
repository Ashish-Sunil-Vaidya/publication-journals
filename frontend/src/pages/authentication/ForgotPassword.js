import axios from "axios";
import { useState } from "react";
import MySnackbar from "../../components/Snackbar/MySnackbar";
import MyInputField from "../../components/InputField/MyInputField";
// import logo from "/images/logo.png";


const ForgotPassword = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirm] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);


  const handleFormSubmit = (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const data = {
      email,
      password,
      confirmedPassword,
    };

    axios
      .post("http://localhost:5000/user/reset", data)
      .then((res) => {
        // console.log(res);
        setSuccess(res.data.message);
        setError(null);
        setTimeout(() => {
          setLoading(false);
          window.location.href = "/user/login";
        }, 2000);
      })
      .catch((err) => {
        // console.log(err);
        setLoading(false);
        setError(err.response.data.message);
      });

    // console.log(data);

  };



  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      {error && <MySnackbar message={error} severity="error" />}
      {success && <MySnackbar message={success} severity="success" />}

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
        <div className="w-full p-6 bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md dark:bg-gray-800 dark:border-gray-700 sm:p-8">
          <h2 className="mb-1 text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Change Password
          </h2>
          <form className="mt-4 space-y-4 lg:mt-5 md:space-y-5" onSubmit={handleFormSubmit}>
            <div>
              <label
                for="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your email
              </label>
              <MyInputField fieldType="email" value={email} valueState={setEmail} error={error} />
            </div>
            <div>
              <label
                for="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <MyInputField value={password} valueState={setPassword} error={error} />
            </div>
            <div>
              <label
                for="confirm-password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Confirm password
              </label>
              <MyInputField value={confirmedPassword} valueState={setConfirm} error={error} />
            </div>
            {/* <div className="flex items-start">
              <div className="flex items-center h-5">
                <input
                  id="newsletter"
                  aria-describedby="newsletter"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                  required=""
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  for="newsletter"
                  className="font-light text-gray-500 dark:text-gray-300"
                >
                  I accept the{" "}
                  <a
                    className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                    href="#"
                  >
                    Terms and Conditions
                  </a>
                </label>
              </div>
            </div> */}
            <button

              className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              {!loading ? "Reset passwod" : "Loading..."}
            </button>

            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Remembered password? <a href="/user/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Go back to login page</a>
            </p>
          </form>
        </div>
      </div>
    </section>
  );
};
export default ForgotPassword;
