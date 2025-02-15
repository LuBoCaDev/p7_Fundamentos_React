interface ToDeleteConfirmation {
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    loading?: boolean;
}

const DeleteConfirmation: React.FC<ToDeleteConfirmation> = ({
    message,
    onConfirm,
    onCancel,
    loading = false,
}) => {
    return (
      <div className="confirmation-overlay">
        <div className="confirmation-box">
          <p>{message}</p>
          <div className="confirmation-buttons">
            <button onClick={onConfirm} disabled={loading}>
              Yes
            </button>
            <button onClick={onCancel} disabled={loading}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default DeleteConfirmation;
  