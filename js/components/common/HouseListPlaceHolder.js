import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Placeholder, PlaceholderLine, PlaceholderMedia, ShineOverlay} from 'rn-placeholder';

const PLACE_HOLDER_ARR = [0,1,2,3,4,5,6,7,8,9];

const HouseListPlaceHolder = () => (
  <View>
    {
      PLACE_HOLDER_ARR.map(item => (
        <View
          key={item}
          style={{paddingLeft: 20,paddingRight: 20,}}
        >
          <View style={{paddingTop: 20, paddingBottom: 20, borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: '#f1f1f1'}}>
            <Placeholder
              Animation={ShineOverlay}
              Left={() => (
                <PlaceholderMedia
                  style={{width: '30%',height: 80,marginRight: 20}}
                />
              )}
            >
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
              <PlaceholderLine />
            </Placeholder>
          </View>
        </View>
      ))
    }
  </View>
)

export default HouseListPlaceHolder;
