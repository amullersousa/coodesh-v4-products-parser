async function runner(commands) {
  for (let command of commands) {
    try {
      await command()
    } catch (error: any) {
      if (error.original) {
        /**
         * This is an error that we can run into while seeding the same
         * data. It's passable.
         */

        if (error.original.code == 'ER_DUP_ENTRY') {
          console.error(`>>> Passable error occurred: ER_DUP_ENTRY`)
        } else if (error.original.code == 'ER_DUP_FIELDNAME') {
          /**
           * This is an error that we can run into where the same
           * field name already exists.
           */
          console.error(`>>> Passable error occurred: ER_DUP_FIELDNAME`)
        } else if (error.original.code == 'ER_CANT_DROP_FIELD_OR_KEY') {
          /**
           * If the field doesn't exist and we're trying to drop it,
           * that's cool. We can pass this.
           */
          console.error(`>>> Passable error occurred: ER_CANT_DROP_FIELD_OR_KEY`)
        } else if (error.name == 'SequelizeUnknownConstraintError') {
          console.error(
            `>>> Passable error. Trying to remove constraint that's already been removed.`
          )
        } else {
          /**
           * Any other error
           */
          console.error(error)
          throw new Error(error)
        }
      } else {
        console.error(error)
        throw new Error(error)
      }
    }
  }
}

export default {
  run: runner
}
