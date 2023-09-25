import React, { useState } from "react";
import styles from './styles/ColorDetail.module.css';
 
// colors corresponde a un arreglo de muchos arreglos
const ColorDetail = ({ color, setCurrentColor }) => {
    const isOpen = useState(false);
    const handleCloseDetail = () => {
        setCurrentColor(null);
    }

    return (
        <>
            {
                color ? (
                    <div className={`fixed ${styles.ColorDetail}`}>
                        <span>{color}</span>
                        <button onClick={handleCloseDetail}>CERRAR</button>
                    </div>
                ) : (
                    <></>
                )}
        
        </>
    );
};

export default ColorDetail;
