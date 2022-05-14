import React from 'react'
import { category } from "../../helper/constants"
import FeatureCard from '../common/FeatureCard';
import { useSelector, useDispatch } from 'react-redux';

function Category2() {
  const { blog } = useSelector(state => state.blog)
  return (
    <section className="featured-posts" id="category-2">
				<div className="section-title">
					<h2><span>{category[1]?.name}</span></h2>
				</div>
				<div>
					<div className="row">
						{blog.filter(b => b.attributes.category === category[1].path.slice(2)).map((b, i) => {
							return <FeatureCard key={i} title={b.attributes.title} slug={b.attributes.slug} image={b?.attributes?.feature_image?.data?.attributes?.formats?.thumbnail} tagline={b.attributes.tagline} publishedAt={b.attributes.publishedAt} />
						})}

					</div>
				</div>
			</section>
  )
}

export default Category2