import React, {useState} from "react";
import {CanvasComponent} from "./components/CanvasComponent";
import {RadioButtons} from "./components/RadioButtons";
import './style/App.css'

const App: React.FC = () => {

    const[k, setK] = useState(3);

    const changeK = (k: number) => {
        setK(k);
    }

    return (
        <div className={"container"}>
            <CanvasComponent height={800} width={800} constValue={-1} orderValue={k} hueValues={[10, 120, 280, 320]} />
            <RadioButtons callbackFunc = {changeK}/>
        </div>
    );
}

export default App;
