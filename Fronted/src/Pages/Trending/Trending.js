import axios from "axios";
import "./Trending.css";
import React, { useEffect, useState } from "react";
import SingleContent from "../../components/SingleContent/SingleContent";
import CustomPagination from "../../components/Pagination/CustomPagination";
const API_KEY = process.env.REACT_APP_API_KEY || "2ab0cc3b6a60d9ac8239bca7a836ddb6";

function Trending() {
  const [page, setPage] = useState(1);
  const [content, setContent] = useState([]);

  useEffect(() => {
    let isMounted = true; // Flag to track whether the component is mounted

    const fetchTrending = async () => {
      try {
        const { data } = await axios.get(
          `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
        );
        if (isMounted) {
          setContent(data.results);
        }
      } catch (error) {
        console.error("Error fetching trending content:", error);
        setContent([]); // Optionally handle error state
      }
    };

    fetchTrending();

    return () => {
      isMounted = false;
    };
  }, [page]);

  return (
    <div>
      <span className="pageTitle">Trending Today</span>
      <div className="trending">
        {content &&
          content.map((c) => (
            <SingleContent
              key={c.id}
              id={c.id}
              poster={c.poster_path}
              title={c.title || c.name}
              date={c.first_air_date || c.release_date}
              media_type={c.media_type}
              vote_average={c.vote_average}
            />
          ))}
      </div>
      <CustomPagination setPage={setPage} />
    </div>
  );
}

export default Trending;
