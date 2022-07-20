module.exports = {
  mount: {
    src: { url: '/dist' },
    public: { url: '/', static: true },
  },
  optimize: {
    minify: true,
  },
  plugins: ['@snowpack/plugin-sass'],
};
