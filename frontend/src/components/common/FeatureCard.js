import React from 'react'
import a from "../../assets/demopic/4.jpg"
import {SERVER_HOST} from "../../helper/constants"
// import {Link} from "react-router-dom"
function FeatureCard({title,slug, image, tagline, publishedAt}) { 
	return (
		<div className='col-12 col-md-6 mb-3 ' data-testid='featureItem'>
			<div className='card row m-0'>
				<div className="col-md-5 wrapthumbnail p-0">
					 <a href={`/blog?slug=${slug}`}>
						<div className="thumbnail" style={{ backgroundImage: `url(${image? SERVER_HOST.image_path+image.url :a})` }}>
						</div>
					</a>  
				</div>
				<div className="col-md-7 p-3">
					<div className="card-block">
						<h2 className="card-title"><a href={`/blog?slug=${slug}`}>{title}</a></h2>
						<h4 className="card-text truncate" >{tagline}</h4>
					</div>
					<small className="text-muted fw-bold">
						{new Date(publishedAt).toLocaleDateString()}
					</small>
				</div>
			</div>
		</div>
	)
}

export default FeatureCard