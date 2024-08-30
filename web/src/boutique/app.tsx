import React, { useState, useRef, useEffect } from "react";
import { fetchNui } from "../utils/fetchNui";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { isEnvBrowser } from '../utils/misc';
import {Dev} from './Dev/dev'
import './boutique.scss';
import './style.scss';
import { debugData } from "../utils/debugData";

debugData([
    {
      action: "setVisible",
      data: true,
    },
]);

interface ContentsBoutique {
    Véhicules?: {
        [model: string]: {
            model: string;
            label: string;
            price: number;
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

const Inventory: React.FC = () => {
    const [InformationPlayer, setInformationPlayer] = useState<any | null>(null);
    const [SelectCategorie, setSelectCategorie] = useState<string>("Acceuil");
    const [SelectPreviewVéhicules, setSelectPreviewVéhicules] = useState<string | null>(null);
    const [BoutiqueContents, setBoutiqueContents] = useState<ContentsBoutique | null>({
        Véhicules: {
            "bmwm3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmwms3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmwmss3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmwm3gsss80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswm3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswsssm3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswssfdgsm3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswssfergdsm3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswsssmzef3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswsssmze3g80": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            },
            "bmssswsssm3g80hth": {
                model: "bmwm3g80",
                label: "BMW M3 G80 2021",
                price: 1400,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278439949611438280/image.png?ex=66d0cf7c&is=66cf7dfc&hm=7142fd4da426076290f41195c6b2421e90e317d7e0ff03a8731364d5266cc0ca&"
            }
        },
        Armes: {
            "weapon_carabineriflemk2": {
                model: "weapon_carabineriflemk2",
                label: "Carbine Rifle Mk II",
                price: 2200,
                image: "https://cdn.discordapp.com/attachments/1043600611175829615/1278445952822415481/image.png?ex=66d0d513&is=66cf8393&hm=9e78d7a763f65740682e21608e487b87fec7ddc265bde38a3f1282242f9c5588&"
            }, 
        },
        Caisses: {
            "caisse_gold": {
                model: "caisse_gold",
                label: "Caisse Gold",
                price: 5200,
                image: "https://csgoskins.gg/social-images/eyJpbWFnZV91cmwiOiJodHRwczpcL1wvY2RuLmNzZ29za2lucy5nZ1wvcHVibGljXC91aWhcL2l0ZW1zXC9hSFIwY0hNNkx5OXpkR1ZoYldOa2JpMWhMbUZyWVcxaGFXaGtMbTVsZEM5aGNIQnpMemN6TUM5cFkyOXVjeTlsWTI5dUwzZGxZWEJ2Ymw5allYTmxjeTlqY21GMFpWOWpiMjF0ZFc1cGRIbGZNVE11T1dFM1pESm1OelUzWkdSaVpHTTVNVFZoWVRBd05XUmxaamMwWVdNeE9EWmhORFUzTXpRMllTNXdibWMtXC9hdXRvXC9hdXRvXC84NVwvbm90cmltXC85Y2Y5Y2JjYzQ2NjI0MTM5NDc4OWJjMTk5Njc0ZDIwOS5wbmciLCJhc3BlY3RfcmF0aW8iOjEuOTEwODI4MDI1NDc3NzA3LCJzaWciOiJmYWVlYzJlZTRjMDJkNGQ3YWYzZjRiODU5ZGU0MmNiNiJ9.png"
            }, 
        }
    });

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
          if (event.key === 'Backspace') {
            if (SelectPreviewVéhicules) {
                setSelectPreviewVéhicules(null)
            }
          }
        };
    
        window.addEventListener('keydown', handleKeyDown);
    
        return () => {
          window.removeEventListener('keydown', handleKeyDown);
        };
    }, [SelectPreviewVéhicules]);

    return (
        <div className="wrapper-boutique">
            {isEnvBrowser() && (
                <Dev setInformationPlayer={setInformationPlayer}/>
            )}
            {!SelectPreviewVéhicules ? (
                <div className="boutique">
                    <div className="boutique-side-bar-right">
                        <img className="bannierre" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1277739560746483783/logo.png?ex=66d03d72&is=66ceebf2&hm=ebea99b994a2cae6e101affd2ad493f226f0fd054d185d7c44621d3a1a0a4dae&"} alt=""/>
                        <div className="box-button">
                        <div className={`button ${SelectCategorie ===  "Acceuil" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Acceuil")}>
                            {SelectCategorie ===  "Acceuil" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411855563456563/home-select.png?ex=66d0b552&is=66cf63d2&hm=623c0e2b74001241f0b1060f0bf66f655ea935c71917f45705dc850a82d44caf&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411855819178085/home.png?ex=66d0b552&is=66cf63d2&hm=ae97743515af7f910459928706bc85c290758c3c72be2bfff76977d7584a6541&"} alt=""/> 
                            )}
                            <span>Acceuil</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Historique" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Historique")}>
                            {SelectCategorie ===  "Historique" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411838023008346/history-select.png?ex=66d0b54d&is=66cf63cd&hm=b24aca5e956f1acb705a77d54d65c0bd48124738aa6710a6a34fb990c29631eb&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411838240981003/history.png?ex=66d0b54d&is=66cf63cd&hm=58b61f40e9ca08295c83c241fd0176cc0269a7dc5e44beae9182acf85522c0db&"} alt=""/> 
                            )}
                            <span>Historique</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Véhicules" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Véhicules")}>
                            {SelectCategorie ===  "Véhicules" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411826794598462/car-select.png?ex=66d0b54b&is=66cf63cb&hm=24e4af0021e8425ecd3f781d86a6525df89df6cecf408f1269254c1eb2e5c846&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411827033669725/car.png?ex=66d0b54b&is=66cf63cb&hm=8c9612bb4a49294c357b7a54aa459e2b3e55d57cc2a52890ffd9d242801efd8e&"} alt=""/> 
                            )}
                            <span>Véhicules</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Armes" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Armes")}>
                            {SelectCategorie ===  "Armes" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411870595710976/weapon-select.png?ex=66d0b555&is=66cf63d5&hm=758730abc57b49cc30189efdc72b93c69bffec1dcb6c9ba1680b34315496c0c2&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411870893641861/weapon.png?ex=66d0b555&is=66cf63d5&hm=3949284299ac088f8d7abba9b42a880b2d4fe725f1d9c2e4402be0a70564a4f6&"} alt=""/> 
                            )}
                            <span>Armes</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Caisses" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Caisses")}>
                            {SelectCategorie ===  "Caisses" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411794934665216/box-select.png?ex=66d0b543&is=66cf63c3&hm=b94f15f97c0406e279c2b4f24946ab28816523c9ec646ac3c88257ca9c911961&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411794645389363/box.png?ex=66d0b543&is=66cf63c3&hm=ba7f87e9f1f4e07787b3535f236b119bc027e34e133e09f08b1dea0ef524bd38&"} alt=""/> 
                            )}
                            <span>Caisses</span>
                        </div>
                        <div className={`button ${SelectCategorie ===  "Admin" ? 'select' : ''}`} onClick={(e) =>setSelectCategorie("Admin")}>
                            {SelectCategorie ===  "Admin" ? (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411772641939609/admin-select.png?ex=66d0b53e&is=66cf63be&hm=e0936238f9e36229a0df4d7daf04bac6457f5258ca8f3f166c60622079a1e078&"} alt=""/>
                            ) : (
                                <img className="icon" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278411772453191741/admin.png?ex=66d0b53e&is=66cf63be&hm=9f98cc322b4a05e835ef5e49b521237b26fd99c000e1cb0668ae826db96c2fec&"} alt=""/> 
                            )}
                            <span>Admin</span>
                        </div>
                        </div>
                        <div className="box-information">
                            <img className="icon-user" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1277728344846106686/284356.png?ex=66d03300&is=66cee180&hm=507627d51098b0bf8a749476398603da1afc076517bddc65a9f6025165eab0f3&"} alt=""/>
                            <div className="info">
                                <span className="identifier" >{InformationPlayer?.Identifer}</span>
                                <span className="id-boutique">{`Identifiant - ${InformationPlayer?.IdBoutique}`}</span>
                                <span className="coins">{InformationPlayer?.Coins}</span>
                                <img className="icon-coins" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278374740821540915/pngtree-blue-gemstone-diamond-illustration-image_1402869-removebg-preview.png?ex=66d092c1&is=66cf4141&hm=7aec0ad2f0ac189f5b8c9b62ad3dca1f0db307d31e54fa8039dc80e92b6fa29f&"} alt=""/>
                            </div>
                        </div>
                    </div>
                    <div className="boutique-center">
                        {(SelectCategorie === "Véhicules" || SelectCategorie === "Armes" || SelectCategorie === "Caisses") && (
                            <div className="wrapper-article">
                                {BoutiqueContents?.[SelectCategorie] && Object.values(BoutiqueContents?.[SelectCategorie]).map((value, index) => (
                                    <div className="box-article">
                                        <img className="image-article" src={value.image} alt=""/>
                                        <div className="label-article">{value.label}</div>
                                        <div className="price-article">
                                            {value.price}
                                            <img className="icon-coins-article" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278374740821540915/pngtree-blue-gemstone-diamond-illustration-image_1402869-removebg-preview.png?ex=66d092c1&is=66cf4141&hm=7aec0ad2f0ac189f5b8c9b62ad3dca1f0db307d31e54fa8039dc80e92b6fa29f&"} alt=""/>
                                        </div>
                                        {SelectCategorie === "Véhicules" && (
                                            <div className="button-previsualiser-article" onClick={(e) => setSelectPreviewVéhicules(value.model)}>{"PRÉVISUALISER"}</div>
                                        )}
                                        {(SelectCategorie === "Armes" || SelectCategorie === "Caisses") && (
                                            <div className="button-previsualiser-article">{"ACHETER"}</div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}
                        {SelectCategorie === "Historique" && (
                            <div className="wrapper-historique">
                                {InformationPlayer?.Historique && Object.values(InformationPlayer?.Historique).map((value, index) => ( 
                                    <div className="box-historique"></div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            ) : (
                <div className="boutique-preview-vehicules">
                     <img className="bannierre" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1277739560746483783/logo.png?ex=66d03d72&is=66ceebf2&hm=ebea99b994a2cae6e101affd2ad493f226f0fd054d185d7c44621d3a1a0a4dae&"} alt=""/>
                     <div className="box-button">
                        <div className="price-vehicule">
                            {1400}
                            <img className="icon-coins-vehicule" src={"https://cdn.discordapp.com/attachments/1277292715666571316/1278374740821540915/pngtree-blue-gemstone-diamond-illustration-image_1402869-removebg-preview.png?ex=66d092c1&is=66cf4141&hm=7aec0ad2f0ac189f5b8c9b62ad3dca1f0db307d31e54fa8039dc80e92b6fa29f&"} alt=""/>
                        </div>
                        <div className="button-test">{"TESTER"}</div>
                        <div className="button-buy">{"ACHETER"}</div>
                     </div>
                </div>
            )}
        </div>
    );
};

export default Inventory;