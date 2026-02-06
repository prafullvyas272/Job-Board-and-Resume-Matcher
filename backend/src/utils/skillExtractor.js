const SKILLS = [
  "javascript", "react", "node", "express",
  "mongodb", "mysql", "html", "css",
  "python", "java", "aws", "docker"
];

export const extractSkills = (text) => {
  text = text.toLowerCase();
  return SKILLS.filter(skill => text.includes(skill));
};
