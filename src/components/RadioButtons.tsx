import React from "react";

export const RadioButtons: React.FC = () => {
    return (
        <div>
            <div className="form-check">
                <input className="form-check-input" type="radio" name="orderValue" id="radioBtn3" defaultChecked />
                <label className="form-check-label" htmlFor="radioBtn3">3</label>
            </div>

            <div className="form-check">
                <input className="form-check-input" type="radio" name="orderValue" id="radioBtn4" />
                <label className="form-check-label" htmlFor="radioBtn4">4</label>
            </div>
        </div>
    );
}