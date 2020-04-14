export default {
  create() {
    throw new Error(
      `Calling the create function is not allowed. Did you forget to add the babel plugin?`
    );
  },

  resolve(...classes) {
    return classes.filter(Boolean);
  },
};
