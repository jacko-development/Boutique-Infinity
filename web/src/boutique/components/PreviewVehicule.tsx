import React, { useState, useRef, useEffect } from "react";
import { fetchNui } from "../../utils/fetchNui";

interface vehiculeProps {
    data: any;
    setSelectPreviewVéhicules: React.Dispatch<React.SetStateAction<any | null>>;
}


export const PreviewVehicule: React.FC<vehiculeProps> = ({ data, setSelectPreviewVéhicules }) => {

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Backspace') {
            setSelectPreviewVéhicules(null)
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, []);


    const TestVehicle = (vehiculeName: string) => {
        fetchNui("JIventory:UseItem", vehiculeName);
    };

    const BuyVehicle = (vehiculeName: string) => {
        fetchNui("JIventory:UseItem", vehiculeName);
    };

    return (
      <div className="boutique-preview-vehicules">
        <img
          className="bannierre"
          src="https://cdn.discordapp.com/attachments/1277292715666571316/1277739560746483783/logo.png?ex=66d03d72&is=66ceebf2&hm=ebea99b994a2cae6e101affd2ad493f226f0fd054d185d7c44621d3a1a0a4dae&"
          alt="Bannière du véhicule"
        />
        <div className="box-button">
          <div className="price-vehicule">
            {data.price} {/* Use data.price directly */}
            <img
              className="icon-coins-vehicule"
              src="https://cdn.discordapp.com/attachments/1277292715666571316/1278374740821540915/pngtree-blue-gemstone-diamond-illustration-image_1402869-removebg-preview.png?ex=66d092c1&is=66cf4141&hm=7aec0ad2f0ac189f5b8c9b62ad3dca1f0db307d31e54fa8039dc80e92b6fa29f&"
              alt="Icône de pièces"
            />
          </div>
          <div className="button-test" onClick={(e) => TestVehicle(data.model)}>TESTER</div>
          <div className="button-buy" onClick={(e) => BuyVehicle(data.model)}>ACHETER</div>
        </div>
      </div>
    );
  };