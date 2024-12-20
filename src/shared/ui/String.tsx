import {FC, ReactNode, useState} from "react";
import { MdOutlineContentCopy, MdOutlineDoneAll } from "react-icons/md";

interface StringProps {
    head: string,
    string: string,
    className? : string
}

export const String: FC<StringProps> = ({head, string, className}): ReactNode => {
    /** Constants */
    const [copied, setCopied] = useState(false)                 // Если состояние true, пользователю будет показано, что у него получилось скопировать

    /** Constants (functions) */
    /* Копирование строки в буфер обмена */
    const copyString = (string: string): void => {
        if (string) {
            navigator.clipboard.writeText(string)
                .then(() => {
                    if (!copied) {
                        setCopied(true)
                        setTimeout(() => {
                            setCopied(false)
                        }, 1000);
                    }
                })
                .catch(err => {
                    console.log('ошибка', err);
                })
        }
    }

    /** Build DOM */
    return <div className='product-info-string'>
        <div>{head}</div>
        <div className={className}>{string}</div>
        <div className='copy'>
            { copied ? <MdOutlineDoneAll /> : <MdOutlineContentCopy onClick={() => copyString(string)} /> }
        </div>
    </div>
}
