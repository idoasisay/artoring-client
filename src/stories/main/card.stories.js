import Card from '../../components/Mainpage/card';

export default {
  title: 'artoring/cards',
  component: Card

};

export const Template = (args) => <Card {...args} />;
Template.args = {
  thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
  tag: ['test1', 'test2'],
  title: '테스트!!',
  date: `${Date.now()} - ${Date.now()}`,
  price: 'test 원'
}
;
