import Footer from 'components/Footer'
import Navbar from 'components/Navbar'
import React from 'react'

const PublicLayout = ({ children }) => {
    return (
        <div>
            <Navbar />
            <main>
                <div>
                    {children}
                </div>
            </main>
            <Footer/>
            <div className="fixed bottom-0 right-0 mb-4 mr-4 z-10">
                <div>
                    <a title="Whatsapp" href='https://wa.link/fil3bc' target="_blank" className="block w-16 h-16 rounded-full transition-all shadow hover:shadow-lg transform hover:scale-110 hover:rotate-12" rel='noreferrer' >
                        <img className="object-cover object-center w-full h-full rounded-full" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/240px-WhatsApp.svg.png" alt='' />
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PublicLayout
