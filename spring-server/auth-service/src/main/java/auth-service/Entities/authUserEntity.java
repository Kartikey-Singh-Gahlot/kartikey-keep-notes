import java.util.Date;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.Getter;
import lombok.Setter;


@Document(collection = "authUsers")
@Getter
@Setter
public class authUserEntity{
   private String email;
   private String password = null ;
   private String salt = null;
   private String otp = null;
   private Date otpExpiry;
   private String googleId;
   private boolean isAdmin;
   private boolean isVerified;
   private Date createdAt = new Date();
}
