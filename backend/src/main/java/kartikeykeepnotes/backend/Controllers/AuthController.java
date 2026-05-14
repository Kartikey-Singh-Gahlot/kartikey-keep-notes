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
import kartikeykeepnotes.backend.Entities.ResponseEntity;




@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "${FRONTEND_URL}")
public class AuthController {

   
    @Autowired
    private ResponseEntity ResponseEntity;


    @Autowired
    private AuthServices AuthService;


    @GetMapping("")
    public String app() {
        return "Auth service reachable";
    }


    @PostMapping("user/signup")
    public ResponseEntity signup(@RequestBody UserEntity userEntity) {   
        ResponseEntity res = new ResponseEntity();
        res.setMessage(AuthService.signUp(userEntity));
        return res;
    }
    
}
