import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Home } from "./components/Home";
import { Local } from "./components/Local";
import { Birds } from "./components/Birds";
import { Country } from "./components/Country";
import { SelC } from "./components/SelC";
import { Login } from "./components/Login";
import { Register } from "./components/Register";
import { Type } from "./components/Type";
import { AllBirds } from "./components/AllBirds";
import { ALLB } from "./components/ALLB";
import { Sel } from "./components/Sel";
import { Uploads } from "./components/Uploads";
import { Profile } from "./components/Profile";
import { ALLA } from "./components/ALLA";
import { AllAnimals } from "./components/AllAnimals";
const App = () =>{
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="local" element={<Local />} />
        <Route path="birds" element={<Birds />} />
        <Route path="country" element={<Country />} />
        <Route path="/country/:countryName" element={<SelC />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="type/:countryName" element={<Type />} />
        <Route path="type/:countryName/:stateName" element={<Type />} />
        <Route path="/allbirds/:countryName" element={<AllBirds />} />
        <Route path="/allbirds/:countryName/:stateName" element={<AllBirds />} />
        <Route path="/animals/:countryName/:stateName?" element={<AllAnimals />} />

        <Route path="/allb" element={<ALLB />} />
        <Route path="/sel" element={<Sel />} />
        <Route path="uploads" element={<Uploads />} />
       <Route path="/profile/:email" element={<Profile />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/alla" element={<ALLA />} />

        
        


      </Routes>
    </Router>
  );
};
export default App;