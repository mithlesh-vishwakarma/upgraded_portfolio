import { motion } from "framer-motion";

const Experience = () => {
  const experiences = [
    {
      role: "Senior Web Developer",
      company: "ABC Inc.",
      years: "2020 - Present",
    },
    {
      role: "Web Developer",
      company: "XYZ Corp.",
      years: "2018 - 2020",
    },
    {
      role: "Junior Web Developer",
      company: "123 Co.",
      years: "2016 - 2018",
    },
  ];

  return (
    <motion.section
      id="experience"
      className="py-20 bg-gray-800 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">
          Professional Experience
        </h2>
        <div className="relative">
          <div className="border-l-2 border-yellow-500 absolute h-full top-0 left-1/2 -translate-x-1/2"></div>
          {experiences.map((exp, index) => (
            <div
              key={index}
              className={`mb-8 flex justify-between items-center w-full ${
                index % 2 === 0 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="w-5/12"></div>
              <div className="z-10 bg-yellow-500 rounded-full w-8 h-8"></div>
              <motion.div
                className="w-5/12 bg-gray-700 p-4 rounded-lg"
                initial={{ x: index % 2 === 0 ? 200 : -200, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.8 }}
              >
                <h3 className="text-xl font-bold">{exp.role}</h3>
                <p className="text-yellow-500">{exp.company}</p>
                <p>{exp.years}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Experience;
