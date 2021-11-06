import React from 'react'

const Home = () => {
    return (
        <div>
            {/* <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-8 sm:px-6 lg:px-10">
                    <h1 className="text-4xl font-bold text-indigo-900">PROJECT MANAGEMENT</h1>
                </div>
            </header> */}
            <div className='max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8'>
                <section className=" -mt-24">
                    <div className="container mx-auto px-4">
                        <div className="flex flex-wrap">
                            <div className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
                                <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-1 shadow-lg rounded-lg">
                                    <div className="px-4 flex-auto">
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-wrap items-center mt-16">
                            <div className="w-full md:w-5/12 px-4 mr-auto ml-auto">
                                <div className="text-gray-900 p-6 text-center inline-flex items-center justify-center w-18 h-18 mb-6 shadow-lg rounded-full bg-white">
                                    <i className="fas fa-project-diagram text-4xl text-green-700"></i>
                                </div>
                                <h3 className="text-5xl text-indigo-900 mb-2 font-semibold leading-tight">
                                    Software para la gestión de proyectos administrativos
                                </h3>
                                <p className="text-lg font-normal leading-relaxed mt-4 mb-4 text-gray-900">
                                    Don't let your uses guess by attaching tooltips and popoves to
                                    any element. Just make sure you enable them first via
                                    JavaScript.
                                </p>
                                <p className="text-lg font-normal leading-relaxed mt-0 mb-4 text-gray-900">
                                    The kit comes with three pre-built pages to help you get started
                                    faster. You can change the text and images and you're good to
                                    go. Just make sure you enable them first via JavaScript.
                                </p>
                                <button className="bg-transparent hover:bg-indigo-500 text-indigo-700 font-semibold hover:text-white py-2 px-4 border-2 border-indigo-500 hover:border-transparent rounded-full transition duration-900 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                                    Solicita un Demo
                                </button>
                            </div>
                            <div className="w-full md:w-4/12 px-4 mr-auto ml-auto">
                                <div className="relative flex flex-col min-w-0 break-words w-full mb-2 shadow-lg rounded-lg bg-green-600">
                                    <img alt="..." src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1051&amp;q=80" className="w-full align-middle rounded-t-lg" />
                                    <blockquote className="relative p-8 mb-4">
                                        {/* <svg preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 583 95" className="absolute left-0 w-full block h-95-px -top-94-px"> */}
                                        {/* <polygon points="-30,95 583,95 583,65" className="text-indigo-500 fill-current"></polygon> */}
                                        {/* </svg> */}

                                        <h4 className="text-3xl font-bold text-white">
                                            Top Notch Services
                                        </h4>
                                        <p className="text-lg font-normal mt-2 text-white leading-tight text-justify">
                                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, quia temporibus eveniet a libero incidunt suscipit laborum, rerum accusantium modi quidem, ipsam illum quis sed voluptatum quae eum fugit earum
                                        </p>
                                    </blockquote>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Home
