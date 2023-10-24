import { useSelector } from 'react-redux';
const Notification = () => {
  const notification = useSelector((state) => state.notification);
  return (
    <div
      className="notiBox"
      style={{
        backgroundColor: '#e6e4e3',
        borderRadius: 8,
        border: `5px solid ${
          notification.status === 'success' ? 'green' : 'red'
        }`,
        marginBottom: 15,
        display: notification.isVisible ? 'block' : 'none',
      }}
    >
      <p style={{ padding: 1 }} className="messageNoti">
        {notification.message}
      </p>
    </div>
  );
};

export default Notification;
