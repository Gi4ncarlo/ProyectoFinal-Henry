import Image from "next/image";

const ContactView = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 place-items-center lg:grid-cols-2 bg-[url('/images/fondo_contacto.jpg')] bg-cover bg-center pt-16 lg:pt-24">
      {/* Contenedor principal */}
      <div className="container bg-white m-auto mt-8 p-4 max-w-full shadow-sm rounded-sm lg:m-0 lg:p-8 lg:max-w-lg lg:shadow-lg lg:rounded-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-[#263238] font-cinzel">Contacto</h2>
        <p className="mb-6 text-[#263238] text-center font-nunito text-sm lg:text-lg">
          Por favor llene el formulario para más información, y nos pondremos en contacto lo más pronto posible. Debes completar todos los campos.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-[#263238] font-roboto">
              Nombre:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Introduce tu nombre"
              className="mt-1 p-3 block w-full border border-[#388E3C] rounded-md shadow-sm focus:ring-[#388E3C] focus:border-[#388E3C]"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-[#263238] font-roboto">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Ingresa tu correo electrónico"
              className="mt-1 p-3 block w-full border border-[#388E3C] rounded-md shadow-sm focus:ring-[#388E3C] focus:border-[#388E3C]"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-base font-medium text-[#263238] font-roboto">
              Teléfono:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Introduce tu número de teléfono"
              className="mt-1 p-3 block w-full border border-[#388E3C] rounded-md shadow-sm focus:ring-[#388E3C] focus:border-[#388E3C]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base font-medium text-[#263238] font-roboto">
              Mensaje:
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Introduce tu mensaje"
              className="mt-1 p-3 block w-full border border-[#388E3C] rounded-md shadow-sm focus:ring-[#388E3C] focus:border-[#388E3C] h-32"
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="w-full mt-4 p-2 bg-[#4CAF50] text-white font-bold rounded hover:bg-[#388E3C] focus:outline-none focus:ring-2 focus:ring-[#388E3C]"
          >
            ENVIAR
          </button>
        </form>
      </div>

      {/* Contenedor de la imagen */}
      <div className='container p-2 bg-white shadow-sm rounded-sm lg:max-w-[600px] lg:p-4 lg:shadow-lg lg:rounded-lg'>
        <Image
          src="/images/vicnasolContacto.jpg"
          alt="contacto"
          width={1920}
          height={1080}
          className="min-w-full hover:transform hover:scale-105 transition duration-200 sm:min-h-full p-2 rounded-sm sm:w-[200px] lg:w-[400px] lg:max-h-[600px] lg:max-w-[400px]"
        />
      </div>
    </div>
  );
};

export default ContactView;
