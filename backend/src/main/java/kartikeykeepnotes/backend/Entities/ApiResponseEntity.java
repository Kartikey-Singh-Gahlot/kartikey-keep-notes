package kartikeykeepnotes.backend.Entities;
import lombok.Getter;
import lombok.Setter;


@Getter
@Setter
public class ApiResponseEntity{
    private boolean status;
    private String message;
    private Object data;
}


