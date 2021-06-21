import CardList from '../../components/Mainpage/cardList';

export default {
  title: 'artoring/cards',
  component: CardList

};

export const Template = (args) => <CardList {...args} />;
Template.args = {
  data: {
    title: '커리어 강의',
    cards: [{
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }, {
      thumb: 'https://aefadsf1i9alk1230.s3.ap-northeast-2.amazonaws.com/logo.png',
      tag: ['test1', 'test2'],
      title: '테스트!!',
      date: `${Date.now()} - ${Date.now()}`,
      price: 'test 원'
    }]
  }
}
;
