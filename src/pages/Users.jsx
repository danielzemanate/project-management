import React from 'react'

const Users = () => {
    return (
        <div>
            <div className="flex flex-wrap items-center pt-8">
                <div className="w-full md:w-6/12 px-4 mr-auto ml-auto ">
                    <div className="justify-center flex flex-wrap relative">
                        <div className="my-4 w-full lg:w-6/12 px-4">
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/svelte/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-red-600 shadow-lg rounded-lg text-center p-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/svelte.jpg" />
                                    <p className="text-lg text-white mt-4 font-semibold">Svelte</p>
                                </div>
                            </a>
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/react/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-lightBlue-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/react.jpg" />
                                    <p className="text-lg text-white mt-4 font-semibold">ReactJS</p>
                                </div>
                            </a>
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/nextjs/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-blueGray-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/nextjs.jpg" />
                                    <p className="text-lg text-white mt-4 font-semibold">NextJS</p>
                                </div>
                            </a>
                        </div>
                        <div className="my-4 w-full lg:w-6/12 px-4 lg:mt-16">
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-yellow-500 shadow-lg rounded-lg text-center p-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/js.png" />
                                    <p className="text-lg text-white mt-4 font-semibold">
                                        JavaScript
                                    </p>
                                </div>
                            </a>
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/angular/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-red-700 shadow-lg rounded-lg text-center p-8 mt-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/angular.jpg" />
                                    <p className="text-lg text-white mt-4 font-semibold">Angular</p>
                                </div>
                            </a>
                            <a href="https://www.creative-tim.com/learning-lab/tailwind/vue/alerts/notus?ref=vtw-index" target="_blank" rel='noreferrer'>
                                <div className="bg-emerald-500 shadow-lg rounded-lg text-center p-8 mt-8">
                                    <img alt="..." className="shadow-md rounded-full max-w-full w-16 mx-auto p-2 bg-white" src="https://raw.githubusercontent.com/creativetimofficial/public-assets/master/logos/vue.jpg" />
                                    <p className="text-lg text-white mt-4 font-semibold">Vue.js</p>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-4/12 px-12 md:px-4 ml-auto mr-auto mt-16">
                    <div className="text-blueGray-500 p-3 text-center inline-flex items-center justify-center w-16 h-16 mb-6 shadow-lg rounded-full bg-white">
                        <i className="fas fa-drafting-compass text-xl"></i>
                    </div>
                    <h3 className="text-3xl mb-2 font-semibold leading-normal">
                        Javascript Components
                    </h3>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                        In order to create a great User Experience some components require
                        JavaScript. In this way you can manipulate the elements on the
                        page and give more options to your users.
                    </p>
                    <p className="text-lg font-light leading-relaxed mt-4 mb-4 text-blueGray-600">
                        We created a set of Components that are dynamic and come to help
                        you.
                    </p>
                    <div className="block pb-6">
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Alerts
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Dropdowns
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Menus
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Modals
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Navbars
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2 rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Popovers
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Tabs
                        </span>
                        <span className="text-xs font-semibold inline-block py-1 px-2  rounded-full text-blueGray-500 bg-white uppercase last:mr-0 mr-2 mt-2">
                            Tooltips
                        </span>
                    </div>
                    <a href="https://www.creative-tim.com/learning-lab/tailwind/js/alerts/notus?ref=njs-index" target="_blank" className="font-bold text-blueGray-700 hover:text-blueGray-500 ease-linear transition-all duration-150" rel='noreferrer'>
                        View all
                        <i className="fa fa-angle-double-right ml-1 leading-relaxed"></i>
                    </a>
                </div>
            </div>
            <footer className="relative pt-8 pb-6 mt-8">
                <div className="container mx-auto px-4">
                    <div className="flex flex-wrap items-center md:justify-between justify-center">
                        <div className="w-full md:w-6/12 px-4 mx-auto text-center">
                            <div className="text-sm text-blueGray-500 font-semibold py-1">
                                Made with <a href="https://www.creative-tim.com/product/notus-js" className="text-blueGray-500 hover:text-gray-800" target="_blank" rel='noreferrer'>Notus JS</a> by <a href="https://www.creative-tim.com" className="text-blueGray-500 hover:text-blueGray-800" target="_blank" rel='noreferrer'> Creative Tim</a>.
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Users
