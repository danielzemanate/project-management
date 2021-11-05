import { React } from 'react'
import { Link } from 'react-router-dom';
import Logo from 'assets/images/dev.jpeg'

const Navbar = () => {

    //AGREGAR RUTAS NUEVAS, SU NOMBRE PARA EL NAVBAR
    const routeNavbar = [
        { route: "/", name: 'Home' },
        { route: "/users", name: 'About Us' },
        { route: "/", name: 'Services' },
        { route: "/", name: 'Contact' },
    ]
    return (
        <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
            <div className="flex items-center flex-shrink-0 text-white mr-6">
                <img className="fill-current h-8 w-8 mr-2" width="54" height="54" src={Logo} alt='' />
                <span className="font-semibold text-xl tracking-tight ml-3">▽ A D A N Z  🇨🇴 </span>
            </div>
            <div className="block lg:hidden">
                <button className="flex items-center px-3 py-2 border rounded text-indigo-100 border-indigo-400 hover:text-white hover:border-white">
                    <svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" /></svg>
                </button>
            </div>
            <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto ml-10">
                <div className="text-md lg:flex-grow">
                    {routeNavbar.map((item, index) => (
                        <Link to={item.route}><p className="block mt-4 lg:inline-block lg:mt-0 text-white hover:text-white mr-4">
                            {item.name}
                        </p></Link>
                    ))}

                </div>
                <div>
                    <button type='button' className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-indigo-500 hover:bg-white mt-4 lg:mt-0">Login</button>
                </div>
            </div>
            <div class="absolute bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Whatsapp" href='https://wa.link/fil3bc' target="_blank" class="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12" rel='noreferrer' >
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/240px-WhatsApp.svg.png" alt='' />
                    </a>
                </div>
            </div>
        </nav>
    )
}

export default Navbar
