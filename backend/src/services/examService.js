const db = require("../models/index");
const argon2 = require("argon2");
const { Op } = require("sequelize");
const handleDeleteImageFile = require("../utils/handleDeleteImageFile");
const keyMap = require("../utils/constant/keyMap");
const moment = require("moment");
const examQuestionService = require("./examQuestionService");
const resultExamService = require("./resultExamService");
const examInvigilatorService = require("./examInvigilatorService");
require("dotenv").config();

class examService {
  //Create teacherId, questionPrompt, level, type
  //Update teacherId, questionPrompt, level, type, questionSelectedId
  isExamExists = async ({ name, classId, type, examSelectedId }) => {
    try {
      let examFind;
      if (type === keyMap.function.CREATE) {
        examFind = await db.Exam.findOne({
          where: {
            name: name,
            classId: classId,
          },
        });
      } else if (type === keyMap.function.UPDATE) {
        examFind = await db.Exam.findOne({
          where: {
            name: name,
            classId: classId,
            id: {
              [Op.ne]: examSelectedId,
            },
          },
        });
      }
      return examFind;
    } catch (error) {
      throw error;
    }
  };
  getAllFindExam = async () => {
    try {
      let examFindAll = await db.Exam.findAll();
      return examFindAll;
    } catch (error) {
      throw error;
    }
  };

  // getQuestions = async ({ typeId, level, search, teacherId }) => {
  //     try {
  //         let optionSearch = {
  //             typeId: typeId,
  //             level: level,
  //             teacherId: teacherId
  //         }
  //         if (search) {
  //             optionSearch.questionPrompt = {
  //                 [Op.iLike]: `%${search}%`
  //             }
  //         }
  //         let listData = await db.Question.findAll({
  //             where: optionSearch
  //         })
  //         return listData
  //     } catch (error) {
  //         throw error
  //     }
  // }

  createNewExam = async ({
    teacherId,
    name,
    description,
    timeLimit,
    classId,
    dateFinish,
    typeId,
    statusId,
    listQuestionId,
  }) => {
    try {
      let checkCreate = await db.Exam.create({
        teacherId: teacherId,
        name: name,
        description: description,
        classId: classId,
        dateUpload: moment().format(keyMap.timeType.NO_HOURS),
        dateFinish: dateFinish,
        typeId: typeId,
        statusId: statusId,
        timeLimit: timeLimit,
      });

      let checkCreateQuestionExam =
        await examQuestionService.createListQuestionExam({
          examId: checkCreate.id,
          listQuestionId,
        });
      if (!checkCreateQuestionExam) {
        return checkCreateQuestionExam;
      }
      return checkCreate;
    } catch (error) {
      throw error;
    }
  };

  updateOneExam = async ({
    examId,
    teacherId,
    name,
    description,
    classId,
    timeLimit,
    dateFinish,
    typeId,
    statusId,
    listQuestionId,
    isUpdateQuestion,
  }) => {
    try {
      let examSelected = await db.Exam.findOne({
        where: {
          id: examId,
        },
      });
      examSelected.statusId = statusId;
      examSelected.name = name;
      examSelected.description = description;
      examSelected.classId = classId;
      examSelected.dateFinish = dateFinish;
      examSelected.typeId = typeId;
      examSelected.teacherId = teacherId;
      examSelected.timeLimit = timeLimit;

      if (isUpdateQuestion) {
        let checkUpdateQuestionExam =
          await examQuestionService.updateListQuestionExam({
            examId,
            listQuestionId,
          });
        if (!checkUpdateQuestionExam) {
          return checkUpdateQuestionExam;
        }
      }
      let checkUpdate = await examSelected.save();

      return checkUpdate;
    } catch (error) {
      throw error;
    }
  };

  // updateOneQuestion = async ({ questionSelectedId, teacherId, questionPrompt, options, answer, typeId, level }) => {
  //     try {
  //         let questionSelected = await db.Question.findOne({ where: { id: questionSelectedId } })
  //         questionSelected.teacherId = teacherId
  //         questionSelected.questionPrompt = questionPrompt
  //         questionSelected.options = options
  //         questionSelected.answer = answer
  //         questionSelected.typeId = typeId
  //         questionSelected.level = level
  //         let checkUpdate = await questionSelected.save()
  //         return checkUpdate
  //     } catch (error) {
  //         throw error
  //     }
  // }

