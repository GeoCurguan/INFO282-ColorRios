import React, { useState, useEffect } from 'react';

const TopColors = ({ username, onColorClick }) => {
    const [topColorsClicks, setTopColorsClicks] = useState([]);
    const [topColorsPalettes, setTopColorsPalettes] = useState([]);

    const handleColorClick = (color) => {
        onColorClick(color);
    }

    useEffect(() => {

        const fetchData = async () => {
            // TopColors por Click
            try {
                const response = await fetch('/api/getColors/topByClicks');
                if (!response.ok) {
                    throw new Error('Error al obtener los colores populares por clicks');
                }

                const data = await response.json();
                setTopColorsClicks(data.topColors);
            } catch (error) {
                console.error(error.message);
            }
            // Top Colors por NPaletas
            try {
                const response = await fetch('/api/colors/topbypalettes');
                if (!response.ok) {
                    throw new Error('Error al obtener los colores populares por paletas');
                }

                const data = await response.json();
                setTopColorsPalettes(data.topColors);
            } catch (error) {
                console.error(error.message);
            }
        };

        const fetchDataUsername = async () => {
            // TopColors por Click + Usuario
            try {
                const response = await fetch('/api/colors/topbyclicks/${username}');
                if (!response.ok) {
                    throw new Error('Error al obtener los colores populares por clicks de ese usuario');
                }

                const data = await response.json();
                setTopColorsClicks(data.topColors);
            } catch (error) {
                console.error(error.message);
            }
            // Top Colors por NPaletas + Usuario
            try {
                const response = await fetch('/api/colors/topbypalettes/${username}');
                if (!response.ok) {
                    throw new Error('Error al obtener los colores populares por paletas de ese usuario');
                }

                const data = await response.json();
                setTopColorsPalettes(data.topColors);
            } catch (error) {
                console.error(error.message);
            }
        };

        if (username) { // Si fue entregado un username ocurre lo siguiente.
            fetchDataUsername();
        } else {
            fetchData();
        }

    }, [username]); //Hook. Cuando estas variables cambien, se vuelve a ejecutar el useEffect.

    function threeColors(colorsArray) {
        let color0 = "rgb(255, 255, 255)";
        let color1 = "rgb(255, 255, 255)";
        let color2 = "rgb(255, 255, 255)";
        if (colorsArray[0]) {
            color0 = "rgb(" + colorsArray[0]["R"] + ", " + colorsArray[0]["G"] + ", " + colorsArray[0]["B"] + ")"
        }
        if (colorsArray[1]) {
            color1 = "rgb(" + colorsArray[1]["R"] + ", " + colorsArray[1]["G"] + ", " + colorsArray[1]["B"] + ")"
        }
        if (colorsArray[2]) {
            color2 = "rgb(" + colorsArray[2]["R"] + ", " + colorsArray[0]["G"] + ", " + colorsArray[2]["B"] + ")"
        }
        return <>
            <div class="h-32 w-32 rounded" style={color0} onClick={() => handleColorClick(colorsArray[0])}></div>
            <div class="flex flex-row space-x-2 p-2">
                <div class="h-14 w-14 rounded" style={color1} onClick={() => handleColorClick(colorsArray[1])}></div>
                <div class="h-14 w-14 rounded" style={color2} onClick={() => handleColorClick(colorsArray[2])}></div>
            </div>
        </>
    }

    return (
        <div class="rounded-xl bg-gray-300 shadow-md">
            <div class="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">Colores populares</div>
            <div class="flex flex-row py-4">

                <div class="flex w-full flex-col items-center justify-center">
                    <h1 class="truncate text-center text-xl font-bold py-2">Mas Clickeados</h1>
                    {threeColors(topColorsClicks)}
                    <div class="h-32 w-32 rounded bg-red-500"></div>
                    <div class="flex flex-row space-x-2 p-2">
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                    </div>
                </div>

                <div class="flex w-full flex-col items-center justify-center">
                    <h1 class="truncate text-center text-xl font-bold py-2">En mas paletas</h1>
                    {threeColors(topColorsPalettes)}
                    <div class="h-32 w-32 rounded bg-red-500"></div>
                    <div class="flex flex-row space-x-2 p-2">
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TopColors;