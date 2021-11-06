import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from 'assets/images/dev.jpeg'

const Footer = () => {
    const [mode, setMode] = useState("auto");

    return (
        <div className="pt-12 sticky">
            <footer id="footer" className="relative z-50 dark:bg-gray-900 bg-gray-100">
                <div className=" border-t-2 border-b-2 border-gray-300 dark:border-gray-700 py-16">
                    <div className="mx-auto container px-4 xl:px-12 2xl:px-4">
                        <div className="lg:flex">
                            <div className="w-full lg:w-1/2 mb-16 lg:mb-0 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50" >Components</p>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Templates</p>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Pricing</p>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">FAQ</p>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">
                                                Documentation
                                            </p>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Free components</p>
                                            </Link>
                                        </li>

                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Blog</p>
                                            </Link>
                                        </li>
                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Changelog</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="w-full lg:w-1/2 flex">
                                <div className="w-full lg:w-1/2 px-6">
                                    <ul>
                                        <li>
                                            <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">
                                                Privacy policy
                                            </p>
                                        </li>
                                        <li className="mt-6">
                                            <Link to='/'>
                                                <p className="text-xs lg:text-sm leading-none hover:text-brand dark:hover:text-brand text-gray-800 dark:text-gray-50">Terms of service</p>
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                                <div className="w-full lg:w-1/2 px-6 flex flex-col justify-between">
                                    <div className="flex items-center mb-6">
                                        <div className="text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand ">
                                            <svg className="footer-icon feather feather-github" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                                            </svg>
                                        </div>
                                        <div className="pl-4">
                                            <svg className="footer-icon feather feather-twitter text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand " xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
                                            </svg>
                                        </div>
                                        <div className="pl-4">
                                            <svg className="footer-icon feather feather-twitter text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand " xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path strokeWidth="1.8" d="m5.839218,4.101561c0,1.211972 -0.974141,2.194011 -2.176459,2.194011s-2.176459,-0.982039 -2.176459,-2.194011c0,-1.211094 0.974141,-2.194011 2.176459,-2.194011s2.176459,0.982917 2.176459,2.194011zm0.017552,3.94922l-4.388022,0l0,14.04167l4.388022,0l0,-14.04167zm7.005038,0l-4.359939,0l0,14.04167l4.360816,0l0,-7.370999c0,-4.098413 5.291077,-4.433657 5.291077,0l0,7.370999l4.377491,0l0,-8.89101c0,-6.915523 -7.829986,-6.66365 -9.669445,-3.259423l0,-1.891237z" />
                                            </svg>
                                        </div>
                                        <div className="pl-4">
                                            <svg className="footer-icon feather feather-twitter text-gray-800 dark:text-gray-50 cursor-pointer hover:text-brand dark:hover:text-brand " xmlns="http://www.w3.org/2000/svg" width={24} height={24} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                                                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="relative w-36">
                                        {mode === "auto" && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-device-laptop" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <line x1={3} y1={19} x2={21} y2={19} />
                                                <rect x={5} y={6} width={14} height={10} rx={1} />
                                            </svg>
                                        )}
                                        {mode === "light" && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-brightness-up" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <circle cx={12} cy={12} r={3} />
                                                <line x1={12} y1={5} x2={12} y2={3} />
                                                <line x1={17} y1={7} x2="18.4" y2="5.6" />
                                                <line x1={19} y1={12} x2={21} y2={12} />
                                                <line x1={17} y1={17} x2="18.4" y2="18.4" />
                                                <line x1={12} y1={19} x2={12} y2={21} />
                                                <line x1={7} y1={17} x2="5.6" y2="18.4" />
                                                <line x1={6} y1={12} x2={4} y2={12} />
                                                <line x1={7} y1={7} x2="5.6" y2="5.6" />
                                            </svg>
                                        )}
                                        {mode === "dark" && (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="absolute inset-0 m-auto ml-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-moon" width={20} height={20} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z" />
                                            </svg>
                                        )}
                                        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 m-auto mr-3 text-gray-700 dark:text-gray-50 icon icon-tabler icon-tabler-chevron-down" width={16} height={16} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                            <polyline points="6 9 12 15 18 9" />
                                        </svg>

                                        <select value={mode} onChange={(e) => setMode(e.target.value)} className="w-full focus:outline-none pl-10 py-2 appearance-none flex items-center h-12 border rounded border-gray-700 dark:border-gray-50 text-sm leading-5 dark:bg-gray-900 dark:text-gray-50">
                                            <option value="auto">Auto</option>
                                            <option value="light">Light</option>
                                            <option value="dark">Dark</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="py-16 flex flex-col justify-center items-center">
                    <Link to='/'>
                        <div className="flex items-center flex-shrink-0 text-gray-800 mr-6">
                            <img className="fill-current h-8 w-8 mr-2" width="54" height="54" src={Logo} alt='' />
                            <span className="font-semibold text-xl tracking-tight ml-3">▽ A D A N Z  🇨🇴 </span>
                        </div>
                    </Link>
                    <p className="mt-6 text-xs lg:text-sm leading-none text-gray-900 dark:text-gray-50">2021 ▽ A D A N Z  🇨🇴 . All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Footer
