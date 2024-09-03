import {connection, connections} from "../routes/CalcPage.tsx";
// import {useEffect, useState} from "react";
import {SelectCard} from "./SelectCard.tsx";
import {useState, useEffect} from "react";

export function Connection({connection, onChange}: {connection: connections, onChange: (value: connection) => void}) {
    const [selectedType, setSelectedType] = useState<string | undefined>()
    const [selectedSize, setSelectedSize] = useState<string | undefined>()

    useEffect(() => {
        onChange({
            connectionNo: connection.connectionNo,
            connectionSizes: selectedSize,
            connectionTypes: selectedType,
        })
    }, [selectedType, selectedSize]);

    const titleType = `connectionTypes${connection.connectionNo}`
    const titleSize = `connectionSizes${connection.connectionNo}`

    return <>
        <SelectCard option={titleType} values={connection.connectionTypes} onChange={value => setSelectedType(value)}/>
        <SelectCard option={titleSize} values={connection.connectionSizes} onChange={value => setSelectedSize(value)}/>
    </>
}