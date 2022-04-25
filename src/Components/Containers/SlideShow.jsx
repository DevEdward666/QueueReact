import React, { memo } from "react";
// import { useDispatch } from 'react-redux';
import UseInterval from "../../Hooks/UseInterval";
import importImagesFromFolder from "../../Helpers/importImagesFromFolder";
import { StyledImageBackground } from "../../Assets/css/styles";
const images= importImagesFromFolder(require.context(`../../Assets/Images/Login`, false, /\.(png|jpe?g|svg)$/));

const delaySec= 5000;

export default memo(() => {
  // const dispatch = useDispatch();

  // const current_background = useSelector(state => state.LoginReducer.current_background)

  const [currentBackground, setCurrentBackground] = React.useState(0);

  const handleChange = () => {
    // dispatch(setCurrentBackground(images.length - 1));
    setCurrentBackground((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  UseInterval({
    callbackFunc: handleChange,
    delay: delaySec,
  });

  return (
    <>
      {images.length > 0 &&
        images.map((value, index) => (
          <StyledImageBackground
            key={index}
            style={{ gridArea: "login" }}
            imgSrc={value}
            className={`${currentBackground === index ? "active" : ""}`}
          />
        ))}
    </>
  );
});
