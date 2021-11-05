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
        </div>
    )
}

export default PublicLayout
