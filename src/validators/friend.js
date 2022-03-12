const Joi = require('joi')

const name = Joi.string().pattern(new RegExp('^[a-zA-Z]+$')).min(3).max(100)
const schema = Joi.object({
  last_name: name.required(),
  first_name: name.required(),
  email: Joi.string().email().required(),
  // for the sake of simplicity edge cases are not considered, more details here:
  // https://stackoverflow.com/questions/15491894/regex-to-validate-date-formats-dd-mm-yyyy-dd-mm-yyyy-dd-mm-yyyy-dd-mmm-yyyy
  date_of_birth: Joi.string()
    .pattern(new RegExp('^[0-9]{4}/[0-9]{1,2}/[0-9]{1,2}$'))
    .required(),
})

module.exports = (data) => schema.validate(data)
