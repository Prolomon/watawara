
export default function Map ({title, price, date, shipping, quantity, status, brand, description}) {
    
    return (
      <div className="w-8/12 max-md:w-full relative bg-white rounded-md border border-gray-300">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d31666.40742191118!2d3.4325259999999997!3d7.2064689!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sng!4v1745261166970!5m2!1sen!2sng"
            className="border-none w-full h-full"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    );
}