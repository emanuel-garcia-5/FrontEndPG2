import React from 'react'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFire, faWater, faWind, faTruckMedical, faPeopleGroup } from '@fortawesome/free-solid-svg-icons';
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';

export const Publico = () => {

  const mapContainerRef = useRef();
  const mapRef = useRef();

  useEffect(() => {
    // TO MAKE THE MAP APPEAR YOU MUST
    // ADD YOUR ACCESS TOKEN FROM
    // https://account.mapbox.com
    mapboxgl.accessToken = 'pk.eyJ1IjoiZW1hbnVlbC1nYXJjaWEtNSIsImEiOiJjbTJrMDhidm8wYm9oMnBwc3l4ZmFsdzBkIn0.Rh19imwFpsPD6SYSXL_NGA';

    mapRef.current = new mapboxgl.Map({
      container: mapContainerRef.current,
      center: [-74.5, 40], // starting position [lng, lat]
      zoom: 9 // starting zoom
    });
  });
  return (
    <div className="font-sans">
    {/* Header */}
    <header className="bg-red-700 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src="/img/logo-bomberos2.png" alt="Logo de Bomberos Voluntarios" className="w-20 h-20 mr-4"></img>
        <h1 className="text-3xl font-bold">Cuerpo de Bomberos Voluntarios</h1>
        <nav>
          <ul className="flex space-x-4">
            <li><a href="#services" className="hover:underline">Servicios</a></li>
            <li><a href="#team" className="hover:underline">Equipo</a></li>
            <li><a href="#contact" className="hover:underline">Contacto</a></li>
            <li><Link to="/auth/sign-in" className="hover:underline">Colaboradores</Link></li>
          </ul>
        </nav>
      </div>
    </header>

    {/* Hero Section */}
    <section className="bg-[url('/img/bomberos-grupo-2.jpg')] bg-cover bg-center h-[400px] flex justify-center items-center">
      <div className="bg-black bg-opacity-50 text-white p-8 rounded">
        <h2 className="text-4xl font-bold">Protegiendo Vidas, Cada Día</h2>
        <p className="mt-2 text-lg">Estamos aquí para ayudarte en los momentos más difíciles.</p>
      </div>
    </section>

    {/* Servicios */}
    <section id="services" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Nuestros Servicios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded">
            <h3 className="text-xl font-bold">Atención de Emergencias</h3>
            <p>Respuesta rápida a todo tipo de emergencias.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded">
            <h3 className="text-xl font-bold">Rescate en Accidentes</h3>
            <p>Expertos en rescate vehicular y en estructuras colapsadas.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded">
            <h3 className="text-xl font-bold">Prevención de Incendios</h3>
            <p>Programas educativos y control de incendios en la comunidad.</p>
          </div>
        </div>
      </div>
    </section>

    {/* Equipo */}
    <div className="grid grid-cols-3 gap-4">
      <div className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
        <FontAwesomeIcon icon={faTruckMedical} className="mr-2" />
        Emergencias atendidas: 45
      </div>
      <div className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
        <FontAwesomeIcon icon={faFire} className="mr-2" />
        Incendios atendidos: 8
      </div>
      <div className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded">
        <FontAwesomeIcon icon={faPeopleGroup} className="mr-2" />
        Elementos activos: 1500
      </div>
    </div>

    {/* Contacto */}
    <section id="contact" className="py-12 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Contáctanos</h2>
        <form className="max-w-lg mx-auto bg-white p-6 shadow-md rounded">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Nombre</label>
            <input type="text" id="name" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input type="email" id="email" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje</label>
            <textarea id="message" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md" rows="4"></textarea>
          </div>
          <button type="submit" className="w-full bg-red-700 text-white py-2 rounded-md">Enviar</button>
        </form>
      </div>
      <div
      style={{ height: '100%' }}
      ref={mapContainerRef}
      className="map-container"
    />
    </section>
    {/* Footer */}
    <footer className="bg-red-700 text-white py-4">
      <div className="container mx-auto text-center">
        <p>&copy; 2024 Estación de Bomberos. Todos los derechos reservados.</p>
        <p>Dirección: Calle Principal, Jutiapa, Guatemala | Teléfono: 1234-5678</p>
      </div>
    </footer>
  </div>
  )
}

export default Publico;