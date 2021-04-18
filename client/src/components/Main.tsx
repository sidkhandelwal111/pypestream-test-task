import { Link } from "react-router-dom";

function Main() {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      height: '100vh'
    }}>
      <Link to="/subscribe">Subscribe to a topic</Link>
      <Link to="/publish">Publish Message</Link>
    </div>
  )
}

export default Main
