package kartikeykeepnotes.backend.Entities;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.DocumentReference;



@Document(collection = "users")
public class UserEntity{
    private String name;
    private String email;
    private String password;
    private String googleId;
    private Boolean admin;
    private Boolean lightTheme;
    private Boolean isVerified;

    @DocumentReference
    private List<RoadmapEntity> roadmaps = new ArrayList<>();

    @DocumentReference
    private List<String> subjects = new ArrayList<>();

    @DocumentReference
    private List<String> chapters =new ArrayList<>();

    @DocumentReference
    private List<String> likedSubjects = new ArrayList<>();

    private Date createdAt = new Date();

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }
    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    
    public String getGoogleId() {
        return googleId;
    }
    public void setGoogleId(String googleId) {
        this.googleId = googleId;
    }

    public Boolean getAdmin() {
        return admin;
    }
    public void setAdmin(Boolean admin) {
        this.admin = admin;
    }

    public Boolean getLightTheme() {
        return lightTheme;
    }
    public void setLightTheme(Boolean lightTheme) {
        this.lightTheme = lightTheme;
    }

    public Boolean getIsVerified() {
        return isVerified;
    }
    public void setIsVerified(Boolean isVerified) {
        this.isVerified = isVerified;
    }

    public  List<RoadmapEntity> getRoadmaps() {
        List<RoadmapEntity> roadmaps = new ArrayList<>();
        return roadmaps;
    }   
    
}
