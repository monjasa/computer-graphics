import React from "react";
import {CanvasComponent} from "./components/CanvasComponent";
import {RadioButtons} from "./components/RadioButtons";
import './style/App.css'

const App: React.FC = () => {
    return (
        <div className={"container"}>
            <CanvasComponent height={800} width={800} constValue={-1} orderValue={4} hueValues={[10, 120, 280, 320]} />
            <RadioButtons />
        </div>
    );
}

export default App;
