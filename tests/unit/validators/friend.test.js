const validateFriend = require('../../../src/validators/friend')

describe('validateFriend', () => {
  test('successfully', async () => {
    const { error } = validateFriend({
      last_name: 'Doe',
      first_name: 'John',
      email: 'john.doe@hotmail.com',
      date_of_birth: '1982/10/10',
    })
    expect(error).toBe(undefined)
  })

  test('return an error object if validation fails', async () => {
    const { error } = validateFriend({
      last_name: 'Doe',
      first_name: 'John',
      email: 'john.hotmail.com',
      date_of_birth: '1982/10/10',
    })
    expect(error).toEqual(new Error('"email" must be a valid email'))
  })
})
