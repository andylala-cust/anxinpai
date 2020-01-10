/*
  自定义配置路由切换动画
 */

import StackViewStyleInterpolator from 'react-navigation-stack/src/views/StackView/StackViewStyleInterpolator';

function transitionConfiguration (sceneProps) {
  console.log(sceneProps)
  const {scene} = sceneProps;
  const {route} = scene;
  const params = route.params || {};
  const transitionType = params.transitionType;
  if (transitionType && transitionType !== '') {
    return StackViewStyleInterpolator[transitionType];
  } else {
    return StackViewStyleInterpolator.forHorizontal;
  }
}

export default transitionConfiguration;
