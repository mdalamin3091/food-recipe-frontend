import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthProvider/AuthProvider";
const Favourite = () => {
  const [foods, setFoods] = useState([]);
  const [isDelete, setDelete] = useState(false);
  const navigate = useNavigate();
  const { currentUser } = useAuth();
  useEffect(() => {
    axios.get("https://warm-coast-40997.herokuapp.com/favourite").then((res) => {
      const favouriteFoods = res.data.filter(
        (favourite) =>
          favourite.status === "favourite" &&
          favourite.userEmail === currentUser?.email
      );
      setFoods(favouriteFoods);
      console.log(favouriteFoods);
    });
  }, [isDelete]);
  const handleDetails = (id) => {
    navigate(`/food/${id}`);
  };
  // remove favourite item
  const handleRemoveFavourite = (food) => {
    food.status = "not favourite";
    axios.put(`https://warm-coast-40997.herokuapp.com/allFood/${food._id}`, food).then((res) => {
      if (res.data.acknowledged) {
        alert("Remove Favourite succesfull");
        setDelete(true);
      }
    });
  };
  return (
    <div className="container my-4">
      <h2 className="text-center text-2xl font-semibold">
        Your all Favourite Food
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3 mt-10 relative">
        {foods.map((food) => (
          <div key={food._id} className="shadow-md p-2 bg-white rounded-sm">
            <div className="overflow-hidden relative group cursor-pointer">
              <img
                className="cursor-pointer transition-all ease-in duration-200 hover:scale-110"
                src={food.RecipeImage}
                alt="product"
              />
              <span
                className="absolute top-0 left-0 right-0 bottom-0 w-full h-full bg-gray-700 bg-opacity-0 group-hover:bg-opacity-50 text-2xl text-indigo-700 p-2 transition-all ease-in-out duration-300"
                onClick={() => handleRemoveFavourite(food)}
              >
                <span className="absolute top-4 right-5">RF</span>
              </span>
            </div>
            <h2 className="uppercase my-2 font-semibold text-md  font-openSans">
              {food.recipeName}
            </h2>
            <p className="my-2 font-openSans">Category: {food.category}</p>
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

export default Favourite;
