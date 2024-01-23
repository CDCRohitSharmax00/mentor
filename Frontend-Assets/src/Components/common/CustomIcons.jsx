import * as Icons from "react-icons/fa";
export const CustomIcons = ({Icon}) => {
  const Iconii = Icons[Icon];
  console.log("here is Icon,",Icon)
  return (
    <Iconii className=" inline-block py-1 px-[0.01rem] h-6 w-6" />
  )
}
