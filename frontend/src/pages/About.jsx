import React from 'react'
import '../About.css'
const About = () => {
	return (
		<div className='about-container'>
			<h1>
				About <span>Foodio 🍽️✨</span>
			</h1>
			<p>
				Welcome to <strong>Foodio</strong> – your ultimate destination for
				discovering, sharing, and enjoying delicious recipes from around the
				world! 🌍👩‍🍳
			</p>

			<p>
				At <strong>Foodio</strong>, we believe that food is more than just
				nourishment; it's a way to bring people together, celebrate cultures,
				and spark creativity in the kitchen.
			</p>

			<h2>Why Choose Foodio?</h2>
			<ul>
				<li>
					<span>✅</span>
					<strong>Endless Recipes</strong> – Discover thousands of dishes across
					cuisines.
				</li>
				<li>
					<span>✅</span>
					<strong>Community-Driven</strong> – Share and get inspired by home
					chefs.
				</li>
				<li>
					<span>✅</span>
					<strong>Easy-to-Follow Guides</strong> – Step-by-step instructions &
					tips.
				</li>
				<li>
					<span>✅</span>
					<strong>Save & Share</strong> – Bookmark and share your favorite
					recipes.
				</li>
				<li>
					<span>✅</span>
					<strong>Interactive & Fun</strong> – Rate recipes, leave reviews, and
					join discussions.
				</li>
			</ul>

			<p className='cta-text'>
				Join our community today and start cooking, sharing, and savoring every
				bite! 🍕🥗🍰
			</p>
		</div>
	)
}

export default About
