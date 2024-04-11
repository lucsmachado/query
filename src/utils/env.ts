const env: () => Vite.ImportMetaEnv = () => {
  return { ...window.env, ...import.meta.env };
};

export default env;
