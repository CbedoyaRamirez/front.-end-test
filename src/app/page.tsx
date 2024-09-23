"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2'
import "./page.css";
import { BeatLoader } from 'react-spinners';

const Page = () => {
  const [images, setImages] = useState([]);
  const [imageFilter, setImageFilter] = useState('');
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchImagesFilter, setSearchImagesFilter] = useState(false);


  const fetchImages = async () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
    try {
      setSearchImagesFilter(true);
      const response = await axios.get(`http://localhost:3100/images`);
      setImages((prevImages) => [...prevImages, ...response.data]);
      setLoading(false);
    } catch (error) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        showConfirmButton: false,
        title: `No se pudo cargar las imagentes`,
        timer: 1500
      });
      setLoading(false);
    } finally {
      setSearchImagesFilter(false);
    }
  };

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    fetchImages();
  }, [page]);

  const searchImages = images.filter(img => String(img.title).toUpperCase().includes(String(imageFilter).toUpperCase()))

  const updateLike = async (registro) => {
    const response = await axios.post(`http://localhost:3100/images/:${registro.id}/likes`);
    if (response.status === 204) {
      registro.liked = true;
      Swal.fire({
        position: "top-end",
        icon: "success",
        showConfirmButton: false,
        title: `Has dado like a la imagen\n ${registro.title}`,
        timer: 1500
      });
    }
  }

  const updateDislike = async (registro) => {
    const response = await axios.post(`http://localhost:3100/images/:${registro.id}/likes`);
    if (response.status === 204) {
      registro.liked = false;
      Swal.fire({
        position: "top-end",
        icon: "warning",
        title: `Al parecer no te gusto la imagen\n  ${registro.title}`,
        showConfirmButton: false,
        timer: 1500
      });
    }

  }

  return (
    <>
      <BeatLoader loading={searchImagesFilter} />
      <div className="container-search">
        <input className='container-text' placeholder='Buscar imagenes' onChange={(e) => setImageFilter(e.target.value)} />
      </div>
      <div className='container-card'>
        {
          searchImages.map((registro, index) => (
            <div className="image-item" key={index}>
              <div className="image-container">
                <div className="image-price">
                  <p>{`$ ${registro.price}`}</p>
                </div>
                <img key={index} src={registro.main_attachment.big}></img>
              </div>
              <div className='container-author' >
                <label className='container-author--title' >{`${registro.title}`}</label>
                <label className='container-author--autor' > {`by ${registro.author} `}</label>
              </div>
              <div className='container-like' >
                <div className="like" >
                  <a onClick={() => updateLike(registro)} >{`${registro.likes_count}`}👍</a>
                </div>
                <div className='dislike' >
                  <a onClick={() => updateDislike(registro)} >👎</a>
                </div>
              </div>
            </div>
          ))
        }
        {loading && <p>No existen imagenes....</p>}
      </div>
    </>
  );
}

export default Page;