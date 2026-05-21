package kartikeykeepnotes.backend.Entities;

public class ApiResponseEntity<T>{
    private boolean status;
    private T message;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public T getMessage() {
        return message;
    }

    public void setMessage(T message) {
        this.message = message;
    }

}
