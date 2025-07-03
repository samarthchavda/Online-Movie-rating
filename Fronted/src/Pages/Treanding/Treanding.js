import "./treanding.css";
import PageContent from '../../file/PageContent/PageContent';
import { useEffect, useState } from "react";
import CustomePage from "../../file/Pagination/CustomePage";

const Treanding = () =>{

  const [Page , setPage] = useState(1);
  const [content, setContent] = useState([]);
  let API = `https://api.themoviedb.org/3/trending/all/day?language=en-US&api_key=2ab0cc3b6a60d9ac8239bca7a836ddb6&page=${Page}`;
  const fetchApiData = async (url)=>{
    try {

     const res = await fetch(url);
      const data = await res.json();
      //printing the data of to another file.
      setContent(data.results);
      // inside the console show the Array of Api
            // console.log(data.results);
    }
     catch (error) {
      console.log(error);
    }
  }
  
  useEffect( ()=> {
        fetchApiData(API);
        // eslint-disable-next-line
  }, [API]);
    return(
      <>
        <div>
            <span className="pagetitle">Treanding Today</span>
            <div className="trending">
              {/* 'c'  is just a variable name chosen to represent each element of the content array during the mapping process. */}
            {content && content.map((c) => (
              <PageContent 
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
            <CustomePage setPage={setPage}/>
        </div>
      </>
    );
};
export default Treanding;