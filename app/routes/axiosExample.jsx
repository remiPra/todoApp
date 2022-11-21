import { fetch, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react"
import axios from "axios";

function axiosExample() {
    const notes  = useLoaderData()
    return (<>
    <div>axios</div>
    <div>{JSON.stringify(notes)}</div>
  </>
  )
}

export default axiosExample

export async  function loader(){
  const config = {
    headers: {      
        'Content-Type': 'application/json;charset=utf-8'
    }
}
    // const notes = await axios.get("https://mauriceradiolibre.com/wp-json/wp/v2/podcasts/?per_page=100",config)
    const notes = await fetch("https://public-api.wordpress.com/rest/v1.1/sites/remicuisine.art.blog/posts/",config)
    
    return notes
  }