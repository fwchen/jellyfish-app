// @flow
import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Button, List, InputItem, WhiteSpace } from 'antd-mobile';
import { StackNavigator } from 'react-navigation';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createForm } from 'rc-form';
import { makeActionRequestCollection } from '../action/actions';

class TodoCreater extends React.Component<{
  onSubmit: any
}> {
  submit = () => {
    this.props.form.validateFields((error, value: { todoContent: string }) => {
      this.props.onSubmit(value.todoContent);
      this.props.form.setFieldsValue({
        todoContent: ''
      });
    });
  };

  render() {
    const { getFieldProps } = this.props.form;

    return (
      <List>
        <InputItem
          {...getFieldProps('todoContent', {
            rules: [{ required: true }]
          })}
          onSubmitEditing={this.submit}
          placeholder="Add Todo..."
        />
      </List>
    );
  }
}

const TodoCreaterWrapper = createForm()(TodoCreater);

class TodoListScreen extends React.Component {
  static navigationOptions = {
    title: 'Todo List'
  };

  componentWillMount() {
    this.props.actions.GET_TODO_LIST_REQUEST();
  }

  createTodo = (content: string) => {
    this.props.actions.CREATE_TODO_REQUEST({ content });
  };

  render() {
    return (
      <View style={styles.container}>
        <TodoCreaterWrapper onSubmit={this.createTodo} />
        <Text>List</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});

export const TodoListScreenContainer = connect(
  state => {
    return {
      userId: state.auth.userId
    };
  },
  dispatch => {
    return {
      actions: bindActionCreators(makeActionRequestCollection(), dispatch)
    };
  }
)(TodoListScreen);