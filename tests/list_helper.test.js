const listHelper = require('../utils/list_helper')
const helper = require('./test_helper')

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  test('when list has only one blog, equals the likes of that', () => {
    const result = listHelper.totalLikes(helper.listWithOneBlog)
    expect(result).toBe(helper.listWithOneBlog[0].likes)
  })

  test('calculate the total likes of the list with 6 blogs', () => {
    const result = listHelper.totalLikes(helper.listWithSixBlogs)
    expect(result).toBe(helper.perpertyOfBlogs.totalLikes)
  })
})

describe('favorite', () => {
  test('find the top faverite blog of the list with 6 blogs', () => {
    const result = listHelper.favoriteBlog(helper.listWithSixBlogs)
    expect(result).toEqual(helper.perpertyOfBlogs.mostFavorite)
  })
})
