package kartikeykeepnotes.backend.Entities;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;



@Document(collection = "users")
@Getter
@Setter
public class UserEntity{
    private String name;
    private String email;
    private String password;
    private String googleId;
    private Boolean admin;
    private Boolean lightTheme = true;
    private Boolean isVerified = false;

    @DocumentReference
    private List<RoadmapEntity> roadmaps = new ArrayList<>();

    @DocumentReference
    private List<String> subjects = new ArrayList<>();

    @DocumentReference
    private List<String> chapters =new ArrayList<>();

    @DocumentReference
    private List<String> likedSubjects = new ArrayList<>();

    private Date createdAt = new Date();
    
}
