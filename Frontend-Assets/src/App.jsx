import { Suspense, lazy } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import Loader from "./Components/common/Loader";

const Header = lazy(() => import('./Components/common/Header'));
const Home = lazy(() => import('./Pages/Home-Page'));
const Signin = lazy(() => import('./Components/core/Signin'));
const Signup = lazy(() => import('./Components/core/Signup'));
const Footer = lazy(() => import('./Components/common/Footer'));
const Mentors = lazy(() => import("./Pages/Mentors"))
const Profile = lazy(() => import('./Pages/Profile-Page'));
const PrivateRoute = lazy(() => import('./Components/common/PrivateRoute'));
const Events = lazy(() => import('./Pages/Events'));


function App() {
	return (
		<div className="App">
			<Suspense fallback={<Loader />}>
				<Header />
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/signup" element={<Signup />} />
					<Route path="/find-mentors" element={<Mentors />} />
					<Route path="/events" element={<Events />} />
					<Route element={<PrivateRoute />}>
						<Route path="/profile" element={<Profile />} />
					</Route>
				</Routes>
				<Footer />
			</Suspense>
		</div>
	);
}

export default App;
