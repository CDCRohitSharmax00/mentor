import { useEffect, useState } from "react";
import { getData } from "../Reducers/mentorSlice";
import { useDispatch, useSelector } from "react-redux";
import { findMentorsNav } from "../Constants/data";
import {
  Search,
  GalleryVerticalEnd,
  Laptop,
  ActivitySquare,
  Dumbbell,
  Briefcase,
  Linkedin,
  X,
  Instagram,
} from "lucide-react";

const Mentors = () => {
  const [category, setCategory] = useState("all");
  const [showFilteredArr, setShowFilteredArr] = useState(false);
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();
  const data = useSelector((state) => state.mentor);

  useEffect(() => {
    dispatch(getData());
   
  }, []);

  const filteredMentors = data.mentors?.filter((mentor) => {
    if (category === "all") {
      return mentor;
    }
    return mentor.category === category;
  });

  const searchedFilter = data.mentors?.filter((item) => {
    const companies = (item.company || "").toLowerCase();
    // Now, companies will be an empty string if item.company is undefined or null

    return companies.includes(search.toLowerCase());
  });

  // rest of your component


  const getCategoryIcon = (category, isActive = false) => {
    switch (category) {
      case "all":
        return (
          <GalleryVerticalEnd
            className={`${
              isActive ? "bg-gray-400 bg-opacity-25 " : ""
            } group-hover:bg-gray-300 hover:bg-opacity-30 p-[0.2rem] rounded-md mx-auto h-7 w-7`}
          />
        );
      case "technology":
        return (
          <Laptop
            className={`${
              isActive ? "bg-gray-400 bg-opacity-25" : ""
            } group-hover:bg-gray-300 hover:bg-opacity-30 p-[0.2rem] rounded-md mx-auto h-7 w-7`}
          />
        );
      case "spirituality":
        return (
          <ActivitySquare
            className={`${
              isActive ? "bg-gray-400 bg-opacity-25" : ""
            } group-hover:bg-gray-300 hover:bg-opacity-30 p-[0.2rem] rounded-md mx-auto h-7 w-7`}
          />
        );
      case "Health and Fitness":
        return (
          <Dumbbell
            className={`${
              isActive ? "bg-gray-400 bg-opacity-25" : ""
            } group-hover:bg-gray-300 hover:bg-opacity-30 p-[0.2rem] rounded-md mx-auto h-7 w-7`}
          />
        );
      case "Business":
        return (
          <Briefcase
            className={`${
              isActive ? "bg-gray-400 bg-opacity-25" : ""
            } group-hover:bg-gray-300 hover:bg-opacity-30 p-[0.2rem] rounded-md mx-auto h-7 w-7`}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="m-8">
      <div>
        <div className="flex lg:flex-row flex-col gap-4 max-w-[1200px] mx-auto justify-center items-center overflow-hidden">
          <div className="flex justify-between h-full items-center relative w-full lg:w-[55%] min-w-fit border rounded-xl border-gray-600">
            <input
              className=" w-full rounded-xl p-2 relative focus:outline-none"
              placeholder="Search For Top Companies..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyUp={() => setShowFilteredArr(!showFilteredArr)}
            />
            <div className=" h-full flex flex-col justify-center mr-2 cursor-pointer">
              <Search className="hover:scale-95 transition-transform duration-200" />
            </div>
          </div>

          <div className=" flex justify-center flex-wrap gap-2">
            {findMentorsNav.map((nav, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    category === nav.category ? "active" : null
                  } rounded-xl px-3 py-1 pt-2 group transition-all duration-200`}
                  onClick={() => setCategory(nav.category)}
                >
                  {getCategoryIcon(nav.category, category === nav.category)}
                  {nav.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>
      <hr className=" mt-4 text-gray-400 w-full" />
      <div className="mt-10 max-w-[1200px] mx-auto">
        {(showFilteredArr ? searchedFilter : filteredMentors)?.map(
          (mentor, index) => (
            <div key={index} className="flex flex-col items-center gap-5 mb-10">
              {/* mentors cards */}
              <div className="relative flex w-full items-start gap-6 divide-[#e4e7ec] overflow-hidden rounded-xl border border-[#e4e7ec] bg-white lg:divide-x-[1px] lg:p-7 ">
                <div className="flex w-full flex-col overflow-hidden">
                  <div className="flex flex-col items-start gap-2 p-5 lg:gap-6 lg:p-0">
                    <div className="flex flex-col items-start gap-5 self-stretch lg:gap-6">
                      <a
                        target="_blank"
                        className="relative flex w-full flex-col gap-4 lg:flex-row lg:items-center lg:gap-6 hover:text-black"
                        href="#"
                      >
                        <div className="flex w-full flex-col gap-[16px] lg:flex-row lg:gap-6">
                          <div className="flex flex-col lg:items-center">
                            <div className="flex gap-[16px]">
                              <img
                                alt="Mentor Name"
                                referrerPolicy="no-referrer"
                                loading="lazy"
                                width="168"
                                height="168"
                                decoding="async"
                                data-nimg="1"
                                className="z-0 h-20 w-20 rounded-lg object-cover lg:h-[168px] lg:min-h-[168px] lg:w-[168px] lg:min-w-[168px]"
                                srcSet={mentor.profilePhoto}
                                style={{ color: "transparent" }}
                              />
                            </div>

                            <div className=" flex justify-start my-2">
                              {mentor.socialLinks?.map((socialLink, index) => {
                                return (
                                  <div key={index} className=" inline-block ">
                                    {index === 0 ? (
                                      <Linkedin
                                        className="h-5 w-5 inline-block  hover:scale-110 transition-transform duration-300 text-blue-600 font-bold"
                                        onClick={() => window.open(socialLink)}
                                      />
                                    ) : null}
                                    {index === 1 ? (
                                      <X
                                        className="h-5 w-5 inline-block mx-2  hover:scale-110 transition-transform duration-300 text-black-900"
                                        onClick={() => window.open(socialLink)}
                                      />
                                    ) : null}
                                    {index === 2 ? (
                                      <Instagram
                                        className="h-5 w-5 inline-block  hover:scale-110 transition-transform duration-300 text-pink-600"
                                        onClick={() => window.open(socialLink)}
                                      />
                                    ) : null}
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                          <div className="flex w-full flex-col gap-3">
                            <div className="relative flex flex-col items-start gap-1 lg:py-1">
                              <div className=" w-full flex-col gap-2 lg:flex">
                                <div className="flex w-full justify-between gap-3">
                                  <h2 className="line-clamp-1 text-xl font-semibold leading-7 text-[#101828] lg:text-2xl lg:font-bold lg:leading-8">
                                    {mentor.name}
                                  </h2>
                                </div>
                                <div className="flex flex-col self-stretch lg:flex-row lg:items-center lg:gap-2">
                                  <p className="whitespace-nowrap text-sm  text-[#101828] lg:text-base lg:leading-6">
                                    {mentor.designation}
                                  </p>
                                </div>
                              </div>

                              <div className="flex flex-shrink-0 flex-wrap items-center self-stretch text-xs text-[#1570ef] lg:text-sm">
                                <span className="">
                                  {mentor.experience} yrs of Exp
                                </span>
                              </div>
                            </div>
                            <p className="line-clamp-3 w-full text-xs leading-[22px] text-black lg:min-h-[44px] lg:text-sm">
                              {mentor.description.slice(0, 200)}
                              <button
                                type="button"
                                className="text-[16px] leading-[22px] text-blue-600 ml-2"
                              >
                                Read More
                              </button>
                            </p>
                          </div>
                        </div>
                      </a>
                      <div className="w-full lg:hidden">
                        <div className="flex w-full flex-wrap gap-3  items-center justify-center self-stretch border-b-[0.8px] border-t-[0.8px] border-[#e4e7ec] py-3 xxs:justify-between lg:flex-col  lg:gap-3 lg:border-none lg:py-0">
                          <div className="flex items-center gap-1 lg:gap-2">
                            <span className="scale-90 lg:scale-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                              >
                                <path
                                  d="M6.984 7.378c.58 1.208 1.37 2.34 2.372 3.341a12.169 12.169 0 0 0 3.341 2.372c.104.05.156.075.222.094.233.068.52.02.718-.122.056-.04.103-.088.199-.183.29-.291.437-.437.583-.532a1.667 1.667 0 0 1 1.817 0c.146.095.292.24.584.532l.162.162c.443.443.664.665.785.903.239.473.239 1.031 0 1.504-.12.238-.342.46-.785.902l-.131.132c-.442.44-.662.662-.962.83-.333.187-.85.322-1.232.32-.344 0-.58-.067-1.05-.2a15.866 15.866 0 0 1-6.903-4.062 15.866 15.866 0 0 1-4.061-6.903c-.134-.47-.2-.706-.202-1.05a2.814 2.814 0 0 1 .32-1.232c.17-.3.39-.52.831-.962l.132-.131c.443-.443.664-.664.902-.785a1.667 1.667 0 0 1 1.504 0c.238.12.46.342.902.785l.163.162c.291.292.437.437.532.584.36.552.36 1.264 0 1.817-.095.146-.24.292-.532.583a1.682 1.682 0 0 0-.183.199.872.872 0 0 0-.122.718c.019.066.044.118.094.222Z"
                                  stroke="#475467"
                                  
                                ></path>
                              </svg>
                            </span>
                            <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                              2x Sessions Per Week
                            </p>
                          </div>
                          <span className=" h-5 w-[1.5px] bg-[#e4e7ec] block lg:hidden"></span>
                          <div className=" items-center gap-1 flex xxs:pl-2  xs:pl-0 lg:gap-2">
                            <span className="scale-90 lg:scale-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                              >
                                <path
                                  d="m6.25 10 2.5 2.5 5-5m-7.25 10h7c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C15.6 2.5 14.9 2.5 13.5 2.5h-7c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5Z"
                                  stroke="#475467"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                              Task Assignment &amp; Resources
                            </p>
                          </div>
                          <span className=" h-5 w-[1.5px] bg-[#e4e7ec] block lg:hidden"></span>
                          <div className=" items-center gap-1 flex lg:gap-2">
                            <span className="scale-90 lg:scale-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="20"
                                height="20"
                                fill="none"
                              >
                                <path
                                  d="M6.25 8.75h.008m3.742 0h.008m3.742 0h.008M5.833 15v1.946c0 .444 0 .666.091.78.08.1.2.157.326.157.146 0 .32-.139.666-.416l1.988-1.59c.406-.325.61-.488.836-.603a2.5 2.5 0 0 1 .634-.223c.25-.051.51-.051 1.03-.051H13.5c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C17.5 13.1 17.5 12.4 17.5 11V6.5c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C15.6 2.5 14.9 2.5 13.5 2.5h-7c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v5.167c0 .775 0 1.162.085 1.48a2.5 2.5 0 0 0 1.768 1.768c.318.085.705.085 1.48.085Zm.834-6.25a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Zm3.75 0a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Zm3.75 0a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Z"
                                  stroke="#475467"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                              Unlimited Chat with Mentor
                            </p>
                          </div>
                          <span className=" h-5 w-[1.5px] bg-[#e4e7ec] block lg:hidden"></span>
                          <div className="items-center gap-1 flex lg:gap-2">
                            <span className="scale-90 lg:scale-100">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                              >
                                <path
                                  d="M6 15.75V5.25c0-.697 0-1.046.077-1.332a2.25 2.25 0 0 1 1.59-1.591C7.955 2.25 8.304 2.25 9 2.25s1.046 0 1.332.077a2.25 2.25 0 0 1 1.591 1.59C12 4.205 12 4.554 12 5.25v10.5m-8.1 0h10.2c.84 0 1.26 0 1.581-.164a1.5 1.5 0 0 0 .656-.655c.163-.32.163-.74.163-1.581v-5.7c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656c-.32-.163-.74-.163-1.581-.163H3.9c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656c-.163.32-.163.74-.163 1.581v5.7c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164Z"
                                  stroke="#667085"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                              Job Referrals in Top Companies
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* skills section */}
                      <a
                        target="_blank"
                        className="flex max-h-[72px] flex-wrap items-start gap-2 self-stretch overflow-hidden lg:max-h-[40px] lg:min-h-[40px] lg:gap-3"
                        href="#"
                      >
                        {mentor.skills.map((skills, index) => (
                          <div
                            key={index}
                            className="flex items-start gap-2 rounded-md border border-[#e4e7ec] bg-white px-2 pb-[6px] pt-[6px]"
                          >
                            <div className="flex items-center gap-[6px] whitespace-nowrap">
                              <p className="text-xs font-medium leading-[18px] text-[#212121]">
                                {skills}
                              </p>
                            </div>
                          </div>
                        ))}
                      </a>
                    </div>

                    {/* for and target domains */}

                    <div className=" w-full block mt-2">
                      <a
                        target="_blank"
                        className="flex w-full items-start self-stretch bg-[#F5FBFF] p-2 lg:bg-white lg:p-0"
                        href="#"
                      >
                        <div className="flex flex-col items-start lg:flex-row lg:items-start gap-2 lg:gap-5 p-2">
                          <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                            <span className="hidden lg:inline">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="18"
                                fill="none"
                              >
                                <path
                                  d="M6 15.75V5.25c0-.697 0-1.046.077-1.332a2.25 2.25 0 0 1 1.59-1.591C7.955 2.25 8.304 2.25 9 2.25s1.046 0 1.332.077a2.25 2.25 0 0 1 1.591 1.59C12 4.205 12 4.554 12 5.25v10.5m-8.1 0h10.2c.84 0 1.26 0 1.581-.164a1.5 1.5 0 0 0 .656-.655c.163-.32.163-.74.163-1.581v-5.7c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656c-.32-.163-.74-.163-1.581-.163H3.9c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656c-.163.32-.163.74-.163 1.581v5.7c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164Z"
                                  stroke="#667085"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <div className="flex items-start gap-2">
                              <p className="text-xs font-semibold leading-[18px] text-[#1d2939]">
                                For:
                              </p>
                              <div className="flex divide-x-[1.4px] divide-[#787979]  text-center text-xs font-normal leading-[18px]">
                                {mentor.for.map((person, index) => (
                                  <p
                                    key={index}
                                    className="px-1 text-xs  leading-[18px]"
                                  >
                                    {person}
                                  </p>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex flex-shrink-0 flex-wrap items-center gap-2">
                            <span className="hidden lg:inline">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="18"
                                height="19"
                                fill="none"
                              >
                                <path
                                  d="M12 6.5V4.25L14.25 2 15 3.5l1.5.75-2.25 2.25H12Zm0 0-3 3m7.5 0A7.5 7.5 0 1 1 9 2m3.75 7.5A3.75 3.75 0 1 1 9 5.75"
                                  stroke="#475467"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                ></path>
                              </svg>
                            </span>
                            <div className="line-clamp-1 flex max-h-[18px] items-start overflow-hidden lg:gap-2">
                              <p className="whitespace-nowrap  text-xs font-semibold leading-[18px] text-[#1d2939]">
                                Targeting Domains:
                              </p>
                              <div className="line-clamp-1 flex flex-wrap items-center divide-x-[1.4px]  divide-[#787979]  pl-1 text-xs font-normal leading-[18px]">
                                {mentor.targetAudience.map((domain, index) => (
                                  <p
                                    key={index}
                                    className="line-clamp-1  px-1 text-xs leading-[18px] lg:px-1"
                                  >
                                    <span>{domain}</span>
                                  </p>
                                ))}
                                <button
                                  type="button"
                                  className="cursor-pointer px-1 text-xs font-medium leading-[20px] text-[#2563eb] underline"
                                >
                                  More
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="hidden h-full lg:block lg:pl-7">
                  <div className="flex min-h-[320px] min-w-[246px] flex-col lg:w-[246px]">
                    <div className="flex w-full  items-start justify-center self-stretch border-b-[0.8px] border-t-[0.8px] border-[#e4e7ec] py-3 xxs:justify-between lg:flex-col  lg:gap-3 lg:border-none lg:py-0">
                      <div className="flex items-center gap-1 lg:gap-2">
                        <span className="scale-90 lg:scale-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                          >
                            <path
                              d="M6.984 7.378c.58 1.208 1.37 2.34 2.372 3.341a12.169 12.169 0 0 0 3.341 2.372c.104.05.156.075.222.094.233.068.52.02.718-.122.056-.04.103-.088.199-.183.29-.291.437-.437.583-.532a1.667 1.667 0 0 1 1.817 0c.146.095.292.24.584.532l.162.162c.443.443.664.665.785.903.239.473.239 1.031 0 1.504-.12.238-.342.46-.785.902l-.131.132c-.442.44-.662.662-.962.83-.333.187-.85.322-1.232.32-.344 0-.58-.067-1.05-.2a15.866 15.866 0 0 1-6.903-4.062 15.866 15.866 0 0 1-4.061-6.903c-.134-.47-.2-.706-.202-1.05a2.814 2.814 0 0 1 .32-1.232c.17-.3.39-.52.831-.962l.132-.131c.443-.443.664-.664.902-.785a1.667 1.667 0 0 1 1.504 0c.238.12.46.342.902.785l.163.162c.291.292.437.437.532.584.36.552.36 1.264 0 1.817-.095.146-.24.292-.532.583a1.682 1.682 0 0 0-.183.199.872.872 0 0 0-.122.718c.019.066.044.118.094.222Z"
                              stroke="#475467"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                          2x Sessions Per Week
                        </p>
                      </div>
                      <span className="hidden h-5 w-[1.5px] bg-[#e4e7ec] xs:block lg:hidden"></span>
                      <div className="hidden items-center gap-1 xxs:flex xxs:pl-2  xs:pl-0 lg:gap-2">
                        <span className="scale-90 lg:scale-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                          >
                            <path
                              d="m6.25 10 2.5 2.5 5-5m-7.25 10h7c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092c.273-.535.273-1.235.273-2.635v-7c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C15.6 2.5 14.9 2.5 13.5 2.5h-7c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v7c0 1.4 0 2.1.272 2.635a2.5 2.5 0 0 0 1.093 1.092C4.4 17.5 5.1 17.5 6.5 17.5Z"
                              stroke="#475467"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                          Task Assignment &amp; Resources
                        </p>
                      </div>
                      <span className="hidden h-5 w-[1.5px] bg-[#e4e7ec] sm:block lg:hidden"></span>
                      <div className="hidden items-center gap-1 sm:flex lg:gap-2">
                        <span className="scale-90 lg:scale-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            fill="none"
                          >
                            <path
                              d="M6.25 8.75h.008m3.742 0h.008m3.742 0h.008M5.833 15v1.946c0 .444 0 .666.091.78.08.1.2.157.326.157.146 0 .32-.139.666-.416l1.988-1.59c.406-.325.61-.488.836-.603a2.5 2.5 0 0 1 .634-.223c.25-.051.51-.051 1.03-.051H13.5c1.4 0 2.1 0 2.635-.273a2.5 2.5 0 0 0 1.092-1.092C17.5 13.1 17.5 12.4 17.5 11V6.5c0-1.4 0-2.1-.273-2.635a2.5 2.5 0 0 0-1.092-1.093C15.6 2.5 14.9 2.5 13.5 2.5h-7c-1.4 0-2.1 0-2.635.272a2.5 2.5 0 0 0-1.093 1.093C2.5 4.4 2.5 5.1 2.5 6.5v5.167c0 .775 0 1.162.085 1.48a2.5 2.5 0 0 0 1.768 1.768c.318.085.705.085 1.48.085Zm.834-6.25a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Zm3.75 0a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Zm3.75 0a.417.417 0 1 1-.834 0 .417.417 0 0 1 .834 0Z"
                              stroke="#475467"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                          Unlimited Chat with Mentor
                        </p>
                      </div>
                      <span className="hidden h-5 w-[1.5px] bg-[#e4e7ec] md:block lg:hidden"></span>
                      <div className="hidden items-center gap-1 md:flex lg:gap-2">
                        <span className="scale-90 lg:scale-100">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="18"
                            height="18"
                            fill="none"
                          >
                            <path
                              d="M6 15.75V5.25c0-.697 0-1.046.077-1.332a2.25 2.25 0 0 1 1.59-1.591C7.955 2.25 8.304 2.25 9 2.25s1.046 0 1.332.077a2.25 2.25 0 0 1 1.591 1.59C12 4.205 12 4.554 12 5.25v10.5m-8.1 0h10.2c.84 0 1.26 0 1.581-.164a1.5 1.5 0 0 0 .656-.655c.163-.32.163-.74.163-1.581v-5.7c0-.84 0-1.26-.163-1.581a1.5 1.5 0 0 0-.656-.656c-.32-.163-.74-.163-1.581-.163H3.9c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656c-.163.32-.163.74-.163 1.581v5.7c0 .84 0 1.26.163 1.581a1.5 1.5 0 0 0 .656.655c.32.164.74.164 1.581.164Z"
                              stroke="#667085"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            ></path>
                          </svg>
                        </span>
                        <p className="whitespace-nowrap text-[10px] font-medium leading-[18px] text-[#344054] lg:text-[12px] lg:leading-5">
                          Job Referrals in Top Companies
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Mentors;
