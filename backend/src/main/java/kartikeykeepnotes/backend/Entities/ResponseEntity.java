package kartikeykeepnotes.backend.Entities;
import org.springframework.data.mongodb.core.aggregation.SetOperators.AnyElementTrue;
import org.springframework.stereotype.Component;

@Component
public class ResponseEntity {
    private boolean status;
    private Object message;

    public boolean isStatus() {
        return status;
    }

    public void setStatus(boolean status) {
        this.status = status;
    }

    public Object getMessage() {
        return message;
    }

    public void setMessage(Object message) {
        this.message = message;
    }

}
