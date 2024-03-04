import { MdLogout } from "react-icons/md";
import { auth } from "@/firebase/initialApp";
import useAuth from "@/hooks/useAuth";

interface UserDropdownProps {
  isOpen: boolean;
}

function UserDropdown({ isOpen }: UserDropdownProps) {
  const { user } = useAuth();

  const onLogout = () => {
    auth.signOut().then(() => {
      localStorage.removeItem("@user");
    });
  };
  return (
    <div
      className={`${!isOpen && "hidden"} absolute right-0 top-0 translate-y-14 border border-stroke bg-graydark text-white shadow-4`}
    >
      <div className="flex items-center justify-between border-b border-white p-4">
        <p className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-black">
          {user?.name &&
            user.name
              .replace(/\b(\w)\w*\s*/g, (_: string, firstChar: string) =>
                firstChar.toUpperCase(),
              )
              .slice(0, 2)}
        </p>
        <div className="ml-6 text-xs">
          <p>{user?.name}</p>
          <p>{user?.email}</p>
        </div>
      </div>
      <div className="p-4">
        <button
          className="flex w-full items-center gap-2 hover:text-teal-400"
          type="button"
          onClick={onLogout}
        >
          <MdLogout className="text-xl" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default UserDropdown;
