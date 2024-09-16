import {SelectCard} from "./SelectCard.tsx";
import {useState, useEffect} from "react";
import {connection, connections} from "../types/Types.tsx";

export function Connection({value, connection, onChange, highlight}: {value?: connection,connection: connections, onChange: (value: connection) => void, highlight?: connections}): JSX.Element {
    const [selectedType, setSelectedType] = useState<string | undefined>()
    const [selectedSize, setSelectedSize] = useState<string | undefined>()

    useEffect(() => {
        if (selectedType && selectedSize) return
        if (selectedType || selectedSize)
            onChange({
                connectionNo: connection.connectionNo,
                connectionSize: selectedSize,
                connectionType: selectedType,
            })
    }, [selectedType, selectedSize]);


    useEffect(() => {
        if (value?.connectionType != selectedType)
            setSelectedType(value?.connectionType)

        if (value?.connectionSize != selectedSize)
            setSelectedSize(value?.connectionSize)
    }, [value]);


    const titleType = `connectionTypes${connection.connectionNo}`
    const titleSize = `connectionSizes${connection.connectionNo}`

    return <>
        <SelectCard
            value={value?.connectionType}
            option={titleType}
            values={connection.connectionTypes}
            onChange={value => setSelectedType(value)}
            highlight={highlight?.connectionTypes}
        />
        <SelectCard
            value={value?.connectionSize}
            option={titleSize}
            values={connection.connectionSizes}
            onChange={value => setSelectedSize(value)}
            highlight={highlight?.connectionSizes}
        />
    </>
}