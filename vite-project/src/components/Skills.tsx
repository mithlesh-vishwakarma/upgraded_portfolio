import { motion } from "framer-motion";

const Skills = () => {
  const skills = [
    { name: "HTML", level: "90%" },
    { name: "CSS", level: "80%" },
    { name: "JavaScript", level: "75%" },
    { name: "PHP", level: "70%" },
    { name: "WordPress", level: "85%" },
    { name: "jQuery", level: "60%" },
    { name: "Angular", level: "50%" },
    { name: "React", level: "70%" },
  ];

  return (
    <motion.section
      id="skills"
      className="py-20 bg-gray-900 text-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-yellow-500 mb-10">My Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {skills.map((skill) => (
            <div key={skill.name}>
              <div className="flex justify-between mb-1">
                <span className="font-bold">{skill.name}</span>
                <span>{skill.level}</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-4">
                <motion.div
                  className="bg-yellow-500 h-4 rounded-full"
                  initial={{ width: 0 }}
                  whileInView={{ width: skill.level }}
                  viewport={{ once: true, amount: 0.8 }}
                  transition={{ duration: 1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default Skills;
