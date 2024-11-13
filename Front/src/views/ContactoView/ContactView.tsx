
import Image from "next/image";

const ContactView = () => {
  return (
    <div className="min-h-screen grid grid-cols-1 place-items-center lg:grid-cols-2 bg-[url('/images/fondo_contacto.jpg')] bg-cover bg-center h-screen">
      <div className="container bg-white m-auto mt-12 p-2 max-w-full shadow-sm rounded-sm lg:m-0 lg:p-8 lg:max-w-lg lg:shadow-lg lg:rounded-lg">
        <h2 className="text-4xl font-extrabold mb-6 text-center text-gray-800 font-cinzel">Contacto</h2>
        <p className="mb-6 text-gray-600 text-center font-nunito text-sm lg:text-lg">
        Please fill out the form for more information, and we will get in touch as soon as possible. All fields are required.
        </p>
        <form className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-base font-medium text-gray-700 font-roboto">
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              required
              placeholder="Enter your name"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-base font-medium text-gray-700 font-roboto">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="Enter your email"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-base font-medium text-gray-700 font-roboto">
              Phone:
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              required
              placeholder="Enter your phone number"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-base font-medium text-gray-700 font-roboto">
            Message:
            </label>
            <textarea
              id="message"
              name="message"
              required
              placeholder="Enter your message"
              className="mt-1 p-3 block w-full border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-32"
              style={{ resize: 'none' }}
            ></textarea>
          </div>
          <button
            type="submit"
            className="font-lato text-lg w-full py-3 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
               SEND
          </button>
        </form>
      </div>
      <div className='container p-2 bg-white shadow-sm rounded-sm lg:max-h-[1000px] lg:max-w-[600px] lg:p-4 lg:shadow-lg lg:rounded-lg'>
      <Image
          src="/images/vicnasolContacto.jpg"
          alt="contacto"
          width={1920}
          height={1080}
          className="min-w-full hover:transform hover:scale-105 transition duration-200 sm:min-h-full p-2 rounded-sm sm:w-[200px] lg:w-[400px] lg:max-h-[700px] lg:max-w-[400px]"
        />
        </div>
    </div>
  );
};

export default ContactView;
