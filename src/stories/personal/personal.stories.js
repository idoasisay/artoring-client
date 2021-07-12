import Personal from '../../pages/Personal/personal';

export default {
  title: 'artoring/Profile page',
  component: Personal
};

const Template = (args) => <Personal {...args} />;

export const test = Template.bind({});
