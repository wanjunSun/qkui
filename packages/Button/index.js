import QKButton from './src/Button';

/* istanbul ignore next */
QKButton.install = function(Vue) {
  Vue.component(QKButton.name, QKButton);
};

export default QKButton;