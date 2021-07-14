import TagList from '../../components/Mainpage/tagList';

export default {
  title: 'artoring/TagList',
  component: TagList

};

export const Template = (args) => <TagList {...args} />;
Template.args = {

  tags: ['test1', 'test2']

}
;
