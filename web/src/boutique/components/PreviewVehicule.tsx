import React, { useState, useRef, useEffect } from "react";
import { fetchNui } from "../../utils/fetchNui";

interface vehiculeProps {
    data: any;
    setSelectPreviewVéhicules: React.Dispatch<React.SetStateAction<any | null>>;
}

const PreviewVehicule: React.FC<vehiculeProps> = ({ data, setSelectPreviewVéhicules }) => {
    const [isDraggingVehicle, setisDraggingVehicle] = useState<boolean>(false);
    const [selectcolors1, setselectcolors1] = useState<number>(0);
    const [selectcolors2, setselectcolors2] = useState<number>(0);
    const rowColors = [
      'rgba(255, 0, 0, 0.8)',    // Red
      'rgba(255, 165, 0, 0.8)',  // Orange
      'rgba(255, 255, 0, 0.8)',  // Yellow
      'rgba(0, 255, 0, 0.8)',    // Lime
      'rgba(0, 0, 255, 0.8)',    // Blue
      'rgba(75, 0, 130, 0.8)',   // Indigo
      'rgba(238, 130, 238, 0.8)',// Violet
      'rgba(255, 20, 147, 0.8)', // Deep Pink
      'rgba(255, 105, 180, 0.8)',// Hot Pink
      'rgba(0, 255, 255, 0.8)',  // Cyan
      'rgba(0, 191, 255, 0.8)',  // Deep Sky Blue
      'rgba(0, 139, 139, 0.8)',  // Dark Cyan
      'rgba(255, 69, 0, 0.8)',   // Red-Orange
      'rgba(255, 105, 180, 0.8)',// Hot Pink
      'rgba(255, 255, 224, 0.8)',// Light Yellow
      'rgba(173, 255, 47, 0.8)', // Green Yellow
      'rgba(255, 99, 71, 0.8)',  // Tomato
      'rgba(255, 228, 225, 0.8)',// Misty Rose
      'rgba(240, 248, 255, 0.8)',// Alice Blue
      'rgba(245, 245, 220, 0.8)',// Beige
      'rgba(255, 240, 245, 0.8)',// Lavender Blush
      'rgba(224, 255, 255, 0.8)',// Light Cyan
      'rgba(255, 239, 213, 0.8)',// Papaya Whip
      'rgba(245, 222, 179, 0.8)',// Wheat
      'rgba(220, 220, 220, 0.8)',// Gainsboro
      'rgba(169, 169, 169, 0.8)',// Dark Gray
      'rgba(128, 128, 128, 0.8)',// Gray
      'rgba(192, 192, 192, 0.8)',// Silver
      'rgba(255, 228, 196, 0.8)',// Bisque
      'rgba(255, 250, 240, 0.8)',// Floral White
      'rgba(255, 215, 0, 0.8)',  // Gold
      'rgba(211, 211, 211, 0.8)',// Light Gray
      'rgba(255, 0, 255, 0.8)',  // Magenta
      'rgba(128, 0, 128, 0.8)',  // Purple
      'rgba(255, 140, 0, 0.8)'   // Dark Orange
    ];
    

    useEffect(() => {

        const handleMouseMove = (e: any) => {
          if (isDraggingVehicle && e.movementX > 0) {
            fetchNui("boutique:updateOrientationPreviewVehicule", 6)
            .then(() => {
            })
            .catch(error => {
            });
          }
          if (isDraggingVehicle && e.movementX < 0) {
            fetchNui("boutique:updateOrientationPreviewVehicule", -6)
            .then(() => {
            })
            .catch(error => {
            });
          }
        };

        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Backspace') {
            fetchNui("boutique:PreviewVehicule", {state: false});
            setSelectPreviewVéhicules(null)
          }
        };

        const handleMouseDown = () => {
          console.log("down")
          setisDraggingVehicle(true);
        };
      
        const handleMouseUp = () => {
          console.log("up")
          setisDraggingVehicle(false);
        };

        window.addEventListener('mousedown', handleMouseDown);
        window.addEventListener('mouseup', handleMouseUp);
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('mousedown', handleMouseDown);
          window.removeEventListener('mouseup', handleMouseUp);
          window.removeEventListener('mousemove', handleMouseMove);
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isDraggingVehicle]);


    const TestVehicle = (vehiculeName: string) => {
        fetchNui("boutique:TestVehicle", vehiculeName);
    };

    const SetColorVehicle = (index: number, color: string, type: number) => {
      if (type === 1) {
        setselectcolors1(index);
      } else if (type === 2) {
        setselectcolors2(index);
      }
    
      const rgbaValues = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*(\d+\.?\d*))?\)/);
      if (rgbaValues) {
        const [r, g, b] = [rgbaValues[1], rgbaValues[2], rgbaValues[3]];
        fetchNui("boutique:SetColorVehicle", { type, color: { r: parseInt(r), g: parseInt(g), b: parseInt(b) } });
      }
    };

    const BuyVehicle = (vehiculeName: string) => {
        fetchNui("boutique:BuyVehicle", vehiculeName);
    };

    return (
      <div className="boutique-preview-vehicules">
        <img
          className="bannierre"
          src={`nui://BOUTIQUE-INFINITY/web/assets/banniere.png`}
          alt="Bannière du véhicule"
        />
        <div className="box-info">
            <span className="info-name">{data.label}</span>
            <span className="info-title-capacite">CAPACITE</span>
            <span className="info-title-classe">CLASSE</span>
            <span className="info-capacite">{`${data.place} Places`}</span>
            <span className="info-classe">{data.type}</span>
            <span className="info-description">{data.description}</span>
        </div>

        <div className="box-color">  
          <span className="info-title">COULEUR 1</span>
          <div className="box-colors">
            {rowColors.map((value, index) => (
              <div className="color" style={{backgroundColor: value, border: selectcolors1 === index ? '0.1vh solid white' : ''}} onClick={() => SetColorVehicle(index, value, 1)}></div>
            ))}
          </div>
          <span className="info-title">COULEUR 2</span>
          <div className="box-colors">
            {rowColors.map((value, index) => (
              <div className="color" style={{backgroundColor: value, border: selectcolors2 === index ? '0.1vh solid white' : ''}} onClick={() => SetColorVehicle(index, value, 2)}></div>
            ))}
          </div>
        </div>

        <div className="box-button">
          <div className="price-vehicule">
            {data.price} {/* Use data.price directly */}
            <img
              className="icon-coins-vehicule"
              src={`nui://BOUTIQUE-INFINITY/web/assets/coins.png`}
              alt="Icône de pièces"
            />
          </div>
          <div className="button-test" onClick={(e) => TestVehicle(data.model)}>TESTER</div>
          <div className="button-buy" onClick={(e) => BuyVehicle(data.model)}>ACHETER</div>
        </div>
      </div>
    );
  };

export default PreviewVehicule;