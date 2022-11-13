import { appwrite, github, twitter, react } from "../icons";
import { useHistory } from "react-router-dom";
import logo from '../../static/logo.png';
import logolarge from '../../static/logolarge.png';
import bg from '../../static/fridgebackground.jpeg';

const Landing = () => {
  const history = useHistory();

  const handleClick = () => {
    history.push("/fridge");
  };

  const links = [
    {
      href: "https://github.com/vivjamba/fridgebuddy",
      icon: github(10),
    },
    {
      href: "https://hackumass.com/",
      icon: twitter(10),
    }
  ];

  return (
    <>
      <section className="container h-screen mx-auto flex" >
      <img src={logolarge} alt="logo icon" style={{
                  width:500,
                  height:500,
                  marginTop:"10%"
                }}/>
        <div className="flex flex-col mx-auto justify-center p-6 text-center">
          <p className="my-8 text-xl md:text-2xl lg:text-3xl font-medium">
            Meet FridgeBuddy, your new, sustainable pantry companion!
                <br>
                </br>
          </p>
          <button
            onClick={handleClick}
            className="mx-auto mt-4 py-3 lg:py-5 px-10 lg:px-24 text-lg md:text-2xl font-semibold  rounded-lg shadow-md text-gray-900 border border-gray-900 hover:border-transparent hover:text-white hover:bg-gray-900 focus:outline-none"
            style={{backgroundColor: '#bee4b1ff'}}
          >
            Get Started
          </button>
        </div>
      </section>

      <img src={bg} alt="bg" style={{
                  width:'100%',
                  zIndex:0
                }}/>

     
    </>
  );
};

export default Landing;