import React from 'react'

export const Publico = () => {
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
            <li><a href="/auth/sign-in" className="hover:underline">Colaboradores</a></li>
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
    <section id="team" className="py-12">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-6">Nuestro Equipo</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 shadow-md rounded">
            <img src="/images/firefighter1.jpg" alt="Miembro del equipo" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="text-xl font-bold mt-4">Capitán Juan Pérez</h3>
            <p>Especialista en rescate en alturas.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded">
            <img src="/images/firefighter2.jpg" alt="Miembro del equipo" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="text-xl font-bold mt-4">Bombero María López</h3>
            <p>Experta en control de incendios.</p>
          </div>
          <div className="bg-white p-6 shadow-md rounded">
            <img src="/images/firefighter3.jpg" alt="Miembro del equipo" className="w-full h-40 object-cover rounded-md"/>
            <h3 className="text-xl font-bold mt-4">Bombero Pedro González</h3>
            <p>Primeros auxilios y rescate vehicular.</p>
          </div>
        </div>
      </div>
    </section>

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