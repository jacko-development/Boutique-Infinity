import React, { useState, useRef, useEffect } from "react";
import { fetchNui } from "../../utils/fetchNui";

interface vehiculeProps {
    data: any;
    setSelectPreviewVéhicules: React.Dispatch<React.SetStateAction<any | null>>;
}

const PreviewVehicule: React.FC<vehiculeProps> = ({ data, setSelectPreviewVéhicules }) => {
    const [isDraggingVehicle, setisDraggingVehicle] = useState<boolean>(false);

    useEffect(() => {

        const handleMouseMove = (e: any) => {
          console.log(isDraggingVehicle)
          if (isDraggingVehicle && e.movementX > 0) {
            console.log("+6")
            fetchNui("boutique:updateOrientationPreviewVehicule", 6)
            .then(() => {
            })
            .catch(error => {
            });
          }
          if (isDraggingVehicle && e.movementX < 0) {
            console.log("-6")
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