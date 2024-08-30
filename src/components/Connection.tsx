import {connections} from "../routes/CalcPage.tsx";
// import {useEffect, useState} from "react";
import {InputCard} from "./InputCard.tsx";

export function Connection({connection}: {connection: connections}) {
    // const [selectedType, setSelectedType] = useState<string | undefined>()
    // const [selectedSize, setSelectedSize] = useState<string | undefined>()
    //
    // useEffect(() => {
    //     console.log({selectedSize, selectedType})
    // }, [selectedType, selectedSize]);

    const titleType = `connectionTypes${connection.connectionNo}`
    const titleSize = `connectionSizes${connection.connectionNo}`

    return <>
        <InputCard option={titleType} values={connection.connectionTypes} />
        <InputCard option={titleSize} values={connection.connectionSizes} />
    </>
}