import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AiFillHeart } from "react-icons/ai";
const Home = () => {
  const [foods, setFoods] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:5000/allFood")
      .then((res) => setFoods(res.data));
  }, []);

  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };

  const handleFavourite = (food) => {
    food.status = "favourite";
    console.log(food);
    axios.put(`http://localhost:5000/allFood/${food._id}`, food).then((res) => {
      if (res.data.acknowledged) {
        alert("add favourite item in favourite page");
        navigate("/favourite");
      }
    });
  };

  return (
    <div className="container py-10 bg-gray-50">
      <div className="inline-block hero-wrapper">
        <img
          className="w-11/12 my-4 rounded-lg"
          src="https://recipe-book-51ad3.web.app/static/media/banner.a2ea514c7dbc832f056b.jpg"
          alt="hero area"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {foods.map((food) => (
          <div key={food.id} className="shadow-md p-2 bg-white rounded-sm">
            <div className="overflow-hidden relative group cursor-pointer">
              <img
                className="cursor-pointer transition-all ease-in duration-200 hover:scale-110"
                src={food.RecipeImage}
                alt="product"
              />
              <span
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 text-2xl text-indigo-700 p-2 transition-all ease-in-out duration-300"
                onClick={() => handleFavourite(food)}
              >
                <span className="absolute top-4 right-5">
                  <AiFillHeart />
                </span>
              </span>
            </div>
            <h2 className="uppercase my-2 font-semibold text-md  font-openSans">
              {food.recipeName}
            </h2>
            <button
              className="py-1 w-full text-md inline-block rounded-md uppercase bg-indigo-600 text-white hover:bg-indigo-700"
              onClick={() => handleDetails(food._id)}
            >
              Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;