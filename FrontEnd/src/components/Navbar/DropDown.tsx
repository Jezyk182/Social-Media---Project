import { Menu, MenuButton, MenuItem, MenuItems, Transition, MenuSeparator } from '@headlessui/react'
import useUserInfo from '../../stores/useUserInfo'
import LogOut from './LogOut'
import clsx from "clsx"

const DropDown = () => {

    const userInfo = useUserInfo((state) => state.userInfo)

    return (
        <Menu as="div" className="sad-relative sad-inline-block sad-text-left">
          <div>
            <MenuButton className="sad-mx-5 sad-duration-200 sad-ease-out hover:sad-text-textAcc sad-inline-flex sad-w-full sad-justify-center sad-gap-x-1.5 sad-px-3 sad-text-2xl sad-font-semibolda">
              My Account
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
            <MenuItems className="sad-absolute sad-right-0 sad-z-10 sad-mt-2 sad-w-64 sad-origin-top-right sad-rounded-3xl sad-bg-slate-600 sad-shadow-lg sad-ring-1 sad-ring-black sad-ring-opacity-5 focus:sad-outline-none sad-border-text sad-border">
            <div className="sad-py-1">
                <MenuItem>
                    <p className='sad-block sad-px-4 sad-py-2 sad-text-lg'>Logged as: 
                        <span className='sad-font-bold'> { userInfo.username } </span>
                    </p>
                </MenuItem>
                <MenuSeparator className="sad-my-1 sad-h-px sad-bg-text sad-w-4/5 sad-ml-4" />
                <MenuItem>
                  {({ focus }) => (
                    <a
                      href="#"
                      className={clsx(
                        focus ? 'sad-bg-slate-800 sad-text-gray-200' : 'sad-text-gray-100',
                        'sad-block sad-px-4 sad-py-2 sad-text-lg sad-duration-200 sad-ease-out hover:sad-text-textAcc'
                      )}
                    >
                      Account settings
                    </a>
                  )}
                </MenuItem>
                <MenuItem>
                    {({ focus }) => (
                    <a
                        href="#"
                        className={clsx(
                        focus ? 'sad-bg-slate-800 sad-text-gray-200' : 'sad-text-gray-100',
                        'sad-block sad-px-4 sad-py-2 sad-text-lg sad-duration-200 sad-ease-out hover:sad-text-textAcc'
                        )}
                    >
                        <LogOut />
                    </a>
                    )}
                </MenuItem>
              </div>
            </MenuItems>
          </Transition>
        </Menu>
      )
}
 
export default DropDown;