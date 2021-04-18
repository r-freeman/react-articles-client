import React, {useState} from 'react';
import {NavLink, useRouteMatch} from 'react-router-dom';
import {Transition} from '@headlessui/react';

function Nav() {
    const [userMenu, setUserMenu] = useState(false);
    const [navMenu, setNavMenu] = useState(false);
    let match = useRouteMatch();

    const toggleNavMenu = () => setNavMenu(!navMenu);
    const toggleUserMenu = () => setUserMenu(!userMenu);
    const isCurrentPath = (path) => match.path.includes(path);

    return (
        <nav className="bg-gray-800">
            <div className="max-w-full mx-auto px-8">
                <div className="relative flex items-center justify-between h-16">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button type="button"
                                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu" aria-expanded="false"
                                onClick={toggleNavMenu}>
                            <span className="sr-only">Open main menu</span>
                            <svg className={`${navMenu ? 'hidden' : 'block'} h-6 w-6`} fill="none"
                                 stroke="currentColor" viewBox="0 0 24 24"
                                 xmlns="http://www.w3.org/2000/svg">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M4 6h16M4 12h8m-8 6h16"/>
                            </svg>
                            <svg className={`${navMenu ? 'block' : 'hidden'} h-6 w-6`}
                                 xmlns="http://www.w3.org/2000/svg" fill="none"
                                 viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                      d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                        </button>
                    </div>
                    <div className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <div className="flex-shrink-0 flex items-center text-indigo-500">
                            <NavLink to="/">
                                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"
                                     xmlns="http://www.w3.org/2000/svg">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/>
                                </svg>
                            </NavLink>
                        </div>
                        <div className="hidden sm:block sm:ml-6">
                            <div className="flex space-x-4">
                                <NavLink to="/articles"
                                         className={`${isCurrentPath('/articles') ? 'bg-gray-900 text-white' : ''} text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium`}
                                         aria-current="page">Articles</NavLink>
                            </div>
                        </div>
                    </div>
                    <div
                        className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="ml-3 relative">
                            <div>
                                <button type="button"
                                        className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white"
                                        id="user-menu-button" aria-expanded="false" aria-haspopup="true"
                                        onClick={toggleUserMenu}
                                        onBlur={() => setUserMenu(false)}
                                >
                                    <span className="sr-only">Open user menu</span>
                                    <img className="h-8 w-8 rounded-full"
                                         src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                         alt=""/>
                                </button>
                            </div>
                            <Transition
                                show={userMenu}
                                enter="transition ease-out duration-100"
                                enterFrom="transform opacity-0 scale-95"
                                enterTo="transform opacity-100 scale-100"
                                leave="transition ease-in duration-75"
                                leaveFrom="transform opacity-100 scale-100"
                                leaveTo="transform opacity-0 scale-95">
                                <div
                                    className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                                    role="menu" aria-orientation="vertical" aria-labelledby="user-menu-button"
                                    tabIndex="-1">
                                    <NavLink to="/"
                                             className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                             role="menuitem"
                                             tabIndex="-1" id="user-menu-item-0">Profile</NavLink>
                                    <NavLink to="/"
                                             className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                             role="menuitem"
                                             tabIndex="-1" id="user-menu-item-1">Settings</NavLink>
                                    <NavLink to="/"
                                             className="hover:bg-gray-100 block px-4 py-2 text-sm text-gray-700"
                                             role="menuitem"
                                             tabIndex="-1" id="user-menu-item-2">Log out</NavLink>
                                </div>
                            </Transition>
                        </div>
                    </div>
                </div>
            </div>
            <div className={`${!navMenu ? 'hidden' : 'sm:hidden'}`} id="mobile-menu">
                <div className="px-8 pt-2 pb-3 space-y-1">
                    <NavLink to="/articles"
                             className={`${isCurrentPath('articles') ? 'bg-gray-900 text-white' : 'text-gray-300 hover:text-white'} block px-3 py-2 rounded-md hover:bg-gray-700 text-base font-medium`}
                             aria-current="page">Articles</NavLink>
                </div>
            </div>
        </nav>
    )
}

export default Nav;