import React, { useState, useRef, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from '../utils/misc';
import {Dev} from './Dev/dev'
import './boutique.scss';
import './style.scss';
import { debugData } from "../utils/debugData";
import PreviewVehicule from "./components/PreviewVehicule";

debugData([
    {
      action: "setVisible",
      data: true,
    },
]);

interface ContentsBoutique {
    Vehicules?: {
        [model: string ]: {
            model: string;
            label: string;
            price: number;
            place: number;
            type: string;
            description: any;
            image?: string
        }
    };
    Armes?: {
        [model: string]: {
            model: string;
            label: string;
            price: number;
            image?: string
        }
    };
    Caisses?: {
        [model: string]: {
            model: string;
            label: string;
            price: number;
            image?: string
        }
    }
}


interface ContentsInformationPlayer {
    Identifier: string;
    IdBoutique: number;
    Coins: number;
    Historique?: {
        transaction: string;
        coins: number;
        date: string;
    }[];
}

const Inventory: React.FC = () => {
    const [InformationPlayer, setInformationPlayer] = useState<ContentsInformationPlayer | null>(null);
    const [SelectCategorie, setSelectCategorie] = useState<string>("Acceuil");
    const [SelectPreviewVéhicules, setSelectPreviewVéhicules] = useState<any>(null);
    const [BoutiqueContents, setBoutiqueContents] = useState<ContentsBoutique | null>({
        Vehicules: {
            "sultan": {
                model: "sultan",
                label: "BMW M3 G80 2021",
                price: 1450,
                place: 4,
                type: "coupés sports",
                description: "La BMW M3 G80 est une berline sportive haute performance, alliant puissance brute et design agressif. Avec son moteur 6 cylindres en ligne de 510 chevaux, elle offre une expérience de conduite exceptionnelle, tant sur route que sur piste.",
                image: ""
            }
        },
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Escape') {
            if (SelectPreviewVéhicules === null) {
                console.log("close")
                fetchNui("boutique:close");
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [SelectPreviewVéhicules]);

    useNuiEvent('boutique:setInfoPlayer', (data: any) => {
        setInformationPlayer(data)
    });

    useNuiEvent('boutique:setInfoBoutique', (data: any) => {
        setBoutiqueContents(data)
    });

    const SetPreviewVehicule = (vehiculeName: string) => {
        setSelectPreviewVéhicules(vehiculeName)
        fetchNui("boutique:PreviewVehicule", {state: true, vehiculeName: vehiculeName});
    };

    const BuyArme = (ArmeName: string) => {
        fetchNui("boutique:BuyArme", ArmeName);
    };

    const BuyCaisse = (CaisseName: string) => {
        fetchNui("boutique:BuyCaisse", CaisseName);
    };

    return (
        <div className="wrapper-boutique">
            {isEnvBrowser() && (
                <Dev setInformationPlayer={setInformationPlayer}/>

            )}
            {SelectPreviewVéhicules !== null && BoutiqueContents && BoutiqueContents?.Vehicules && BoutiqueContents?.Vehicules[SelectPreviewVéhicules] && (
                <PreviewVehicule data={BoutiqueContents?.Vehicules[SelectPreviewVéhicules]} setSelectPreviewVéhicules={setSelectPreviewVéhicules}/>
            )} 
            {!SelectPreviewVéhicules && (
                <div className="boutique">
                    <div className="boutique-side-bar-right">
                        <img className="bannierre" src={`nui://BOUTIQUE-INFINITY/web/assets/banniere.png`} alt=""/>
                        <div className="box-button">
                        <div className={`button ${SelectCategorie ===  "Acceuil" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Acceuil")}>
                            {SelectCategorie ===  "Acceuil" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/home-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/home.png"} alt=""/> 
                            )}
                            <span>Acceuil</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Historique" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Historique")}>
                            {SelectCategorie ===  "Historique" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/history-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/history.png"} alt=""/> 
                            )}
                            <span>Historique</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Vehicules" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Vehicules")}>
                            {SelectCategorie ===  "Vehicules" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/car-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/car.png"} alt=""/> 
                            )}
                            <span>Véhicules</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Armes" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Armes")}>
                            {SelectCategorie ===  "Armes" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/weapon-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/weapon.png"} alt=""/> 
                            )}
                            <span>Armes</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Caisses" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Caisses")}>
                            {SelectCategorie ===  "Caisses" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/box-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/box.png"} alt=""/> 
                            )}
                            <span>Caisses</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Admin" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Admin")}>
                            {SelectCategorie ===  "Admin" ? (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/admin-select.png"} alt=""/>
                            ) : (
                                <img className="icon" src={"nui://BOUTIQUE-INFINITY/web/assets/icon/admin.png"} alt=""/> 
                            )}
                            <span>Admin</span>
                        </div>
                        </div>
                        <div className="box-information">
                            <img className="icon-user" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1277728344846106686/284356.png?ex=66d03300&is=66cee180&hm=507627d51098b0bf8a749476398603da1afc076517bddc65a9f6025165eab0f3&"} alt=""/>
                            <div className="info">
                                <span className="identifier" >{InformationPlayer?.Identifier}</span>
                                <span className="id-boutique">{`Identifiant - ${InformationPlayer?.IdBoutique}`}</span>
                                <span className="coins">{InformationPlayer?.Coins}</span>
                                <img className="icon-coins" src={`nui://BOUTIQUE-INFINITY/web/assets/coins.png`} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="boutique-center">
                        {(SelectCategorie === "Vehicules" || SelectCategorie === "Armes" || SelectCategorie === "Caisses") && (
                            <div className="wrapper-article">
                                {BoutiqueContents?.[SelectCategorie] && Object.values(BoutiqueContents?.[SelectCategorie]).map((value, index) => (
                                    <div className="box-article">
                                        <img className="image-article" src={`nui://BOUTIQUE-INFINITY/web/assets/${SelectCategorie}/${value.model}.png`} alt=""/>
                                        <div className="label-article">{value.label}</div>
                                        <div className="price-article">
                                            {value.price}
                                            <img className="icon-coins-article" src={`nui://BOUTIQUE-INFINITY/web/assets/coins.png`} alt=""/>
                                        </div>
                                        {SelectCategorie === "Vehicules" && (
                                            <div className="button-previsualiser-article" onClick={(e) => SetPreviewVehicule(value.model)}>{"PRÉVISUALISER"}</div>
                                        )}
                                        {SelectCategorie === "Armes" && (
                                            <div className="button-previsualiser-article" onClick={(e) => BuyArme(value.model)}>{"ACHETER"}</div>
                                        )}
                                        {SelectCategorie === "Caisses" && (
                                            <div className="button-previsualiser-article" onClick={(e) => BuyCaisse(value.model)}>{"ACHETER"}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {SelectCategorie === "Historique" && (
                            <>
                                <div className="info-historique">
                                  <span className="info-transaction">Transaction</span>
                                  <span className="info-coins">Coins</span>
                                  <span className="info-date">Date</span>
                                </div>
                                <div className="wrapper-historique">
                                    {InformationPlayer?.Historique && Object.values(InformationPlayer?.Historique).map((value, index) => ( 
                                        <div className="box-historique">
                                            <span className="info-transaction">{value.transaction}</span>
                                            <span className="info-coins">{value.coins}</span>
                                            <span className="info-date">{value.date}</span>
                                        </div>
                                    ))}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;