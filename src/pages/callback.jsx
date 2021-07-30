import { useHistory, useParams } from 'react-router-dom';

const Callback = (props) => {
  const history = useHistory();
  const { type } = useParams();

  let [code, state] = history.location.search.split('&');

  code = code.split('=')[1];
  state = state.split('=')[1];

  window.opener.sessionStorage.setItem('authResponse', JSON.stringify({ code, type, state }));
  window.close();

  return <div style={{ width: '100vw', height: '100vh', position: 'fixed', backgroundColor: '#FFFFFF', left: 0, top: 0 }} />;
}
;
export default Callback
;
