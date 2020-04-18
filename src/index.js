export default {
  create() {
    throw new Error(
      `Calling the create function during runtime is not allowed. Did you forget to add the babel plugin?`,
    );
  },

  resolve(...classes) {
    // throw new Error(
    //   `Calling the resolve function during runtime is not allowed. Did you forget to add the babel plugin?`
    // );
    return classes.filter(Boolean).join(' ');
  },
};
