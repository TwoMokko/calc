import {MdOutlineContentCopy, MdOutlineDoneAll} from "react-icons/md";
import {useState} from "react";

export function String({head, string, className}: {head: string, string: string, className? : string}): JSX.Element{
    const [copied, setCopied] = useState(false)

    function copyString(string: string): void {
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

    return <div className='product-info-string'>
        <div>{head}</div>
        <div className={className}>{string}</div>
        <div className='copy'>
            { copied ? <MdOutlineDoneAll /> : <MdOutlineContentCopy onClick={() => copyString(string)} /> }
        </div>
    </div>
}