  // deleteOneQuestionById = async (questionSelectedId) => {
  //     try {
  //         let checkDelete = await db.Question.destroy({
  //             where: { id: questionSelectedId }
  //         })
  //         return checkDelete
  //     } catch (error) {
  //         throw error
  //     }
  // }

  getListAssignmentsClassByClassId = async ({ classId }) => {
    try {
      let assignment = await db.Exam.findAll({
        where: {
          classId: classId,
          typeId: keyMap.examTypeId.ASSIGNMENT,
        },
        raw: true,
      });
      return assignment;
    } catch (error) {
      throw error;
    }
  };

  getListExamsClassByClassId = async ({ classId }) => {
    try {
      let exams = await db.Exam.findAll({
        where: {
          classId: classId,
          typeId: keyMap.examTypeId.EXAM,
        },
        raw: true,
      });
      return exams;
    } catch (error) {
      throw error;
    }
  };

  getContentExamByExamId = async ({ examId }) => {
    try {
      let data = await db.Exam.findOne({
        where: {
          id: examId,
        },
        include: [
          {
            model: db.User,
            as: "teacherExamData",
            attributes: ["id", "email", "firstName", "lastName"],
          },
        ],
        raw: true,
      });
      let dataInvigilator;
      if (data.typeId === keyMap.examTypeId.EXAM) {
        dataInvigilator =
          await examInvigilatorService.getListInvigilatorDataByExamId({
            examId,
          });
        return {
          ...data,
          invigilatorData: dataInvigilator.invigilatorOfExamData,
        };
      }
      return data;
    } catch (error) {
      throw error;
    }
  };

  getInforExamByExamId = async ({ examId }) => {
    try {
      let data = await db.Exam.findOne({
        where: { id: examId },
        include: [
          {
            model: db.User,
            as: "teacherExamData",
            attributes: ["id", "firstName", "lastName", "image"],
          },
          {
            model: db.Question,
            as: "questionsOfExamData",
            attributes: ["id", "questionPrompt"],
            through: { attributes: [] },
          },
        ],
      });
      return data;
    } catch (error) {
      throw error;
    }
  };

  getListExamIsNotDoneByListClassId = async ({
    listClassId,
    listClassIdIsDone,
  }) => {
    try {
      let exams = await db.Exam.findAll({
        where: {
          classId: {
            [Op.in]: listClassId,
          },
          id: {
            [Op.notIn]: listClassIdIsDone,
          },
          statusId: keyMap.examTypeId.OPEN,
        },
        include: [
          {
            model: db.Class,
            as: "classOfExamData",
            attributes: ["name"],
          },
        ],
      });
      return exams;
    } catch (error) {
      throw error;
    }
  };

  deleteExamOfClass = async ({ classId }) => {
    try {
      let checkDetele = await db.Exam.destroy({
        where: { classId: classId },
      });
      return checkDetele;
    } catch (error) {
      throw error;
    }
  };

  deleteOneExamByExamId = async ({ examId }) => {
    try {
      let checkDelExam = await db.Exam.destroy({
        where: {
          id: examId,
        },
      });
      let checkDeleteQuestionExam =
        await examQuestionService.deleteQuestionExamByExamId({ examId });
      await resultExamService.deleteResultOfExam({ examId });
      if (!checkDeleteQuestionExam) {
        return checkDeleteQuestionExam;
      }
      return checkDelExam;
    } catch (error) {
      throw error;
    }
  };

