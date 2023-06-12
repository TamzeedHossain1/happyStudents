import { perticipentHistoryCreation, createQuizAnswer, updateAperticipentHistory, checkRequiredFields } from "../helper/helper.js"
export const answerQuizQuestion = async (req, res, next) =>{
      const { user, body, params } = req
      const { answers = []} = body
      if(answers.length < 1) return next(createError(404, 'Answer the quizes before submit!'))

      const createPerticipentHistory = await perticipentHistoryCreation(user, body, params)

      const createAnswer =  await createQuizAnswer(answers, createPerticipentHistory)

      await updateAperticipentHistory(createAnswer, params)

      res.status(200).send('Answer Submitted!')

}