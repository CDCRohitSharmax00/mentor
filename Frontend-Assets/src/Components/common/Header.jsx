import Inspiration_APP from "../../assets/Inspiration_APP.png";
import "../../App.css";
import { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { menuItems } from "../../Constants/data";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { QuickBox } from "./Quickbox";
import { setIsGoogleAuth, setSignupData, setToken } from "../../Reducers/auth";
import { signInSuccess } from "../../Reducers/userSlice";
import { MdOutlineVerified } from "react-icons/md";
import { FaUserShield } from "react-icons/fa";
export default function Header() {
  const { currentUser } = useSelector((state) => state.user);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [scroll, setScroll] = useState(0);

  useEffect(() => {
    let progressBarHandler = () => {
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scroll = `${totalScroll / windowHeight}`;
      setScroll(scroll);
    };

    window.addEventListener("scroll", progressBarHandler);
    return () => window.removeEventListener("scroll", progressBarHandler);
  });

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const data = [
    {
      heading: "Profile",
      icon: "FaUserEdit",
      action: () => {
        navigate("/dashboard/profile");
      },
    },
    {
      heading: "Logout",
      icon: "FaDoorOpen",
      action: () => {
        //_----Here will be removing the token and logout
        dispatch(setSignupData(null));
        dispatch(setIsGoogleAuth(false));
        dispatch(signInSuccess(null));
        dispatch(setToken(null));
        window.location.reload();
      },
    },
  ];

  const authData = [
    {
      heading: "Signin",
      icon: "FaUserTie",
      action: () => {
        navigate("/signin");
      },
    },
    {
      heading: "Signup",
      icon: "FaUserGraduate",
      action: () => {
        navigate("/signup");
        window.location.reload();
      },
    },
  ];

  return (
    <div className="sticky top-0 w-full bg-white py-2 mx-auto font-poppins z-50">
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-2 py-2 sm:px-6 lg:px-8">
        <div className="inline-flex items-center space-x-2">
          <span className="overflow-hidden">
            <img
              src={Inspiration_APP}
              className="mr-0 transform hover:rotate-180 transition duration-200 ease-in-out w-[40px] h-[40px] lg:w-[60px] lg:h-[60px] rounded-full"
              alt="Header logo "
            />
          </span>
          <Link to="/">
            <span className="font-normal hover:text-[#8800ff] text-[18px] lg:text-xl">
              Inspiration App
            </span>
          </Link>
        </div>
        <div className="hidden lg:block">
          <ul className="inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <Link
                  to={item.href}
                  className=" transition-colors duration-200 hover:text-[#8800ff] text-[17px] font-[400] text-gray-800"
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div className="hidden lg:flex">
          <div className="flex gap-2">
            {currentUser ? (
              <>
                <button
                  type="button"
                  className=" mr-3 rounded-md px-3 py-2 text-[17px] font-normal bg-transparent text-black border-2 border-black  hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Dashboard
                </button>
                <div className="relative w-full h-full flex justify-center items-center">
                  <div
                    onClick={() => {
                      setShow(!show);
                    }}
                    className=" cursor-pointer relative"
                  >
                    {currentUser?.picture? (<img
                      src={
                        currentUser?.picture ||
                        "https://avatars.githubusercontent.com/u/90024312?v=4"
                      }
                      alt="profile"
                      className="h-8 w-8 rounded-full object-cover cursor-pointer inline-block"
                    />):(<FaUserShield className=" h-8 w-8"/>)}
                    
                    <ChevronDown className=" inline-block absolute bottom-[-8%] right-[-18%] bg-gray-200 backdrop-blur-sm h-4 w-4 rounded-full bg-opacity-60" />
                  </div>

                  {show && <QuickBox Options={data} side={"right"} />}
                </div>
              </>
            ) : (
              <div className="flex">
                <div
                  type="button"
                  onClick={() => setShow(!show)}
                  className=" relative mr-3 rounded-md px-3 py-2 text-[15px] font-normal bg-transparent text-black border-2 border-black  hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                >
                  Join Now{" "}
                  <MdOutlineVerified className=" inline-block h-5 w-5 ml-1 " />
                  {show && <QuickBox Options={authData} side={"left"} />}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile View Menu */}
        <div className="lg:hidden flex gap-2 items-center">
          {!currentUser && (
            <div
              type="button"
              onClick={() => setShow(!show)}
              className=" relative mr-3 rounded-md px-3 py-2 text-[14px] font-normal bg-transparent text-black border-2 border-black  hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Join <MdOutlineVerified className=" inline-block h-5 w-5" />
              {show && <QuickBox Options={authData} side={"left"} />}
            </div>
          )}
          {currentUser && (
            <div className="relative w-full h-full flex justify-center items-center gap-1">
              <div
                onClick={() => {
                  setShow(!show);
                }}
                className=" cursor-pointer relative"
              >
                <img
                  src={
                    currentUser?.picture ||
                    "https://avatars.githubusercontent.com/u/90024312?v=4"
                  }
                  alt="profile"
                  className="h-5 w-5 rounded-full object-cover cursor-pointer inline-block"
                />
                <ChevronDown className=" inline-block absolute bottom-[-8%] right-[-18%] bg-gray-200 backdrop-blur-sm h-3 w-3 rounded-full bg-opacity-60" />
              </div>
              {show && <QuickBox Options={data} side="right" />}
            </div>
          )}
          {isMenuOpen ? <X onClick={toggleMenu} className="h-8 w-8 cursor-pointer text-black mr-5" /> : <Menu onClick={toggleMenu} className="h-8 w-8 cursor-pointer text-black mr-5" />}
        </div>
        {isMenuOpen && (
          <div className=" absolute mt-6 inset-x-0 top-10 z-[99999] origin-top-right transform p-2 transition lg:hidden ">
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                {/* <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <span className="overflow-hidden">
                        <img
                          src={Inspiration_APP}
                          className="mr-0 transform hover:rotate-180 transition duration-200 ease-in-out w-[60px] h-[60px] rounded-full"
                          alt="Header logo "
                        />
                      </span>
                    </span>
                    <span className="font-bold">Inspiration APP</span>
                  </div>
                  <div className="mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div> */}
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="-m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-gray-50"
                      >
                        <span className="ml-3 text-base font-medium text-gray-900">
                          {item.name}
                        </span>
                      </a>
                    ))}
                  </nav>
                </div>
                <div className="mt-3 lg:block flex flex-col items-center w-full">
                  <button
                    type="button"
                    className=" mx-auto mr-3 rounded-md px-3 py-2 text-[17px] font-normal bg-transparent text-black border-2 border-black hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-full"
                  >
                    Dashboard
                  </button>
                  {!currentUser && (
                    <button
                      type="button"
                      onClick={() => {
                        navigate("/signin");
                        setIsMenuOpen(false);
                      }}
                      className=" mx-auto mr-3 rounded-md px-3 py-2 text-[17px] font-normal bg-[#8800ff] text-white mt-2 border-2 hover:border-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black w-full"
                    >
                      Login
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div id="progressBarContainer">
          <div
            id="progressBar"
            style={{
              transform: `scale(${scroll}, 1)`,
              opacity: `${scroll}`,
              background: `linear-gradient(50deg, blue 0%, blue ${scroll * 100
                }%, transparent ${scroll * 100}%, transparent 100%)`,
            }}
          />
        </div>
      </div>
    </div>
  );
}
