import { Menu, MenuButton, MenuItem, MenuItems, Transition, MenuSeparator } from '@headlessui/react'
import useUserInfo from '../../stores/useUserInfo'
import LogOut from './LogOut'
import clsx from "clsx"
import UserIcon from '../../icons/user'
import { Link } from 'react-router-dom'

import prof0 from "/pfps/prof_default.png";
import prof1 from "/pfps/prof_0.png";
import prof2 from "/pfps/prof_1.png";
import prof3 from "/pfps/prof_2.png";
import prof4 from "/pfps/prof_3.png";
import prof5 from "/pfps/prof_4.png";
import prof6 from "/pfps/prof_5.png";
import prof7 from "/pfps/prof_6.png";
import prof8 from "/pfps/prof_7.png";
import prof9 from "/pfps/prof_8.png";

const DropDown = () => {


    const getUserPfp = () => {
      
      const imagesToChoose = [prof0, prof1, prof2, prof3, prof4, prof5, prof6, prof7, prof8, prof9];
      const { pfp } = useUserInfo((state) => state.userInfo);

      return (
        <img
          src={imagesToChoose[pfp]}
          alt="Avatar image"
          className="sad-w-16 sad-h-16 sad-rounded-full sad-object-cover"
        />
      )

    }


    const userInfo = useUserInfo((state) => state.userInfo)

    return (
        <Menu as="div" className="sad-relative sad-inline-block sad-text-left">
          <div>
            <MenuButton className="sad-text-navIcon sad-duration-200 sad-ease-out hover:sad-text-navIconHover sad-inline-flex sad-w-full sad-justify-center sad-gap-x-1.5 sad-px-3 sad-text-2xl sad-font-semibolda">
              {getUserPfp()}
              {/* <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" /> */}
            </MenuButton>
          </div>
    
          <Transition
            enter="sad-transition sad-ease-out sad-duration-100"
            enterFrom="sad-transform sad-opacity-0 sad-scale-95"
            enterTo="sad-transform sad-opacity-100 sad-scale-100"
            leave="sad-transition sad-ease-in sad-duration-75"
            leaveFrom="sad-transform sad-opacity-100 sad-scale-100"
            leaveTo="sad-transform sad-opacity-0 sad-scale-95"
          >
            <MenuItems className="sad-absolute sad-top-0 sad-left-20 sad-z-10 sad-w-64 sad-origin-top-right sad-rounded-xl sad-bg-secbg sad-shadow-lg sad-shadow-black focus:sad-outline-none">
            <div className="sad-py-1">
                <MenuItem>
                    <p className='sad-block sad-px-4 sad-py-2 sad-text-lg'>Logged as: 
                        <span className='sad-font-bold'> { userInfo.username } </span>
                    </p>
                </MenuItem>
                <MenuSeparator className="sad-my-1 sad-h-px sad-bg-text sad-w-4/5 sad-ml-4" />
                <MenuItem>
                  {({ focus }) => (
                    <Link
                      to="/user"
                      className={clsx(
                        focus ? 'sad-bg-bg sad-text-gray-200' : 'sad-text-navIcon',
                        'sad-block sad-px-4 sad-py-2 sad-text-lg sad-duration-200 sad-ease-out hover:sad-text-navIconHover'
                      )}
                    >
                      Account settings
                    </Link>
                  )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                    <div
                        className={clsx(
                        focus ? 'sad-bg-bg sad-text-gray-200' : 'sad-text-navIcon',
                        'sad-block sad-px-4 sad-py-2 sad-text-lg sad-duration-200 sad-ease-out hover:sad-text-navIconHover'
                        )}
                    >
                        <LogOut />
                    </div>
                    )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      )
}
 
export default DropDown;