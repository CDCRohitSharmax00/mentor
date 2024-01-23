/* eslint-disable react/no-unknown-property */
import {useState} from "react";
import {Link, useNavigate} from "react-router-dom";
import Sign_in from "../../assets/hero_image.svg";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../../Reducers/userSlice";
import {setToken} from "../../Reducers/auth";
import {useDispatch, useSelector} from "react-redux";
import OAuth from "./OAuth";
import {AuthModal} from "./AuthModal";
import toast from "react-hot-toast";

const Signin = () => {
  const {loading, error} = useSelector((state) => state.user);
  const {isGoogleAuth, token} = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const handleSetSignIn = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading("Loading...");
    try {
      dispatch(signInStart());
      const res = await fetch("/api/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        // If the response status is not in the 200-299 range, the request failed
        toast.dismiss();
        if (data.errors && Array.isArray(data.errors)) {
          // Display validation errors
          data.errors.forEach((err) => {
            toast.error(err.msg);
          });
        } else {
          // If there's any other kind of error
          toast.error(data.message || "Something went wrong!");
        }
        dispatch(signInFailure(data));
        return;
      } else {
        toast.dismiss();
        toast.success("Logged in successfully");
        dispatch(setToken(data.token));
        dispatch(signInSuccess(data));
        navigate("/");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Something went wrong!");
      dispatch(signInFailure(error));
    }
  };

  return (
    <div className="font-[poppins] text-[#333] overflow-x-hidden">
      {token === null && isGoogleAuth && <AuthModal />}
      <div className="min-h-screen flex flex-col items-center justify-top">
        <div className="flex flex-col md:grid-cols-2 items-center gap-4 max-w-6xl w-full p-4 m-4 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md">
          <div className="md:h-full max-md:mt-0 rounded-xl lg:p-3">
            <img
              src={Sign_in}
              className="w-full h-[250px] object-contain bg-[#8800ff] p-2 rounded-xl"
              alt="Sign in image"
            />
          </div>

          {/* animated button */}
          <div className="flex flex-col items-center justify-around md:flex-row  mb-3">
            <div className="flex items-center">
              <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                <Link to="/signin">
                  <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group w-[150px]">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#8800ff] group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-[#8200ff] transition-all duration-300 transform group-hover:translate-x-full ease">
                      Sign In
                    </span>
                    <span className="relative invisible">Sign In</span>
                  </div>
                </Link>

                <Link to="/signup">
                  <div className="relative inline-flex items-center justify-center p-4 px-6 py-3 overflow-hidden font-medium text-indigo-600 transition duration-300 ease-out border-2 border-purple-500 rounded-full shadow-md group w-[150px]">
                    <span className="absolute inset-0 flex items-center justify-center w-full h-full text-white duration-300 -translate-x-full bg-[#8800ff] group-hover:translate-x-0 ease">
                      <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M14 5l7 7m0 0l-7 7m7-7H3"
                        ></path>
                      </svg>
                    </span>
                    <span className="absolute flex items-center justify-center w-full h-full text-[#8200ff] transition-all duration-300 transform group-hover:translate-x-full ease">
                      Sign Up
                    </span>
                    <span className="relative invisible">Sign Up</span>
                  </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="md:max-w-md w-full sm:px-6 py-2">
            <form className="font-normal from-neutral-950">
              <div className="mb-3">
                <h3 className="text-3xl font-extrabold">Sign In</h3>
                <p className="text-sm mt-2 ">
                  Don&apos;t Have An Account Just{" "}
                  <span className="font-bold">Sign Up</span>
                </p>
              </div>

              <div>
                <label className="text-m block mb-2 mt-2">Email</label>
                <div className="relative flex items-center">
                  <input
                    name="email"
                    type="text"
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter email"
                    onChange={handleSetSignIn}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2"
                    viewBox="0 0 682.667 682.667"
                  >
                    <defs>
                      <clipPath id="a" clipPathUnits="userSpaceOnUse">
                        <path
                          d="M0 512h512V0H0Z"
                          data-original="#000000"
                        ></path>
                      </clipPath>
                    </defs>
                    <g
                      clipPath="url(#a)"
                      transform="matrix(1.33 0 0 -1.33 0 682.667)"
                    >
                      <path
                        fill="none"
                        strokeMiterlimit="10"
                        strokeWidth="40"
                        d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z"
                        data-original="#000000"
                      ></path>
                      <path
                        d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z"
                        data-original="#000000"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>
              <div className="mt-3">
                <label className="text-m block mb-2">Password</label>
                <div className="relative flex items-center">
                  <input
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full text-sm border-b border-gray-300 focus:border-[#333] px-2 py-3 outline-none"
                    placeholder="Enter password"
                    onChange={handleSetSignIn}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="#bbb"
                    stroke="#bbb"
                    className="w-[18px] h-[18px] absolute right-2 cursor-pointer"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                    viewBox="0 0 128 128"
                  >
                    <path
                      d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </div>
              </div>
              <p className="text-red-700 mt-5">
                {error ? error.message || "Something went wrong!" : ""}
              </p>
              <div className="mt-3">
                <a
                  href="jajvascript:void(0);"
                  className="text-[#8800ff] font-semibold text-sm hover:text-[#8200ff]"
                >
                  Forgot Password?
                </a>
              </div>
              <div className="mt-3">
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  type="button"
                  className="w-full shadow-xl py-2.5 px-4 text-sm font-semibold rounded-full text-white bg-[#8800ff] hover:bg-[#8200ff] focus:outline-none"
                >
                  {loading ? "Loading..." : "Sign In"}
                </button>
              </div>
              <p className="my-8 text-sm text-gray-400 text-center">
                or continue with
              </p>
              <div className="space-x-8 flex justify-center">
                <OAuth />
                <button
                  type="button"
                  className="border-none outline-none transform hover:scale-75 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    fill="#000"
                    viewBox="0 0 22.773 22.773"
                  >
                    <path
                      d="M15.769 0h.162c.13 1.606-.483 2.806-1.228 3.675-.731.863-1.732 1.7-3.351 1.573-.108-1.583.506-2.694 1.25-3.561C13.292.879 14.557.16 15.769 0zm4.901 16.716v.045c-.455 1.378-1.104 2.559-1.896 3.655-.723.995-1.609 2.334-3.191 2.334-1.367 0-2.275-.879-3.676-.903-1.482-.024-2.297.735-3.652.926h-.462c-.995-.144-1.798-.932-2.383-1.642-1.725-2.098-3.058-4.808-3.306-8.276v-1.019c.105-2.482 1.311-4.5 2.914-5.478.846-.52 2.009-.963 3.304-.765.555.086 1.122.276 1.619.464.471.181 1.06.502 1.618.485.378-.011.754-.208 1.135-.347 1.116-.403 2.21-.865 3.652-.648 1.733.262 2.963 1.032 3.723 2.22-1.466.933-2.625 2.339-2.427 4.74.176 2.181 1.444 3.457 3.028 4.209z"
                      data-original="#000000"
                    ></path>
                  </svg>
                </button>
                <button
                  type="button"
                  className="border-none outline-none transform hover:scale-75 transition duration-200 ease-in-out"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30px"
                    fill="#007bff"
                    viewBox="0 0 167.657 167.657"
                  >
                    <path
                      d="M83.829.349C37.532.349 0 37.881 0 84.178c0 41.523 30.222 75.911 69.848 82.57v-65.081H49.626v-23.42h20.222V60.978c0-20.037 12.238-30.956 30.115-30.956 8.562 0 15.92.638 18.056.919v20.944l-12.399.006c-9.72 0-11.594 4.618-11.594 11.397v14.947h23.193l-3.025 23.42H94.026v65.653c41.476-5.048 73.631-40.312 73.631-83.154 0-46.273-37.532-83.805-83.828-83.805z"
                      data-original="#010002"
                    ></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin;
