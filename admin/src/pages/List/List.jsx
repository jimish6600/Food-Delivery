import React, { useEffect, useState } from 'react'
import './List.css'
import axios from 'axios'
import { toast } from 'react-toastify'


const List = () => {
  const url = "http://localhost:3000"
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);
      response.data.success?setList(response.data.data):toast.error("Error fetching the list");
    } catch (error) {
      toast.error("An error occurred while fetching the list");
    }
  }

  const removeFood = async(foodId) =>{
    const response = await axios.post(`${url}/api/food/remove`,{id:foodId});
    await fetchList();
    response.data.success?toast.success(response.data.message):toast.error("Error")
  }

  useEffect(() => {
    fetchList();
  }, []);

  return (

    <div className='list add flex-col'>
      <p>All Foods List</p>
      <div className="list-table">
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>
        {list.map((item, index) => (
          <div key={index} className='list-table-format'>
            <img src={`${url}/images/${item.image}`} alt={item.name} />
            <p>{item.name}</p>
            <p>{item.category}</p>
            <p>{item.price}</p>
            <p className='cursor' onClick={()=>{removeFood(item._id)}}>X</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default List
