import React, { useState, useEffect } from 'react';

const TopPalettes = ({ username }) => {
  const [topPalettes, setTopColors] = useState([]);

  useEffect(() => {

  }, []);
    
  return (
    <div class="rounded-xl bg-gray-300 shadow-md">
      <div class="w-full h-12 rounded-t-xl bg-gray-100 shadow-md flex items-center justify-center text-center text-2xl font-bold">Paletas populares</div>

      <div class="w-full p-4">
        <h1>Paleta Numero 1</h1>
        <div class="flex items-center space-x-1">
          <div class="h-14 w-full rounded bg-red-500"></div>
        </div>
      </div>

      <div class="w-full p-4">
        <h1>Paleta Numero 2</h1>
        <div class="flex items-center space-x-1">
          <div class="h-14 w-full rounded-l bg-red-500"></div>
          <div class="h-14 w-full rounded-r bg-red-500"></div>
        </div>
      </div>

      <div class="w-full p-4">
        <h1>Paleta Numero 3</h1>
        <div class="flex items-center space-x-1">
          <div class="h-14 w-full rounded-l bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full rounded-r bg-red-500"></div>
        </div>
      </div>

      <div class="w-full p-4">
        <h1>Paleta Numero 4</h1>
        <div class="flex items-center space-x-1">
          <div class="h-14 w-full rounded-l bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full bg-red-500"></div>
          <div class="h-14 w-full rounded-r bg-red-500"></div>
        </div>
      </div>

    </div>);
}

export default TopPalettes