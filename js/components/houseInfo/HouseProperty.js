import React, { Component } from "react";
import {
  Icon,
  Accordion,
  Text,
  View,
} from "native-base";
import {
  HouseMarketPrice,
  HouseLocationPrice,
  HouseMaterialPrice,
  HouseProfitPrice
} from './index';

const dataArray = [
  {
    title: "房产评估——市场价值",
  },
  {
    title: "房产评估——区位价值",
  },
  {
    title: "房产评估——实物价值",
  },
  {
    title: "房产评估——权益价值",
  },
  {
    title: "购买价格参考(元)",
  }
];

class HouseProperty extends Component {
  constructor (props) {
    super(props)
    this.state = {
      index: 0
    }
  }
  _renderHeader(item, expanded) {
    return (
      <View
        style={{
          flexDirection: "row",
          padding: 10,
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: "#ebedeb",
          marginLeft: 20,
          marginRight: 20
        }}
      >
        <Text style={{ fontWeight: "600", color: "#000",fontSize: 14 }}>
          {item.title}
        </Text>
        {expanded
          ? <Icon style={{ fontSize: 14 }} name="ios-arrow-up" />
          : <Icon style={{ fontSize: 14 }} name="ios-arrow-down" />}
      </View>
    );
  }
  _renderContent () {
    switch (this.state.index) {
      case 0:
        return (
          <HouseMarketPrice />
        )
      case 1:
        return (
          <HouseLocationPrice />
        )
      case 2:
        return (
          <HouseMaterialPrice />
        )
      case 3:
        return (
          <HouseProfitPrice />
        )
      default:
        return (
          <View>
            <Text>3</Text>
          </View>
        )
    }
  }
  render() {
    return (
      <View
        style={{paddingTop: 10,paddingBottom: 10}}
      >
        <Accordion
          style={{borderWidth: 0}}
          dataArray={dataArray}
          animation={true}
          expanded={0}
          renderHeader={this._renderHeader}
          contentStyle={{marginRight: 20,marginLeft: 20}}
          renderContent={() => (
            <View style={{marginRight: 20,marginLeft: 20}}>
              {
                this._renderContent()
              }
            </View>
          )}
          onAccordionOpen={(item, index) => {
            this.setState({
              index
            })
          }}
        />
      </View>
    );
  }
}

export default HouseProperty;
