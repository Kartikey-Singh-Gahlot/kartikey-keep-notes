package kartikeykeepnotes.backend.Entities;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;
import org.springframework.data.mongodb.core.index.Indexed;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;


@Document(collection = "roadmaps")

@Getter
@Setter
public class RoadmapEntity {

    @Indexed(unique = true)
    private String name;

    private String description;

    @DocumentReference
    private List<String> subjects = new ArrayList<>();

    private int number = 0;  
    private int likesCount = 0;
    private String imageUrl;
    private Date createdAt = new Date();
}
