import React from "react";
import Curious_Ecosystem from "../../../assets/Curious_Ecosystem.jpg";
import { Link } from "react-router-dom";
const Section4 = () => {
	return (
		<div>
			<div className="text-3xl font-extrabold mt-10 flex justify-center font-poppins">
				<h2>Your Start Up Journey</h2>
			</div>
			<div className="relative w-full bg-white">
				<div className="mx-auto max-w-7xl lg:px-8">
					<div className="flex flex-col lg:flex-row justify-center px-4 py-10 lg:px-6">
						<div className="lg:w-1/2 lg:mr-10">
							<div className="inline-flex items-center mb-6">
								<div>
									<img
										src={Curious_Ecosystem}
										alt=""
										className="w-[60px] h-[60px]"
									/>
								</div>
								<span className="ml-4 text-2xl font-bold font-poppins">
									Curious Ecosystem
								</span>
							</div>
							<div className="mt-10 flex max-w-max items-center space-x-2 rounded-full border p-2 hover:bg-[#8800ff] hover:text-white">
								<p className="text-xs font-medium md:text-sm">
									Elevating Ideas
									<span className="ml-2 cursor-pointer font-bold">
										Get Started &rarr;
									</span>
								</p>
							</div>
							<h1 className="mt-8 max-w-4xl text-[20px] sm:text-xl font-bold tracking-tight text-black md:text-2xl lg:text-2xl">
								Want To Be An "Entrepreneur"?
							</h1>
							<p className="mt-3 max-w-3xl text-lg text-gray-700">
								Do you have a dream to start your own startup, or do you have
								any ideas that help society in solving real problems, or do you
								have a great plan that inspires the world to make it a better
								place.
							</p>
							<div className="mt-8 flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-2 overflow-auto md:overflow-visible">
								<div>
									<Link to="https://wa.me/9353493539?text=I%20Want%20To%20Talk%20About%20Startup">
										<button
											type="button"
											className="w-full md:w-auto rounded-md px-3 py-2.5 text-[16px] font-poppins font-normal  text-black border-2 border-[#8800ff] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
											Conatct Us
										</button>
									</Link>
								</div>
								<div>
									<Link to="https://curiousdevelopers.in">
										<button
											type="button"
											className="w-full md:w-auto rounded-md px-3 py-2.5 text-[16px] font-poppins font-normal bg-transparent text-black border-2 border-[#8800ff] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
											Community
										</button>
									</Link>
								</div>
								<div>
									<Link to="https://curiousecosystem.org">
										<button
											type="button"
											className="w-full md:w-auto rounded-md px-3 py-2.5 text-[16px] font-poppins font-normal bg-transparent text-black border-2 border-[#8800ff] shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
											Corporate
										</button>
									</Link>
								</div>
							</div>
						</div>
						<div className="lg:w-1/2 mt-6 lg:mt-0">
							<div className="rounded-lg p-2">
								<img
									className="aspect-[3/2] w-full rounded-lg object-left object-contain lg:aspect-auto lg:h-[400px]"
									src="https://images.unsplash.com/photo-1589561253898-768105ca91a8?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
									alt=""
								/>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Section4;
