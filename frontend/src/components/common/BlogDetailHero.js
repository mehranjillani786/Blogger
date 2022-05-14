import React from 'react' 
import a from "../../assets/demopic/4.jpg"
import {SERVER_HOST} from "../../helper/constants"
function BlogDetailHero({title, tagline, image,publishedAt}) {
    return (
        <div data-testid='blogItem' className="jumbotron jumbotron-fluid d-flex justify-content-center align-items-center" style={{	backgroundImage: `url(${image? SERVER_HOST.image_path+image :a})`  }}>
            <div className="container">
                <h1 className="display-4 text-capitalize">{title}</h1>
                <p>{tagline}</p>
                <p className='fst-italic'>{new Date(publishedAt).toLocaleString()}</p>
            </div>
        </div>
    )
}

export default BlogDetailHero