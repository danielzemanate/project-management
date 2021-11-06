import React from 'react'
import PageNotFound from 'assets/images/pageNotFound.png'

const NotFoundPage = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <img src={PageNotFound} alt=''  ></img>
            <h1 className='text-6xl text-indigo-900'><b>404</b></h1>
            <h1 className='text-4xl text-indigo-900 text-center'><b>OOPS! PAGE NOT FOUND.</b></h1>
              {/* <Link className='link' to="/">Go to Home </Link> */}
        </div>
    )
}

export default NotFoundPage
