const CreateError = require("http-errors");
const repository = require("./Skills.repository");
const Skills = require("../skills/Skills.model");
const { validateCreateRequest } = require("./Skills.validation");

const createSkills = async (userId, data) => {
  return new Promise(async (resolve, reject) => {
    try {
      await validateCreateRequest(userId, data);
      const skillNew = data.skill;
      // Check if the skills already exists for the userId
      let skillsOld = await repository.getByUserId(Skills, userId);
      let result;
      if (skillsOld) {
        // Add the new skill to the existing skills if it is not already present and if present, update the existing skill
        let skills = skillsOld.skills;
        let skillExists = skills.find((skill) => skill.name === skillNew.name);
        let skillsOmmitedNewOne = skills.filter(
          (skill) => skill.name !== skillNew.name
        );
        if (skillExists) {
          skillExists.level = skillNew.level;
          data.skills = [...skillsOmmitedNewOne, skillExists];
        } else {
          data.skills = [...skills, skillNew];
        }

        result = await repository.update(Skills, userId, data);
      } else {
        data.skills = [skillNew];
        const skillObj = new Skills(data);
        skillObj.userId = userId;
        result = await repository.create(skillObj);
      }
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

const getSkillsByUserId = async (userId) => {
  return new Promise((resolve, reject) => {
    try {
      if (!userId || userId === "") {
        throw new Error("UserId is required");
      }
      let result = repository.getByUserId(Skills, userId);
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

const getAllSkills = async () => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await repository.list(Skills, { limit: 10 });
      resolve(result);
    } catch (err) {
      reject(err);
    }
  });
};

module.exports = {
  createSkills,
  getSkillsByUserId,
};