  openExamByExamId = async ({ examId }) => {
    try {
      let data = await db.Exam.findOne({
        where: {
          id: examId,
        },
      });
      data.statusId = keyMap.examTypeId.OPEN;
      let checkUpdate = await data.save();
      return checkUpdate;
    } catch (error) {
      throw error;
    }
  };
  isExamExists = async ({ name, classId, type, examSelectedId }) => {
    try {
      let examFind;
      if (type === keyMap.function.CREATE) {
        examFind = await db.Exam.findOne({
          where: {
            name: name,
            classId: classId,
          },
        });
      } else if (type === keyMap.function.UPDATE) {
        examFind = await db.Exam.findOne({
          where: {
            name: name,
            classId: classId,
            id: {
              [Op.ne]: examSelectedId,
            },
          },
        });
      }
      return examFind;
    } catch (error) {
      throw error;
    }
  };
  createNewAssignmentByTeacher = async (req, res) => {
    try {
      const {
        name,
        description,
        classId,
        dateFinish,
        timeLimit,
        listQuestionId,
      } = req.body;
      const userId = req.userId;

      if (
        !name ||
        !description ||
        !classId ||
        !dateFinish ||
        !timeLimit ||
        !listQuestionId ||
        listQuestionId.length === 0
      ) {
        return res.status(200).json({
          result: false,
          messageEN: "Invalid information",
          messageVI: "Thiếu thông tin chuyền lên",
        });
      }

      const checkExists = await this.isExamExists({
        name,
        classId,
        type: keyMap.function.CREATE,
      });

      if (checkExists) {
        return res.status(200).json({
          result: false,
          messageEN: "Assignment name is already used",
          messageVI: "Tên bài tập đã được sử dụng",
        });
      }

      const created = await this.createNewExam({
        teacherId: userId,
        name,
        description,
        timeLimit,
        classId,
        dateFinish,
        typeId: keyMap.examTypeId.ASSIGNMENT,
        statusId: keyMap.examTypeId.CLOSE,
        listQuestionId,
      });

      if (!created) {
        return res.status(200).json({
          result: false,
          messageEN: "Create new assignment failed",
          messageVI: "Tạo bài tập thất bại",
        });
      }

      return res.status(200).json({
        result: true,
        messageEN: "Create new assignment successfully",
        messageVI: "Tạo bài tập thành công",
        assignmentId: created.id,
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        result: false,
        message: "Có lỗi từ phía server",
        error: error.message,
      });
    }
  };
  updateAssignmentByTeacher = async (req, res) => {
    try {
      const {
        assignmentId,
        name,
        description,
        classId,
        timeLimit,
        dateFinish,
        listQuestionId,
        isUpdateQuestion,
      } = req.body;

      const userId = req.userId;

      if (
        !assignmentId ||
        !name ||
        !description ||
        !classId ||
        !timeLimit ||
        !dateFinish ||
        !listQuestionId ||
        listQuestionId.length === 0
      ) {
        return res.status(200).json({
          result: false,
          messageEN: "Invalid information",
          messageVI: "Thiếu thông tin chuyền lên",
        });
      }

      const checkExists = await examService.isExamExists({
        name,
        classId,
        type: keyMap.function.UPDATE,
        examSelectedId: assignmentId,
      });

      if (checkExists) {
        return res.status(200).json({
          result: false,
          messageEN: "Assignment name is already used",
          messageVI: "Tên bài tập đã được sử dụng",
        });
      }

      const updated = await examService.updateOneExam({
        examId: assignmentId,
        teacherId: userId,
        name,
        description,
        classId,
        timeLimit,
        dateFinish,
        typeId: keyMap.examTypeId.ASSIGNMENT,
        statusId: keyMap.examTypeId.CLOSE,
        listQuestionId,
        isUpdateQuestion: !!isUpdateQuestion,
      });

      if (!updated) {
        return res.status(200).json({
          result: false,
          messageEN: "Update assignment failed",
          messageVI: "Cập nhật bài tập thất bại",
        });
      }

      return res.status(200).json({
        result: true,
        messageEN: "Update assignment successfully",
        messageVI: "Cập nhật bài tập thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        result: false,
        message: "Có lỗi từ phía server",
        error: error.message,
      });
    }
  };
  deleteAssignmentByTeacher = async (req, res) => {
    try {
      const { assignmentId } = req.query;
      if (!assignmentId) {
        return res.status(200).json({
          result: false,
          messageEN: "Invalid information",
          messageVI: "Thiếu thông tin chuyền lên",
        });
      }

      const deleted = await this.deleteOneExamByExamId({
        examId: assignmentId,
      });

      if (!deleted) {
        return res.status(200).json({
          result: false,
          messageEN: "Delete assignment failed",
          messageVI: "Xoá bài tập thất bại",
        });
      }

      return res.status(200).json({
        result: true,
        messageEN: "Delete assignment successfully",
        messageVI: "Xoá bài tập thành công",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({
        result: false,
        message: "Có lỗi từ phía server",
        error: error.message,
      });
    }
  };
}

module.exports = new examService();
