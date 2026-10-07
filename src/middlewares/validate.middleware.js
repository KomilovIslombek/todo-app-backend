import chalk from 'chalk';

export const validate = schema => (req, res, next) => {
  try {
    // Parse and validate the incoming request parts against the Zod schema
    schema.parse({
      body: req.body,
      query: req.query,
      params: req.params,
    });

    // If validation passes, move to the next middleware or controller
    return next();
  } catch (error) {
    let errors = JSON.parse(error);
    console.log(chalk.redBright('err'), errors);

    // If validation fails, format the Zod errors and return them to the client
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors?.map(err => ({
        field: err.path.join('.').replace('body.', '').replace('params.', '').replace('query.', ''),
        message: err.message,
      })),
    });
  }
};
