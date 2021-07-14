import Personal from '../../pages/Personal/personal';

export default {
  title: 'artoring/Profile page',
  component: Personal
};

const Template = (args) => <Personal {...args} />;

export const test = Template.bind({});
test.args = {
  type: 'email',
  token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3RAZW1haWwuY29tIiwibmFtZSI6InRlc3QgdXNlciIsImlhdCI6MTYyNjIzNTQ5OH0.UW45M6t1kbBKN-OUl8HiaLCae8eYxMue_6SxXsMscWQ'
};
