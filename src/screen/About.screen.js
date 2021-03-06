import React from 'react';
import { StyleSheet, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { createForm } from 'rc-form';
import { connect } from 'react-redux';
import { makeActionRequestCollection } from '../redux/action/actions';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DateTimePicker from 'react-native-modal-datetime-picker';
import format from 'date-fns/format';
import R from 'ramda';

const Item = View

class AboutScreen extends React.Component {
  static defaultNavigationOptions = ({ navigation }) => {
    const params = navigation.state.params || {};
    return {
      title: '',
      tabBarLabel: '账号',
      headerBackTitle: null
    };
  };

  render() {
    return (
      <View style={styles.container}>
        <List renderHeader={() => '链接'}>
          <Item>水母清单网站</Item>
        </List>
        <List renderHeader={() => '致谢'}>
          <Item>开发团队</Item>
        </List>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const AboutScreenContainer = connect(
  (state, props) => {
    return {};
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(AboutScreen);
