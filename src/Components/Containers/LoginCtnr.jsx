import { createTheme } from '@material-ui/core'
import React from "react";
import LoginForm from "../../Views/Login/Login";
import SlideShow from "./SlideShow";
import { LoginStyles } from "../../Assets/css/styles";
import importImagesFromFolder from "../../Helpers/importImagesFromFolder";
import BackgroundSlideshow from 'react-background-slideshow'

import image1 from '../../Assets/Images/Login/step3.jpg'
import image2 from '../../Assets/Images/Login/step4.jpg'  
import image3 from '../../Assets/Images/Login/step7.jpg'
import image4 from '../../Assets/Images/Login/pexels-anna-shvets-4226119.jpg'
import image5 from '../../Assets/Images/Login/pexels-anna-shvets-4226219.jpg'
const images= importImagesFromFolder(require.context(`../../Assets/Images/Login`, false, /\.(png|jpe?g|svg)$/));
const LoginCtnr = () => {
  const theme = createTheme();
  return (
    <LoginStyles theme={theme}>
    
    <BackgroundSlideshow images={[ image1, image2, image3,image4,image5 ]} />
      <LoginForm />
   
    </LoginStyles>
  );
};

export default LoginCtnr;
