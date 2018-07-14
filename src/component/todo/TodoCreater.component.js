// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';
import { Button, List, Checkbox, InputItem, WhiteSpace, Flex, Modal } from 'antd-mobile-rn';
import DateTimePicker from 'react-native-modal-datetime-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
const Item = List.Item;
import format from 'date-fns/format';

import { createForm } from 'rc-form';

class TodoCreaterCompoent extends React.Component<{
  onSubmit: any
}> {
  state = { content: '', value: '', deadline: null, isDateTimePickerVisible: false };

  submit = () => {
    this.setState({ content: this.state.value });
    this.props.onSubmit(this.state.value);
    setTimeout(() => {
      this.setState({ content: '' });
    });
  };

  onClose = () => {
    this.setState({
      modal1: false
    });
  };

  showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  handleDatePicked = date => {
    this.setState({ deadline: date.getTime() });
    this.hideDateTimePicker();
  };

  render() {
    return (
      <View>
        <Modal
          visible={this.state.modal1}
          transparent
          maskClosable={false}
          onClose={this.onClose}
          closable={false}
          style={{ top: -120, width: '90%', paddingLeft: 30, paddingRight: 30, paddingBottom: 20 }}
          title={null}
          footer={null}
          wrapProps={{ onTouchStart: this.onWrapTouchStart }}
        >
          <TouchableOpacity onPress={this.onClose}>
            <Image
              style={{ width: 20, height: 20, position: 'absolute', right: -25, top: -5 }}
              source={require('../../assets/icons/x.png')}
            />
          </TouchableOpacity>

          <TextInput
            placeholder="您希望做什么？"
            style={{
              marginTop: 25,
              height: 40,
              borderColor: '#dadada',
              borderBottomWidth: 0.8,
              textAlign: 'center',
              fontWeight: '800',
              fontSize: 18
            }}
            onChangeText={text => this.setState({ text })}
            value={this.state.text}
          />

          <Item
            style={{
              marginTop: 20,
              marginLeft: 0,
              paddingLeft: 0,
              borderBottomWidth: 0.7,
              borderColor: '#dadada'
            }}
          >
            <Flex>
              <Image
                style={{ width: 20, height: 20 }}
                source={require('../../assets/icons/clock.png')}
              />

              <TouchableOpacity
                style={{ marginLeft: 10, width: '100%' }}
                onPress={this.showDateTimePicker}
              >
                <Text style={{ color: '#9b9b9b', fontSize: 16 }}>
                  {this.state.deadline
                    ? format(this.state.deadline, 'YYYY/MM/dd HH:mm')
                    : '任务deadline'}
                </Text>
              </TouchableOpacity>
            </Flex>

            <DateTimePicker
              mode="datetime"
              date={this.state.deadline ? new Date(this.state.deadline) : new Date()}
              isVisible={this.state.isDateTimePickerVisible}
              onConfirm={this.handleDatePicked}
              onCancel={this.hideDateTimePicker}
            />
          </Item>

          <Flex style={{ alignItems: 'flex-start' }}>
            <Image
              style={{
                width: 20,
                height: 20,
                position: 'relative',
                top: 5,
                marginRight: 7,
                marginLeft: 1
              }}
              source={require('../../assets/icons/pencil.png')}
            />

            <Flex.Item style={{ height: 60 }}>
              <TextInput
                onChange={value => {
                  this.setState({ detail: value });
                }}
                style={{ marginTop: 3, fontSize: 16, width: '100%', height: '100%' }}
                placeholder="+备注"
                autoCapitalize={false}
                multiline={true}
              />
            </Flex.Item>
          </Flex>
          <WhiteSpace style={{ height: 20 }} />

          <Button
            style={{
              height: 45,
              backgroundColor: '#c2ddff',
              borderWidth: 0,
              shadowColor: 'rgb(194, 221, 255)',
              shadowOpacity: 0.58,
              shadowRadius: 10,
              shadowOffset: { width: 0, height: 7 }
            }}
            onClick={e => {}}
          >
            <Text
              style={{
                color: '#4295ff'
              }}
            >
              OK
            </Text>
          </Button>
        </Modal>

        <Button
          onClick={e => {
            e.preventDefault();
            this.setState({
              modal1: true
            });
          }}
        >
          default
        </Button>
      </View>
    );
  }
}

export const TodoCreater = TodoCreaterCompoent;
