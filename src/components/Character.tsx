export function Character() {


    return <>
        <section>
            <h2>Характеристики</h2>
            <div className='character-group block'>
                <div className='character-group-select'>
                    <h4>Наименование</h4>
                    <select>
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                    </select>
                </div>
                <div className='character-group-select'>
                    <h4>Temp min</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>Давление min</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>Cv</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>ДавлКорп</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>Temp max</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>Давление max</h4>
                    <input/>
                </div>
                <div className='character-group-select'>
                    <h4>Dn</h4>
                    <input/>
                </div>
            </div>
        </section>
    </>
}