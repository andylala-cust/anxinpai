## ios打包遇到的问题
注意这是打包，不是在设备上调试

在设备上运行，请参见 https://facebook.github.io/react-native/docs/running-on-device

如果xcode报错如：Undefined symbol: _RCTSetLogFunction，

请参见 https://github.com/facebook/react-native/issues/25745

解决方案就是在 Build Settings 的 Linking 中的 Dead Code Stripping 改为 NO即可，
之后退出xcode再重新打开，再次 build即可成功

## react-native-swiper问题(此插件500多个open的issues，真坑)
### 问题1
loop为true的bug(默认为true)，表现为初始显示最后一张图片而不是第一张图片，

请参见 https://github.com/leecade/react-native-swiper/issues/731

解决方案就是修改源码后保存即可

You should find this in .../node_modules/react-native-swiper/src/index.js
componentWillReceiveProps (nextProps) {
    if (!nextProps.autoplay && this.autoplayTimer) clearTimeout(this.autoplayTimer)
    this.setState(this.initState(nextProps, this.props.index !== nextProps.index))
}

### 问题2

分页器pagination不跟随swiper滑动而滚动

解决方案：swiper加上key=this.state.houseImgList.length（即轮播图数组的length）

### 问题3

快速切换 bottomTabNavigation,swiper出现白屏，

解决方案：在 Swiper 加上 removeClippedSubviews={false}

## react-native-amap问题

### 问题1、

在ios中定位按钮和缩放按钮不显示，因为ios没提供sdk，需要自定义

### 问题2、

在设置地图中Marker的偏移量，在ios中使用centerOffset,在安卓中使用anchor，

centerOffset的用法请参见

https://github.com/qiuxiang/react-native-amap3d/blob/v0.7.0/components/maps/Marker.js#L92

anchor的用法请参见 

https://github.com/qiuxiang/react-native-amap3d/issues/65

## react-native-webview

### 问题1

如果出现 

requireNativeComponent RNCWebView was not found in the UIManager

执行 

react-native link

cd  ios/

pod install 

即可解决

## Vue 动态路由不刷新的问题

请参见 

https://router.vuejs.org/zh/guide/essentials/dynamic-matching.html#%E5%93%8D%E5%BA%94%E8%B7%AF%E7%94%B1%E5%8F%82%E6%95%B0%E7%9A%84%E5%8F%98%E5%8C%96


## ReactNative 使用 ART 库

对于 ReactNative >= 0.60

Open Podfile and add below given path and save the file

pod 'React-ART', :path => '../node_modules/react-native/Libraries/ART'
 
cd ios && pod install 即可解决

参见 https://github.com/oblador/react-native-progress/issues/127
