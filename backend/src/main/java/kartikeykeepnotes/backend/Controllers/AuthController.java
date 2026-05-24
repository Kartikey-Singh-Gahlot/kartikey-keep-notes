package kartikeykeepnotes.backend.Controllers;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import kartikeykeepnotes.backend.Entities.UserEntity;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import kartikeykeepnotes.backend.Services.AuthServices;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpStatus;
import kartikeykeepnotes.backend.Entities.ApiResponseEntity;
import kartikeykeepnotes.backend.Repositories.UserRepository;
import java.util.Optional;




@RestController
@RequestMapping("/auth")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class AuthController {

   

    @Autowired
    private AuthServices authService;


    @Autowired
    private UserRepository userRepository;


    @GetMapping("")
    public String app() {
        return "Auth service reachable";
    }


    @PostMapping("user/signup")
    public ResponseEntity<ApiResponseEntity> signup(@RequestBody UserEntity userEntity) {   
        Optional<UserEntity> existingUser = userRepository.findByEmail(userEntity.getEmail());
        ApiResponseEntity res = new ApiResponseEntity();
        if(existingUser.isPresent()){
            res.setStatus(false); 
            res.setData(null);
            res.setMessage("User with this email already exists");
            return new ResponseEntity<>(res, HttpStatus.BAD_REQUEST);

        }
        res.setMessage("User created successfully");
        res.setStatus(true);
        res.setData(authService.signUp(userEntity));
        return new ResponseEntity<>(res, HttpStatus.OK);
    }
    
}

