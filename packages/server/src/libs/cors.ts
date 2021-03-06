export default () => {
  const allowedOrigins = ['http://206.189.40.114:3050', 'http://10.104.0.2:3050', 'http://localhost:3000'];
  return {
    origin(origin: string, callback: (arg0: Error | null, arg1: boolean) => any) {
      // allow requests with no origin
      // (like mobile apps or curl requests)
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = 'The CORS policy for this site does not '
          + 'allow access from the specified Origin.';
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
  };
};
