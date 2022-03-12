const fs = require('fs')
const path = require('path')
const csvParser = require('csv-parser')
const cron = require('node-cron')

const validateFriend = require('../validators/friend.js')

const processRow = ({ row, notify }) => {
  try {
    const { error } = validateFriend(row)
    if (error) throw new Error(error)

    const dob = new Date(row.date_of_birth)
    const cronExpression = `0 0 0 ${dob.getDate()} ${dob.getMonth() + 1} * *`
    if (!cron.validate(cronExpression)) {
      throw new Error(`Invalid cron expression (${cronExpression})`)
    }

    cron.schedule(cronExpression, () => notify(row))
  } catch (err) {
    console.error(err)
  }
}

const DUMMY_DATA = path.resolve(
  __dirname,
  '../../tests/unit/mocks/good_friends.csv'
)

module.exports = ({ notify, file }) => {
  const csv = fs.createReadStream(file || DUMMY_DATA)

  csv
    .pipe(csvParser())
    .on('data', (row) => processRow({ row, notify }))
    .on('end', () => {
      console.log('Loaded schedule successfully')
      csv.destroy()
    })
    .on('close', () => console.log('Stream has been successfully destroyed'))
    .on('error', (err) => {
      console.error('Error reading CSV file', err)
      process.exit(1)
    })
}
