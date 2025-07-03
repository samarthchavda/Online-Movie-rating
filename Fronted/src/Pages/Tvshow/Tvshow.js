import { useEffect, useState } from "react";
import Genres from "../../file/Genres";
import useGenres from "../../file/hooks/useGenres";
import PageContent from "../../file/PageContent/PageContent";
import CustomePage from "../../file/Pagination/CustomePage";
const Tvshow = () => {

    const [Page , setPage] = useState(1);
    //use to empty erray in api.
    const [content, setContent] = useState([]);
    const [numOfPages , setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    let API = `https://api.themoviedb.org/3/discover/tv?language=en-US&api_key=2ab0cc3b6a60d9ac8239bca7a836ddb6&page=${Page}&with_genres=${genreforURL}`;
  const fetchMovies = async (url)=>{
    try {

     const res = await fetch(url);
      const data = await res.json();
    //printing the data of to another file.
        setContent(data.results);
        setNumOfPages(data.total_pages);
    // inside the console show the Array of Api
        // console.log(data.results);

    }
     catch (error) {
      console.log(error);
    }
  }
  
  useEffect( ()=> {
        fetchMovies(API);
  }, [API, Page, genreforURL]);



    return (
        <>
        <div>
            <span className="pagetitle">Tvshow </span>
            <Genres
                type='tv'
                selectedGenres={selectedGenres}
                genres={genres}
                setGenres={setGenres}
                setSelectedGenres={setSelectedGenres}
                setPage={setPage}
            />



            <div className="trending">
                {/* 'c'  is just a variable name chosen to represent each element of the content array during the mapping process. */}
                {content && content.map((c) => (
                    <PageContent
                        key={c.id}
                        id={c.id}
                        poster={c.poster_path}
                        title={c.title || c.name}
                        date={c.first_air_date || c.release_date}
                        media_type="tv"
                        vote_average={c.vote_average}
                    />
                ))}
            </div>
            {/* genres component */}
            {numOfPages > 1 && (
                <CustomePage setPage={setPage} numOfpage={numOfPages} />
            )}
        </div>
        </>
    );
};
export default Tvshow;