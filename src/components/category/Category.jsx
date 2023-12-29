import { useSelector } from "react-redux";
import { categories } from "../../data/category";
import "./category.css";
import { useState } from "react";
import { Link } from "react-router-dom";


const Category = () => {
	const selector = useSelector((state => state.search));
	return (
		<div className="categories">
			{categories.map((category) => {
				const lowerCaseTitle = category.title.toLowerCase();
				const lowerCaseTitlee = selector.toLowerCase();
				if (lowerCaseTitle.includes(lowerCaseTitlee)) {

					return (
						<Link to={`/special-offers/${category.id}`} class="box">
							<div to={`/special-offers/${category.id}`} class="slide-img">
								<img alt="1" src={category.image} />
							</div>
							<div class="detail-box">
								<div class="type">
									<a href="#">{category.title}</a>
								</div>
								<a href="#" class="price">{category.price}</a>
							</div>

						</Link>

						
					)
				}
			})}
		</div>
	);
};

export default Category;
