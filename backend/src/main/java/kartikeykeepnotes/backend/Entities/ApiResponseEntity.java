package kartikeykeepnotes.backend.Entities;
import lombok.*;

@Getter
@Setter
public class ApiResponseEntity{
    private boolean status;
    private String message;
    private Object data;
}


