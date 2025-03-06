import { useState, useEffect, FC, ReactNode } from "react";
import { connection, connections } from "../config/types.ts";
import SelectCard from "../../../shared/ui/SelectCard.tsx";

interface ConnectionProps {
    value?: connection,
    connection: connections,
    onChange: (value: connection) => void,
    highlight?: connections,
    onDelete?: () => void,
    checkHideOpt?: boolean
}

const Connection: FC<ConnectionProps> = ({value, connection, onChange, highlight, onDelete, checkHideOpt}): ReactNode => {
    /** Constants */
    const [selectedType, setSelectedType] = useState<string | undefined>(value?.connectionType)             // Значение типа подсоединения (находимся в компоненте с определенным номером подсоединения)
    const [selectedSize, setSelectedSize] = useState<string | undefined>(value?.connectionSize)             // Значение размера подсоединения (находимся в компоненте с определенным номером подсоединения)

    const titleType = `connectionTypes${connection.connectionNo}`                                           // Ключ, по которому берется текст для отображения заголовка на странице (для типа)
    const titleSize = `connectionSizes${connection.connectionNo}`                                           // Ключ, по которому берется текст для отображения заголовка на странице (для размера)


    /** UseEffects */
    /* При изменении типа или размера обновить основные данные */
    useEffect(() => {
        // Если тип или размер существует, то вызвать callback для изменения основных данных, передав туда объект типа connections
        if (selectedType || selectedSize)
            onChange({
                connectionNo: connection.connectionNo,
                connectionSize: selectedSize,
                connectionType: selectedType,
            })
        // Иначе вызвать callback для удаления этого подсоединения из основных данных (само подсоединение передается в callback при вызове этого компонента)
        else onDelete && onDelete()
    }, [selectedType, selectedSize]);


    /* При изменении value, приходящего извне, обновить значения для типа и размера */
    useEffect(() => {
        // Если новый тип отличается от текущего, то обновить
        if (value?.connectionType != selectedType)
            setSelectedType(value?.connectionType)

        // Если новый размер отличается от текущего, то обновить
        if (value?.connectionSize != selectedSize)
            setSelectedSize(value?.connectionSize)
    }, [value]);


    /** Build DOM */
    return <>
        <SelectCard
            value={value?.connectionType}
            option={titleType}
            values={connection.connectionTypes}
            onChange={value => setSelectedType(value)}
            highlight={highlight?.connectionTypes}
            onDelete={() => setSelectedType(undefined)}
            checkHideOpt={checkHideOpt}
        />
        <SelectCard
            value={value?.connectionSize}
            option={titleSize}
            values={connection.connectionSizes}
            onChange={value => setSelectedSize(value)}
            highlight={highlight?.connectionSizes}
            onDelete={() => setSelectedSize(undefined)}
            checkHideOpt={checkHideOpt}
        />
    </>
}

export default Connection
