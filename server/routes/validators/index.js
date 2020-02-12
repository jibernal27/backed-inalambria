import { validationResult, checkSchema } from 'express-validator'
import { User } from '~/server/models'

const addTrackSchema = {
  track: {
    isInt: true
  }
}

const createPlaylistSchema = {
  name: {
    isString: true
  },
  track: {
    optional: true,
    ...addTrackSchema.track
  }
}

const addTracksToPlayListSchema = {
  'tracks.*.track': addTrackSchema.track,
  tracks: {
    custom: {
      options: value => {
        const valid = Array.isArray(value)
        if (!valid) {
          throw new Error('Invalid')
        }
        return true
      }
    }
  }
}

const userSignInSchema = {
  username: {
    isString: true,
    isLength: {
      options: { min: 6 }
    },
    custom: {
      options: async value => {
        const user = await User.findOne({ where: { username: value } })
        if (user) {
          throw new Error('already_exists')
        }
        return true
      }
    }
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 8 }
    }
  }
}

const userSignUpSchema = {
  username: {
    isString: true,
    isLength: {
      options: { min: 6 }
    }
  },
  password: {
    isString: true,
    isLength: {
      options: { min: 8 }
    }
  }
}

export const addTrackValidator = () => checkSchema(addTrackSchema)
export const createPlaylistValidator = () => checkSchema(createPlaylistSchema)
export const addTrackToPlayListValidator = () =>
  checkSchema(addTracksToPlayListSchema)
export const userSignInValidator = () => checkSchema(userSignInSchema)
export const userSignUpValidator = () => checkSchema(userSignUpSchema)

export const validate = (req, res, next) => {
  const errors = validationResult(req)
  if (errors.isEmpty()) {
    return next()
  }
  const extractedErrors = []
  errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))

  return res.status(422).json({
    errors: extractedErrors
  })
}
