export const paginateQuery = async (query, model, filter = {}) => {
  const page = query.page || 1
  const limit = query.limit || 10
  const result = await model.findAndCountAll({
    order: [['createdAt', 'DESC']],
    limit: limit,
    offset: (page - 1) * limit,
    ...filter
  })
  return {
    page,
    limit,
    totalEntries: result.count,
    totalPages: Math.ceil(result.count / limit),
    data: result.rows
  }
}
