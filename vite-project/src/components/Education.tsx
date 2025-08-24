import { motion } from "framer-motion";

const Education = () => {
  const educations = [
    {
      degree: "Master in Computer Science",
      university: "University of ABC",
      years: "2014 - 2016",
    },
    {
      degree: "Bachelor in Computer Science",
      university: "University of XYZ",
      years: "2010 - 2014",
    },
  ];

  return (
    <motion.section
      id="education"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          Education
        </h2>
        <div className="relative">
          <div className="border-l-2 border-yellow-500 absolute h-full top-0 left-1/2 -translate-x-1/2"></div>
          {educations.map((edu, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-5/12"></div>
              <div className="z-10 bg-yellow-500 rounded-full w-8 h-8"></div>
              <motion.div
                className="w-5/12 bg-gray-800 p-4 rounded-lg"
                initial={{ x: index % 2 === 0 ? 200 : -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-bold">{edu.degree}</h3>
                <p className="text-yellow-500">{edu.university}</p>
                <p>{edu.years}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Education;
