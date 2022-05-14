import React from 'react'
import { Category1, Category2, Contact } from "../index"
import Feature from '../category/Feature'; 
import Login from '../login/Login';
export default function Home() {
	return (
		<div className="container py-5" id="home">
			<div className="mainheading">
				<h1 className="sitetitle">Blogger</h1>
				<p className="lead">
					Read Feature, Latest Blogs with us and give you suggestion.
				</p>
			</div>


			{/* feature blogs */} 
			<Feature /> 

			{/* cat2 blogs */}

			<Category1 />


			{/* cat2 blogs */}
			<Category2 />

			{/* Contact us  */}
			<Contact/>

		</div>
	)
}
