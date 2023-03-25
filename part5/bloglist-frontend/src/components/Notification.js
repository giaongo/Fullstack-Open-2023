import PropTypes from 'prop-types';
const Notification = ({ status, message }) => {
  return (
    <div
      className='notiBox'
      style={{
        backgroundColor: '#e6e4e3',
        borderRadius: 8,
        border:`5px solid ${status === 'success' ? 'green' : 'red'}`,
        marginBottom:15
      }}
    >
      <p style={{ padding:1 }} className='messageNoti'>{message}</p>
    </div>
  );
};

Notification.propTypes = {
  status: PropTypes.string,
  message: PropTypes.string,
};
export default Notification;
