import React from "react";
import "./Home.css";
import Product from "./Product";
function Home() {
  return (
    <div className="home">
      <img
        src="https://images-eu.ssl-images-amazon.com/images/G/02/digital/video/merch2016/Hero/Covid19/Generic/GWBleedingHero_ENG_COVIDUPDATE__XSite_1500x600_PV_en-GB._CB428684220_.jpg"
        alt=""
        className="home__image"
      />
      <div className="home__row">
        <Product
          id="12321341"
          title="A Book"
          price={11.96}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?S300x400_retinamobilex2S"
        />
        <Product
          id="12321341"
          title="A Book"
          price={11.96}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?S300x400_retinamobilex2S"
        />
      </div>
      <div className="home__row">
        <Product
          id="12321341"
          title="A Book"
          price={11.96}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?S300x400_retinamobilex2S"
        />
        <Product
          id="12321341"
          title="A Book"
          price={11.96}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?S300x400_retinamobilex2S"
        />
        <Product
          id="12321341"
          title="A Book"
          price={11.96}
          rating={5}
          image="https://media.very.co.uk/i/very/P6LTG_SQ1_0000000071_CHARCOAL_SLf?S300x400_retinamobilex2S"
        />
      </div>
    </div>
  );
}

export default Home;
