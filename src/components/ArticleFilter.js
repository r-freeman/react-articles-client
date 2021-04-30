import React, {useEffect, useState} from 'react';
import {Transition} from '@headlessui/react';
import useScrollBlock from '../hooks/useScrollBlock';

import {CategoryList} from '../components';

function ArticleFilter() {
    const [open, setOpen] = useState(false);
    const [blockScroll, allowScroll] = useScrollBlock();

    const toggleArticleFilter = () => setOpen(!open);

    useEffect(() => {
        if (!open) {
            allowScroll();
        } else {
            blockScroll();
        }
    }, [open]);

    return (
        <React.Fragment>
            <Transition
                show={open}
                className="fixed inset-0 z-10 overflow-hidden"
                aria-labelledby="slide-over-title"
                role="dialog"
                aria-modal="true">
                <Transition.Child
                    show={open}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0">
                    <div className="absolute inset-0 bg-gray-700 bg-opacity-75 transition-opacity"
                         aria-hidden="true"
                         onClick={() => setOpen(false)}/>
                </Transition.Child>
                <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
                    <Transition.Child
                        show={open}
                        enter="transform transition ease-in-out duration-500 sm:duration-700"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transform transition ease-in-out duration-500 sm:duration-700"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full">
                        <div className="relative w-screen max-w-md">
                            <Transition.Child
                                show={open}
                                enter="ease-in-out duration-500"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in-out duration-500"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0">
                                <div
                                    className="absolute top-0 left-0 -ml-8 pt-4 pr-2 flex sm:-ml-10 sm:pr-4">
                                    <button
                                        className="rounded-md text-gray-300 hover:text-white focus:outline-none"
                                        onClick={() => setOpen(false)}>
                                        <span className="sr-only">Close panel</span>
                                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none"
                                             viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                                  d="M6 18L18 6M6 6l12 12"/>
                                        </svg>
                                    </button>
                                </div>
                                <div
                                    className="h-full flex flex-col py-6 bg-white overflow-y-auto shadow-xl h-screen">
                                    <div className="px-4 sm:px-6">
                                        <h2 className="text-lg font-medium text-gray-900" id="slide-over-title">
                                            Filter articles
                                        </h2>
                                    </div>
                                    <div className="mt-6 relative flex-1 px-4 sm:px-6">
                                        <div className="absolute inset-0 px-4 sm:px-6">
                                            <div className="flex flex-col justify-between h-full"
                                                 aria-hidden="true">
                                                <CategoryList/>
                                                <div className="flex justify-end">
                                                    <button
                                                        className="inline-flex items-center px-3 md:px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                                    >
                                                        <span className="block">
                                                            Apply filter
                                                        </span>
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Transition.Child>
                        </div>
                    </Transition.Child>
                </div>
            </Transition>
            <div className="flex justify-start space-x-4 mt-8">
                <button
                    className="inline-flex items-center px-3 md:px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={toggleArticleFilter}
                >
                    <svg className="-ml-0.5 md:mr-2 w-5 h-5" fill="none" stroke="currentColor"
                         viewBox="0 0 24 24"
                         xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"/>
                    </svg>
                    <span className="hidden md:block">
                    Filter articles
                </span>
                </button>
            </div>
        </React.Fragment>
    )
}

export default ArticleFilter;