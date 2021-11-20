import { React, useState } from 'react'
import { Link } from 'react-router-dom';
import Logo from 'assets/images/dev.jpeg'

const Navbar = () => {
    const [showNavigation, setShowNavigaion] = useState(false);

    //AGREGAR RUTAS NUEVAS, SU NOMBRE PARA EL NAVBAR
    const routeNavbar = [
        { route: "/", name: 'Home' },
        { route: "/users", name: 'About Us' },
        { route: "/", name: 'Services' },
        { route: "/", name: 'Contact' },
    ]
    return (
        <nav className="flex items-center justify-between flex-wrap  bg-gray-800 p-6">
            <Link to='/'><div className="flex items-center flex-shrink-0 text-white mr-6 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110">
                <img className="fill-current h-10 w-10 mr-2" width="54" height="54" src={Logo} alt='' />
                <span className="font-semibold text-2xl tracking-tight ml-3 cursor-pointer">▽ A D A N Z  🇨🇴 </span>
            </div></Link>
            <div className="block lg:hidden" onClick={() => { setShowNavigaion(!showNavigation); }}>
                <button className="flex items-center px-3 py-2 border rounded text-white border-indigo-400 ">
                    <i
                        className={`mx-2 fas fa-${showNavigation ? 'times' : 'bars'
                            }  cursor-pointer`}
                    />
                </button>
            </div>

            {showNavigation ? (
                <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-10">
                    <div className="text-md lg:flex-grow">
                        {routeNavbar.map((item, index) => (
                            <Link key={index} to={item.route}><p className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                                {item.name}
                            </p></Link>
                        ))}

                    </div>
                    <div>
                        <button type='button' className="inline-block px-4 py-2 leading-none rounded text-white  border-2 border-transparent hover:text-white hover:bg-indigo-700 bg-indigo-600 mt-4 lg:mt-0 text-lg font-bold transition duration-900 ease-in-out transform hover:-translate-y-1 hover:scale-110">Login</button>
                    </div>
                </div>
            ) : <div className="w-full flex-grow lg:flex lg:items-center lg:w-auto ml-10 hidden md:hidden text-lg">
                <div className="text-md lg:flex-grow">
                    {routeNavbar.map((item, index) => (
                        <Link key={index} to={item.route}><p className="block mt-4 lg:inline-block lg:mt-0 text-white mr-8 transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-110 ">
                            {item.name}
                        </p></Link>
                    ))}

                </div>
                <div>
                    <button type='button' className="inline-block px-4 py-2 leading-none rounded-full text-white border-indigo-500 border-2 hover:border-transparent hover:text-white hover:bg-indigo-600 mt-4 lg:mt-0 text-lg font-bold transition duration-900 ease-in-out transform hover:-translate-y-1 hover:scale-110">Login</button>
                </div>
            </div>}
        </nav>
    )
}

export default Navbar
