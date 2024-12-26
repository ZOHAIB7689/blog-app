import { FiMail, FiMapPin, FiPhone } from "react-icons/fi";

const ContactPage = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            Contact Us
          </h1>
          <p className="text-xl text-gray-600">
            Get in touch with our team. We're here to help.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-6 max-w-3xl py-20">
        <div className="grid md:grid-cols-3 gap-12 mb-16">
          <div className="space-y-4">
            <FiMail className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Email</h3>
            <p className="text-gray-600">hello@company.com</p>
          </div>
          <div className="space-y-4">
            <FiMapPin className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Office</h3>
            <p className="text-gray-600">123 Market St, San Francisco, CA</p>
          </div>
          <div className="space-y-4">
            <FiPhone className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Phone</h3>
            <p className="text-gray-600">+1 (555) 123-4567</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
              />
            </div>
          </div>

          <div>
            <label
              htmlFor="subject"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Message
            </label>
            <textarea
              id="message"
              rows={6}
              className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactPage;
