import Image from "next/image";
import { FiUsers, FiBox, FiAward } from "react-icons/fi";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="w-full py-20 bg-gray-50">
        <div className="container mx-auto px-6 max-w-3xl">
          <h1 className="text-4xl font-semibold text-gray-900 tracking-tight mb-4">
            About Us
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Building the future of digital storytelling through thoughtful
            content and engaging experiences.
          </p>
        </div>
      </div>

      {/* Mission Statement */}
      <div className="container mx-auto px-6 max-w-3xl py-20">
        <div className="grid md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <FiUsers className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Our Community</h3>
            <p className="text-gray-600">
              Building connections through shared knowledge and experiences.
            </p>
          </div>
          <div className="space-y-4">
            <FiBox className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Our Mission</h3>
            <p className="text-gray-600">
              Creating valuable content that educates, inspires, and empowers.
            </p>
          </div>
          <div className="space-y-4">
            <FiAward className="h-6 w-6 text-gray-900" />
            <h3 className="text-lg font-medium text-gray-900">Our Values</h3>
            <p className="text-gray-600">
              Committed to quality, transparency, and continuous learning.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-50 py-20">
        <div className="container mx-auto px-6 max-w-3xl">
          <h2 className="text-2xl font-semibold text-gray-900 mb-12">
            Meet Our Team
          </h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "Sarah Johnson",
                role: "Editor in Chief",
                image: "/api/placeholder/400/400",
              },
              {
                name: "Michael Chen",
                role: "Lead Developer",
                image: "/api/placeholder/400/400",
              },
              {
                name: "Emily Davis",
                role: "Content Strategist",
                image: "/api/placeholder/400/400",
              },
              {
                name: "David Kim",
                role: "Creative Director",
                image: "/api/placeholder/400/400",
              },
            ].map((member) => (
              <div key={member.name} className="group">
                <div className="aspect-square relative overflow-hidden rounded-lg mb-4">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900">
                  {member.name}
                </h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="container mx-auto px-6 max-w-3xl py-20">
        <div className="grid md:grid-cols-3 gap-12 text-center">
          <div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">
              50K+
            </div>
            <div className="text-gray-600">Monthly Readers</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">
              200+
            </div>
            <div className="text-gray-600">Published Articles</div>
          </div>
          <div>
            <div className="text-3xl font-semibold text-gray-900 mb-2">15+</div>
            <div className="text-gray-600">Team Members</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
