import React from "react";
import FeaturedProducts from "../FeaturedProducts/FeaturedProducts";
import MainSlider from "../MainSlider/MainSlider";
import CategorySlider from "../CategorySlider/CategorySlider";
import { Helmet } from "react-helmet";



function Home() {
    

return <>
<Helmet>
        <title>FreshCart</title>
    </Helmet>
<MainSlider/>
<CategorySlider/>
<FeaturedProducts/>
</>
}
export default Home;