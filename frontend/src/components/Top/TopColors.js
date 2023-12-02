import React, { useState, useEffect } from 'react';

const TopColors = ({ username }) => {
    const [topColorsClicks, setTopColorsClicks] = useState([]);
    const [topColorsPalettes, setTopColorsPalettes] = useState([]);

    useEffect(() => {

        const fetchData = async () => {
            // TopColors por Click
            try {
                const response = await fetch('/api/colors/topbyclicks');
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

    return (
        <div class="rounded-xl bg-gray-300 shadow-md">
            <div class="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">Colores populares</div>
            <div class="flex flex-row py-4">

                <div class="flex w-full flex-col items-center justify-center">
                    <h1 class="truncate text-center text-xl font-bold py-2">Mas Clickeados</h1>
                    <div class="h-32 w-32 rounded bg-red-500"></div>
                    <div class="flex flex-row space-x-2 p-2">
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                        <div class="h-14 w-14 rounded bg-red-500"></div>
                    </div>
                </div>

                <div class="flex w-full flex-col items-center justify-center">
                    <h1 class="truncate text-center text-xl font-bold py-2">En mas paletas</h1>
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