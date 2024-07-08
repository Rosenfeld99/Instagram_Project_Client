import React from "react";

const Test = () => {
  const arr = [
    {url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSjPUCkL5ppBj23rHdrN9c7i-hhTUqiJt9Hrw&usqp=CAU"},
    {url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQesVG1_T1IklSJlvqQHjOkjyTo79UFdsf_HQ&usqp=CAU"},
    {url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzz5fzDIucAV5X0rR8EbmkfzjraS3eCLe8Lw&usqp=CAU"},
    {url : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTh6DWHJ2AYaVxoG9MdDQIQnV0K0VnCnGcMww&usqp=CAU"},
  ];

  return (
    <div className="carousel w-full">
      {arr.map((item, i) => (
        <div id="slide1" className="carousel-item relative w-full">
          <img
            src={item.url}
            className="w-full"
          />
          <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 top-1/2">
            <a href="#slide4" className="btn btn-circle">
              ❮
            </a>
            <a href="#slide2" className="btn btn-circle">
              ❯
            </a>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Test;
