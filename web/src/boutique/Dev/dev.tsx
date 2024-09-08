import React, { useEffect } from 'react';

interface Dev {
    setInformationPlayer:  React.Dispatch<React.SetStateAction<any | null>>;
}

export const Dev: React.FC<Dev> = ({ setInformationPlayer }) => {

    useEffect(() => {
        setInformationPlayer({
            Identifier: "Destructor",
            IdBoutique: "6545",
            Coins: 1400,
            Historique: [
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '28/08/2024'},
                {transaction: "BMW M3 G80 2021", coins: -1400, date: '27/08/2024'},
            ]
        })
    }, []);

    return (
        <>
            <img src={"https://i.imgur.com/3pzRj9n.png"} alt="" style={{ height: "100%", width: "100%", pointerEvents: "none" }} />
        </>
    );
};
